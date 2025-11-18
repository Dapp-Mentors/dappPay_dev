// app/components/ChatPanel.tsx
"use client"

import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Message } from '@/utils/interface';
import { PublicKey } from '@solana/web3.js';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';  // ← Add this import

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
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    // Define markdown components with proper types
    const markdownComponents: Components = {
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="ml-2">{children}</li>,
        code: ({ inline, children, className }: { inline?: boolean; children?: React.ReactNode; className?: string }) =>
            inline ? (
                <code className="bg-slate-700/50 px-1.5 py-0.5 rounded text-[#00FFA3] font-mono text-xs break-all">
                    {children}
                </code>
            ) : (
                <code className={`
                    block bg-slate-700/50 p-3 rounded-md my-3 font-mono text-xs 
                    overflow-x-auto whitespace-pre break-all
                    ${className ?? ''}
                `.trim()}>
                    {children}
                </code>
            ),
        a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#00FFA3] hover:text-[#DC1FFF] underline break-all">
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#DC1FFF] pl-3 italic my-2 text-slate-300">
                {children}
            </blockquote>
        ),
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="border-slate-700 my-4" />,
    };

    return (
        <div className={`${isPayrollOpen ? 'hidden lg:flex lg:w-2/3' : 'w-full'} min-h-[50vh] max-h-[80vh] transition-all duration-300 flex flex-col bg-slate-900/50 border border-[#DC1FFF]/20 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden`}>
            {/* Chat Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">AI Assistant</h2>
                        <p className="text-xs sm:text-sm text-slate-400">Ask me anything about your payroll</p>
                    </div>
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse ${publicKey ? 'bg-[#00FFA3]' : 'bg-yellow-500'}`}></div>
                </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4" id="messages-container">
                {messages.map((msg, index) => (
                    <div key={msg.id || index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                        <div className={`max-w-[85%] sm:max-w-[70%] ${msg.role === 'user' ? 'bg-linear-to-r from-[#DC1FFF] to-[#00FFA3]' : 'bg-slate-800'} rounded-xl sm:rounded-2xl p-3 sm:p-4`}>
                            <div className={`text-xs sm:text-sm leading-relaxed ${msg.role === 'user' ? 'text-black' : 'text-white'} break-all`}> {/* Fixed: break-all instead of break-words */}
                                {msg.role === 'user' ? (
                                    <p className="whitespace-pre-wrap break-all">{msg.content}</p>
                                ) : (
                                    <ReactMarkdown
                                        // Removed className prop entirely
                                        components={markdownComponents}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                            <p className="text-[10px] sm:text-xs text-slate-300 mt-1 sm:mt-2 opacity-60">
                                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-white">AI is thinking...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={onSubmit} className="p-3 sm:p-6 border-t border-slate-800 shrink-0">
                <div className="flex gap-2 sm:gap-3">
                    <input
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="Type your payroll command..."
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#DC1FFF] transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-2">
                    Wallet: {publicKey ? `${publicKey.toBase58().slice(0, 6)}...` : 'Not connected'}
                </p>
            </form>
        </div>
    );
};

export default ChatPanel;