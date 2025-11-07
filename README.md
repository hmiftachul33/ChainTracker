# ChainTracker 🚀

A modern multi-chain portfolio tracker built with Next.js 16, featuring real-time wallet connectivity and blockchain data integration across multiple networks.

## Features

- **Wallet Connectivity**: Connect with multiple wallets using RainbowKit (MetaMask, WalletConnect, etc.)
- **Multi-Chain Support**: Track assets across Ethereum, Polygon, Arbitrum, and Base
- **Real-Time Portfolio Tracking**: View your token balances and USD values
- **DeFi Protocol Integration**: Monitor your positions on Aave and other DeFi protocols
- **Interactive Charts**: Visualize portfolio performance over time
- **Responsive Design**: Beautiful UI built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Blockchain**: ethers.js v6, wagmi v2, viem
- **Wallet**: RainbowKit for multi-wallet support
- **UI**: Tailwind CSS, Recharts for data visualization, Lucide React for icons
- **Data**: TanStack Query (React Query) for state management

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- WalletConnect Project ID (get one at [WalletConnect Cloud](https://cloud.walletconnect.com/))

### Installation

1. Clone the repository and navigate to the project:
```bash
cd chaintracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Edit `.env.local` and add your configuration:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_RPC_URL=https://eth.llamarpc.com
```

To get a WalletConnect Project ID:
- Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
- Sign up/Login
- Create a new project
- Copy your Project ID

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) with your browser

## Project Structure

```
chaintracker/
├── app/
│   ├── api/
│   │   └── portfolio/
│   │       └── route.ts       # API endpoint for portfolio data
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Main dashboard page
│   ├── providers.tsx          # Web3 providers configuration
│   └── globals.css            # Global styles
├── components/
│   ├── PortfolioCard.tsx      # Total portfolio value card
│   ├── TokenList.tsx          # Token holdings list
│   ├── ProtocolStats.tsx      # DeFi protocol statistics
│   ├── PortfolioChart.tsx     # Portfolio value chart
│   └── SkeletonLoader.tsx     # Loading state components
├── lib/
│   ├── wagmi.ts               # Wagmi configuration
│   └── defiService.ts         # Blockchain data fetching service
└── .env.local                 # Environment variables
```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button in the top right
2. **Select Wallet**: Choose your preferred wallet (MetaMask, WalletConnect, etc.)
3. **View Portfolio**: Once connected, your portfolio data will load automatically
4. **Explore Data**:
   - View total portfolio value in the top card
   - Check individual token balances in the Token Holdings section
   - Monitor DeFi protocol positions (Aave, Compound, etc.)
   - Track portfolio performance in the interactive chart

## Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Base

## Supported Protocols

- Aave (lending/borrowing positions)
- More protocols can be added in `lib/defiService.ts`

## Development

### Adding New Tokens

Edit `lib/defiService.ts` and add token addresses to track additional ERC-20 tokens:

```typescript
const NEW_TOKEN_ADDRESS = '0x...';
const tokenContract = new ethers.Contract(NEW_TOKEN_ADDRESS, ERC20_ABI, provider);
```

### Adding New Protocols

Implement new protocol integrations in `lib/defiService.ts` by:
1. Adding the protocol's ABI
2. Adding contract addresses
3. Implementing data fetching logic
4. Updating the `PortfolioData` interface

### Custom Styling

Modify `app/globals.css` or update Tailwind classes in components for custom styling.

## Building for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Troubleshooting

### "Cannot connect to wallet"
- Ensure you have a Web3 wallet installed
- Check that your wallet is unlocked
- Verify WalletConnect Project ID is set correctly

### "Failed to fetch portfolio data"
- Check your RPC URL in `.env.local`
- Ensure you have an active internet connection
- Verify the wallet address has some activity

### Port already in use
If port 3000 is occupied, Next.js will automatically use the next available port (e.g., 3001).

## Security Notes

- Never commit your `.env.local` file
- Keep your private keys secure
- This is a read-only portfolio tracker (no transaction signing)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
- [ethers.js Documentation](https://docs.ethers.org/v6/)
