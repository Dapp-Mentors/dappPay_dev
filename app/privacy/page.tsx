// app/privacy/page.tsx
"use client"

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Lock, Mail, Shield, Zap } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-20 pb-20 px-6 mt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="w-6 h-6 text-[#DC1FFF]" />
                        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
                    </div>
                    <p className="text-slate-400 mb-8">Last updated: November 11, 2025</p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        At DappPay, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our services, or interact with us.
                    </p>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                            <Zap className="w-6 h-6" /> 1. Information We Collect
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            We collect minimal data to provide our services. This includes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-400">
                            <li>Wallet address (public key) for transaction verification – never stored privately.</li>
                            <li>Chat interactions with our AI (anonymized for improvement).</li>
                            <li>Usage analytics (aggregated, non-personal).</li>
                            <li>Contact form submissions (name, email, message).</li>
                        </ul>
                        <p className="text-sm text-slate-500 mt-4">We do not collect sensitive financial data beyond what&apos;s required for on-chain transactions.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                            <Shield className="w-6 h-6" /> 2. How We Use Your Information
                        </h2>
                        <div className="text-slate-400 leading-relaxed">
                            Your information is used solely to:
                            <ul className="list-disc list-inside space-y-2 text-slate-400 mt-4">
                                <li>Process payroll transactions on Solana.</li>
                                <li>Improve AI responses through anonymized data.</li>
                                <li>Respond to support inquiries.</li>
                                <li>Ensure compliance with blockchain regulations.</li>
                            </ul>
                            We never sell or share your data with third parties without explicit consent.
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                            <Lock className="w-6 h-6" /> 3. Data Security
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            All data is encrypted in transit and at rest. On-chain data is public by nature of blockchain, but we use zero-knowledge proofs where possible for privacy. Access is controlled via wallet signatures.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                            <Mail className="w-6 h-6" /> 4. Your Rights
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            You have the right to access, update, or delete your information. Contact us at hello@dapppay.com to exercise these rights.
                        </p>
                        <p className="text-sm text-slate-500">For on-chain data, note that blockchain transactions are immutable and publicly verifiable.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                            <Clock className="w-6 h-6" /> 5. Changes to This Policy
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            We may update this policy periodically. Significant changes will be announced via our blog and in-app notifications. Continued use constitutes acceptance.
                        </p>
                    </div>

                    <div className="text-center pt-8 border-t border-slate-700">
                        <p className="text-slate-500">Questions? Email us at <a href="mailto:privacy@dapppay.com" className="text-[#00FFA3] hover:underline">privacy@dapppay.com</a></p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}