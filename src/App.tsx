/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Gamepad2, 
  Mic2, 
  MessageCircle, 
  Trophy, 
  Search, 
  Home,
  ChevronLeft,
  Star,
  Award,
  Volume2
} from 'lucide-react';

import { VOCABULARY_DATA } from './data/vocabulary';
import { PRONUNCIATION_DATA } from './data/pronunciation';
import { speak } from './services/ttsService';
import { askAiTeacher } from './services/aiService';
import { UserProgress, VocabularyWord, QuizType } from './types';

// Screens
type Screen = 'dashboard' | 'vocabulary' | 'quiz-menu' | 'quiz' | 'pronunciation' | 'ai-teacher';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [progress, setProgress] = useState<UserProgress>({
    score: 0,
    stars: 5,
    completedUnits: [],
    completedQuizzes: []
  });

  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [quizType, setQuizType] = useState<QuizType>('spelling');
  
  // Audio Feedback
  const triggerAudio = (text: string) => speak(text);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <header className="bg-primary p-6 rounded-b-3xl shadow-lg sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {currentScreen !== 'dashboard' ? (
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 bg-white/10 rounded-full text-white"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white font-bold">G3</span>
              </div>
              <h1 className="text-white font-bold text-lg">Vocab 3</h1>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold">{progress.stars}</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Trophy size={16} className="text-secondary fill-secondary" />
              <span className="text-white font-bold">{progress.score}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          {currentScreen === 'dashboard' && (
            <Dashboard setScreen={setCurrentScreen} />
          )}
          {currentScreen === 'vocabulary' && (
            <VocabularyScreen 
              selectedUnit={selectedUnit} 
              setSelectedUnit={setSelectedUnit}
              onSpeak={triggerAudio}
            />
          )}
          {currentScreen === 'quiz-menu' && (
            <QuizMenuScreen 
              onSelectQuiz={(type) => {
                setQuizType(type);
                setCurrentScreen('quiz');
              }}
            />
          )}
          {currentScreen === 'quiz' && (
            <QuizEngineScreen 
              type={quizType}
              onFinish={(points, stars) => {
                setProgress(prev => ({
                  ...prev,
                  score: prev.score + points,
                  stars: prev.stars + stars
                }));
                setCurrentScreen('dashboard');
              }}
            />
          )}
          {currentScreen === 'pronunciation' && (
            <PronunciationScreen />
          )}
          {currentScreen === 'ai-teacher' && (
            <AITeacherScreen />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-20 flex justify-around items-center px-4 z-50">
        <NavButton active={currentScreen === 'dashboard'} onClick={() => setCurrentScreen('dashboard')} icon={<Home />} label="Home" />
        <NavButton active={currentScreen === 'vocabulary'} onClick={() => setCurrentScreen('vocabulary')} icon={<Book />} label="Vocab" />
        <NavButton active={currentScreen === 'quiz-menu'} onClick={() => setCurrentScreen('quiz-menu')} icon={<Gamepad2 />} label="Games" />
        <NavButton active={currentScreen === 'ai-teacher'} onClick={() => setCurrentScreen('ai-teacher')} icon={<MessageCircle />} label="Ask AI" />
      </nav>
    </div>
  );
}

// Sub-components as local components for simplicity in this file

function NavButton({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-400'}`}
    >
      <div className={`p-1 rounded-lg ${active ? 'bg-primary/5' : ''}`}>
        {icon}
      </div>
      <span className="text-xs font-bold font-sans uppercase tracking-wider">{label}</span>
    </button>
  );
}

