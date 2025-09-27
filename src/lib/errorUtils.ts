interface ParsedError {
  title: string;
  message: string;
  actionable?: string;
  severity: 'error' | 'warning' | 'info';
}

export function parseWeb3Error(error: Error | unknown): ParsedError {
  const errorMessage = (error as Error)?.message || String(error) || 'Unknown error';

  // User rejected transaction
  if (errorMessage.includes('User rejected') || errorMessage.includes('user rejected')) {
    return {
      title: 'Transaction Cancelled',
      message: 'You cancelled the transaction in your wallet.',
      actionable: 'Try again when you\'re ready to proceed.',
      severity: 'info'
    };
  }

  // Insufficient funds
  if (errorMessage.includes('insufficient funds') || errorMessage.includes('InsufficientFunds')) {
    return {
      title: 'Insufficient Funds',
      message: 'You don\'t have enough ETH to complete this transaction.',
      actionable: 'Add more ETH to your wallet and try again.',
      severity: 'error'
    };
  }

  // Gas estimation failed
  if (errorMessage.includes('gas') && errorMessage.includes('estimation failed')) {
    return {
      title: 'Transaction Failed',
      message: 'Unable to estimate gas for this transaction.',
      actionable: 'The contract may not be accepting claims right now.',
      severity: 'error'
    };
  }

  // Network/RPC errors
  if (errorMessage.includes('network') || errorMessage.includes('RPC')) {
    return {
      title: 'Network Error',
      message: 'There was a problem connecting to the blockchain.',
      actionable: 'Check your internet connection and try again.',
      severity: 'warning'
    };
  }

  // Contract reverted
  if (errorMessage.includes('reverted') || errorMessage.includes('execution reverted')) {
    return {
      title: 'Transaction Rejected',
      message: 'The smart contract rejected this transaction.',
      actionable: 'You may not be eligible to claim this NFT.',
      severity: 'error'
    };
  }


  // Generic fallback
  return {
    title: 'Transaction Error',
    message: 'An unexpected error occurred during the transaction.',
    actionable: 'Please try again or contact support if the problem persists.',
    severity: 'error'
  };
}

export function getErrorSeverityColor(severity: ParsedError['severity']): string {
  switch (severity) {
    case 'error':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'warning':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'info':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}