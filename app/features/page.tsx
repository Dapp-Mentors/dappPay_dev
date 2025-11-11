// app/features/page.tsx
"use client"

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Shield, Zap, Brain, Key, Clock, Lock, Bolt, MessageCircle } from 'lucide-react';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-20 pb-20 px-6 mt-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC1FFF]/10 border border-[#DC1FFF]/20 rounded-full mb-6 animate-pulse">
                        <Sparkles className="w-4 h-4 text-[#DC1FFF]" />
                        <span className="text-sm text-[#DC1FFF]/80">Discover Our Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                        Powerful Tools for <br /> Modern Payroll
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Explore how DappPay combines AI intelligence, Solana speed, and unbreakable security to transform your payroll process.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* AI-Powered */}
                        <div className="p-8 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/40 transition-all duration-300">
                            <div className="w-16 h-16 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-xl flex items-center justify-center mb-6">
                                <Brain className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Commands</h3>
                            <p className="text-slate-400 mb-6">
                                Chat with our AI assistant using natural language. Say &quot;Pay team salaries&quot; or &quot;Add new employee&quot; – no coding required.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-[#00FFA3]" /> Intuitive conversations</li>
                                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#00FFA3]" /> Smart automation</li>
                                <li className="flex items-center gap-2"><Bolt className="w-4 h-4 text-[#00FFA3]" /> Instant processing</li>
                            </ul>
                        </div>

                        {/* Secure & Decentralized */}
                        <div className="p-8 bg-slate-900/50 border border-[#03E1FF]/20 rounded-2xl backdrop-blur-sm hover:border-[#03E1FF]/40 transition-all duration-300">
                            <div className="w-16 h-16 bg-linear-to-br from-[#03E1FF] to-[#00FFA3] rounded-xl flex items-center justify-center mb-6">
                                <Lock className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Secure & Decentralized</h3>
                            <p className="text-slate-400 mb-6">
                                All transactions on Solana blockchain ensure transparency and immutability. Your data is yours – no central authority.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#00FFA3]" /> End-to-end encryption</li>
                                <li className="flex items-center gap-2"><Key className="w-4 h-4 text-[#00FFA3]" /> Wallet-based access</li>
                                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#00FFA3]" /> Audit trails</li>
                            </ul>
                        </div>

                        {/* Lightning Fast */}
                        <div className="p-8 bg-slate-900/50 border border-[#00FFA3]/20 rounded-2xl backdrop-blur-sm hover:border-[#00FFA3]/40 transition-all duration-300">
                            <div className="w-16 h-16 bg-linear-to-br from-[#00FFA3] to-[#03E1FF] rounded-xl flex items-center justify-center mb-6">
                                <Clock className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
                            <p className="text-slate-400 mb-6">
                                Process payroll in under a second with Solana&apos;s high-throughput network. Low fees mean more savings for your team.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="flex items-center gap-2"><Bolt className="w-4 h-4 text-[#00FFA3]" /> Sub-second confirmations</li>
                                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#00FFA3]" /> Minimal gas fees</li>
                                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#00FFA3]" /> Scalable for enterprises</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Features */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">More Features</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl">
                            <h4 className="text-xl font-semibold mb-4 text-white">Multi-Organization Support</h4>
                            <p className="text-slate-400">Manage multiple companies or teams from one dashboard. Seamless switching between orgs.</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl">
                            <h4 className="text-xl font-semibold mb-4 text-white">Real-Time Analytics</h4>
                            <p className="text-slate-400">Track payroll trends, expenses, and compliance with interactive charts and reports.</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl">
                            <h4 className="text-xl font-semibold mb-4 text-white">Compliance Tools</h4>
                            <p className="text-slate-400">Built-in tax calculations and regulatory checks tailored for global teams.</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl">
                            <h4 className="text-xl font-semibold mb-4 text-white">API Integrations</h4>
                            <p className="text-slate-400">Connect with your existing HR, accounting, and crypto tools for a unified workflow.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}