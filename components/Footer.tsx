// app/components/Footer.tsx
"use client"

import Link from 'next/link';
import { Linkedin, Youtube, X, Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black/80 backdrop-blur-lg text-white py-8 sm:py-12 lg:py-16 border-t border-[#DC1FFF]/20">
            <div className="max-w-[95vw] lg:max-w-[75vw] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent">
                                    DappPay
                                </h3>
                                <p className="text-slate-400 text-xs sm:text-sm">AI-Powered Payroll on Solana</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                            Manage your decentralized payroll with natural language. Just chat with your AI assistant and watch magic happen on-chain.
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                            <a
                                href="https://youtube.com/@dappmentors?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-105"
                            >
                                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-black" />
                            </a>
                            <a
                                href="https://linkedin.com/company/dappmentors"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-105"
                            >
                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-black" />
                            </a>
                            <a
                                href="https://twitter.com/iDaltonic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-105"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-black" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Learn</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs" className="text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Tutorials
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-2">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Company</h4>
                        <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                            <li>
                                <Link href="/features" className="text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    AI-Powered
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs sm:text-sm gap-3 sm:gap-0">
                        <div className="text-center md:text-left">© {new Date().getFullYear()} DappPay. All rights reserved.</div>
                        <div className="flex gap-4 sm:gap-6">
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