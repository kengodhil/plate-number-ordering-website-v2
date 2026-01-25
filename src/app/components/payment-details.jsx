import { CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useState } from 'react';

export function PaymentDetails({ controlNumber, plateNumber, plateColor, size, quantity, amount }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(controlNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="bg-green-100 rounded-full p-4">
          <CheckCircle className="size-16 text-green-600" />
        </div>
        <div>
          <h2>Order Submitted Successfully!</h2>
          <p className="text-muted-foreground mt-2">
            Please complete your payment using the control number below
          </p>
        </div>
      </div>

      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Use this control number to complete your payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <label className="text-sm text-muted-foreground">Control Number</label>
            <div className="flex items-center justify-between mt-1">
              <div className="tracking-wider" style={{ fontSize: '1.5rem' }}>{controlNumber}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="ml-2"
              >
                {copied ? (
                  <CheckCircle className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plate Number:</span>
              <span>{plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plate Color:</span>
              <span className="capitalize">{plateColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size:</span>
              <span className="capitalize">{size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="text-primary">{amount.toLocaleString()} TSH</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <p className="text-sm text-blue-900">
              💡 <strong>Payment Instructions:</strong>
              <br />
              Use this control number to pay via mobile money, bank transfer, or at any authorized payment center. Your plate will be printed and ready for collection once payment is confirmed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
