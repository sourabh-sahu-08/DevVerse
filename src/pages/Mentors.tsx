import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch("/api/mentors")
      .then((res) => res.json())
      .then((data) => setMentors(data));
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Find a Mentor</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm md:text-base max-w-2xl">Connect with seniors and industry professionals to boost your skills and receive career guidance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {mentors.map((mentor: any) => (
          <div key={mentor.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start gap-4 hover:border-indigo-200 transition-colors">
            <img
              src={`https://picsum.photos/seed/${mentor.name.replace(" ", "")}/100/100`}
              alt={mentor.name}
              className="w-16 h-16 rounded-full border border-slate-100 shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">{mentor.name}</h3>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">{mentor.level}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {mentor.skills.map((skill: string) => (
                  <span key={skill} className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-indigo-100/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <button className="flex items-center justify-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm focus:ring focus:ring-slate-300 active:scale-95">
              <UserPlus className="w-3.5 h-3.5" /> Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
