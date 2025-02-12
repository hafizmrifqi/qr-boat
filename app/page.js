"use client";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const qrRef = useRef(null); // Ref untuk komponen QRCodeCanvas

  const generateQrCode = () => {
    if (text) {
      setQrCode(text);
    } else {
      setQrCode("");
    }
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.canvas; // Ambil elemen canvas dari ref
      const dataURL = canvas.toDataURL("image/png"); // Konversi canvas ke data URL

      // Buat elemen <a> untuk download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "qrcode.png"; // Set nama file
      document.body.appendChild(link);
      link.click(); // Klik link untuk memulai download
      document.body.removeChild(link); // Hapus link setelah download selesai
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Masukkan teks atau URL" className="border p-2 w-full mb-4 rounded" />
        <button onClick={generateQrCode} className="bg-blue-500 text-white p-2 rounded mb-4 mx-auto">
          Generate
        </button>
        <div className="mb-4">
          {qrCode && (
            <QRCodeCanvas
              value={qrCode}
              size={256}
              level="H"
              className="mx-auto"
              ref={qrRef} // Set ref ke komponen QRCodeCanvas
            />
          )}
        </div>
        {qrCode && ( // Tampilkan tombol download hanya jika QR code ada
          <button onClick={downloadQRCode} className="bg-green-500 text-white p-2 rounded mx-auto">
            Download QR Code
          </button>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 px-4 bg-gray-100 py-4 text-center text-gray-700 border-t border-gray-200">
        <div className="container mx-auto">
          {" "}
          {/* Center content */}
          &copy; {new Date().getFullYear()} QR Boat. Created with ❤️ by{" "}
          <a
            href="https://github.com/hafizmrifqi"
            className="font-medium text-blue-600 hover:underline" // Style the link
            target="_blank" // Open in new tab (important for external links)
            rel="noopener noreferrer" // Security best practice
          >
            hafizmrifqi
          </a>
          . All rights reserved. {/* Added a more complete sentence */}
        </div>
      </footer>
    </div>
  );
}
