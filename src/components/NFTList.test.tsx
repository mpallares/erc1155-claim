import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NFTList } from './NFTList';
import type { NFT } from '@/types/nft';

const mockNFT: NFT = {
  id: '1',
  chainId: 1,
  metadata: {
    name: 'Test NFT',
    description: 'Test',
    image: '/test.jpg',
    attributes: []
  },
  tokenAddress: '0x123',
  tokenURI: 'test',
  type: 'ERC1155'
};


test('NFTList renders ItemGrid component and Card component', () => {
  render(<NFTList nfts={[mockNFT]} />);

  expect(screen.getByText('More from this collection')).toBeInTheDocument();

  expect(screen.getByText('Test NFT')).toBeInTheDocument();
});