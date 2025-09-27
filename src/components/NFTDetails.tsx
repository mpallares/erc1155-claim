import Image from 'next/image';
import { NFT } from '@/types/nft';
import Link from 'next/link';
import React from 'react';
import { useAccount } from 'wagmi';
import { useNFTClaim } from '@/hooks/useNFTClaim';
import { useNFTStatus } from '@/hooks/useNFTStatus';
import { getErrorSeverityColor } from '@/lib/utils/errorUtils';
import { baseSepolia } from 'wagmi/chains';
import { formatEther } from 'viem';

import {
  KilnLogo,
  TwitterLogo,
  InstagramLogo,
  ShareIcon,
  HeartIcon,
  TickIcon,
  MenuIcon,
  ArrowRightUpIcon,
} from './icons';

interface NFTDetailsProps {
  nft: NFT;
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  const { address, isConnected, chain } = useAccount();
  const {
    claimNFT,
    hash,
    parsedError,
    isConfirming,
    isConfirmed,
    transactionError,
  } = useNFTClaim();
  const getClaimButtonText = () => {
    if (!isConnected) return 'Connect Wallet';
    if (isConnected && chain?.id !== baseSepolia.id)
      return 'Switch to Base Sepolia';
    if (isConfirming) return 'Claiming...';
    if (transactionError) return 'Transaction failed. Try Again';
    if (isConfirmed) return 'Claimed!';
    return 'Claim Now';
  };

  const handleClaim = () => {
    if (!address || !isConnected) return;

    claimNFT({
      contractAddress: nft.tokenAddress as `0x${string}`,
      tokenId: BigInt(nft.id),
      receiver: address,
      quantity: BigInt(1),
      currency,
      pricePerToken: price,
    });
  };

  // Get price info and claim conditions
  const { price, currency } = useNFTStatus(
    nft.tokenAddress as `0x${string}`,
    nft.id
  );

  return (
    <div className='w-full max-w-[1440px] mx-auto py-6 md:py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16'>
        {/* Left side - NFT Image */}
        <div className='flex flex-col gap-6'>
          <div className='aspect-square relative overflow-hidden'>
            <Image
              src={nft.metadata.image}
              alt={nft.metadata.name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 608px'
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
            <div className='flex gap-2'>
              <Link
                href='https://www.kiln.fi/'
                className='w-full bg-dark-gray text-white text-center py-3 px-6 h-9 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center'
              >
                Website
              </Link>
              <Link
                href='https://www.kiln.fi/'
                target='_blank'
                rel='noopener noreferrer'
                className='w-fit'
              >
                <div className='border border-gray-light h-9 w-9 shadow-button font-medium bg-white text-dark hover:bg-gray-900 transition-colors cursor-pointer flex items-center justify-center p-1'>
                  <ArrowRightUpIcon height={16} width={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - NFT Details */}
        <div className='flex flex-col gap-6 lg:relative lg:h-full'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <h1 className='font-semibold leading-8 text-2xl text-dark'>
                {nft.metadata.name}
              </h1>

              <p className='text-gray-500 text-sm'>You own 0</p>
            </div>

            <div className='flex gap-3'>
              <button className='w-8 h-8 flex items-center justify-center border border-gray-light shadow-button text-black hover:text-gray-700 transition-colors'>
                <ShareIcon width={16} height={16} />
              </button>
              <button className='w-8 h-8 flex items-center justify-center border border-gray-light shadow-button text-black hover:text-gray-700 transition-colors'>
                <HeartIcon width={16} height={16} />
              </button>
            </div>
          </div>

          <p className='text-gray-600 text-base leading-6 lg:absolute lg:top-[76px]'>
            {nft.metadata.description}
          </p>

          {/* Attributes */}
          {nft.metadata.attributes && nft.metadata.attributes.length > 0 && (
            <div className='lg:absolute lg:top-[148px]'>
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

          <span className='border border-gray-light lg:absolute lg:top-[249px] w-full'></span>

          {/* Price Section */}
          <div className='lg:absolute lg:top-[274px] pt-0.5 flex flex-col gap-2'>
            <span className='bg-secondary text-gray-50 text-xs px-2 py-1 w-fit'>
              {price && Number(price) > 0 ? 'Paid Mint' : 'Free Mint'}
            </span>
            <div className='text-2xl leading-6 font-semibold text-dark flex items-center gap-2'>
              <MenuIcon width={24} height={24} />
              <span>{price ? formatEther(price) : '0'}</span>
              <span>ETH</span>
            </div>
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            disabled={
              !isConnected ||
              isConfirming ||
              isConfirmed ||
              (isConnected && chain?.id !== baseSepolia.id)
            }
            className={`w-full lg:absolute lg:top-[362px] shadow-button py-4 px-6 font-medium text-md transition-colors ${
              isConfirmed
                ? 'bg-green-600 text-gray-50 cursor-default'
                : transactionError
                ? 'bg-red-600 text-white cursor-pointer hover:bg-red-700'
                : !isConnected ||
                  isConfirming ||
                  (isConnected && chain?.id !== baseSepolia.id)
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-dark-gray text-gray-50 hover:bg-dark-gray/90 cursor-pointer'
            }`}
          >
            {getClaimButtonText()}
          </button>

          {/* Transaction Hash */}
          {hash && (
            <div className='lg:absolute lg:top-[420px] text-gray-500'>
              <Link
                href={`https://sepolia.basescan.org/tx/${hash}`}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-blue-600 underline'
              >
                View transaction
              </Link>
            </div>
          )}

          {/* Error Messages */}
          {parsedError && (
            <div className='lg:absolute lg:top-[420px] w-full'>
              {parsedError && (
                <div
                  className={`p-3 rounded border text-sm mb-2 ${getErrorSeverityColor(
                    parsedError.severity
                  )}`}
                >
                  <div className='font-medium'>{parsedError.title}</div>
                  <div className='mt-1'>{parsedError.message}</div>
                  {parsedError.actionable && (
                    <div className='mt-2 text-xs opacity-80'>
                      {parsedError.actionable}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
