// app/components/Header.tsx
"use client"

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Zap, X, Menu } from 'lucide-react';

const Header = () => {
    const { connected, publicKey, disconnect } = useWallet();

    const handleDisconnect = async () => {
        if (disconnect) {
            await disconnect();
        }
    };

    const address = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : '';

    return (
        <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-[#DC1FFF]/20">
            <div className="max-w-full px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent">
                            DappPay
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {connected ? (
                        <>
                            <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                                <span className="text-sm text-slate-400">Connected: </span>
                                <span className="text-sm text-white font-mono">{address}</span>
                            </div>
                            <button onClick={handleDisconnect} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </>
                    ) : (
                        <WalletMultiButton className="!bg-[#DC1FFF] !hover:bg-[#00FFA3] !text-black !rounded-lg !font-medium !transition-all !duration-200" />
                    )}
                    {!connected && (
                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <Menu className="w-6 h-6 text-slate-400" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;