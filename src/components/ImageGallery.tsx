'use client';

import { Compass } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageGalleryProps {
  address: string;
}

export function ImageGallery({ address }: ImageGalleryProps) {
  const directions = ['north', 'east', 'south', 'west', 'nadir'] as const;
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set(directions));

  const getImageUrl = (direction: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://skraa.dronepoul.com/skraa/address/${encodedAddress}/direction/${direction}`;
  };

  const handleImageError = (direction: string) => {
    setFailedImages(prev => new Set(Array.from(prev).concat(direction)));
    setLoadingImages(prev => {
      const newSet = new Set(Array.from(prev));
      newSet.delete(direction);
      return newSet;
    });
  };

  const handleImageLoad = (direction: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(Array.from(prev));
      newSet.delete(direction);
      return newSet;
    });
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {address}
        </h2>
        <p className="text-gray-600">
          Viewing oblique images from all directions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directions.map((direction) => (
          <div
            key={direction}
            className="bg-white rounded-xl overflow-hidden shadow-lg 
                     transition-transform hover:scale-[1.02] duration-300"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-blue-500" />
                <h3 className="font-medium text-gray-800">
                  {direction.charAt(0).toUpperCase() + direction.slice(1)} View
                </h3>
              </div>
            </div>
            <div className="aspect-video bg-gray-100 relative">
              {!failedImages.has(direction) ? (
                <>
                  {loadingImages.has(direction) && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={getImageUrl(direction)}
                    alt={`${direction} view of ${address}`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      loadingImages.has(direction) ? 'opacity-0' : 'opacity-100'
                    }`}
                    onError={() => handleImageError(direction)}
                    onLoad={() => handleImageLoad(direction)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={direction === 'north'}
                    unoptimized
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 p-4 text-center">
                  <p>No image available for this direction</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}