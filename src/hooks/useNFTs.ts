import { useQuery } from '@tanstack/react-query';
import type { NFT } from '@/types/nft';

async function fetchNFTs(): Promise<NFT[]> {
  const response = await fetch('/api/nfts');
  if (!response.ok) {
    throw new Error('Failed to fetch NFTs');
  }
  return response.json();
}

export function useNFTs(initialData?: NFT[]) {
  return useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
    initialData,
    staleTime: 5 * 60 * 1000,          // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000,            // Keep in cache for 30 minutes
    refetchOnWindowFocus: true,        // Refetch when user returns to tab
    refetchOnReconnect: true,          // Refetch when network reconnects
  });
}