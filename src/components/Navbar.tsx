
'use client';

import { useState} from "react";
import { WalletConnect } from "@/components/WalletConnect";

export function Navbar() {
  const [showWallet, setShowWallet] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full px-6 py-5 bg-white relative">
      <div className="flex items-center">
        NFT APP
      </div>
      <div className="relative">
        <button
          onClick={() => setShowWallet(!showWallet)}
          className="bg-dark-gray text-gray-50 px-4 py-2 hover:bg-secondary/85 transition-colors font-medium text-md leading-5 tracking-normal cursor-pointer shadow-button"
        >
          Connect Wallet
        </button>

        {showWallet && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowWallet(false)}
            />
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-light shadow-lg p-4 min-w-[200px] z-50">
              <WalletConnect />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}