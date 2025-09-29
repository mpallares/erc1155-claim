# ERC1155 NFT Claim Application

A Web3 application for claiming ERC1155 NFTs built with Next.js 15, React 19, and wagmi v2. Users can connect their wallets, view NFT collections, and claim tokens directly from smart contracts.

🌐 **Live Demo**: [https://erc1155-claim.vercel.app/](https://erc1155-claim.vercel.app/)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- MetaMask or compatible Web3 wallet

### Installation
```bash
# Clone the repository
git clone git@github.com:mpallares/erc1155-claim.git
cd erc1155-claim

# Install dependencies
npm install

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run test suite
npm run lint         # Run ESLint
```

## 🏗️ Project Architecture

### Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **React**: React 19
- **Web3 Integration**: wagmi v2 + viem
- **State Management**: TanStack React Query (server state) + React local state
- **Styling**: Tailwind CSS v4
- **TypeScript**: Full type safety
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel

### Folder Structure

```
src/
├── app/                # Next.js App Router
│   ├── api/nfts/       # API route for NFT data
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout (Server Component)
│   └── page.tsx        # Home page (Server Component)
├── components/         # React components
│   ├── ui/             # Reusable UI components
│   └── icons/          # SVG icon components
├── hooks/              # Custom React hooks
├── lib/                # Core configurations
├── types/              # TypeScript definitions
└── abis/               # Smart contract ABIs
```

## 🔄 Data Flow Architecture

```
┌─────────────────┐                    ┌─────────────────┐
│   External API  │                    │ Smart Contract  │
│                 │                    │  (ERC1155)      │
│ • NFT metadata  │                    │ • Live prices   │
│ • Contract addr │                    │ • Claim rules   │
└─────────────────┘                    └─────────────────┘
         │                                       │
         │ 1. Server Fetch                       │ 3. Client Reads
         │ (Build/Request time)                  │ (Real-time)
         ▼                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER SIDE                               │
│                                                                 │
│  ┌─────────────────┐                                            │
│  │   app/page.tsx  │                                            │
│  │                 │                                            │
│  │  const nfts =   │    🚫 NOT CACHED                           │
│  │  await fetch()  │    • Fresh on every request                │
│  │                 │    • { cache: 'no-store' }                 │
│  └─────────────────┘                                            │
│           │                                                     │
│           │ 2. Pass initial data as props                       │
│           ▼                                                     │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CLIENT SIDE                               │
│                                                                 │
│  ┌─────────────────┐          ┌─────────────────┐              │
│  │   NFTContent    │          │  React Query    │              │
│  │                 │          │     Cache       │              │
│  │ • Initial data  │ ────────▶│                 │              │
│  │   from server   │          │ ✅ CACHED       │              │
│  │                 │          │ • 5min fresh    │              │
│  │                 │ ◄────────│ • 30min stored  │              │
│  │                 │          │ • Auto-refetch  │              │
│  └─────────────────┘          └─────────────────┘              │
│           │                            │                       │
│           │                            │ 4. Background Refetch │
│           │                            │ (when stale)          │
│           │                            ▼                       │
│           │                   ┌─────────────────┐              │
│           │                   │   /api/nfts     │              │
│           │                   │                 │              │
│           │                   │ • Client fetch  │              │
│           │ ◄─────────────────│ • Same endpoint │              │
│           │ 5. Updated data   │ • Updates cache │              │
│           │                   └─────────────────┘              │
│           │                                                    │
│           ▼                                                    │
│  ┌─────────────────┐                                           │
│  │   UI Components │                                           │
│  │                 │                                           │
│  │ • NFTDetails    │                                           │ 
│  │ • NFTList       │                                           │
│  │ • Display data  │                                           │
│  │                 │                                           │
└────────────────────────────────────────────────────────────────┘
```

### 🎯 Key Benefits:

- **Fast Initial Load**: Server data shows immediately
- **Always Fresh**: Background updates keep data current
- **Offline Resilient**: Cached data works without network
- **Smart Caching**: Only refetch when actually stale
- **Smooth UX**: Updates happen in background


## 🔗 Smart Contract Integration

### Contract Details
- **Standard**: ERC1155
- **Network**: Base Sepolia Testnet
- **Functions Used**:
  - `claim()` - Mint NFTs to user wallet
  - `getActiveClaimConditionId()` - Get current claim phase
  - `getClaimConditionById()` - Get pricing and claim rules


### Contract Data Source
The NFT metadata and contract addresses are fetched from an external API:
- **API Endpoint**: `https://mint-api-production-7d50.up.railway.app/nfts`
- **Data Structure**: Contains contract addresses, token IDs, metadata, and IPFS image URLs


## 🚀 Performance Optimizations

### Bundling & Routing
- **Next.js App Router**: Automatic code splitting and route-based bundling

### Data Fetching
- **Server Components**: Initial NFT data fetched on the server for faster first load and SEO improvement
- **No Cache Strategy**: Fresh data on every request with `{ cache: 'no-store' }`

### Image Optimization
- **Next.js Image Component**: Automatic image optimization and lazy loading
- **IPFS Gateway**: Efficient IPFS content delivery

### Caching Strategy
- **React Query**: 5-minute stale time, 30-minute garbage collection
- **Smart Contract Calls**: Automatic caching for contract reads

## ⚠️ Current Limitations

### **Scalability Constraints**
- **No pagination**: All NFTs loaded at once (performance issue with 100+ NFTs)
- **External API dependency**: Single point of failure
- **No search/filtering**: Users must scroll through all NFTs
- **Memory usage**: Large collections consume significant browser memory

### **User Experience Gaps**
- **No loading states**: Not enough loading states, could be an issue with more NFTs
- **Basic mobile experience**: Although it has been implemented and the design doesn't break, could be improved

### **Technical Limitations**
- **Single network**: Only supports Base Sepolia testnet
- **Browser wallets only**: No mobile wallet connect support (WalletConnect)
- **No gas estimation**: Users don't see transaction costs upfront
- **Image fallbacks**: No handling for broken IPFS images
- **Local state only**: Currently using only local component state and React Query cache; as the app scales with features we'll need to consider global state management solutions like Zustand and React Context to avoid prop drilling and maintain state consistency across components.


## 🔮 Future Improvements

### **Quick Wins**
- Add loading skeletons
- Improve mobile design
- Add transaction cost estimation before claiming
- Create fallback images for broken IPFS links

### **Longer Term**
- Add pagination for large NFT collections
- Implement search and filtering capabilities
- Add WalletConnect for mobile wallet support
