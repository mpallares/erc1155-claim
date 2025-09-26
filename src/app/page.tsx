import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default async function Home() {

  const response = await fetch('https://mint-api-production-7d50.up.railway.app/nfts', { next: { revalidate: 60 } });
  const nfts = await response.json();

  return (
    <div className='font-sans min-h-screen bg-white'>
      <Navbar />
      <Footer />
    </div>
  );
}
