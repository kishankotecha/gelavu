export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
};