function Dashboard({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Intro Card */}
      <div className="bg-gradient-to-br from-primary to-primary-light p-6 rounded-3xl text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Hi Nam! 👋</h2>
          <p className="text-white/80 text-sm">Ready to learn something new today?</p>
          <div className="mt-6 flex gap-3">
            <button className="bg-white text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-xl">
              Keep Going
            </button>
            <button className="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-bold">
              My Profile
            </button>
          </div>
        </div>
        <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
      </div>

      {/* Grid of features */}
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard 
          icon={<Book className="text-blue-500" />} 
          title="Vocabulary" 
          subtitle="Learn Unit 1-8"
          color="bg-blue-50"
          onClick={() => setScreen('vocabulary')}
        />
        <FeatureCard 
          icon={<Gamepad2 className="text-pink-500" />} 
          title="Quizzes" 
          subtitle="Fun games"
          color="bg-pink-50"
          onClick={() => setScreen('quiz-menu')}
        />
        <FeatureCard 
          icon={<Mic2 className="text-emerald-500" />} 
          title="Pronunciation" 
          subtitle="Speak perfectly"
          color="bg-emerald-50"
          onClick={() => setScreen('pronunciation')}
        />
        <FeatureCard 
          icon={<MessageCircle className="text-orange-500" />} 
          title="AI Teacher" 
          subtitle="Chat with AI"
          color="bg-orange-50"
          onClick={() => setScreen('ai-teacher')}
        />
      </div>

      {/* Daily Stats */}
      <div className="card-glass">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" />
          Weekly Progress
        </h3>
        <div className="flex justify-between items-end h-32 gap-2">
          {[40, 70, 45, 90, 65, 30, 20].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-primary/20 rounded-t-lg transition-all" 
                style={{ height: `${h}%` }}
              >
                <div 
                  className={`w-full bg-primary rounded-t-lg transition-all ${i === 3 ? 'bg-secondary' : ''}`} 
                  style={{ height: '60%' }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, subtitle, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-3xl ${color} border border-transparent hover:border-slate-200 transition-all flex flex-col items-start gap-3 text-left shadow-sm hover:shadow-md active:scale-95`}
    >
      <div className="p-3 bg-white rounded-2xl shadow-sm text-2xl">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
    </button>
  );
}

function VocabularyScreen({ selectedUnit, setSelectedUnit, onSpeak }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const currentTopic = VOCABULARY_DATA.find(v => v.unit === selectedUnit)?.topic || "";

  const filteredVocab = VOCABULARY_DATA.filter(v => 
    v.unit === selectedUnit && 
    (v.word.toLowerCase().includes(searchTerm.toLowerCase()) || v.meaning.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white p-4 rounded-3xl shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4 overflow-x-auto pb-2 gap-2 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(u => (
            <button 
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`min-w-[40px] h-10 rounded-xl font-bold transition-all ${selectedUnit === u ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              U{u}
            </button>
          ))}
        </div>
        <div className="text-center">
          <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Unit {selectedUnit}</span>
          <h2 className="text-xl font-bold text-slate-800">{currentTopic}</h2>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search words..." 
          className="w-full pl-12 pr-4 py-4 bg-white border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredVocab.map(word => (
          <div key={word.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-2xl font-bold text-primary">{word.word}</h3>
                <p className="text-slate-400 font-mono text-sm tracking-wide">{word.ipa}</p>
              </div>
              <button 
                onClick={() => onSpeak(word.audioText)}
                className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                id={`speak-${word.id}`}
              >
                <Volume2 size={24} />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-slate-800 font-semibold mb-1">{word.meaning}</p>
              <p className="text-slate-50 italic text-sm bg-slate-900/5 p-3 rounded-xl border-l-4 border-secondary text-slate-600">
                "{word.example}"
              </p>
            </div>
          </div>
        ))}
        {filteredVocab.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No words found in Unit {selectedUnit}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function QuizMenuScreen({ onSelectQuiz }: { onSelectQuiz: (type: QuizType) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid gap-4 py-4"
    >
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Choose a Game</h2>
      
      <button 
        onClick={() => onSelectQuiz('spelling')}
        className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-primary transition-all flex flex-col items-center gap-4 group"
      >
        <div className="p-4 bg-blue-100 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all text-blue-600">
          <Search size={40} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">Spelling Bee</h3>
          <p className="text-slate-400 text-sm">Find missing letters</p>
        </div>
      </button>

      <button 
        onClick={() => onSelectQuiz('listening')}
        className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-secondary transition-all flex flex-col items-center gap-4 group"
      >
        <div className="p-4 bg-pink-100 rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all text-pink-600">
          <Volume2 size={40} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">Listen & Match</h3>
          <p className="text-slate-400 text-sm">Identify heard words</p>
        </div>
      </button>

      <button 
        onClick={() => onSelectQuiz('meaning')}
        className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-accent transition-all flex flex-col items-center gap-4 group"
      >
        <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all text-emerald-600">
          <Book size={40} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">Word Guru</h3>
          <p className="text-slate-400 text-sm">Vietnamese & English meaning</p>
        </div>
      </button>
    </motion.div>
  );
}

function QuizEngineScreen({ type, onFinish }: { type: QuizType, onFinish: (p: number, s: number) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  
  // Generate some random questions based on vocab
  const questions = VOCABULARY_DATA.slice(0, 5).map(v => {
    if (type === 'spelling') {
      const missingIdx = Math.floor(Math.random() * v.word.length);
      const masked = v.word.split('').map((char, i) => i === missingIdx ? '_' : char).join('');
      return { word: v.word, display: masked, answer: v.word[missingIdx].toLowerCase() };
    }
    if (type === 'listening') {
      const options = [v.word, 'Apple', 'Doctor', 'Teacher'].sort(() => Math.random() - 0.5);
      return { word: v.word, audio: v.word, options, answer: v.word };
    }
    return { word: v.word, question: v.meaning, options: [v.word, 'Orange', 'Paper', 'Blue'].sort(() => Math.random() - 0.5), answer: v.word };
  });

  const question = questions[currentStep];

  const handleAnswer = (ans: string) => {
    if (ans.toLowerCase() === question.answer.toLowerCase()) {
      setScore(score + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onFinish(score + (ans === question.answer ? 10 : 0), 1);
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 py-8 text-center">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
        <span className="font-bold text-slate-400">Step {currentStep + 1} / {questions.length}</span>
        <span className="font-bold text-primary">Score: {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center gap-6"
        >
          {type === 'spelling' && (
            <>
              <h2 className="text-5xl font-bold tracking-widest text-primary uppercase">{question.display}</h2>
              <p className="text-slate-400">Type the missing letter</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {'abcdefghijklmnopqrstuvwxyz'.split('').map(char => (
                  <button 
                    key={char} 
                    onClick={() => handleAnswer(char)}
                    disabled={feedback !== null}
                    className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-lg font-bold hover:bg-primary hover:text-white transition-all uppercase"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </>
          )}

          {type === 'listening' && (
            <>
              <button 
                onClick={() => speak(question.audio!)}
                className="w-24 h-24 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-100 transition-all shadow-xl"
              >
                <Volume2 size={48} />
              </button>
              <h2 className="text-xl font-bold">Listen and pick the word</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {question.options?.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="p-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold hover:border-secondary transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {type === 'meaning' && (
            <>
              <h2 className="text-3xl font-bold mb-4">{question.question}</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {question.options?.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="p-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold hover:border-primary transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Feedback Overlay */}
      {feedback && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-full shadow-2xl z-50 ${feedback === 'correct' ? 'bg-accent text-white' : 'bg-red-500 text-white'}`}
        >
          {feedback === 'correct' ? <Trophy size={64} /> : <span className="text-4xl font-bold">Try Again!</span>}
        </motion.div>
      )}
    </div>
  );
}

function PronunciationScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Learn Pronunciation</h2>
      {PRONUNCIATION_DATA.map(topic => (
        <div key={topic.id} className="card-glass">
          <h3 className="text-xl font-bold text-primary mb-3">{topic.title}</h3>
          <div className="bg-blue-50 p-4 rounded-xl mb-4 border-l-4 border-primary">
            <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{topic.theory}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Examples</h4>
            <div className="flex gap-3 flex-wrap">
              {topic.examples.map((ex, i) => (
                <button 
                  key={i}
                  onClick={() => speak(ex.audio)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <Volume2 size={16} />
                  <span className="font-semibold">{ex.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function AITeacherScreen() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const response = await askAiTeacher(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
          <MessageCircle />
        </div>
        <div>
          <h2 className="font-bold">Teacher Smarty</h2>
          <p className="text-xs text-emerald-500 font-bold">Online & Ready to Help!</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
        <div className="max-w-[80%] bg-orange-50 p-4 rounded-2xl rounded-tl-none border border-orange-100">
          <p className="text-slate-800 text-sm">Hello! I'm Teacher Smarty. How can I help you with your English today? 🍎</p>
        </div>
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'ml-auto bg-primary text-white rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none text-slate-800'}`}
          >
            <p className="text-sm">{m.text}</p>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 p-2">
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..." 
          className="flex-1 px-4 py-4 bg-white rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-primary text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

