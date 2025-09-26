
'use client';
import KilnLogo from '@/../public/icons/kiln-logo.svg';

export function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full px-6 py-5 bg-white">
      <div className="flex items-center">
        <KilnLogo />
      </div>
      <button className="bg-secondary text-gray-50 px-4 py-2 hover:bg-secondary/85 transition-colors font-medium text-md leading-5 tracking-normal cursor-pointer shadow-button">
        Connect Wallet
      </button>
    </nav>
  );
}