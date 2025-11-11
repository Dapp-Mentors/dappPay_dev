// app/components/Dashboard.tsx
"use client"

import { useState } from 'react';
import Header from './Header';
import { Send, DollarSign, Users, TrendingUp, Plus, Menu, X } from 'lucide-react';
import { Message, PayrollSummary } from '@/lib/types';
import { INITIAL_MESSAGES, MOCK_PAYROLLS } from '@/lib/constants';

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isPayrollOpen, setIsPayrollOpen] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  // Mock data
  const payrolls: PayrollSummary[] = MOCK_PAYROLLS;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        role: 'bot',
        content: `I understand your request. I'm preparing the transaction for you to review and sign.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const formatLamports = (lamports: number) => {
    return (lamports / 1000000000).toFixed(2) + ' SOL';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black pt-20">
      <Header />

      {/* Main Content */}
      <main className="pb-6">
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
                <div className="w-3 h-3 bg-[#00FFA3] rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[70%] ${msg.role === 'user' ? 'bg-linear-to-r from-[#DC1FFF] to-[#00FFA3]' : 'bg-slate-800'} rounded-2xl p-4`}>
                    <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-black' : 'text-white'}`}>{msg.content}</p>
                    <p className="text-xs text-slate-300 mt-2 opacity-60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-800">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your payroll command here..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC1FFF] transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Try: &quot;Create a new organization called TechCo&quot; or &quot;Pay all workers in TechCo&quot;
              </p>
            </div>
          </div>

          {/* Payroll List - Right Side */}
          {isPayrollOpen && (
            <div className="w-1/3 flex flex-col bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Payroll Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Organizations</h3>
                  <p className="text-sm text-slate-400">{payrolls.length} active</p>
                </div>
                <button
                  onClick={() => setIsPayrollOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Payroll Cards */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {payrolls.map((payroll) => (
                  <div
                    key={payroll.id}
                    onClick={() => setSelectedOrg(payroll.id)}
                    className={`p-5 bg-slate-800/50 border ${selectedOrg === payroll.id ? 'border-[#DC1FFF]' : 'border-slate-700'} rounded-xl cursor-pointer hover:border-[#DC1FFF]/50 transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-white text-lg">{payroll.orgName}</h4>
                      <div className="w-2 h-2 bg-[#00FFA3] rounded-full"></div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Treasury
                        </span>
                        <span className="text-sm font-semibold text-[#00FFA3]">
                          {formatLamports(payroll.treasury)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Workers
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {payroll.workers.length}
                        </span>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-[#DC1FFF]/20 hover:bg-[#DC1FFF]/30 text-[#DC1FFF] rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                ))}

                <button className="w-full p-5 bg-slate-800/30 border-2 border-dashed border-slate-700 hover:border-[#DC1FFF]/50 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 group">
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