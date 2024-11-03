import SearchBar from '@/components/SearchBar';
import { Camera, Compass } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
          
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex justify-center mb-6">
                <Camera className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Explore Denmark from Every Angle
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                Enter any Danish address to view stunning oblique aerial photographs 
                captured from all four cardinal directions.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {['North', 'East', 'South', 'West'].map((direction) => (
                  <div key={direction} className="bg-slate-50 p-4 rounded-lg">
                    <Compass className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">{direction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}