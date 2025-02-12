import "./globals.css";

export const metadata = {
  title: "QR Boat - Buatin QR Code",
  description: "Generate Text to QR Code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center h-screen bg-gray-100">{children}</body>
    </html>
  );
}
