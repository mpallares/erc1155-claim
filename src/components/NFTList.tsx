import { NFT } from '@/types/nft';
import { NFTCard } from './NFTCard';

interface NFTlistProps {
  nfts: NFT[];
  onNFTClick?: (nft: NFT) => void;
}

export function NFTList({ nfts, onNFTClick }: NFTlistProps) {
  return (
    <div className="w-full">
      <section className='w-full flex flex-col gap-4'>
        <h2 className='text-lg font-semibold text-dark leading-7'>
          More from this collection
        </h2>
        <div className='grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {nfts.map((nft) => (
            <div
              key={nft.id}
              onClick={() => onNFTClick?.(nft)}
              className="cursor-pointer hover:opacity-95 transition-opacity"
            >
              <NFTCard nft={nft} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
