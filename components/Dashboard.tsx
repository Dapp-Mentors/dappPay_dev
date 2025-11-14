// app/components/Dashboard.tsx
"use client"

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from './Header';
import { Send, DollarSign, Users, TrendingUp, Plus, Menu, X } from 'lucide-react';
import { Message, PayrollSummary, WorkerSummary } from '@/lib/types';
import { blockchainMcpTools, setWalletContext } from '@/lib/payroll-mcp-tools';
import Footer from './Footer';

type ChatMessage = Message & {
  id: string;
};

type OpenAIMessage = {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
};

type ToolCall = {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
};

type OpenAIResponse = {
  choices: Array<{
    message: {
      content?: string;
      tool_calls?: ToolCall[];
    };
  }>;
};

const getOpenAITools = () => {
  return Object.entries(blockchainMcpTools).map(([name, tool]) => ({
    type: 'function' as const,
    function: {
      name,
      description: tool.description || 'No description provided.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  }));
};

const Dashboard = () => {
  const [isPayrollOpen, setIsPayrollOpen] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<PayrollSummary[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'bot' as const,
      content: 'Hi! I can help manage your payroll organizations. Ask me to create orgs, add workers, process payroll, or fetch details.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { publicKey, signTransaction } = useWallet();

  // Set wallet context for tools
  useEffect(() => {
    setWalletContext(publicKey || null, signTransaction || null);
  }, [publicKey, signTransaction]);

  // Load initial organizations using the tool
  useEffect(() => {
    const loadOrganizations = async () => {
      const tool = blockchainMcpTools.fetch_all_organizations;
      if (!tool || !tool.execute) {
        console.error('fetch_all_organizations tool not available');
        return;
      }
      try {
        const result = await tool.execute(
          {},
          { toolCallId: 'load-orgs', messages: [] }
        );
        if (typeof result === 'object' && result !== null && 'success' in result) {
          if (result.success && Array.isArray(result.organizations)) {
            const mappedOrgs: PayrollSummary[] = result.organizations.map((org: unknown) => {
              const orgData = org as Record<string, unknown>;
              return {
                id: String(orgData.pda || orgData.name || ''),
                orgName: String(orgData.name || 'Unknown'),
                treasury: Number(orgData.treasuryBalance || 0),
                workers: (orgData.workers || []) as WorkerSummary[],
              };
            });
            setOrganizations(mappedOrgs);
          }
        } else if (typeof result === 'object' && 'error' in result) {
          console.error(result.error);
        } else {
          console.error('Unexpected result format');
        }
      } catch (error) {
        console.error('Failed to load organizations:', error);
      }
    };
    loadOrganizations();
  }, []);

  // Generate response with tool handling
  const generateResponse = async (userInput: string) => {
    setIsLoading(true);
    try {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: userInput,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      const updatedMessages = [...messages, userMessage];
      const assistantMessages: OpenAIMessage[] = updatedMessages.map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user' as const,
        content: m.content,
      }));

      let fullResponse = '';
      const tools = getOpenAITools();

      // Make API call to OpenAI-compatible endpoint
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: assistantMessages,
          tools,
          tool_choice: 'auto',
        }),
      });

      const data = await response.json() as OpenAIResponse;
      const message = data.choices[0].message;

      if (message.content) {
        fullResponse += message.content;
      }

      if (message.tool_calls && message.tool_calls.length > 0) {
        for (const toolCall of message.tool_calls) {
          const toolName = toolCall.function.name;
          const toolArgs = JSON.parse(toolCall.function.arguments || '{}');
          fullResponse += `\n🔧 Calling ${toolName} with ${JSON.stringify(toolArgs)}...\n`;

          let toolOutput: unknown;
          try {
            const tool = blockchainMcpTools[toolName as keyof typeof blockchainMcpTools];
            if (!tool || !tool.execute) {
              throw new Error(`Unknown tool: ${toolName}`);
            }
            toolOutput = await tool.execute(toolArgs, { toolCallId: toolCall.id, messages: [] });

            // Handle AsyncIterable if necessary
            if (toolOutput && typeof toolOutput === 'object' && toolOutput !== null) {
              const asyncIteratorKey = Symbol.asyncIterator;
              if (asyncIteratorKey in toolOutput && typeof (toolOutput as Record<symbol, unknown>)[asyncIteratorKey] === 'function') {
                let str = '';
                for await (const chunk of toolOutput as AsyncIterable<unknown>) {
                  if (typeof chunk === 'string') str += chunk;
                }
                toolOutput = str;
              }
            }
          } catch (error) {
            toolOutput = { error: (error as Error).message };
          }

          const toolContent = typeof toolOutput === 'string' ? toolOutput : JSON.stringify(toolOutput);
          fullResponse += `Result: ${toolContent}\n`;
        }
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot' as const,
        content: fullResponse.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'bot' as const,
        content: `Sorry, something went wrong: ${(error as Error).message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      generateResponse(input);
      setInput('');
    }
  };

  const formatLamports = (lamports: number) => {
    return (lamports / 1000000000).toFixed(2) + ' SOL';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black pt-20">
      <Header />

      {/* Wallet Connect Prompt if not connected */}
      {!publicKey && (
        <div className="fixed top-4 right-4 z-50 p-4 bg-slate-800 text-white rounded-lg">
          <p>Connect your wallet to enable transactions.</p>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-6 mt-8">
        <div className="max-w-full h-[calc(100vh-8rem)] flex gap-6">
          {/* Chat Interface - Left Side */}
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
            <form onSubmit={handleSubmit} className="p-6 border-t border-slate-800">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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

          {/* Organizations List - Right Side */}
          {isPayrollOpen && (
            <div className="w-1/3 flex flex-col bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Organizations Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Organizations</h3>
                  <p className="text-sm text-slate-400">{organizations.length} active</p>
                </div>
                <button
                  onClick={() => setIsPayrollOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Organization Cards */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    onClick={() => setSelectedOrg(org.id)}
                    className={`p-5 bg-slate-800/50 border ${selectedOrg === org.id ? 'border-[#DC1FFF]' : 'border-slate-700'} rounded-xl cursor-pointer hover:border-[#DC1FFF]/50 transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-white text-lg">{org.orgName}</h4>
                      <div className="w-2 h-2 bg-[#00FFA3] rounded-full"></div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Treasury
                        </span>
                        <span className="text-sm font-semibold text-[#00FFA3]">
                          {formatLamports(org.treasury)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Workers
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {org.workers.length}
                        </span>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-[#DC1FFF]/20 hover:bg-[#DC1FFF]/30 text-[#DC1FFF] rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => {
                    generateResponse('Create a new organization');
                  }}
                  className="w-full p-5 bg-slate-800/30 border-2 border-dashed border-slate-700 hover:border-[#DC1FFF]/50 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 group"
                >
                  <Plus className="w-8 h-8 text-slate-600 group-hover:text-[#DC1FFF] transition-colors" />
                  <span className="text-sm text-slate-500 group-hover:text-[#DC1FFF] font-medium transition-colors">
                    Create Organization
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Toggle Button when closed */}
          {!isPayrollOpen && (
            <button
              onClick={() => setIsPayrollOpen(true)}
              className="fixed right-6 top-32 p-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl shadow-lg transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;