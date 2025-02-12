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
  );
}
