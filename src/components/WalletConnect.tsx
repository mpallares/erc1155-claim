'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function WalletConnect() {
  const { address, isConnected, connector, chain } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
    chainId: baseSepolia.id,
  });

  const formatBalance = (balance: { formatted: string } | undefined) => {
    if (!balance) return '0.00';
    const num = parseFloat(balance.formatted);
    return num.toFixed(4);
  };

  if (isConnected && address) {
    return (
      <div className='flex flex-col gap-4 min-w-[280px]'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-light pb-3'>
          <div className='flex items-center gap-2'>
           
          </div>
          <div className={`text-xs px-2 py-1 rounded-full 'text-gray-500 bg-gray-100'
          }`}>
            {chain?.name || 'Unknown Network'}
          </div>
        </div>

        {/* Wallet Info */}
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-gray-600'>Address</span>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-mono text-gray-900'>
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-gray-600'>Balance</span>
            <div className='text-right'>
              {balanceLoading ? (
                <div className='animate-pulse bg-gray-200 h-4 w-20 rounded'></div>
              ) : (
                <div className='flex flex-col items-end'>
                  <span className='text-sm font-semibold text-gray-900'>
                    {formatBalance(balance)} {balance?.symbol || 'ETH'}
                  </span>
                  <span className='text-xs text-gray-500'>
                    Base Sepolia Testnet
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-gray-600'>Wallet</span>
            <span className='text-sm text-gray-900'>
              {connector?.name || 'Unknown'}
            </span>
          </div>
        </div>

        <div className='border-t border-gray-light pt-3'>
          <button
            onClick={() => disconnect()}
            className='w-full bg-red-50 text-red-700 border border-red-200 px-4 py-2 hover:bg-red-100 transition-colors font-medium text-sm'
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 min-w-[280px]'>
      <div className='text-center'>
        <h3 className='text-lg font-semibold text-gray-900'>Connect Wallet</h3>
      </div>

      {/* Wallet Options */}
      <div className='flex flex-col gap-2'>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className='flex items-center justify-between w-full bg-white border border-gray-light px-4 py-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group'
          >
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-br rounded-full from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm'>
                {connector.name.charAt(0)}
              </div>
              <div className='text-left'>
                <div className='font-medium text-gray-900'>
                  {connector.name}
                </div>
              </div>
            </div>
            {isPending ? (
              <div className='w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
            ) : (
              <div className='text-gray-400 group-hover:text-gray-600 transition-colors'>
                ➔
              </div>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className='mt-2 p-3 bg-red-50 border border-red-200'>
          <div className='flex items-center gap-2'>
            <span className='text-red-600 text-sm'>⚠️</span>
            <span className='text-red-700 text-sm font-medium'>
              Connection Error
            </span>
          </div>
          <p className='text-red-600 text-xs mt-1'>{error.message}</p>
        </div>
      )}
    </div>
  );
}
