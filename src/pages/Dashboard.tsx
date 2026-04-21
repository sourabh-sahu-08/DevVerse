import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  if (!profile) return <div className="p-8 text-slate-500 font-medium">Loading dashboard...</div>;

  const progress = (profile.xp % 1000) / 10; // Simple calc for next level

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Welcome back, {profile.name}!</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Here is your learning progress for today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Current Level</h3>
          <div className="mt-2 flex items-end gap-2 flex-col items-center flex-1">
            <span className="text-4xl font-bold text-slate-900 mb-2">{profile.level}</span>
             <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-indigo-100 text-indigo-700">Rank</div>
          </div>
          <div className="mt-6 w-full">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wide">Next Level</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <div className="flex justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total XP</h3>
             <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center py-4">
            <span className="text-5xl font-bold text-emerald-600 tracking-tighter">{profile.xp}</span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-2">Global Points</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 text-center bg-slate-50 border border-slate-100 p-2 rounded-lg">Top 15% among active peers</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Unlocked Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {profile.badges.map((badge: string, i: number) => {
              const bgColors = ["bg-amber-50 border-amber-100", "bg-blue-50 border-blue-100", "bg-emerald-50 border-emerald-100", "bg-rose-50 border-rose-100"];
              const icons = ["🏆", "🔥", "🚀", "⭐️", "⚡️", "🧠", "💎"];
              return (
              <div key={badge} className={`aspect-square rounded-lg flex items-center justify-center border text-2xl shadow-sm ${bgColors[i % bgColors.length]}`} title={badge}>
                 {icons[i % icons.length]}
              </div>
            )})}
            <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 opacity-40 shadow-sm" title="Locked">🔒</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-hidden flex flex-col relative">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Recommended Mentors</h2>
          <div className="space-y-4 relative z-10 flex-1">
             <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg shadow-sm hover:border-indigo-200 cursor-pointer transition-colors">
               <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 text-lg">SE</div>
               <div className="flex-[1]">
                 <span className="text-[10px] text-indigo-600 font-bold tracking-widest uppercase mb-1 block">98% Match</span>
                 <p className="text-sm font-bold text-slate-900">Sarah Engineer</p>
                 <p className="text-[11px] font-medium text-slate-500">Senior Go Developer • Scale Inc</p>
               </div>
               <button className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded font-bold hover:bg-slate-800 focus:ring focus:ring-slate-300">Request</button>
             </div>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-xl p-6 text-white relative overflow-hidden shadow-sm flex flex-col justify-center">
          <div className="relative z-10">
            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded tracking-widest flex w-fit uppercase">Today's Quest</span>
            <h3 className="text-2xl font-bold mt-2 tracking-tight">Valid Parentheses</h3>
            <p className="text-indigo-200 text-sm mt-1 max-w-md font-medium leading-relaxed">Practice stack operations. Recommended for your skill level in Arrays & Strings.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-indigo-950/20 hover:bg-slate-50 active:scale-95 transition-all">Start Solving</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-bold text-sm backdrop-blur-md transition-colors active:scale-95">View Editorial</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-indigo-500/20 rounded-full translate-y-1/4 translate-x-1/4 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-8 text-6xl opacity-10 font-bold italic select-none pointer-events-none tracking-tighter">+50 XP</div>
        </div>
      </div>
    </div>
  );
}
