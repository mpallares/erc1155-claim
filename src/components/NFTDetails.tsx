import Image from 'next/image';
import { NFT } from '@/types/nft';
import Link from 'next/link';
import {
  KilnLogo,
  TwitterLogo,
  InstagramLogo,
  ShareIcon,
  HeartIcon,
  TickIcon,
} from './icons';

interface NFTDetailsProps {
  nft: NFT;
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  return (
    <div className='w-full max-w-[1440px] mx-auto px-4 py-12'>
      <div className='grid grid-cols-2 gap-16'>
        {/* Left side - NFT Image */}
        <div className='flex flex-col gap-6'>
          <div className='aspect-square relative overflow-hidden'>
            <Image
              src={nft.metadata.image}
              alt={nft.metadata.name}
              fill
              className='w-[608px] h-[608px] object-cover'
            />
          </div>

          {/* Creator Info Section */}
          <div className='border border-gray-light p-6 flex flex-col gap-6'>
            <div className='flex gap-4'>
              <div className='w-[56px] h-[56px] relative rounded-full border-2 border-gray-light flex items-center justify-center bg-white'>
                <div className='overflow-auto rounded-full'>
                  <KilnLogo width={54} height={38} />
                </div>

                <div className='absolute bottom-[-5px] right-[-5px]'>
                  <TickIcon />
                </div>
              </div>

              <div className='flex flex-col self-center'>
                <h3 className='font-semibold text-md leading-6 text-dark'>
                  KILN
                </h3>
                <p className='text-gray-500 text-sm font-normal leading-5'>
                  @kiln
                </p>
              </div>
            </div>

            <p className='text-gray-500 leading-5 font-normal text-sm'>
              Hundreds of companies use Kiln to earn rewards on their digital
              assets, or to whitelabel earning functionality into their
              products.
            </p>
            <div className='flex items-center gap-4'>
              <Link
                href='https://x.com/Kiln_finance'
                className='flex items-center gap-2 text-dark font-medium cursor-pointer transition-colors leading-6 text-md'
              >
                <TwitterLogo width={16} height={16} />
                <span>@Kiln</span>
              </Link>
              <Link
                href='#'
                className='flex items-center gap-2 text-dark font-medium cursor-pointer transition-colors leading-6 text-md'
              >
                <InstagramLogo width={16} height={16} />
                <span>@Kiln</span>
              </Link>
            </div>
            <div></div>
            <Link
              href='https://www.kiln.fi/'
              className='w-full bg-black text-white text-center py-3 px-6 font-medium hover:bg-gray-800 transition-colors'
            >
              Website
            </Link>
          </div>
        </div>

        {/* Right side - NFT Details */}
        <div className='relative h-full'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <h1 className='font-semibold leading-8 text-2xl text-dark'>
                {nft.metadata.name}
              </h1>

              <p className='text-gray-500 text-sm'>You own 0</p>
            </div>

            <div className='flex gap-3'>
              <button className='w-8 h-8 flex items-center justify-center border border-gray-light shadow-button text-black hover:text-gray-700 transition-colors'>
                <ShareIcon width={16} height={16}  />
              </button>
              <button className='w-8 h-8 flex items-center justify-center border border-gray-light shadow-button text-black hover:text-gray-700 transition-colors'>
                <HeartIcon width={16} height={16} />
              </button>
            </div>
          </div>

          <p className='text-gray-600 text-base leading-6 absolute top-[76px]'>
            {nft.metadata.description}
          </p>

          {/* Attributes */}
          {nft.metadata.attributes && nft.metadata.attributes.length > 0 && (
            <div className='absolute top-[148px]'>
              <div className='grid grid-cols-2 gap-3'>
                {nft.metadata.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className='border border-gray-light p-[17px]'
                  >
                    <p className='text-gray-500 text-xs uppercase leading-[20px] font-normal'>
                      {attr.trait_type}
                    </p>
                    <p className='text-dark text-md font-normal leading-[21px]'>
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <span className='border border-gray-light absolute top-[249px] w-full'></span>

          {/* Price Section */}
          <div className='absolute top-[274px] pt-0.5 flex flex-col gap-2'>
            <span className='bg-secondary text-gray- text-xs px-2 py-1 w-fit'>
              Free Mint
            </span>
            <div className='text-2xl leading-6 font-semibold text-dark'>
              ≈ 0 ETH
            </div>
          </div>

          {/* Claim Button */}
          <button className='w-full bg-secondary text-gray-50 absolute top-[362px] shadow-button py-4 px-6 font-medium text-md hover:bg-secondary/90 cursor-pointer transition-colors'>
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
}
