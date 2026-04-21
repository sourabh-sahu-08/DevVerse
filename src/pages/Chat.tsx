import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState<{user: string, text: string}[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In dev, connect to the same port. Use window.location.origin to handle deployed URL seamlessly
    socketRef.current = io(window.location.origin);
    
    socketRef.current.emit("join-room", "global-dsa-room");

    socketRef.current.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    socketRef.current?.emit("send-message", {
      roomId: "global-dsa-room",
      user: "Alex Student",
      text: input,
    });
    setInput("");
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto h-[calc(100vh-6rem)] flex flex-col gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Chat Hub</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Real-time collaboration room: "global-dsa-room"</p>
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
        <div className="w-full h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 shrink-0 justify-between">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Connect</span>
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">global-dsa-room</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
          {messages.length === 0 && (
             <div className="flex items-center justify-center h-full text-slate-400 font-medium text-sm">
                No messages yet. Say hi!
             </div>
          )}
          {messages.map((msg, i) => {
            const isMe = msg.user === "Alex Student";
            return (
              <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">{msg.user}</span>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] md:max-w-[70%] text-sm font-medium shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-900 rounded-bl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share a thought or code snippet..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-shadow bg-slate-50"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 px-6 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm focus:ring focus:ring-indigo-300 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
