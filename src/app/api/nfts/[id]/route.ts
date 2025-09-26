import { NextResponse } from 'next/server';
import type { NFT } from '@/types/nft';

const API_BASE_URL = 'https://mint-api-production-7d50.up.railway.app';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(`${API_BASE_URL}/nfts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch NFT', status: response.status },
        { status: response.status }
      );
    }

    const nft: NFT = await response.json();
    return NextResponse.json(nft);
  } catch (error) {
    console.error('Error fetching NFT:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}