import React, { useState, useRef, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [fileNumber, setFileNumber] = useState('');
  const canvasRef = useRef(null);
  const printCanvasRef = useRef(null);

  const meta = {
    section: 'Admin Section',
    subject: 'Annual Budget Report 2025',
    date: '2025-06-28',
  };

  const generateQRCode = useCallback(async () => {
    const qrData = `File Number: ${fileNumber}\nSection: ${meta.section}\nSubject: ${meta.subject}\nDate: ${meta.date}`;

    if (!fileNumber.trim()) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // ✅ Fixed: 4 args
      }
      return;
    }

    try {
      await QRCode.toCanvas(canvasRef.current, qrData, { width: 200 });
      await QRCode.toCanvas(printCanvasRef.current, qrData, { width: 200 });
    } catch (err) {
      console.error('QR code generation failed', err);
    }
  }, [fileNumber, meta]);

  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md mt-8">
      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            margin: 0 auto;
            text-align: center;
            width: 100%;
          }
          #print-area canvas {
            display: block;
            margin: 0 auto;
          }
        }
      `}</style>

      <h1 className="text-3xl font-semibold mb-6 text-center">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter File Number"
        value={fileNumber}
        onChange={(e) => setFileNumber(e.target.value)}
        className="border rounded p-3 w-full mb-4 text-center"
      />

      <div className="flex justify-center mb-6">
        <button
          onClick={generateQRCode}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded transition flex items-center"
        >
          <i className="fas fa-qrcode mr-2" aria-hidden="true"></i> Generate QR Code
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <canvas ref={canvasRef} />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePrint}
          disabled={!fileNumber.trim()}
          title={!fileNumber.trim() ? 'Enter File Number to print' : 'Print QR Code'}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition flex items-center disabled:opacity-50"
        >
          <i className="fas fa-print mr-2" aria-hidden="true"></i> Print
        </button>
      </div>

      {/* Hidden print-only section */}
      <div id="print-area" className="hidden print:block mt-12 text-center">
        <canvas ref={printCanvasRef} />
        <p className="mt-4 text-lg">File Number: {fileNumber}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
