'use client';

import { useState } from 'react';
import { NFTDetails } from '@/components/NFTDetails';
import { NFTList } from '@/components/NFTList';
import { NFT } from '@/types/nft';

interface NFTContentProps {
  nfts: NFT[];
}

export default function NFTContent({ nfts }: NFTContentProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT>(nfts[0]);

  const remainingNFTs = nfts.filter(nft => nft.id !== selectedNFT?.id);

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  return (
    <>
      {selectedNFT && <NFTDetails nft={selectedNFT} />}
      <NFTList
        nfts={remainingNFTs}
        onNFTClick={handleNFTSelect}
      />
    </>
  );
}
