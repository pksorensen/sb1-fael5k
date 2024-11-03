import { ImageGallery } from '@/components/ImageGallery';
import SearchBar from '@/components/SearchBar';
import { Metadata } from 'next';
import { Suspense } from 'react';
import AddressImages from './AddressImages';
import AddressSkeleton from './AddressSkeleton';

interface AddressPageProps {
  params: {
    address: string;
  };
}

export async function generateMetadata({ params }: AddressPageProps): Promise<Metadata> {
  const decodedAddress = decodeURIComponent(params.address);
  
  return {
    title: `${decodedAddress} - DK Address Viewer`,
    description: `View oblique aerial photographs of ${decodedAddress} from all directions`,
  };
}

export default function AddressPage({ params }: AddressPageProps) {
  const decodedAddress = decodeURIComponent(params.address);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
          <Suspense fallback={<AddressSkeleton />}>
            <AddressImages address={decodedAddress} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}