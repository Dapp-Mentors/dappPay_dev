// app/components/Footer.tsx
"use client"

import Link from 'next/link';
import { Linkedin, Youtube, X, Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black/80 backdrop-blur-lg text-white py-16 border-t border-[#DC1FFF]/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent">
                                    DappPay
                                </h3>
                                <p className="text-slate-400 text-sm">AI-Powered Payroll on Solana</p>
                            </div>
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Manage your decentralized payroll with natural language. Just chat with your AI assistant and watch magic happen on-chain.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://youtube.com/@dappmentors?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-105"
                            >
                                <Youtube className="w-5 h-5 text-slate-400 hover:text-black" />
                            </a>
                            <a
                                href="https://linkedin.com/company/dappmentors"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-105"
                            >
                                <Linkedin className="w-5 h-5 text-slate-400 hover:text-black" />
                            </a>
                            <a
                                href="https://twitter.com/iDaltonic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-105"
                            >
                                <X className="w-5 h-5 text-slate-400 hover:text-black" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Learn</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Features</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features/ai" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    AI-Powered
                                </Link>
                            </li>
                            <li>
                                <Link href="/features/security" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Secure & Decentralized
                                </Link>
                            </li>
                            <li>
                                <Link href="/features/performance" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Lightning Fast
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
                        <div>© {new Date().getFullYear()} DappPay. All rights reserved.</div>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link href="/terms" className="hover:text-[#00FFA3] transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className="hover:text-[#00FFA3] transition-colors duration-300">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;