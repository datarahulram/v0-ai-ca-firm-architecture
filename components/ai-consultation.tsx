'use client';

import { Send, Loader } from 'lucide-react';
import { useState } from 'react';

export function AIConsultation() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Financial Advisor. Ask me anything about your finances, tax strategies, growth opportunities, or compliance requirements.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        tax: 'Based on your financial profile, I recommend implementing quarterly estimated tax payments and exploring S-Corp election benefits. This could save you up to 15% on self-employment taxes.',
        growth:
          'Your YoY growth of 18.5% is excellent. To accelerate further, consider: 1) Diversifying your revenue streams, 2) Implementing referral programs, 3) Automating your operations.',
        cash:
          'Your cash position is healthy with 2.1 months of expenses covered. I recommend maintaining 3 months for optimal flexibility and considering a line of credit for emergencies.',
        expense:
          'I noticed some uncategorized expenses. Let me help: Organize them by category, track recurring expenses separately, and implement expense budgets for better cost control.',
      };

      let aiResponse = responses.tax;
      if (userMessage.toLowerCase().includes('growth')) aiResponse = responses.growth;
      if (userMessage.toLowerCase().includes('cash')) aiResponse = responses.cash;
      if (userMessage.toLowerCase().includes('expense')) aiResponse = responses.expense;

      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[600px] rounded-lg border border-border bg-card overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground border border-border'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-lg bg-muted border border-border">
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-card/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about taxes, growth, or finances..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
