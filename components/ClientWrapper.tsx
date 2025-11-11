// app/components/ClientWrapper.tsx
"use client"

import React, { useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import '@solana/wallet-adapter-react-ui/styles.css'; // Required for modal styles

interface ClientWrapperProps {
    children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
    const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

    // Memoize network and endpoint
    const network = useMemo(() => 'devnet' as const, []);
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Memoize wallets
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    const handleNavigateToDashboard = () => setCurrentPage('dashboard');
    const handleBackToHome = () => setCurrentPage('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <HomePage
                        onNavigateToDashboard={handleNavigateToDashboard}
                        onDisconnect={handleBackToHome}
                    />
                );
            case 'dashboard':
                return <Dashboard onBack={handleBackToHome} />;
            default:
                return null;
        }
    };

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black">
                        <Header
                            showBackButton={currentPage === 'dashboard'}
                            onBack={handleBackToHome}
                            onNavigateToDashboard={handleNavigateToDashboard}
                            onDisconnect={handleBackToHome}
                        />
                        <div className="pt-20"> {/* Padding for fixed header */}
                            {renderPage()}
                            {children} {/* Render any additional children if needed */}
                        </div>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default ClientWrapper;