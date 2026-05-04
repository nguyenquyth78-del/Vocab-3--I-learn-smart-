/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Gamepad2, 
  Headphones, 
  Mic2, 
  MessageCircle, 
  User,
  Search,
  ChevronLeft,
  Volume2,
  Star,
  Trophy
} from 'lucide-react';
import { cn } from './lib/utils';

// Components (will be moved to separate files)
import VocabularySection from './components/VocabularySection';
import QuizSection from './components/QuizSection';
import PronunciationSection from './components/PronunciationSection';
import AISection from './components/AISection';
import ProfileSection from './components/ProfileSection';

type Tab = 'vocab' | 'quiz' | 'pronunciation' | 'ai' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('vocab');
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);

  const NavItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex flex-col items-center justify-center space-y-1 py-2 px-1 transition-all duration-300 relative",
        activeTab === id ? "text-primary" : "text-slate-400 hover:text-slate-600"
      )}
    >
      <Icon size={24} className={cn(activeTab === id && "scale-110")} />
      <span className="text-[10px] font-medium">{label}</span>
      {activeTab === id && (
        <motion.div
          layoutId="activeTab"
          className="absolute -top-1 w-12 h-1 bg-primary rounded-full"
        />
      )}
    </button>
  );

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-primary text-white rounded-b-[2rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-2xl font-bold title-display tracking-tight">Vocab 3</h1>
            <p className="text-xs text-white/80">Smart Start for Grade 3</p>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold">{stars}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="flex items-center space-x-1">
              <Trophy size={16} className="text-secondary fill-secondary" />
              <span className="text-xs font-bold">{score}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'vocab' && <VocabularySection />}
            {activeTab === 'quiz' && <QuizSection onScoreUpdate={(s) => { setScore(prev => prev + s); setStars(prev => prev + Math.floor(s/10)); }} />}
            {activeTab === 'pronunciation' && <PronunciationSection />}
            {activeTab === 'ai' && <AISection />}
            {activeTab === 'profile' && <ProfileSection score={score} stars={stars} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-slate-100 px-6 py-2 pb-6 grid grid-cols-5 gap-1 z-50">
        <NavItem id="vocab" icon={BookOpen} label="Học từ" />
        <NavItem id="quiz" icon={Gamepad2} label="Trò chơi" />
        <NavItem id="pronunciation" icon={Headphones} label="Phát âm" />
        <NavItem id="ai" icon={MessageCircle} label="Cô Joy AI" />
        <NavItem id="profile" icon={User} label="Cá nhân" />
      </nav>
    </div>
  );
}

