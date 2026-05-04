import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Info } from 'lucide-react';
import { askTeacher } from '../services/aiService';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AISection() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Chào con! Cô là Joy, giáo viên tiếng Anh của con. Con có câu hỏi gì về từ vựng hôm nay không? 🌟' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await askTeacher(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response || 'Sorry, I missed that!' }]);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-md">
          <Smile className="text-white" size={28} />
        </div>
        <div>
          <h2 className="font-bold text-slate-800">Cô Joy</h2>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đang trực tuyến</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide pb-4"
      >
        {messages.map((msg, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}
            >
              <div className="markdown-body">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-none flex space-x-1 items-center">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="relative mt-auto">
        <input
          type="text"
          placeholder="Hỏi cô Joy về tiếng Anh..."
          className="w-full pl-4 pr-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
