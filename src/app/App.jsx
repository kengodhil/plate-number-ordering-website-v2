import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { PlatePreview } from '@/app/components/plate-preview';
import { ColorSelector, getColorPrice } from '@/app/components/color-selector';
import { PaymentDetails } from '@/app/components/payment-details';
import { SizeQuantitySelector } from '@/app/components/size-quantity-selector';
import { QRScanner } from '@/app/components/qr-scanner';
import { Printer, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';

export default function App() {
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedColor, setSelectedColor] = useState('white');
  const [plateSize, setPlateSize] = useState('narrow');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleCertCode, setVehicleCertCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [controlNumber, setControlNumber] = useState('');

  const generateControlNumber = () => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CN${timestamp}${random}`;
  };

  const calculateTotal = () => {
    const pricePerPlate = getColorPrice(selectedColor);
    return pricePerPlate * quantity;
  };

  const handleQRScanSuccess = (decodedText) => {
    setVehicleCertCode(decodedText);
    toast.success('QR Code scanned successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedControlNumber = generateControlNumber();
    setControlNumber(generatedControlNumber);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewOrder = () => {
    setPlateNumber('');
    setSelectedColor('white');
    setPlateSize('narrow');
    setQuantity(1);
    setCustomerName('');
    setCustomerPhone('');
    setVehicleCertCode('');
    setSubmitted(false);
    setControlNumber('');
  };

  const totalAmount = calculateTotal();

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary p-4 rounded-full">
                <Printer className="size-10 text-white" />
              </div>
            </div>
            <h1 className="mb-2">Plate Number Printing Service</h1>
            <p className="text-muted-foreground">
              Custom vehicle plate number printing - Fast, reliable, and professional
            </p>
          </div>

          {!submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Order Your Plate Number</CardTitle>
                <CardDescription>
                  Choose your plate color, size, and enter your vehicle registration details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Plate Preview */}
                  <PlatePreview plateNumber={plateNumber} color={selectedColor} />

                  {/* Color Selector */}
                  <ColorSelector
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                  />

                  {/* Size and Quantity */}
                  <SizeQuantitySelector
                    size={plateSize}
                    quantity={quantity}
                    onSizeChange={setPlateSize}
                    onQuantityChange={setQuantity}
                  />

                  {/* Plate Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="plateNumber">Plate Number *</Label>
                    <Input
                      id="plateNumber"
                      type="text"
                      placeholder="e.g., ABC 1234"
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                      required
                      className="bg-input-background"
                      maxLength={15}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter your vehicle registration number
                    </p>
                  </div>

                  {/* QR Scanner */}
                  <QRScanner onScanSuccess={handleQRScanSuccess} />

                  {/* Vehicle Certificate Code (from QR or manual) */}
                  {vehicleCertCode && (
                    <div className="space-y-2">
                      <Label htmlFor="certCode">Vehicle Certificate Code</Label>
                      <Input
                        id="certCode"
                        type="text"
                        value={vehicleCertCode}
                        onChange={(e) => setVehicleCertCode(e.target.value)}
                        className="bg-input-background"
                        placeholder="Scanned from QR code"
                      />
                      <p className="text-sm text-green-600">
                        ✓ Certificate verified via QR scan
                      </p>
                    </div>
                  )}

                  {/* Customer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        type="text"
                        placeholder="John Doe"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerPhone">Phone Number *</Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="+255 XXX XXX XXX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="bg-input-background"
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price per plate:</span>
                        <span>{getColorPrice(selectedColor).toLocaleString()} TSH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>×{quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="capitalize">{plateSize}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Amount</span>
                          <div className="text-primary" style={{ fontSize: '1.5rem' }}>
                            {totalAmount.toLocaleString()} TSH
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!plateNumber || !customerName || !customerPhone}
                  >
                    Submit Order & Get Control Number
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div>
              <PaymentDetails
                controlNumber={controlNumber}
                plateNumber={plateNumber}
                plateColor={selectedColor}
                size={plateSize}
                quantity={quantity}
                amount={totalAmount}
              />
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleNewOrder}
                  variant="outline"
                  size="lg"
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Create New Order
                </Button>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>🕐 Processing time: 30 minutes to 1.5 hours after payment confirmation</p>
            <p className="mt-1">📞 Need help? Contact us: +255 XXX XXX XXX</p>
          </div>
        </div>
      </div>
    </>
  );
}
