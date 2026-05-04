import { useState } from 'react';
import { PRONUNCIATION_THEORY } from '../data';
import { Book, PlayCircle, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function PronunciationSection() {
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {!selectedTheory ? (
        <>
          <div className="bg-secondary/10 p-6 rounded-[2rem] border border-secondary/20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-secondary mb-2">Học phát âm thần kỳ ✨</h2>
              <p className="text-slate-600 text-sm">Cùng học các quy tắc phát âm tiếng Anh cơ bản để nói hay như người bản xứ nhé!</p>
            </div>
            <Sparkles className="absolute right-4 bottom-4 text-secondary/30 w-16 h-16" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {PRONUNCIATION_THEORY.map((theory) => (
              <button
                key={theory.id}
                onClick={() => setSelectedTheory(theory.id)}
                className="card-grade3 flex items-center space-x-4 text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <PlayCircle size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{theory.title}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    {theory.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
           <button 
            onClick={() => setSelectedTheory(null)}
            className="text-primary font-medium flex items-center mb-4"
          >
            ← Quay lại
          </button>

          {PRONUNCIATION_THEORY.filter(t => t.id === selectedTheory).map(theory => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={theory.id}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-primary leading-tight">{theory.title}</h2>
              
              <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm leading-relaxed whitespace-pre-line text-slate-700">
                {theory.content}
              </div>

              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                <h4 className="font-bold text-primary mb-4 flex items-center">
                  <Star size={18} className="mr-2 fill-primary" />
                  Bài tập nhanh
                </h4>
                <div className="space-y-6">
                  {theory.exercises?.map((ex, idx) => (
                    <div key={ex.id} className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-800 mb-3">{idx + 1}. {ex.question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {ex.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              if (opt === ex.answer) {
                                alert("Đúng rồi! Giỏi quá! 🌟");
                              } else {
                                alert("Chưa đúng rồi, hãy thử lại nhé! 🎨");
                              }
                            }}
                            className="p-3 border rounded-xl text-left font-medium hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {!theory.exercises && (
                    <p className="text-sm text-slate-600 italic">Tính năng bài tập chuyên sâu đang được phát triển...</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
