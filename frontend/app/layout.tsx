import "../globals.css";

export const metadata = {
  title: "AI Knowledge Assistant",
  description: "Upload and query your documents intelligently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
