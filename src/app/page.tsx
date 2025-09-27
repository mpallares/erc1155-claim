import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import NFTContent from '@/components/NFTContent';

export default async function Home() {
   const response = await fetch(
    'https://mint-api-production-7d50.up.railway.app/nfts',
    { cache: 'no-store' }
  );
  const nfts = await response.json();

  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <Navbar />
      <main className='py-20 px-4 max-w-[1280px] mx-auto'>
        <NFTContent nfts={nfts} />
      </main>
      <Footer />
    </div>
  );
}
