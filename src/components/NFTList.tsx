import { NFT } from '@/types/nft';
import { NFTCard } from './NFTCard';

interface NFTlistProps {
  nfts: NFT[];
}

export function NFTList({ nfts }: NFTlistProps) {
  return (
    <section className='w-full py-8 flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-dark leading-7'>
        More from this collection
      </h2>
      <div className='grid grid-cols-4 gap-6'>
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
    </section>
  );
}
