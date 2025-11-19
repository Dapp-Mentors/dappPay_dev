'use client';

import React, { useState } from 'react';
import { ChevronDown, Code2, Zap, BookOpen, Terminal, CheckCircle, AlertCircle, Users, DollarSign, Cpu, Shield, TrendingUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type SectionId = 'intro' | 'installation' | 'quickstart' | 'features' | 'api' | 'testing';

interface ExpandedSections {
    intro: boolean;
    installation: boolean;
    quickstart: boolean;
    features: boolean;
    api: boolean;
    testing: boolean;
}

interface CodeBlockProps {
    code: string;
}

interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    items?: string[];
}

interface SectionProps {
    id: SectionId;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

interface FunctionDef {
    name: string;
    desc: string;
    params: string;
    returns: string;
}

interface StepItem {
    step: number;
    title: string;
    desc: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (
    <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto my-4">
        <code className="text-[#00FFA3] text-sm font-mono">{code}</code>
    </pre>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, items }) => (
    <div className="group p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#DC1FFF]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#DC1FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center shadow-lg shadow-[#DC1FFF]/50">
                    <Icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#DC1FFF] transition-colors">{title}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">{description}</p>
            {items && (
                <ul className="space-y-2">
                    {items.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#00FFA3]" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const Section: React.FC<SectionProps> = ({ id, title, icon: Icon, children }) => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        intro: true,
        installation: false,
        quickstart: false,
        features: false,
        api: false,
        testing: false,
    });

    const toggleSection = (sectionId: SectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    return (
        <div className="border-b border-slate-800/50">
            <button
                onClick={() => toggleSection(id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-all duration-300 group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded-lg flex items-center justify-center group-hover:from-[#DC1FFF]/40 group-hover:to-[#00FFA3]/40 transition-all">
                        <Icon className="w-6 h-6 text-[#DC1FFF]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#00FFA3] transition-colors">{title}</h2>
                </div>
                <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${expandedSections[id] ? 'rotate-180' : ''}`}
                />
            </button>

            {expandedSections[id] && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/30 bg-linear-to-b from-slate-900/20 to-transparent">
                    {children}
                </div>
            )}
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black">
            {/* Header */}
            <Header />

            {/* Main Content */}

            <main className="max-w-7xl mx-auto pb-20 px-6 pt-32">
                {/* Introduction Section */}
                <Section id="intro" title="Getting Started" icon={BookOpen}>
                    <div className="space-y-4 text-slate-300">
                        <p>
                            <span className="text-[#DC1FFF] font-bold">DappPay</span> is an innovative decentralized application (DApp) designed for seamless payroll management using blockchain technology powered by Solana&apos;s Rust programming language.
                        </p>
                        <p>
                            This DApp enables organizations to automate their entire pay process—from adding workers in real-time with accurate salary details directly linked through unique identifiers, to creating new organizational entities effortlessly while ensuring compliance and security.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <FeatureCard
                                icon={Shield}
                                title="Secure"
                                description="Blockchain-powered transactions"
                                items={['Immutable records', 'Transparent ledger', 'No intermediaries']}
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Fast"
                                description="Lightning-quick payments"
                                items={['Sub-second transfers', 'Batch processing', 'Real-time updates']}
                            />
                            <FeatureCard
                                icon={Cpu}
                                title="Smart"
                                description="AI-assisted management"
                                items={['Natural language control', 'Auto-processing', 'Smart contracts']}
                            />
                        </div>
                    </div>
                </Section>

                {/* Installation Section */}
                <Section id="installation" title="Installation & Setup" icon={Terminal}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#00FFA3]" />
                                Prerequisites
                            </h3>
                            <ul className="space-y-2 text-slate-300 ml-7">
                                <li>• Node.js 18+ and npm/yarn</li>
                                <li>• Rust and Solana CLI</li>
                                <li>• A Solana wallet (Phantom, Solflare, etc.)</li>
                                <li>• Basic understanding of blockchain concepts</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-[#DC1FFF]" />
                                Installation Steps
                            </h3>
                            <CodeBlock code={`# Clone the repository
                            git clone https://github.com/daltonic/dappPay.git
                            cd dappPay

                            # Install dependencies
                            npm install

                            # Build the Anchor program
                            cd anchor
                            anchor build

                            # Install Anchor CLI (if not already installed)
                            npm install -g @project-serum/anchor`}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Environment Setup</h3>
                            <CodeBlock code={`
                            # Create .env.local file
                            cp .env.example .env.local

                            # Configure your environment
                            NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
                            NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
                            NEXT_PUBLIC_PROGRAM_ID=your_program_id`}
                            />
                        </div>
                    </div>
                </Section>

                {/* Quick Start Section */}
                <Section id="quickstart" title="Quick Start Guide" icon={Zap}>
                    <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-[#00FFA3]/20 rounded-lg p-4">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-[#00FFA3] shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-white mb-1">Connect Your Wallet</p>
                                    <p className="text-sm text-slate-300">Start by connecting your Solana wallet to the dashboard. This enables transactions and fund management.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">Basic Workflow</h3>

                            <div className="space-y-3">
                                {[
                                    { step: 1, title: 'Create Organization', desc: 'Ask the AI: "Create organization TechCorp"' },
                                    { step: 2, title: 'Add Workers', desc: 'Add team members with their wallet addresses and salaries' },
                                    { step: 3, title: 'Fund Treasury', desc: 'Transfer SOL to your organization&apos;s treasury wallet' },
                                    { step: 4, title: 'Process Payroll', desc: 'Execute payments automatically or manually trigger cycles' },
                                    { step: 5, title: 'Monitor & Withdraw', desc: 'Track transactions and manage treasury funds' },
                                ].map((item: StepItem) => (
                                    <div key={item.step} className="flex gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-[#DC1FFF]/30 transition-all">
                                        <div className="w-8 h-8 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center shrink-0 text-black font-bold text-sm">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Features Section */}
                <Section id="features" title="Core Features" icon={Cpu}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FeatureCard
                            icon={Users}
                            title="Worker Management"
                            description="Easily add and manage workers"
                            items={['Add workers with unique IDs', 'Set individual salaries', 'Track payment history', 'Bulk operations support']}
                        />
                        <FeatureCard
                            icon={DollarSign}
                            title="Treasury Management"
                            description="Control organizational funds"
                            items={['Fund treasury securely', 'Track balance in real-time', 'Withdraw funds safely', 'Audit trail available']}
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Payroll Processing"
                            description="Automate payment cycles"
                            items={['Automatic salary distribution', 'Batch processing', 'Schedule recurring payments', 'Payment verification']}
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Security & Compliance"
                            description="Enterprise-grade protection"
                            items={['Smart contract audited', 'Multi-sig capabilities', 'Compliance ready', 'Transparent blockchain records']}
                        />
                    </div>
                </Section>

                {/* API & Functions Section */}
                <Section id="api" title="API Reference & Functions" icon={Code2}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Core Instructions</h3>

                            <div className="space-y-4">
                                {[
                                    {
                                        name: 'create_organization',
                                        desc: 'Initialize a new organization',
                                        params: 'orgName: string',
                                        returns: 'orgPda: PublicKey, transaction signature'
                                    },
                                    {
                                        name: 'add_worker',
                                        desc: 'Register a new worker to organization',
                                        params: 'orgPda, workerPubkey, salary: number',
                                        returns: 'workerPda: PublicKey, transaction signature'
                                    },
                                    {
                                        name: 'fund_treasury',
                                        desc: 'Transfer SOL to organization treasury',
                                        params: 'orgPda, amount: number (in SOL)',
                                        returns: 'transaction signature, new balance'
                                    },
                                    {
                                        name: 'process_payroll',
                                        desc: 'Execute payment cycle for all workers',
                                        params: 'orgPda',
                                        returns: 'transaction signatures array, results'
                                    },
                                    {
                                        name: 'withdraw_from_treasury',
                                        desc: 'Withdraw funds from treasury',
                                        params: 'orgPda, amount: number (in SOL)',
                                        returns: 'transaction signature, remaining balance'
                                    },
                                ].map((fn: FunctionDef, i: number) => (
                                    <div key={i} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-[#00FFA3]/30 transition-all">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-mono font-bold text-[#00FFA3]">{fn.name}</h4>
                                            <span className="px-2 py-1 text-xs bg-[#DC1FFF]/20 text-[#DC1FFF] rounded">Function</span>
                                        </div>
                                        <p className="text-sm text-slate-300 mb-2">{fn.desc}</p>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-slate-400">Parameters:</span>
                                                <p className="text-[#00FFA3]">{fn.params}</p>
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Returns:</span>
                                                <p className="text-[#00FFA3]">{fn.returns}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Testing Section */}
                <Section id="testing" title="Testing & Interaction" icon={Zap}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Using the Test Suite</h3>
                            <p className="text-slate-300 mb-4">
                                Navigate to the <span className="text-[#00FFA3]">/test</span> page to access a comprehensive test interface with all blockchain functions.
                            </p>

                            <CodeBlock code={`
                            # Start the development server
                            npm run dev

                            # Navigate to test page
                            http://localhost:3000/test

                            # Connect wallet and start testing`}
                            />
                        </div>

                        <div className="bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#03E1FF]/20 rounded-lg p-6">
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-[#03E1FF]" />
                                Test Page Features
                            </h4>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li>✓ <span className="text-[#DC1FFF]">Write Functions:</span> Create orgs, add workers, fund treasury, process payroll, withdraw</li>
                                <li>✓ <span className="text-[#00FFA3]">Read Functions:</span> Fetch organizations, worker details, balances, and payroll status</li>
                                <li>✓ <span className="text-[#03E1FF]">Real-time Logs:</span> Monitor all transactions and operations</li>
                                <li>✓ <span className="text-[#DC1FFF]">Random Data:</span> Generate test data for quick experimentation</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Example Test Flow</h3>
                            <CodeBlock code={`
                            # 1. Create an organization
                            Click "Create Organization" with default test data

                            # 2. Add a worker
                            Set salary to 0.5 SOL, click "Add Worker"

                            # 3. Fund the treasury
                            Set amount to 10 SOL, click "Fund Treasury"

                            # 4. Process payroll
                            Click "Process Payroll" to distribute salaries

                            # 5. Check results
                            View transaction logs in the right panel`}
                            />
                        </div>
                    </div>
                </Section>

                {/* Project Structure */}
                <div className="mt-12 p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Code2 className="w-6 h-6 text-[#DC1FFF]" />
                        Project Structure
                    </h3>
                    <CodeBlock code={`
                    dappPay/
                        ├── anchor/                    # Solana smart contracts
                        │   ├── programs/payroll_program/
                        │   │   └── src/
                        │   │       ├── instructions/  # Core functions
                        │   │       ├── states/        # Data structures
                        │   │       └── errors/        # Error handling
                        │   └── migrations/
                        ├── app/                       # Next.js frontend
                        │   ├── about/                # Project info
                        │   ├── dashboard/            # Main dashboard
                        │   ├── test/                 # Test suite
                        │   └── features/             # Feature showcase
                        ├── components/               # Reusable React components
                        ├── lib/                      # Utility libraries
                        ├── services/                 # Blockchain services
                        └── utils/                    # Helper functions`}
                    />
                </div>

                {/* Footer Stats */}
                <div className="mt-12 grid md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Files', value: '50' },
                        { label: 'Code Files', value: '40' },
                        { label: 'Smart Contracts', value: '5' },
                        { label: 'Test Cases', value: '14+' },
                    ].map((stat, i) => (
                        <div key={i} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-center hover:border-[#DC1FFF]/30 transition-all">
                            <div className="text-2xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </div>
                            <p className="text-sm text-slate-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />

            <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default Page;