// app/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Home() {
    const [input, setInput] = useState(''); // Manual input state
    const { messages, sendMessage, status } = useChat({
        // api: '/api/chat', // Defaults to this; explicit if needed
        // Tools handled server-side; no 'tools' here
    });

    // Use hook's status for loading
    const isLoading = status === 'streaming';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage({ text: input }); // Send as UIMessage with text part
            setInput('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // Collect used tools from parts (e.g., tool-input-start events)
    const getUsedTools = (message: typeof messages[0]) => {
        return message.parts
            .filter((part) => part.type === 'tool-input-start')
            .map((part) => (part as unknown as { toolName: string }).toolName)
            .join(', ');
    };

    // Render message content from parts
    const renderMessageContent = (message: typeof messages[0]) => {
        return message.parts
            .map((part) => {
                switch (part.type) {
                    case 'text':
                        return (part as unknown as { text: string }).text; // Aggregated text part
                    case 'tool-input-start':
                        return `[Calling tool: ${(part as unknown as { toolName: string }).toolName}]`;
                    case 'tool-output-available':
                        return `[Tool result: ${JSON.stringify((part as unknown as { output: unknown }).output)}]`;
                    default:
                        return '';
                }
            })
            .join('');
    };

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Hello World MCP Chat</h1>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`p-4 rounded-lg ${message.role === 'user'
                                ? 'bg-blue-500 text-white ml-auto'
                                : 'bg-gray-200 text-black'
                            } max-w-[80%]`}
                    >
                        <p className="font-semibold mb-1">
                            {message.role === 'user' ? 'You' : 'AI'}
                        </p>
                        <p>{renderMessageContent(message)}</p>

                        {/* Show which tools were used */}
                        {getUsedTools(message) && (
                            <div className="mt-2 text-xs opacity-75">
                                🔧 Used tools: {getUsedTools(message)}
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="bg-gray-200 text-black p-4 rounded-lg">
                        <p className="animate-pulse">AI is thinking...</p>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    className="flex-1 p-3 border rounded-lg"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    );
}