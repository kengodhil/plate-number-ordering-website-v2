import { Check } from 'lucide-react';

const colors = [
  { id: 'white', name: 'White', class: 'bg-white border-gray-300', textClass: 'text-gray-900', price: 15000 },
  { 
    id: 'black', 
    name: 'Black', 
    class: 'bg-black border-gray-600', 
    textClass: 'text-white', 
    price: 15000 
  },
  { id: 'yellow', name: 'Yellow', class: 'bg-yellow-300', textClass: 'text-gray-900', price: 15000 },
  { id: 'blue', name: 'blue', class: 'bg-blue-600', textClass: 'text-white', price: 25000 },
  { id: 'green', name: 'Green', class: 'bg-green-600', textClass: 'text-white', price: 25000 },
];

export function ColorSelector({ selectedColor, onColorChange }) {
  return (
    <div className="space-y-3">
      <label className="block">Select Plate Color</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onColorChange(color.id)}
            className={`relative ${color.class} border-2 rounded-lg p-4 transition-all hover:scale-105 ${
              selectedColor === color.id ? 'ring-4 ring-primary' : ''
            }`}
          >
            {selectedColor === color.id && (
              <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
                <Check className="size-4 text-white" />
              </div>
            )}
            <div className={`${color.textClass} text-center space-y-1`}>
              <div>{color.name}</div>
              <div className="text-xs opacity-90">{color.price.toLocaleString()} TSH</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export const getColorPrice = (colorId) => {
  const color = colors.find(c => c.id === colorId);
  return color?.price || 15000;
};
