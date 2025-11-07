import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/defiService';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  try {
    const portfolioData = await getPortfolioData(address);
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error in portfolio API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
