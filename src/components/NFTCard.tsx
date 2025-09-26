
import { NFT } from '@/types/nft';
import Image from 'next/image';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {

  return (
    <div className='w-[280px] bg-white flex flex-col gap-2'>
      <div className='aspect-square relative'>
        <Image
          src={nft.metadata.image}
          alt={nft.metadata.name}
          fill
          className='object-cover'
        />
      </div>
      <div>
        <h3 className='font-semibold text-dark text-md leading-6'>
          {nft.metadata.name}
        </h3>
        <p className='text-gray-500 text-sm leading-5 font-normal'>0.0 ETH</p>
      </div>
    </div>
  );
}
