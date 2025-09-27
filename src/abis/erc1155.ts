export const ERC1155_ABI = [
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: '_receiver', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
      { name: '_quantity', type: 'uint256' },
      { name: '_currency', type: 'address' },
      { name: '_pricePerToken', type: 'uint256' },
      {
        name: '_allowlistProof',
        type: 'tuple',
        components: [
          { name: 'proof', type: 'bytes32[]' },
          { name: 'quantityLimitPerWallet', type: 'uint256' },
          { name: 'pricePerToken', type: 'uint256' },
          { name: 'currency', type: 'address' }
        ]
      },
      { name: '_data', type: 'bytes' }
    ],
    outputs: []
  },
  {
    name: 'getActiveClaimConditionId',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'getClaimConditionById',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: '_tokenId', type: 'uint256' },
      { name: '_conditionId', type: 'uint256' }
    ],
    outputs: [
      {
        name: 'condition',
        type: 'tuple',
        components: [
          { name: 'startTimestamp', type: 'uint256' },
          { name: 'maxClaimableSupply', type: 'uint256' },
          { name: 'supplyClaimed', type: 'uint256' },
          { name: 'quantityLimitPerWallet', type: 'uint256' },
          { name: 'merkleRoot', type: 'bytes32' },
          { name: 'pricePerToken', type: 'uint256' },
          { name: 'currency', type: 'address' },
          { name: 'metadata', type: 'string' }
        ]
      }
    ]
  }
] as const;