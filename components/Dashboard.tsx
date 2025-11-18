// app/components/Dashboard.tsx
"use client"
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from './Header';
import ChatPanel from './ChatPanel';
import OrganizationsPanel from './OrganizationsPanel';
import { Menu } from 'lucide-react';
import { Message, PayrollSummary, WorkerSummary } from '@/utils/interface';
import { blockchainMcpTools, setWalletContext } from '@/lib/payroll-mcp-tools';
import Footer from './Footer';

type ChatMessage = Message & {
  id: string;
};

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
};

type ToolCall = {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};

type OpenAIResponse = {
  choices: Array<{
    message: {
      role: 'assistant';
      content?: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason: string;
  }>;
};

interface JsonSchemaProperty {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  enum?: string[];
}

interface ZodDef {
  typeName: string;
  shape?: (() => Record<string, unknown>) | Record<string, unknown>;
  description?: string;
  values?: string[] | Set<string>;
  innerType?: { _def: ZodDef };
}

interface ZodType {
  _def: ZodDef;
  [key: string]: unknown;
}

const getOpenAITools = () => {
  return Object.entries(blockchainMcpTools).map(([name, tool]) => {
    const properties: Record<string, JsonSchemaProperty> = {};
    const required: string[] = [];

    try {
      const schema = tool.inputSchema;

      if (schema && typeof schema === 'object' && '_def' in schema) {
        const schemaObj = schema as unknown as ZodType;
        const def = schemaObj._def;

        if (def.typeName === 'ZodObject' && def.shape) {
          const shape = typeof def.shape === 'function' ? def.shape() : def.shape;

          Object.entries(shape).forEach(([key, zodType]) => {
            if (!zodType || typeof zodType !== 'object' || !('_def' in zodType)) {
              return;
            }

            const innerDef = (zodType as ZodType)._def;
            let actualDef = innerDef;
            let isOptional = false;

            if (innerDef.typeName === 'ZodOptional') {
              isOptional = true;
              actualDef = innerDef.innerType?._def || innerDef;
            }

            let type: JsonSchemaProperty['type'] = 'string';
            if (actualDef.typeName === 'ZodString') type = 'string';
            else if (actualDef.typeName === 'ZodNumber') type = 'number';
            else if (actualDef.typeName === 'ZodBoolean') type = 'boolean';
            else if (actualDef.typeName === 'ZodObject') type = 'object';
            else if (actualDef.typeName === 'ZodArray') type = 'array';

            properties[key] = {
              type,
              description: actualDef.description || innerDef.description || `${key} parameter`,
            };

            if (actualDef.typeName === 'ZodEnum' && actualDef.values) {
              properties[key].enum = Array.isArray(actualDef.values)
                ? actualDef.values
                : Array.from(actualDef.values);
            }

            if (!isOptional) {
              required.push(key);
            }
          });
        }
      }
    } catch (error) {
      console.error(`Error parsing schema for ${name}:`, error);
    }

    return {
      type: 'function' as const,
      function: {
        name,
        description: tool.description || 'No description provided.',
        parameters: {
          type: 'object',
          properties,
          required,
        },
      },
    };
  });
};

const Dashboard = () => {
  // Initialize panel state based on screen size
  const [isPayrollOpen, setIsPayrollOpen] = useState(false);
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

  // Set initial panel state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Open by default on desktop (lg breakpoint: 1024px), closed on mobile
      setIsPayrollOpen(window.innerWidth >= 1024);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setWalletContext(publicKey || null, signTransaction || null);
  }, [publicKey, signTransaction]);

  useEffect(() => {
    const loadOrganizations = async () => {
      const tool = blockchainMcpTools.fetch_user_organizations;
      if (!tool || !tool.execute) {
        console.error('fetch_user_organizations tool not available');
        return;
      }

      try {
        const result = await tool.execute!(
          {},
          { toolCallId: 'load-orgs', messages: [] }
        );

        if (typeof result === 'object' && result !== null && 'success' in result) {
          if (result.success && Array.isArray(result.organizations)) {
            const mappedOrgs: PayrollSummary[] = result.organizations.map((org: unknown) => {
              const orgData = org as Record<string, unknown>;
              const workerCount = Number(orgData.workersCount || 0);
              return {
                id: String(orgData.publicKey || orgData.name || ''),
                orgName: String(orgData.name || 'Unknown'),
                treasury: Number(orgData.treasury || 0),
                createdAt: Number(orgData.createdAt || 0),
                workers: Array.from({ length: workerCount }, () => ({}) as WorkerSummary),
              };
            });
            setOrganizations(mappedOrgs);
          }
        }
      } catch (error) {
        console.error('Failed to load organizations:', error);
      }
    };

    if (publicKey) {
      loadOrganizations();
    }
  }, [publicKey]);

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

      const systemPrompt: OpenAIMessage = {
        role: 'system',
        content: `You are a helpful payroll management assistant on Solana blockchain. 

        Your available organizations:
        ${organizations.map(org => `- ${org.orgName} (ID: ${org.id})`).join('\n')}

        When users ask to:
        - "Show organizations" or "list my orgs" → use fetch_user_organizations (no parameters needed)
        - "Show details for [ORG_NAME]" → use fetch_organization_details with orgPda from the list above
        - "Create organization [NAME]" → use create_organization with the name parameter
        - "Add worker" → use add_worker with orgPda, workerPublicKey, and salaryInSol
        - "Fund treasury" → use fund_treasury with orgPda and amountInSol
        - "Process payroll" → use process_payroll with orgPda

        CRITICAL RULES:
        1. When a user mentions an organization by name (like "TESLA"), look it up in the list above to get its orgPda/ID
        2. Always extract ALL required parameters from user requests
        3. For fetch_organization_details, you MUST provide the orgPda parameter - use the ID from the organizations list
        4. If a parameter is missing, ask the user for it
        5. Be conversational and friendly in your responses

        Available tools: ${Object.keys(blockchainMcpTools).join(', ')}`,
      };

      const conversationMessages: OpenAIMessage[] = [
        systemPrompt,
        ...messages.map((m) => ({
          role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
          content: m.content,
        })),
        {
          role: 'user',
          content: userInput,
        }
      ];

      const tools = getOpenAITools();
      let fullResponse = '';
      let iterations = 0;
      const maxIterations = 5;

      while (iterations < maxIterations) {
        iterations++;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: conversationMessages,
            tools,
            tool_choice: 'auto',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`AI API failed (${response.status}): ${errorData.error?.message || 'Unknown error'}`);
        }

        const data: OpenAIResponse = await response.json();
        const choice = data.choices[0];

        if (!choice || !choice.message) {
          throw new Error('Invalid AI response structure');
        }

        const message = choice.message;

        conversationMessages.push({
          role: 'assistant',
          content: message.content || '',
          tool_calls: message.tool_calls,
        });

        if (message.content) {
          fullResponse += message.content + '\n';
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

              toolOutput = await tool.execute!(toolArgs, {
                toolCallId: toolCall.id,
                messages: []
              });

              if (toolOutput && typeof toolOutput === 'object' && Symbol.asyncIterator in toolOutput) {
                let str = '';
                for await (const chunk of toolOutput as AsyncIterable<unknown>) {
                  if (typeof chunk === 'string') str += chunk;
                }
                toolOutput = str;
              }
            } catch (error) {
              console.error(`Tool execution error for ${toolName}:`, error);
              toolOutput = { error: (error as Error).message };
            }

            const toolContent = typeof toolOutput === 'string'
              ? toolOutput
              : JSON.stringify(toolOutput, null, 2);

            fullResponse += `Result: ${toolContent}\n`;

            conversationMessages.push({
              role: 'tool',
              content: toolContent,
              tool_call_id: toolCall.id,
            });
          }

          continue;
        }

        if (choice.finish_reason === 'stop') {
          break;
        }
      }

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

      if (publicKey) {
        const tool = blockchainMcpTools.fetch_user_organizations;
        const result = await tool.execute!({}, { toolCallId: 'refresh', messages: [] });
        if (result && typeof result === 'object' && 'success' in result && result.success) {
          const mappedOrgs: PayrollSummary[] = (result.organizations as unknown[]).map((org: unknown) => {
            const orgData = org as Record<string, unknown>;
            const workerCount = Number(orgData.workersCount || 0);
            return {
              id: String(orgData.publicKey || orgData.name || ''),
              orgName: String(orgData.name || 'Unknown'),
              treasury: Number(orgData.treasury || 0),
              workers: Array.from({ length: workerCount }, () => ({}) as WorkerSummary),
              createdAt: Number(orgData.createdAt || 0),
            };
          });
          setOrganizations(mappedOrgs);
        }
      }

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
    return lamports.toFixed(2) + ' SOL';
  };

  const handleViewDetails = (orgName: string) => {
    generateResponse(`Show details for organization ${orgName}`);
  };

  const handleTogglePanel = () => {
    setIsPayrollOpen(!isPayrollOpen);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black pt-16 sm:pt-20">
      <Header />

      {!publicKey && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-40 p-3 sm:p-4 bg-slate-800 text-white rounded-lg text-xs sm:text-sm max-w-[90vw] sm:max-w-none">
          <p>Connect your wallet to enable transactions.</p>
        </div>
      )}

      <main className="max-w-[95vw] lg:max-w-[75vw] mx-auto px-3 sm:px-6 pb-6 mt-4 sm:mt-8">
        <div className="max-w-full min-h-[calc(100vh-35rem)] flex flex-col lg:flex-row gap-4 sm:gap-6">
          <ChatPanel
            messages={messages}
            input={input}
            isLoading={isLoading}
            isPayrollOpen={isPayrollOpen}
            publicKey={publicKey}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />

          <OrganizationsPanel
            organizations={organizations}
            selectedOrg={selectedOrg}
            isOpen={isPayrollOpen}
            onToggle={handleTogglePanel}
            onSelectOrg={setSelectedOrg}
            onViewDetails={handleViewDetails}
            formatLamports={formatLamports}
          />

          {/* Toggle button - shows when panel is closed */}
          {!isPayrollOpen && (
            <button
              onClick={handleTogglePanel}
              className="fixed right-4 sm:right-6 bottom-20 sm:bottom-auto sm:top-32 p-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl shadow-lg transition-all duration-200 z-40"
              aria-label="Open organizations panel"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;