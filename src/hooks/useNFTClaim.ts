import { useWriteContract } from 'wagmi';
import { ERC1155_ABI } from '@/abis/erc1155';
import { parseWeb3Error } from '@/lib/utils/errorUtils';

interface AllowlistProof {
  proof: `0x${string}`[];
  quantityLimitPerWallet: bigint;
  pricePerToken: bigint;
  currency: `0x${string}`;
}

interface ClaimParams {
  contractAddress: `0x${string}`;
  tokenId: bigint;
  receiver: `0x${string}`;
  quantity: bigint;
  currency: `0x${string}`;
  pricePerToken?: bigint;
  allowlistProof?: AllowlistProof;
  data?: `0x${string}`;
}

export function useNFTClaim() {
  const {
    writeContract,
    data: hash,
    error: transactionError,
    isPending: isConfirming,
    isSuccess: isConfirmed,
    reset,
  } = useWriteContract();

  const claimNFT = ({
    contractAddress,
    tokenId,
    receiver,
    quantity,
    currency,
    pricePerToken = BigInt(0),
  }: ClaimParams) => {
    writeContract({
      address: contractAddress,
      abi: ERC1155_ABI,
      functionName: 'claim',
      args: [
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        {
          proof: [],
          quantityLimitPerWallet: BigInt(0),
          pricePerToken: BigInt(0),
          currency: '0x0000000000000000000000000000000000000000',
        },
        '0x',
      ],
      value: pricePerToken * quantity,
    });
  };

  const parsedError = transactionError
    ? parseWeb3Error(transactionError)
    : null;

  return {
    claimNFT,
    hash,
    transactionError,
    parsedError,
    isConfirming,
    isConfirmed,
    reset,
  };
}
