import { Code2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DSA() {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
      fetch("/api/problems")
        .then((res) => res.json())
        .then((data) => setProblems(data));
    }, []);

    const getColor = (diff: string) => {
        switch(diff.toLowerCase()) {
            case "easy": return "text-emerald-700 bg-emerald-50 border-emerald-200/60";
            case "medium": return "text-amber-700 bg-amber-50 border-amber-200/60";
            case "hard": return "text-rose-700 bg-rose-50 border-rose-200/60";
            default: return "text-slate-700 bg-slate-50 border-slate-200";
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">DSA Arena</h1>
                <p className="text-slate-500 font-medium mt-1 text-sm md:text-base max-w-2xl">Practice algorithmic problems to strengthen your foundations and earn XP.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">State</th>
                            <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Problem</th>
                            <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">Difficulty</th>
                            <th className="px-6 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">XP Reward</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {problems.map((prob: any) => (
                            <tr key={prob.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap">
                                   <div className="w-5 h-5 rounded-[0.25rem] border border-slate-300 group-hover:border-indigo-400 bg-slate-50 shadow-sm transition-colors" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-slate-800 tracking-tight">{prob.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 inline-flex text-[10px] font-bold tracking-widest uppercase rounded border ${getColor(prob.difficulty)}`}>
                                        {prob.difficulty}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded shadow-sm">
                                        +{prob.xp} XP
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
