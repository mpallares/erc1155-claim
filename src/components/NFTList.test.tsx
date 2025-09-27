import { test, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NFTList } from './NFTList';
import type { NFT } from '@/types/nft';

vi.mock('./NFTCard', () => ({
  NFTCard: ({ nft }: { nft: NFT }) => <div data-testid={`nft-card-${nft.id}`}>{nft.metadata.name}</div>
}));

const mockNFTs: NFT[] = [
  {
    id: '1',
    chainId: 1,
    metadata: {
      name: 'Test NFT 1',
      description: 'First test NFT',
      image: 'ipfs://test1',
      attributes: []
    },
    tokenAddress: '0x123',
    tokenURI: 'ipfs://uri1',
    type: 'ERC1155'
  },
  {
    id: '2',
    chainId: 1,
    metadata: {
      name: 'Test NFT 2',
      description: 'Second test NFT',
      image: 'ipfs://test2',
      attributes: []
    },
    tokenAddress: '0x123',
    tokenURI: 'ipfs://uri2',
    type: 'ERC1155'
  }
];

test('renders NFT list with correct title', () => {
  render(<NFTList nfts={mockNFTs} />);

  expect(screen.getByText('More from this collection')).toBeInTheDocument();
});

test('renders all NFT cards', () => {
  render(<NFTList nfts={mockNFTs} />);

  expect(screen.getByTestId('nft-card-1')).toBeInTheDocument();
  expect(screen.getByTestId('nft-card-2')).toBeInTheDocument();
  expect(screen.getByText('Test NFT 1')).toBeInTheDocument();
  expect(screen.getByText('Test NFT 2')).toBeInTheDocument();
});

test('calls onNFTClick when NFT is clicked', () => {
  const mockOnClick = vi.fn();
  render(<NFTList nfts={mockNFTs} onNFTClick={mockOnClick} />);

  fireEvent.click(screen.getByTestId('nft-card-1'));

  expect(mockOnClick).toHaveBeenCalledWith(mockNFTs[0]);
});

test('renders empty list without errors', () => {
  render(<NFTList nfts={[]} />);

  expect(screen.getByText('More from this collection')).toBeInTheDocument();
  expect(screen.queryByTestId(/nft-card/)).not.toBeInTheDocument();
});