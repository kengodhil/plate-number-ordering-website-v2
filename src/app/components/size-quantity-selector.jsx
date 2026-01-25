import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function SizeQuantitySelector({
  size,
  quantity,
  onSizeChange,
  onQuantityChange,
}) {
  const incrementQuantity = () => {
    if (quantity < 10) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Size Selection */}
      <div className="space-y-3">
        <Label>Plate Size</Label>
        <RadioGroup value={size} onValueChange={onSizeChange}>
          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-secondary/50 transition-colors">
            <RadioGroupItem value="narrow" id="narrow" />
            <Label htmlFor="narrow" className="cursor-pointer flex-1">
              Narrow (Standard)
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-secondary/50 transition-colors">
            <RadioGroupItem value="wide" id="wide" />
            <Label htmlFor="wide" className="cursor-pointer flex-1">
              Wide (Custom)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <Label>Quantity</Label>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </Button>
          <div className="flex-1 text-center">
            <div className="text-3xl">{quantity}</div>
            <div className="text-xs text-muted-foreground">
              plate{quantity !== 1 ? 's' : ''}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            disabled={quantity >= 10}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
