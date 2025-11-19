"use client";

import { Sparkles, Shield, Zap, Users, Award, Target, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black relative overflow-hidden">
            <Header />
            <ParticleBackground />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#DC1FFF]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FFA3]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#DC1FFF]/10 to-[#00FFA3]/10 border border-[#DC1FFF]/20 rounded-full mb-6 backdrop-blur-sm hover:border-[#00FFA3]/40 transition-all duration-300 group cursor-pointer animate-fade-in">
                        <Sparkles className="w-4 h-4 text-[#DC1FFF] group-hover:animate-spin" />
                        <span className="text-sm bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent font-medium">
                            About DappPay
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                        <span className="inline-block bg-linear-to-r from-[#DC1FFF] via-[#00FFA3] to-[#03E1FF] bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                            Revolutionizing
                        </span>
                        <br />
                        <span className="text-white drop-shadow-[0_0_30px_rgba(220,31,255,0.3)]">Payroll on Solana</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        At DappPay, we&apos;re bridging the gap between traditional payroll systems and the decentralized future. Our mission is to make payroll seamless, secure, and intelligent using AI and Solana&apos;s lightning-fast blockchain.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="relative z-10 py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-left">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center shadow-lg shadow-[#DC1FFF]/50">
                                    <Target className="w-6 h-6 text-black" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                            </div>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                Empower businesses and teams worldwide to handle payroll with unprecedented ease. By leveraging AI for natural language processing and Solana for instant, low-cost transactions, we eliminate the complexities of traditional finance.
                            </p>
                            <div className="space-y-4">
                                <div className="group flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#00FFA3]/50 transition-all duration-300 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#00FFA3]/20 to-[#00FFA3]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Zap className="w-5 h-5 text-[#00FFA3]" />
                                    </div>
                                    <span className="text-slate-300 group-hover:text-[#00FFA3] transition-colors duration-300">Instant payouts in seconds</span>
                                </div>
                                <div className="group flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#DC1FFF]/50 transition-all duration-300 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#DC1FFF]/20 to-[#DC1FFF]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Sparkles className="w-5 h-5 text-[#DC1FFF]" />
                                    </div>
                                    <span className="text-slate-300 group-hover:text-[#DC1FFF] transition-colors duration-300">AI-driven automation</span>
                                </div>
                                <div className="group flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#03E1FF]/50 transition-all duration-300 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#03E1FF]/20 to-[#03E1FF]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Shield className="w-5 h-5 text-[#03E1FF]" />
                                    </div>
                                    <span className="text-slate-300 group-hover:text-[#03E1FF] transition-colors duration-300">Blockchain-secured transparency</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative animate-slide-right">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                                <div className="relative bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-2xl p-8 text-black font-semibold text-center shadow-2xl">
                                    <p className="text-6xl mb-4 animate-bounce">🚀</p>
                                    <p className="text-lg">Building the future of work, one transaction at a time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white animate-fade-in">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#DC1FFF]/20 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <div className="absolute inset-0 bg-linear-to-br from-[#DC1FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#DC1FFF]/50">
                                    <Heart className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#DC1FFF] transition-colors duration-300">User-First</h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    Every feature is designed with you in mind. Simple, intuitive, powerful.
                                </p>
                            </div>
                        </div>

                        <div className="group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#03E1FF]/20 rounded-2xl backdrop-blur-sm hover:border-[#03E1FF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#03E1FF]/20 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <div className="absolute inset-0 bg-linear-to-br from-[#03E1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-linear-to-br from-[#03E1FF] to-[#00FFA3] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#03E1FF]/50">
                                    <Shield className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#03E1FF] transition-colors duration-300">Security First</h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    Your funds are protected by blockchain technology and cryptographic security.
                                </p>
                            </div>
                        </div>

                        <div className="group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#00FFA3]/20 rounded-2xl backdrop-blur-sm hover:border-[#00FFA3]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00FFA3]/20 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <div className="absolute inset-0 bg-linear-to-br from-[#00FFA3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-linear-to-br from-[#00FFA3] to-[#03E1FF] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#00FFA3]/50">
                                    <Award className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFA3] transition-colors duration-300">Innovation</h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    We constantly push boundaries to deliver cutting-edge solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="relative z-10 py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white animate-fade-in">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Alice Johnson', role: 'Founder & CEO', icon: Users, color: 'from-[#DC1FFF] to-[#00FFA3]', desc: 'Visionary leader with 10+ years in blockchain and fintech.', delay: '0.1s' },
                            { name: 'Bob Smith', role: 'CTO', icon: Zap, color: 'from-[#03E1FF] to-[#00FFA3]', desc: 'Solana expert driving our high-performance architecture.', delay: '0.2s' },
                            { name: 'Carol Lee', role: 'Head of AI', icon: Sparkles, color: 'from-[#00FFA3] to-[#DC1FFF]', desc: 'AI pioneer integrating natural language into payroll.', delay: '0.3s' }
                        ].map((member, index) => (
                            <div key={index} className="group text-center p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#DC1FFF]/20 animate-slide-up" style={{ animationDelay: member.delay }}>
                                <div className="relative inline-block mb-4">
                                    <div className={`w-20 h-20 bg-linear-to-br ${member.color} rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <member.icon className="w-10 h-10 text-black" />
                                    </div>
                                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-linear-to-br ${member.color} rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FFA3] transition-colors duration-300">{member.name}</h3>
                                <p className="text-[#DC1FFF] mb-4 font-medium">{member.role}</p>
                                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
                @keyframes slide-left {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-left {
                    animation: slide-left 0.8s ease-out forwards;
                }
                @keyframes slide-right {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-right {
                    animation: slide-right 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}