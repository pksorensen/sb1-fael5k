import { ImageGallery } from '@/components/ImageGallery';

interface AddressImagesProps {
  address: string;
}

async function fetchNorthImage(address: string) {
  const encodedAddress = encodeURIComponent(address);
  const imageUrl = `https://skraa.dronepoul.com/skraa/address/${encodedAddress}/direction/north`;
  
  try {
    const response = await fetch(imageUrl, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error('Failed to fetch north image');
    return response;
  } catch (error) {
    console.error('Error prefetching north image:', error);
    return null;
  }
}

export default async function AddressImages({ address }: AddressImagesProps) {
  // Pre-fetch north image server-side
  await fetchNorthImage(address);
  
  return <ImageGallery address={address} />;
}