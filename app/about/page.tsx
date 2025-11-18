// app/about/page.tsx
"use client"

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Shield, Zap, Users, Zap as ZapIcon } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-20 pb-20 px-6 mt-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC1FFF]/10 border border-[#DC1FFF]/20 rounded-full mb-6 animate-pulse">
                        <Sparkles className="w-4 h-4 text-[#DC1FFF]" />
                        <span className="text-sm text-[#DC1FFF]/80">About DappPay</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="bg-linear-to-r from-[#DC1FFF] via-[#00FFA3] to-[#DC1FFF] bg-clip-text text-transparent">
                            Revolutionizing
                        </span>
                        <br />
                        <span className="text-white">Payroll on Solana</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        At DappPay, we&apos;re bridging the gap between traditional payroll systems and the decentralized future. Our mission is to make payroll seamless, secure, and intelligent using AI and Solana&apos;s lightning-fast blockchain.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                Empower businesses and teams worldwide to handle payroll with unprecedented ease. By leveraging AI for natural language processing and Solana for instant, low-cost transactions, we eliminate the complexities of traditional finance.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[#00FFA3]">
                                    <ZapIcon className="w-5 h-5" />
                                    <span>Instant payouts in seconds</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#DC1FFF]">
                                    <Sparkles className="w-5 h-5" />
                                    <span>AI-driven automation</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#03E1FF]">
                                    <Shield className="w-5 h-5" />
                                    <span>Blockchain-secured transparency</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-2xl p-8 text-black font-semibold text-center">
                                <p className="text-6xl mb-4">🚀</p>
                                <p>Building the future of work, one transaction at a time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm">
                            <div className="w-20 h-20 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Users className="w-10 h-10 text-black" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Alice Johnson</h3>
                            <p className="text-slate-400 mb-4">Founder & CEO</p>
                            <p className="text-sm text-slate-500">Visionary leader with 10+ years in blockchain and fintech.</p>
                        </div>
                        <div className="text-center p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm">
                            <div className="w-20 h-20 bg-linear-to-br from-[#03E1FF] to-[#00FFA3] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Zap className="w-10 h-10 text-black" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Bob Smith</h3>
                            <p className="text-slate-400 mb-4">CTO</p>
                            <p className="text-sm text-slate-500">Solana expert driving our high-performance architecture.</p>
                        </div>
                        <div className="text-center p-6 bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm">
                            <div className="w-20 h-20 bg-linear-to-br from-[#00FFA3] to-[#DC1FFF] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-black" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Carol Lee</h3>
                            <p className="text-slate-400 mb-4">Head of AI</p>
                            <p className="text-sm text-slate-500">AI pioneer integrating natural language into payroll.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}