// app/components/HomePage.tsx
"use client"

import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from './Header';
import { ChevronRight, Sparkles, Shield, Zap } from 'lucide-react';

interface HomePageProps {
    onNavigateToDashboard: () => void;
    onDisconnect: () => void; // New prop for disconnect handling
}

const HomePage = ({ onNavigateToDashboard, onDisconnect }: HomePageProps) => {
    const { connected } = useWallet();

    // Auto-navigate to dashboard on connect (redundant with Header, but kept for safety)
    useEffect(() => {
        if (connected) {
            onNavigateToDashboard();
        }
    }, [connected, onNavigateToDashboard]);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black pt-20"> {/* Add pt-20 to account for fixed header */}
            <Header
                onNavigateToDashboard={onNavigateToDashboard}
                onDisconnect={onDisconnect}
            />

            {/* Hero Section */}
            <main className="pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC1FFF]/10 border border-[#DC1FFF]/20 rounded-full mb-6 animate-pulse">
                            <Sparkles className="w-4 h-4 text-[#DC1FFF]" />
                            <span className="text-sm text-[#DC1FFF]/80">AI-Powered Payroll on Solana</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-linear-to-r from-[#DC1FFF] via-[#00FFA3] to-[#DC1FFF] bg-clip-text text-transparent">
                                Payroll Made
                            </span>
                            <br />
                            <span className="text-white">Simple &amp; Smart</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                            Manage your decentralized payroll with natural language.
                            Just chat with your AI assistant and watch magic happen on-chain.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={onNavigateToDashboard}
                                disabled={connected}
                                className="px-8 py-4 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-[#DC1FFF]/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Launch Dashboard
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 border border-slate-700">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-24">
                        <div className="p-8 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center mb-4">
                                <Sparkles className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
                            <p className="text-slate-400">
                                Control your payroll with natural language. No complex interfaces, just chat.
                            </p>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-[#03E1FF]/20 rounded-2xl backdrop-blur-sm hover:border-[#03E1FF]/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-linear-to-br from-[#03E1FF] to-[#00FFA3] rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Secure &amp; Decentralized</h3>
                            <p className="text-slate-400">
                                Built on Solana blockchain. Your funds, your control, always transparent.
                            </p>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-[#00FFA3]/20 rounded-2xl backdrop-blur-sm hover:border-[#00FFA3]/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-linear-to-br from-[#00FFA3] to-[#03E1FF] rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
                            <p className="text-slate-400">
                                Process payments in seconds with Solana&apos;s high-performance network.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;