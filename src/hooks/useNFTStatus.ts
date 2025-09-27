import { useReadContract } from 'wagmi';
import { ERC1155_ABI } from '@/abis/erc1155';

export function useNFTStatus(
  contractAddress: `0x${string}`,
  tokenId: string,
) {


  // Get active claim condition ID first
  const { data: activeConditionId } = useReadContract({
    address: contractAddress,
    abi: ERC1155_ABI,
    functionName: 'getActiveClaimConditionId',
    args: [BigInt(tokenId)],
  });

  // Get claim conditions using the active condition ID
  const { data: claimConditions } = useReadContract({
    address: contractAddress,
    abi: ERC1155_ABI,
    functionName: 'getClaimConditionById',
    args: activeConditionId !== undefined ? [BigInt(tokenId), activeConditionId] : undefined,
    query: {
      enabled: activeConditionId !== undefined,
    },
  });


  // Extract price from claim conditions
  const price = claimConditions ? claimConditions.pricePerToken : BigInt(0);
  const currency = claimConditions ? claimConditions.currency : '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';



  return {
    price: price,
    currency: currency,
    claimConditions,
  };
}
