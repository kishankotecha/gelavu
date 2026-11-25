export const toPaise = (rupees: number) => Math.round(rupees * 100);

export const feeFor = (entryRupees: number) =>
  entryRupees < 500 ? 39 : entryRupees < 1500 ? 59 : 79;

export function priceBreakdown(entryRupees: number) {
  const fee = feeFor(entryRupees);
  return {
    entryPaise: toPaise(entryRupees),
    feePaise: toPaise(fee),
    totalPaise: toPaise(entryRupees + fee),
    hostSharePaise: toPaise(entryRupees), // the host always receives the full entry fee
    gstOnFeePaise: toPaise(fee - fee / 1.18),
  };
}
