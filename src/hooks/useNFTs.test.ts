import { test, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useNFTs } from './useNFTs';
import type { NFT } from '@/types/nft';

global.fetch = vi.fn();

const mockNFT: NFT = {
  id: '1',
  chainId: 1,
  metadata: {
    name: 'Test NFT',
    description: 'Test description',
    image: 'test.jpg',
    attributes: []
  },
  tokenAddress: '0x123',
  tokenURI: 'test-uri',
  type: 'ERC1155'
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
  createElement(QueryClientProvider, {
    client: new QueryClient({ defaultOptions: { queries: { retry: false } } })
  }, children);

test('fetches NFTs successfully', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => [mockNFT],
  } as Response);

  const { result } = renderHook(() => useNFTs(), { wrapper });

  await waitFor(() => {
    expect(result.current.data).toEqual([mockNFT]);
  });
});

test('uses initial data', () => {
  const { result } = renderHook(() => useNFTs([mockNFT]), { wrapper });
  expect(result.current.data).toEqual([mockNFT]);
});

test('handles fetch error', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: false,
    status: 500,
  } as Response);

  const { result } = renderHook(() => useNFTs(), { wrapper });

  await waitFor(() => {
    expect(result.current.error).toBeTruthy();
  });
});