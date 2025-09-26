'use client';

import { useState } from 'react';
import { NFTDetails } from '@/components/NFTDetails';
import { NFTList } from '@/components/NFTList';
import { NFT } from '@/types/nft';
import { useNFTs } from '@/hooks/useNFTs';

interface NFTContentProps {
  nfts: NFT[];
}

export default function NFTContent({ nfts: initialNfts }: NFTContentProps) {
  const { data: nfts = [], isError } = useNFTs(initialNfts);
  const [selectedNFTId, setSelectedNFTId] = useState<string | null>(null);

  const selectedNFT = selectedNFTId
    ? nfts.find((nft) => nft.id === selectedNFTId) || nfts[0]
    : nfts[0];

  const remainingNFTs = nfts.filter((nft) => nft.id !== selectedNFT?.id);

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFTId(nft.id);
  };
  if (isError) {
    return <div className='text-red-800 p-4'>Failed to load NFTs</div>;
  }

  return (
    <>
      {selectedNFT && <NFTDetails nft={selectedNFT} />}
      <NFTList nfts={remainingNFTs} onNFTClick={handleNFTSelect} />
    </>
  );
}
