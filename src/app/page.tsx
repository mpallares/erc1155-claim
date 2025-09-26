import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { NFTCarousel } from '@/components/NFTCarousel';

export default async function Home() {

  const response = await fetch('https://mint-api-production-7d50.up.railway.app/nfts', { next: { revalidate: 60 } });
  const nfts = await response.json();

  return (
    <div className='font-sans min-h-screen bg-white flex flex-col justify-between'>
      <Navbar />
      <main className='py-20 px-4 max-w-[1440px] mx-auto'>
        <NFTCarousel nfts={nfts} />
      </main>
      <Footer />
    </div>
  );
}
