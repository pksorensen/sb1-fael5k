export default function AddressSkeleton() {
  const directions = ['north', 'east', 'south', 'west', 'nadir'];

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
        <div className="h-7 bg-gray-200 rounded-md w-2/3 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded-md w-1/2 mt-2 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directions.map((direction) => (
          <div
            key={direction}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-200 rounded-full animate-pulse" />
                <div className="h-5 bg-gray-200 rounded-md w-24 animate-pulse" />
              </div>
            </div>
            <div className="aspect-video bg-gray-100 animate-pulse relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}