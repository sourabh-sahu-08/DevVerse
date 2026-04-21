import { BookOpen, FileCode2, Database, LayoutTemplate, Map, Code2, Users2, LayoutDashboard } from "lucide-react";

export default function Docs() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-12 pb-24">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Architecture & MVP Plan</h1>
        <p className="mt-3 text-slate-500 font-medium text-lg max-w-3xl leading-relaxed">Here is the full breakdown of how this MERN application is structured, including Schemas, Logic, API Design, and the 30-Day Roadmap.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3 border-b border-slate-200 pb-3 text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <FileCode2 className="w-4 h-4 text-indigo-600" />
          </div>
          1. Folder Structure
        </h2>
        <pre className="p-5 bg-slate-900 text-slate-300 rounded-xl text-sm overflow-x-auto shadow-sm border border-slate-800 leading-relaxed font-mono">
{`DevVerse-MVP/
├─ server/               # Express Backend
│  ├─ controllers/       # Route logic (auth, user, mentor)
│  ├─ models/            # Mongoose Schemas
│  ├─ routes/            # Express Routers
│  ├─ middleware/        # JWT/Auth validation
│  ├─ socket/            # Socket.io event handlers
│  └─ server.ts          # Main Express entry (Mongoose + Socket.io + Vite)
├─ src/                  # React Frontend (Vite)
│  ├─ components/        # Reusable UI (Buttons, Modals)
│  ├─ layouts/           # AppLayout (Sidebar, Topbar)
│  ├─ pages/             # Dashboard, Chat, Mentors, Profile
│  └─ lib/               # utils (clsx, tailwind-merge)
├─ package.json
└─ .env.example`}
        </pre>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3 border-b border-slate-200 pb-3 text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          2. MongoDB Schema (Mongoose)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">User Schema</h3>
                <pre className="text-xs text-slate-600 font-mono flex-1 overflow-x-auto">{`{
  name: { type: String, required: true },
  email: { type: String, unique: true },
  firebaseUid: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: String, default: "Beginner" }, // Beginner, Intern, Pro
  skills: [String],
  github: String,
  role: { type: String, enum: ["student", "mentor"] }
}`}</pre>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">MentorshipRequest Schema</h3>
                <pre className="text-xs text-slate-600 font-mono flex-1 overflow-x-auto">{`{
  mentorId: { type: ObjectId, ref: "User" },
  menteeId: { type: ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "rejected"] },
  message: String
}`}</pre>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Problem Schema</h3>
                <pre className="text-xs text-slate-600 font-mono flex-1 overflow-x-auto">{`{
  title: String,
  description: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  xpReward: Number,
  testCases: [{ input: String, expectedOutput: String }]
}`}</pre>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Message (Chat) Schema</h3>
                <pre className="text-xs text-slate-600 font-mono flex-1 overflow-x-auto">{`{
  roomId: String,
  senderId: { type: ObjectId, ref: "User" },
  text: String,
  timestamp: { type: Date, default: Date.now }
}`}</pre>
            </div>
        </div>
      </section>

       <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3 border-b border-slate-200 pb-3 text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
             <LayoutTemplate className="w-4 h-4 text-amber-600" />
          </div>
          3. Core Logic & Architecture
        </h2>
        
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
             <div>
                <h4 className="font-bold text-slate-900 tracking-tight text-lg mb-2">Leveling System (XP Logic):</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">Levels are entirely derived from XP. No manual input. The backend recalculates level on XP gain:</p>
                <code className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 p-3 rounded-lg mt-3 block font-mono">
                    const calculateLevel = (xp) =&gt; xp &lt; 1000 ? 'Beginner' : xp &lt; 5000 ? 'Intern' : 'Pro';
                </code>
             </div>
             
             <div>
                <h4 className="font-bold text-slate-900 tracking-tight text-lg mb-2">Mentor Matching Logic:</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">Database query: Find users with role="mentor" where mentor.skills intersects with mentee's requested skills. Sorting by level.</p>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 tracking-tight text-lg mb-2">Chat Architecture (Socket.io vs Firebase):</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                   For an MVP, <b className="text-slate-900">Socket.io + MongoDB</b> is preferred if you are running Express, to keep all logic centralized.
                   Users join rooms via <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900 font-mono text-xs font-bold border border-slate-200">socket.join(roomId)</code>. Messages are broadcast to the room and simultaneously saved to MongoDB.
                </p>
             </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3 border-b border-slate-200 pb-3 text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center">
            <Map className="w-4 h-4 text-rose-600" />
          </div>
          4. 30-Day Step-by-Step Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Map className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg tracking-tight z-10 relative">Week 1: Setup & Auth</h4>
                <ul className="list-disc pl-5 mt-4 text-sm text-slate-500 font-medium space-y-1.5 z-10 relative marker:text-indigo-400">
                    <li>Initialize MERN project structure.</li>
                    <li>Setup MongoDB Atlas (free tier) and Express.</li>
                    <li>Implement Firebase Auth on Frontend.</li>
                    <li>Create "/api/user" route to sync Firebase UID with MongoDB.</li>
                    <li>Build landing page and AppLayout (Sidebar).</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Code2 className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg tracking-tight z-10 relative">Week 2: Profile & DSA</h4>
                <ul className="list-disc pl-5 mt-4 text-sm text-slate-500 font-medium space-y-1.5 z-10 relative marker:text-indigo-400">
                    <li>Build Dashboard & Profile UI.</li>
                    <li>Seed MongoDB with DSA Problems.</li>
                    <li>Create Problem listing and submission UI.</li>
                    <li>Implement XP Awarding System logic.</li>
                </ul>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Users2 className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg tracking-tight z-10 relative">Week 3: Connections & Chat</h4>
                <ul className="list-disc pl-5 mt-4 text-sm text-slate-500 font-medium space-y-1.5 z-10 relative marker:text-indigo-400">
                    <li>Build Mentor Directory with Skill matching view.</li>
                    <li>Create backend routes for Requesting/Accepting Mentors.</li>
                    <li>Implement Socket.io server logic.</li>
                    <li>Build real-time chat UI.</li>
                </ul>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <LayoutDashboard className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg tracking-tight z-10 relative">Week 4: Polish & Deploy</h4>
                <ul className="list-disc pl-5 mt-4 text-sm text-slate-500 font-medium space-y-1.5 z-10 relative marker:text-indigo-400">
                    <li>Add Gamification (Badges logic, Daily streaks).</li>
                    <li>Write environment config (.env validations).</li>
                    <li>Deploy Frontend to Vercel.</li>
                    <li>Deploy Backend to Render or Railway (Free Tier).</li>
                </ul>
            </div>
        </div>
      </section>

    </div>
  );
}
