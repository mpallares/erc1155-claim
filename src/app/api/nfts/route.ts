import { NextResponse } from 'next/server';
import type { NFT } from '@/types/nft';

const API_BASE_URL = 'https://mint-api-production-7d50.up.railway.app';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/nfts`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch NFTs', status: response.status },
        { status: response.status }
      );
    }

    const nfts: NFT[] = await response.json();
    return NextResponse.json(nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}