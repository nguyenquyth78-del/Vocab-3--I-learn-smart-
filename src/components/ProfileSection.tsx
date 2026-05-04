import { User, Award, Star, Trophy, ArrowRight, Settings } from 'lucide-react';

interface ProfileSectionProps {
  score: number;
  stars: number;
}

export default function ProfileSection({ score, stars }: ProfileSectionProps) {
  const badges = [
    { name: 'Người mới', icon: '🌱', unlocked: true },
    { name: 'Chăm chỉ', icon: '🐝', unlocked: score > 50 },
    { name: 'Ngôi sao', icon: '⭐', unlocked: stars > 5 },
    { name: 'Chuyên gia', icon: '🏆', unlocked: score > 100 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
            <User size={48} className="text-primary" />
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 bg-secondary text-white rounded-full border-2 border-white shadow-md">
            <Settings size={14} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Học sinh lớp 3</h2>
          <p className="text-sm text-slate-500">ID: 12345678</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10 flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-md">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Điểm số</p>
            <p className="text-xl font-black text-primary">{score}</p>
          </div>
        </div>
        <div className="bg-secondary/5 p-4 rounded-3xl border border-secondary/10 flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-md">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ngôi sao</p>
            <p className="text-xl font-black text-secondary">{stars}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Award size={18} className="mr-2 text-primary" />
          Danh hiệu của bạn
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {badges.map((badge, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                badge.unlocked ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-40 grayscale'
              }`}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[8px] font-bold text-center uppercase tracking-tighter whitespace-nowrap">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
          <h4 className="font-bold text-lg mb-1">Chuỗi học tập 🔥</h4>
          <p className="text-xs text-white/60 mb-4">Duy trì việc học hàng ngày để tăng chuỗi nhé!</p>
          <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4">
             {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => (
               <div key={i} className="flex flex-col items-center space-y-1">
                 <span className="text-[8px] font-bold text-white/40">{day}</span>
                 <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-secondary' : 'bg-white/20'}`}></div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
