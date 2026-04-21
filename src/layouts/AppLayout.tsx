import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Code2, LayoutDashboard, MessageSquare, Users2 } from "lucide-react";
import { cn } from "../lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "DSA Practice", href: "/dsa", icon: Code2 },
  { name: "Mentors", href: "/mentors", icon: Users2 },
  { name: "Chat Hub", href: "/chat", icon: MessageSquare },
  { name: "Docs & Roadmap", href: "/docs", icon: BookOpen },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden text-slate-900">
      {/* Top Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 relative z-10 transition-colors">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">DevVerse</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "relative py-5 transition-colors hidden md:block",
                    isActive ? "text-indigo-600 border-b-2 border-indigo-600" : "hover:text-slate-900"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right mr-2 hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 font-sans uppercase tracking-widest">Server Status</p>
            <p className="text-[11px] text-emerald-500 font-mono font-medium">v1.0.4-stable</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-200 shadow-sm overflow-hidden bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
            <img src="https://picsum.photos/seed/alex/100/100" alt="Alex" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Bar: System Tickers */}
      <footer className="h-8 bg-slate-900 flex items-center px-6 gap-6 sm:gap-8 shrink-0 z-10 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest hidden sm:inline-block">412 Active Students</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest sm:hidden">412 Online</span>
        </div>
        <div className="items-center gap-2 hidden md:flex shrink-0 opacity-80">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Latest:</span>
          <span className="text-[10px] text-slate-300">user892 accepted "Two Sum" - 5s ago</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] text-slate-500 font-mono shadow-sm">Ping: 42ms</span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block">DB: Atlas-Cluster-0</span>
        </div>
      </footer>
    </div>
  );
}
