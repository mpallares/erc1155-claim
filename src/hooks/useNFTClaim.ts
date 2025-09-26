import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ERC1155_ABI } from '@/abis/erc1155';

export function useNFTClaim() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const claimNFT = async (address: `0x${string}`, tokenId: string) => {
    try {
      await writeContract({
        address: address,
        abi: ERC1155_ABI,
        functionName: 'claim',
        args: [BigInt(tokenId)],
      });
    } catch (err) {
      console.error('Error claiming NFT:', err);
      throw err;
    }
  };

  return {
    claimNFT,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  };
}
