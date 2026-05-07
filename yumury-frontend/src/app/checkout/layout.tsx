// Checkout pages use their own minimal layout (CheckoutLayout component).
// No global Header or Footer — this is a focused purchase flow.
export default function CheckoutRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen flex-col bg-background">{children}</div>;
}
