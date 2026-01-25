import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/app/components/ui/button';
import { Camera, X } from 'lucide-react';

export function QRScanner({ onScanSuccess }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const scannerRef = useRef(null);
  const scannerElementId = 'qr-scanner';

  const startScanning = async () => {
    try {
      setError('');
      const scanner = new Html5Qrcode(scannerElementId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          // Ignore errors during scanning (they're continuous)
          console.log(errorMessage);
        }
      );

      setIsScanning(true);
    } catch (err) {
      setError('Failed to start camera. Please check permissions.');
      console.error(err);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error(err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      {!isScanning ? (
        <Button
          type="button"
          variant="outline"
          onClick={startScanning}
          className="w-full"
        >
          <Camera className="size-4 mr-2" />
          Scan Vehicle Certificate QR Code (Optional)
        </Button>
      ) : (
        <div className="space-y-3">
          <div id={scannerElementId} className="rounded-lg overflow-hidden border-2 border-primary" />
          <Button
            type="button"
            variant="outline"
            onClick={stopScanning}
            className="w-full"
          >
            <X className="size-4 mr-2" />
            Close Scanner
          </Button>
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
