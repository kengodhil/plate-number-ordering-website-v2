export function PlatePreview({ plateNumber, color }) {
  const getColorStyles = () => {
    switch (color) {
      case 'white':
        return {
          bg: 'bg-white',
          text: 'text-gray-900',
          border: 'border-gray-900',
        };
      case 'black':
        return {
          bg: 'bg-black',
          text: 'text-yellow-900',
          border: 'border-gray-900',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-300',
          text: 'text-gray-900',
          border: 'border-gray-900',
        };
      case 'blue':
        return {
          bg: 'bg-blue-600',
          text: 'text-white',
          border: 'border-white',
        };
      case 'green':
        return {
          bg: 'bg-green-600',
          text: 'text-white',
          border: 'border-white',
        };
      default:
        return {
          bg: 'bg-white',
          text: 'text-gray-900',
          border: 'border-gray-900',
        };
    }
  };

  const styles = getColorStyles();
  const displayNumber = plateNumber || 'ABC 1234';

  return (
    <div className="flex items-center justify-center py-8">
      <div className={`${styles.bg} ${styles.border} border-4 rounded-lg px-8 py-6 shadow-lg`}>
        <div className={`${styles.text} tracking-[0.5em] text-center`} style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
          {displayNumber}
        </div>
      </div>
    </div>
  );
}
