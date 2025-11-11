// app/page.tsx
"use client"

import { useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import HomePage from '@/components/HomePage';
import Dashboard from '@/components/Dashboard';
import '@solana/wallet-adapter-react-ui/styles.css'; // Required for modal styles

export default function DappPayApp() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  // Memoize network and endpoint
  const network = useMemo(() => 'devnet' as const, []);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Memoize wallets
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const handleNavigateToDashboard = () => setCurrentPage('dashboard');
  const handleBackToHome = () => setCurrentPage('home');

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div>
            {currentPage === 'home' ? (
              <HomePage
                onNavigateToDashboard={handleNavigateToDashboard}
                onDisconnect={handleBackToHome}
              />
            ) : (
              <Dashboard onBack={handleBackToHome} />
            )}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}