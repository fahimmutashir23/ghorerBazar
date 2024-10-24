import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import { pCode } from "./productCode";
import Barcode from "react-barcode";

const opts = {
  type: "image/pdf",
  quality: 1,
  margin: 0,
};

const Scanner = () => {
  const [data, setData] = useState(null);
  const [inputData, setInputData] = useState("");
  const [qrCode, setQrCode] = useState([]);
  const [barCode, setBarCode] = useState([]);
  const barCodeRef = useRef()

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setData(decodedText);
    }

    const config = {
      fps: 10,
      qrbox: { width: 200, height: 200 },
      rememberLastUsedCamera: true,
      // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    const scanner = new Html5QrcodeScanner("reader", config, true);
    scanner.render(onScanSuccess);
  }, []);

  const handleGenerate = (inputCode) => {
    let newQRCodes = [];
    inputCode
      ? QRCode.toDataURL(inputCode, opts, (err, url) => {
          if (err) return "something went wrong";
          setQrCode([{ code: inputCode, url }]);
        })
      : pCode.map((code) => {
          QRCode.toDataURL(code, opts, (err, url) => {
            if (err) {
              console.error("something went wrong");
              return;
            }
            newQRCodes.push({ code, url });
            if (newQRCodes.length === pCode.length) {
              setQrCode(newQRCodes);
            }
          });
        });
  };

  const handleBarCodeGenerate = (inputCode) => {
    inputCode ? setBarCode([inputCode]) : setBarCode(pCode);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const qrSize = 18; // Size of each QR code
    const margin = 1.8; // Margin around QR codes
    const textMargin = 2; // Margin between QR code and text
    const cols = 10; // Number of columns
    doc.setFontSize(6); // Set the desired font size

    qrCode.forEach((item, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const x = margin + col * (qrSize + 1 + margin);
      const y = margin + row * (qrSize + textMargin + margin);

      // Add new page if necessary
      if (y + qrSize + textMargin + 6 + margin > pageHeight) {
        doc.addPage();
      }

      doc.addImage(item.url, "PNG", x, y, qrSize, qrSize);
      doc.text(item.code, x, y + qrSize + textMargin);
    });

    doc.save("QRCodes.pdf");
  };

  const handleDownloadBarPDF = () => {
    const doc = new jsPDF();
    // const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const qrSize = 18; // Size of each QR code
    const margin = 1.8; // Margin around QR codes
    const cols = 5; // Number of columns

    barCode.forEach((item, index) => {
      const barcodeCanvas = barCodeRef.current;
      const imgData = barcodeCanvas.toDataURL('image/png');
      const row = Math.floor(index / cols);
      const col = index % cols;

      const x = margin + col * (qrSize + 1 + margin);
      const y = margin + row * (qrSize + margin);

      // Add new page if necessary
      if (y + qrSize + margin > pageHeight) {
        doc.addPage();
      }

      doc.addImage(imgData, "jpg", x, y, qrSize, qrSize);
    });

    doc.save("QRCodes.pdf");
  };

  return (
    <div className="flex mx-4 mt-4 border-2 border-gray-500">
      <div className="border-r-2 border-r-gray-500 p-4 w-9/12">
        <h1 className="text-center text-3xl font-semibold">Create QR Code</h1>
        <div className="space-y-2">
          <div className="">
            <div>
              <label htmlFor="code">input Code *</label>
              <input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                id="code"
                type="text"
                className="px-3 py-1 bg-gray-300 text-md focus:outline-none w-full"
              />
            </div>
            <div>
              <div className="flex items-center">
                <button
                  onClick={() => handleGenerate(inputData)}
                  className="px-2 py-1 bg-gray-500 text-white mt-2 w-full"
                >
                  Generate QR Code
                </button>
                <span className="mx-2">or</span>
                <button
                  onClick={() => handleGenerate()}
                  className="px-2 py-1 bg-gray-500 text-white mt-2 w-full"
                >
                  Get QR Code from Database
                </button>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleBarCodeGenerate(inputData)}
                  className="px-2 py-1 bg-gray-500 text-white mt-2 w-full"
                >
                  Generate Barcode
                </button>
                <span className="mx-2">or</span>
                <button
                  onClick={() => handleBarCodeGenerate()}
                  className="px-2 py-1 bg-gray-500 text-white mt-2 w-full"
                >
                  Get Barcode from Database
                </button>
              </div>
            </div>
          </div>
          <div>
            {qrCode.length > 0 && (
              <>
                <div className="p-1 border-gray-500  flex flex-wrap gap-5">
                  {qrCode.map((url, idx) => (
                    <div key={idx} className="flex flex-col justify-center">
                      <img src={url.url} alt="" />
                      <p className="text-xs font-semibold">{url.code}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-1 bg-gray-500 text-white mt-2"
                >
                  Print
                </button>
              </>
            )}
          </div>
          <div>
            <div className="p-1 border-gray-500 grid grid-cols-4 gap-1">
              {barCode.length > 0 &&
                barCode.map((item, idx) => (
                  <Barcode renderer="canvas" ref={barCodeRef} key={idx} height={50} width={1} value={item} />
                ))}
            </div>
            <button
              onClick={handleDownloadBarPDF}
              className="px-4 py-1 bg-gray-500 text-white mt-2"
            >
              Print
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 w-3/12">
        <div id="reader"></div>

        <p>Your Scanning data</p>
        <p> {data ? data : ""}</p>
      </div>
    </div>
  );
};

export default Scanner;
