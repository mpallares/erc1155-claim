import { NFT } from '@/types/nft';
import { Card } from './ui/Card';
import { ItemGrid } from './ui/ItemGrid';

interface NFTlistProps {
  nfts: NFT[];
  onNFTClick?: (nft: NFT) => void;
}

export function NFTList({ nfts, onNFTClick }: NFTlistProps) {
  return (
    <ItemGrid
      title="More from this collection"
      items={nfts}
      renderItem={(nft) => (
        <Card
          key={nft.id}
          image={nft.metadata.image}
          imageAlt={nft.metadata.name}
          title={nft.metadata.name}
          subtitle="0.0 ETH"
          onClick={() => onNFTClick?.(nft)}
          className="cursor-pointer hover:opacity-95 transition-opacity"
        />
      )}
    />
  );
}
