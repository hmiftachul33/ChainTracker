import { ethers } from 'ethers';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

const AAVE_LENDING_POOL_ABI = [
  'function getUserAccountData(address user) view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)',
];

const COMPOUND_CTOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function exchangeRateStored() view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
  valueUSD: number;
}

export interface PortfolioData {
  totalBalance: number;
  tokens: TokenBalance[];
  protocols: {
    aave?: {
      totalDeposited: number;
      totalBorrowed: number;
      healthFactor: number;
    };
    compound?: {
      totalSupplied: number;
    };
  };
}

// Contract addresses (mainnet)
const AAVE_LENDING_POOL = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

export async function getPortfolioData(address: string): Promise<PortfolioData> {
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://eth.llamarpc.com'
  );

  const portfolioData: PortfolioData = {
    totalBalance: 0,
    tokens: [],
    protocols: {},
  };

  try {
    // Get ETH balance
    const ethBalance = await provider.getBalance(address);
    const ethBalanceFormatted = ethers.formatEther(ethBalance);

    // Mock ETH price (in production, fetch from a price oracle)
    const ethPrice = 2000;

    portfolioData.tokens.push({
      symbol: 'ETH',
      balance: ethBalanceFormatted,
      decimals: 18,
      valueUSD: parseFloat(ethBalanceFormatted) * ethPrice,
    });

    // Get USDC balance
    const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);
    const usdcBalance = await usdcContract.balanceOf(address);
    const usdcDecimals = await usdcContract.decimals();
    const usdcBalanceFormatted = ethers.formatUnits(usdcBalance, usdcDecimals);

    portfolioData.tokens.push({
      symbol: 'USDC',
      balance: usdcBalanceFormatted,
      decimals: Number(usdcDecimals),
      valueUSD: parseFloat(usdcBalanceFormatted),
    });

    // Get USDT balance
    const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, provider);
    const usdtBalance = await usdtContract.balanceOf(address);
    const usdtDecimals = await usdtContract.decimals();
    const usdtBalanceFormatted = ethers.formatUnits(usdtBalance, usdtDecimals);

    portfolioData.tokens.push({
      symbol: 'USDT',
      balance: usdtBalanceFormatted,
      decimals: Number(usdtDecimals),
      valueUSD: parseFloat(usdtBalanceFormatted),
    });

    // Get DAI balance
    const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, provider);
    const daiBalance = await daiContract.balanceOf(address);
    const daiDecimals = await daiContract.decimals();
    const daiBalanceFormatted = ethers.formatUnits(daiBalance, daiDecimals);

    portfolioData.tokens.push({
      symbol: 'DAI',
      balance: daiBalanceFormatted,
      decimals: Number(daiDecimals),
      valueUSD: parseFloat(daiBalanceFormatted),
    });

    // Get Aave data
    try {
      const aaveLendingPool = new ethers.Contract(
        AAVE_LENDING_POOL,
        AAVE_LENDING_POOL_ABI,
        provider
      );
      const aaveData = await aaveLendingPool.getUserAccountData(address);

      portfolioData.protocols.aave = {
        totalDeposited: parseFloat(ethers.formatEther(aaveData[0])) * ethPrice,
        totalBorrowed: parseFloat(ethers.formatEther(aaveData[1])) * ethPrice,
        healthFactor: parseFloat(ethers.formatEther(aaveData[5])),
      };
    } catch (error) {
      console.error('Error fetching Aave data:', error);
    }

    // Calculate total balance
    portfolioData.totalBalance = portfolioData.tokens.reduce(
      (sum, token) => sum + token.valueUSD,
      0
    );

    if (portfolioData.protocols.aave) {
      portfolioData.totalBalance += portfolioData.protocols.aave.totalDeposited;
    }

    return portfolioData;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}
