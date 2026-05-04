import { useState } from 'react';
import { Search, Volume2, ChevronRight } from 'lucide-react';
import { SAMPLE_VOCABULARY } from '../data';
import { speak } from '../services/ttsService';
import { motion } from 'motion/react';

export default function VocabularySection() {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const units = Array.from({ length: 8 }, (_, i) => i + 1);

  const filteredWords = SAMPLE_VOCABULARY.filter(word => {
    const matchesUnit = selectedUnit ? word.unit === selectedUnit : true;
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          word.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  if (selectedUnit === null && searchQuery === '') {
    return (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm từ vựng..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span className="w-2 h-6 bg-secondary rounded-full mr-2"></span>
            Chọn Unit để học
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {units.map((unit) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:border-primary/30 hover:shadow-md transition-all active:scale-95"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {unit}
                </div>
                <span className="font-semibold text-slate-700">Unit {unit}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-10">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => { setSelectedUnit(null); setSearchQuery(''); }}
          className="text-primary font-medium flex items-center"
        >
          <ChevronRight size={20} className="rotate-180 mr-1" />
          Quay lại
        </button>
        <div className="relative flex-1 ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm từ..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold">
        {selectedUnit ? `Unit ${selectedUnit}` : 'Kết quả tìm kiếm'}
      </h2>

      <div className="space-y-4">
        {filteredWords.length > 0 ? (
          filteredWords.map((word, index) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={word.id}
              className="card-grade3 flex flex-col space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-primary">{word.word}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-slate-500 font-mono italic">{word.ipa}</p>
                    {word.topic && (
                      <span className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {word.topic}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => speak(word.word)}
                  className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              <div className="pt-1">
                <p className="text-lg font-medium text-slate-800">{word.meaning}</p>
                <p className="text-sm text-slate-600 mt-1 italic">"{word.example}"</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400">
            Không tìm thấy từ nào phù hợp 😅
          </div>
        )}
      </div>
    </div>
  );
}
