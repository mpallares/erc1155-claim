
'use client';

import { useState } from "react";
import { KilnLogo } from "@/components/icons";
import { WalletConnect } from "@/components/WalletConnect";
import { useAccount } from "wagmi";

export function Navbar() {
  const [showWallet, setShowWallet] = useState(false);
  const { isConnected } = useAccount();

  return (
    <nav className="flex justify-between items-center w-full px-6 py-5 bg-white relative">
      <div className="flex items-center">
        <KilnLogo />
      </div>
      <div className="relative">
        <button
          onClick={() => setShowWallet(!showWallet)}
          className="bg-dark-gray text-gray-50 px-4 py-2 hover:bg-secondary/85 transition-colors font-medium text-md leading-5 tracking-normal cursor-pointer shadow-button"
        >
          {isConnected ? 'Wallet' : 'Connect Wallet'}
        </button>

        <div className={`absolute top-full right-0 mt-2 bg-white border border-gray-light shadow-lg p-4 min-w-[200px] z-50 transition-all duration-200 ease-out ${
          showWallet
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-[-8px] pointer-events-none'
        }`}>
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}