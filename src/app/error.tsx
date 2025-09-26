'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className='min-h-screen bg-white flex flex-col justify-center items-center px-4 gap-4'>
      <h2 className='text-2xl font-semibold text-gray-900'>
        Something went wrong!
      </h2>
      <p className='text-gray-600'>
        Failed to load NFT collection. Please try again.
      </p>
      <button
        onClick={reset}
        className='bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors cursor-pointer'
      >
        Try again
      </button>
    </div>
  );
}
