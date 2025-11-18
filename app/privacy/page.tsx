"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Lock, Mail, Shield, Zap, Eye, Database, FileCheck } from 'lucide-react';

export default function PrivacyPage() {
    const sections = [
        {
            icon: Zap,
            title: '1. Information We Collect',
            color: 'text-[#DC1FFF]',
            bgColor: 'from-[#DC1FFF]/10 to-[#DC1FFF]/5',
            content: (
                <>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        We collect minimal data to provide our services. This includes:
                    </p>
                    <ul className="list-none space-y-3 text-slate-400">
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#DC1FFF]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <Database className="w-4 h-4 text-[#DC1FFF]" />
                            </div>
                            <span>Wallet address (public key) for transaction verification — never stored privately.</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#DC1FFF]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <Eye className="w-4 h-4 text-[#DC1FFF]" />
                            </div>
                            <span>Chat interactions with our AI (anonymized for improvement).</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#DC1FFF]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <FileCheck className="w-4 h-4 text-[#DC1FFF]" />
                            </div>
                            <span>Usage analytics (aggregated, non-personal).</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#DC1FFF]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <Mail className="w-4 h-4 text-[#DC1FFF]" />
                            </div>
                            <span>Contact form submissions (name, email, message).</span>
                        </li>
                    </ul>
                    <p className="text-sm text-slate-500 mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                        <Shield className="w-4 h-4 inline mr-2 text-[#00FFA3]" />
                        We do not collect sensitive financial data beyond what&apos;s required for on-chain transactions.
                    </p>
                </>
            )
        },
        {
            icon: Shield,
            title: '2. How We Use Your Information',
            color: 'text-[#00FFA3]',
            bgColor: 'from-[#00FFA3]/10 to-[#00FFA3]/5',
            content: (
                <div className="text-slate-400 leading-relaxed">
                    <p className="mb-4">Your information is used solely to:</p>
                    <ul className="list-none space-y-3">
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#00FFA3]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#00FFA3]/20 to-[#03E1FF]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <Zap className="w-4 h-4 text-[#00FFA3]" />
                            </div>
                            <span>Process payroll transactions on Solana.</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#00FFA3]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#00FFA3]/20 to-[#03E1FF]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <Eye className="w-4 h-4 text-[#00FFA3]" />
                            </div>
                            <span>Improve AI responses through anonymized data.</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#00FFA3]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#00FFA3]/20 to-[#03E1FF]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <Mail className="w-4 h-4 text-[#00FFA3]" />
                            </div>
                            <span>Respond to support inquiries.</span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-[#00FFA3]/30 transition-all duration-300">
                            <div className="w-6 h-6 bg-linear-to-br from-[#00FFA3]/20 to-[#03E1FF]/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                <FileCheck className="w-4 h-4 text-[#00FFA3]" />
                            </div>
                            <span>Ensure compliance with blockchain regulations.</span>
                        </li>
                    </ul>
                    <p className="mt-4 p-4 bg-linear-to-r from-[#00FFA3]/10 to-transparent rounded-lg border border-[#00FFA3]/20 font-medium">
                        We never sell or share your data with third parties without explicit consent.
                    </p>
                </div>
            )
        },
        {
            icon: Lock,
            title: '3. Data Security',
            color: 'text-[#03E1FF]',
            bgColor: 'from-[#03E1FF]/10 to-[#03E1FF]/5',
            content: (
                <div className="space-y-4">
                    <p className="text-slate-400 leading-relaxed p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                        All data is encrypted in transit and at rest. On-chain data is public by nature of blockchain, but we use zero-knowledge proofs where possible for privacy. Access is controlled via wallet signatures.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-linear-to-br from-slate-800/50 to-slate-700/30 rounded-lg border border-[#03E1FF]/20 hover:border-[#03E1FF]/40 transition-all duration-300">
                            <Lock className="w-8 h-8 text-[#03E1FF] mb-2" />
                            <h4 className="font-semibold text-white mb-1">Encrypted Storage</h4>
                            <p className="text-sm text-slate-400">Military-grade encryption</p>
                        </div>
                        <div className="p-4 bg-linear-to-br from-slate-800/50 to-slate-700/30 rounded-lg border border-[#03E1FF]/20 hover:border-[#03E1FF]/40 transition-all duration-300">
                            <Shield className="w-8 h-8 text-[#03E1FF] mb-2" />
                            <h4 className="font-semibold text-white mb-1">Wallet Security</h4>
                            <p className="text-sm text-slate-400">Non-custodial control</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            icon: Mail,
            title: '4. Your Rights',
            color: 'text-[#DC1FFF]',
            bgColor: 'from-[#DC1FFF]/10 to-[#DC1FFF]/5',
            content: (
                <>
                    <p className="text-slate-400 leading-relaxed mb-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                        You have the right to access, update, or delete your information. Contact us at <a href="mailto:hello@dapppay.com" className="text-[#00FFA3] hover:text-[#DC1FFF] underline transition-colors duration-300">hello@dapppay.com</a> to exercise these rights.
                    </p>
                    <p className="text-sm text-slate-500 p-3 bg-slate-900/50 rounded-lg border border-slate-800 flex items-start gap-2">
                        <Database className="w-4 h-4 shrink-0 mt-0.5 text-[#DC1FFF]" />
                        <span>For on-chain data, note that blockchain transactions are immutable and publicly verifiable.</span>
                    </p>
                </>
            )
        },
        {
            icon: Clock,
            title: '5. Changes to This Policy',
            color: 'text-[#00FFA3]',
            bgColor: 'from-[#00FFA3]/10 to-[#00FFA3]/5',
            content: (
                <p className="text-slate-400 leading-relaxed p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    We may update this policy periodically. Significant changes will be announced via our blog and in-app notifications. Continued use constitutes acceptance.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black relative overflow-hidden">
            <Header />

            {/* Gradient Orbs */}
            <div className="absolute top-40 left-10 w-96 h-96 bg-[#DC1FFF]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#00FFA3]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8 animate-fade-in">
                        <div className="w-12 h-12 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center shadow-lg shadow-[#DC1FFF]/50">
                            <Shield className="w-6 h-6 text-black" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white">Privacy Policy</h1>
                    </div>
                    <div className="flex items-center gap-2 mb-8 text-slate-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <Clock className="w-4 h-4" />
                        <p>Last updated: November 11, 2025</p>
                    </div>
                    <p className="text-lg text-slate-300 leading-relaxed p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 rounded-xl border border-[#DC1FFF]/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        At DappPay, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our services, or interact with us.
                    </p>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="group p-6 sm:p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/30 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/40 transition-all duration-500 animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-12 h-12 bg-linear-to-br ${section.bgColor} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-slate-700/50`}>
                                    <section.icon className={`w-6 h-6 ${section.color}`} />
                                </div>
                                <h2 className={`text-2xl font-bold ${section.color} group-hover:scale-105 transition-transform duration-300 origin-left`}>
                                    {section.title}
                                </h2>
                            </div>
                            <div className="ml-0 sm:ml-16">
                                {section.content}
                            </div>
                        </div>
                    ))}

                    {/* Contact Section */}
                    <div className="text-center pt-8 border-t border-slate-800 animate-fade-in">
                        <div className="inline-block p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 rounded-xl border border-[#DC1FFF]/20 backdrop-blur-sm hover:border-[#00FFA3]/40 transition-all duration-300">
                            <Mail className="w-8 h-8 text-[#00FFA3] mx-auto mb-3" />
                            <p className="text-slate-400 mb-2">Questions about our privacy policy?</p>
                            <a
                                href="mailto:privacy@dapppay.com"
                                className="text-[#00FFA3] hover:text-[#DC1FFF] font-medium transition-colors duration-300 inline-flex items-center gap-2 group"
                            >
                                contact@dappmentors.org
                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
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
            `}</style>
        </div>
    );
}