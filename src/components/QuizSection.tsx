import { useState, useEffect } from 'react';
import { SAMPLE_QUIZZES } from '../data';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Play, Sparkles, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { speak } from '../services/ttsService';
import { cn } from '../lib/utils';

interface QuizSectionProps {
  onScoreUpdate: (points: number) => void;
}

export default function QuizSection({ onScoreUpdate }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  const currentQuestion = currentQuestionIndex >= 0 ? SAMPLE_QUIZZES[currentQuestionIndex] : null;

  const handleCheck = () => {
    if (!currentQuestion) return;

    const answer = userInput.trim().toLowerCase() || selectedOption?.toLowerCase();
    const isAnswerCorrect = answer === currentQuestion.answer.toLowerCase();

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setSessionScore(prev => prev + 10);
      onScoreUpdate(10);
      speak("Correct!", "en-US");
    } else {
      speak("Oh no, try again!", "en-US");
    }
  };

  const nextQuestion = () => {
    setIsCorrect(null);
    setSelectedOption(null);
    setUserInput('');
    if (currentQuestionIndex < SAMPLE_QUIZZES.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setSessionScore(0);
  };

  if (currentQuestionIndex === -1) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 pt-10">
        <div className="w-32 h-32 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
          <Gamepad2Icon className="text-secondary w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-center">Sẵn sàng để thử thách?</h2>
        <p className="text-slate-500 text-center max-w-[280px]">
          Hoàn thành các câu đố mỗii ngày để nhận được nhiều ngôi sao may mắn nhé!
        </p>
        <button
          onClick={startQuiz}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all w-full max-w-[280px]"
        >
          Bắt đầu ngay!
        </button>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 pt-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-7xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-center">Tuyệt vời!</h2>
        <p className="text-slate-500 text-center">Bạn đã hoàn thành bài tập.</p>
        <div className="bg-primary/5 p-6 rounded-2xl w-full flex flex-col items-center">
          <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">Điểm số</span>
          <span className="text-5xl font-black text-primary">{sessionScore}</span>
        </div>
        <button
          onClick={startQuiz}
          className="bg-secondary text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg w-full max-w-[280px] flex items-center justify-center"
        >
          <RotateCcw size={20} className="mr-2" /> Chơi lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center bg-slate-100 p-2 rounded-full px-4">
        <span className="text-xs font-bold text-slate-500">CÂU {currentQuestionIndex + 1} / {SAMPLE_QUIZZES.length}</span>
        <div className="flex-1 mx-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-500" 
            style={{ width: `${((currentQuestionIndex + 1) / SAMPLE_QUIZZES.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 flex-1">
          {currentQuestion?.type.startsWith('meaning') && (
            <>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nghĩa của từ này là gì?</p>
              <h3 className="text-3xl font-black text-primary">{currentQuestion.question}</h3>
            </>
          )}

          {currentQuestion?.type === 'spelling-missing' && (
            <>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Điền chữ cái còn thiếu</p>
              <h3 className="text-4xl font-black text-primary tracking-widest">{currentQuestion.question}</h3>
            </>
          )}

          {currentQuestion?.type === 'spelling-scrambled' && (
            <>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sắp xếp các chữ sau</p>
              <h3 className="text-4xl font-black text-primary tracking-widest">{currentQuestion.question}</h3>
            </>
          )}

          {currentQuestion?.type === 'listening' && (
            <>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nghe và chọn từ đúng</p>
              <button
                onClick={() => speak(currentQuestion.answer)}
                className="w-24 h-24 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <Volume2 size={48} />
              </button>
              <p className="text-xs text-slate-400 font-medium">Bấm vào loa để nghe</p>
            </>
          )}
        </div>

        {/* Input area */}
        <div className="mt-8 space-y-4">
          {currentQuestion?.options ? (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  disabled={isCorrect !== null}
                  onClick={() => setSelectedOption(option)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center",
                    selectedOption === option ? "border-primary bg-primary/5 text-primary" : "border-slate-100 hover:border-slate-200",
                    isCorrect === true && option === currentQuestion.answer && "border-green-500 bg-green-50 text-green-700",
                    isCorrect === false && selectedOption === option && "border-red-500 bg-red-50 text-red-700"
                  )}
                >
                  {option}
                  {isCorrect === true && option === currentQuestion.answer && <CheckCircle2 size={24} />}
                  {isCorrect === false && selectedOption === option && <XCircle size={24} />}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                disabled={isCorrect !== null}
                placeholder="Nhập câu trả lời của bạn..."
                className={cn(
                  "w-full p-5 rounded-2xl border-2 text-center text-xl font-bold focus:outline-none transition-all",
                  isCorrect === null && "border-slate-100 focus:border-primary",
                  isCorrect === true && "border-green-500 bg-green-50 text-green-700",
                  isCorrect === false && "border-red-500 bg-red-50 text-red-700"
                )}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {isCorrect === null ? (
              <button
                key="check"
                disabled={!userInput && !selectedOption}
                onClick={handleCheck}
                className="w-full bg-primary disabled:opacity-50 text-white p-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                key="next"
                onClick={nextQuestion}
                className="w-full bg-secondary text-white p-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center animate-bounce-subtle"
              >
                Tiếp tục <ArrowRight size={20} className="ml-2" />
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Gamepad2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
  );
}
