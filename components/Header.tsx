// app/components/Header.tsx
"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Zap, X } from 'lucide-react';
import Link from 'next/link';

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
            <div className="max-w-[90vw] lg:max-w-[75vw] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href="/" className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </Link>
                        <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent">
                            DappPay
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {connected ? (
                        <>
                            <div className="hidden sm:block px-3 sm:px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                                <span className="text-xs sm:text-sm text-slate-400">Connected: </span>
                                <span className="text-xs sm:text-sm text-white font-mono">{address}</span>
                            </div>
                            <div className="sm:hidden px-2 py-1 bg-slate-800/50 rounded-lg border border-slate-700">
                                <span className="text-xs text-white font-mono">{address}</span>
                            </div>
                            <button onClick={handleDisconnect} className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                            </button>
                        </>
                    ) : (
                        <WalletMultiButton className="bg-[#DC1FFF]! hover:bg-[#00FFA3]! text-black! rounded-lg! font-medium! transition-all! duration-200! text-xs! sm:text-sm! px-3! sm:px-4! py-2!" />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;