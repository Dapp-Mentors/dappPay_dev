// app/components/Dashboard.tsx
"use client"

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from './Header';
import ChatPanel from './ChatPanel';
import OrganizationsPanel from './OrganizationsPanel';
import { Menu } from 'lucide-react';
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

  // Load initial organizations using the tool (switched to user-specific for workers data)
  useEffect(() => {
    const loadOrganizations = async () => {
      const tool = blockchainMcpTools.fetch_user_organizations;
      if (!tool || !tool.execute) {
        console.error('fetch_user_organizations tool not available');
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
              const workerCount = Number(orgData.workersCount || 0);
              return {
                id: String(orgData.pda || orgData.name || ''),
                orgName: String(orgData.name || 'Unknown'),
                treasury: Number(orgData.treasury || 0), // Assuming lamports; adjust if in SOL
                workers: Array.from({ length: workerCount }, () => ({}) as WorkerSummary), // Dummy array for correct length
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
    if (publicKey) { // Only load if wallet connected
      loadOrganizations();
    }
  }, [publicKey]);

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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API Error:', response.status, errorData);
        throw new Error(`AI API failed (${response.status}): ${errorData.error?.message || 'Unknown error'}`);
      }

      let data: OpenAIResponse;
      try {
        data = await response.json() as OpenAIResponse;
      } catch (parseErr) {
        console.error('Failed to parse AI response:', parseErr);
        throw new Error('Invalid response from AI service');
      }

      // CRITICAL FIX: Validate response structure before accessing
      if (!data) {
        console.error('Empty AI response');
        throw new Error('AI returned empty response');
      }

      if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
        console.error('Invalid AI Response Structure:', data);
        throw new Error('AI returned response without choices array');
      }

      const choice = data.choices[0];
      if (!choice || !choice.message) {
        console.error('Invalid choice structure:', choice);
        throw new Error('AI returned invalid message structure');
      }

      const message = choice.message;

      // Process the message content
      if (message.content) {
        fullResponse += message.content;
      }

      // Handle tool calls if present
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
            console.error(`Tool execution error for ${toolName}:`, error);
            toolOutput = { error: (error as Error).message };
          }

          const toolContent = typeof toolOutput === 'string' ? toolOutput : JSON.stringify(toolOutput, null, 2);
          fullResponse += `Result: ${toolContent}\n`;
        }
      }

      // If no content was generated at all
      if (!fullResponse.trim()) {
        fullResponse = 'I received your message but couldn\'t generate a response. Please try again.';
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

  const handleCreateOrg = () => {
    generateResponse('Create a new organization');
  };

  const handleViewDetails = (orgName: string) => {
    generateResponse(`Show details for organization ${orgName}`);
  };

  const handleTogglePanel = () => {
    setIsPayrollOpen(!isPayrollOpen);
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
          <ChatPanel
            messages={messages}
            input={input}
            isLoading={isLoading}
            isPayrollOpen={isPayrollOpen}
            publicKey={publicKey}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />

          {/* Organizations List - Right Side */}
          <OrganizationsPanel
            organizations={organizations}
            selectedOrg={selectedOrg}
            isOpen={isPayrollOpen}
            onToggle={handleTogglePanel}
            onSelectOrg={setSelectedOrg}
            onCreateOrg={handleCreateOrg}
            onViewDetails={handleViewDetails}
            formatLamports={formatLamports}
          />

          {/* Toggle Button when closed */}
          {!isPayrollOpen && (
            <button
              onClick={handleTogglePanel}
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