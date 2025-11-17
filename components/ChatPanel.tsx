// app/components/ChatPanel.tsx
"use client"

import { Send } from 'lucide-react';
import { Message } from '@/lib/types';
import { PublicKey } from '@solana/web3.js';

type ChatMessage = Message & {
    id: string;
};

interface ChatPanelProps {
    messages: ChatMessage[];
    input: string;
    isLoading: boolean;
    isPayrollOpen: boolean;
    publicKey?: PublicKey | null;
    onInputChange: (value: string) => void;
    onSubmit: (e?: React.FormEvent) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
    messages,
    input,
    isLoading,
    isPayrollOpen,
    publicKey,
    onInputChange,
    onSubmit,
}) => {
    return (
        <div className={`${isPayrollOpen ? 'w-2/3' : 'w-full'} transition-all duration-300 flex flex-col bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm overflow-hidden`}>
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">AI Assistant</h2>
                        <p className="text-sm text-slate-400">Ask me anything about your payroll</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full animate-pulse ${publicKey ? 'bg-[#00FFA3]' : 'bg-yellow-500'}`}></div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                    <div key={msg.id || index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                        <div className={`max-w-[70%] ${msg.role === 'user' ? 'bg-linear-to-r from-[#DC1FFF] to-[#00FFA3]' : 'bg-slate-800'} rounded-2xl p-4`}>
                            <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-black' : 'text-white'}`}>
                                {msg.content}
                            </p>
                            <p className="text-xs text-slate-300 mt-2 opacity-60">
                                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="bg-slate-800 rounded-2xl p-4">
                            <p className="text-sm text-white">AI is thinking...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={onSubmit} className="p-6 border-t border-slate-800">
                <div className="flex gap-3">
                    <input
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="Type your payroll command here... (e.g., 'Create organization TechCo' or 'Show my orgs')"
                        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC1FFF] transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    Wallet: {publicKey ? `${publicKey.toBase58().slice(0, 8)}...` : 'Not connected'}
                </p>
            </form>
        </div>
    );
};

export default ChatPanel;