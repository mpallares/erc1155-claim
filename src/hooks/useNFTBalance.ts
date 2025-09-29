import { useReadContract } from 'wagmi';
import { useEffect } from 'react';
import { ERC1155_ABI } from '@/abis/erc1155';

export function useNFTBalance(
  contractAddress: `0x${string}` | undefined,
  tokenId: string,
  userAddress: `0x${string}` | undefined,
  refetchTrigger?: boolean
) {
  const { data: balance, isLoading, refetch } = useReadContract({
    address: contractAddress,
    abi: ERC1155_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress, BigInt(tokenId)] : undefined,
    query: {
      enabled: !!(contractAddress && userAddress && tokenId),
    },
  });

  useEffect(() => {
    if (refetchTrigger) {
      refetch();
    }
  }, [refetchTrigger, refetch]);

  return {
    balance: balance ? Number(balance) : 0,
    isLoading,
    refetch,
  };
}