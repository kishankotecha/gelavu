import { env } from "./env";

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise (e.g. 50000 = 500 INR)
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as unknown as { Razorpay: unknown }).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(
  options: Omit<RazorpayOptions, "key"> & { key?: string }
): Promise<void> {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
  }

  const razorpayConfig: RazorpayOptions = {
    key: options.key || env.RAZORPAY_KEY_ID,
    theme: { color: "#059669" },
    ...options,
  };

  const RazorpayConstructor = (window as unknown as { Razorpay: new (opts: RazorpayOptions) => { open: () => void } }).Razorpay;
  const instance = new RazorpayConstructor(razorpayConfig);
  instance.open();
}
