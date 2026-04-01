"use client";

import { useState, useEffect } from "react";
import { Timetable } from "@/components/Timetable";
import { ChatSidebar } from "@/components/ChatSidebar";
import { useTimetableStore } from "@/lib/store";

function AdminLoginModal({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim() }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError("Incorrect PIN");
        setPin("");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-bg-card border border-zinc-700/60 rounded-2xl p-6 w-full max-w-[320px] animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-accent-bg border border-accent-purple/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#818cf8" strokeWidth="1.3" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="#818cf8" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-zinc-100">Admin Login</h3>
            <p className="text-[11px] text-zinc-500">Enter PIN to edit progress & use chat</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(""); }}
            placeholder="Enter PIN"
            autoFocus
            className="w-full bg-bg-base border border-zinc-700 rounded-xl px-4 py-3 text-center text-[16px] tracking-[0.3em] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-accent-purple/60 transition-colors font-mono"
          />
          {error && (
            <p className="text-[12px] text-red-400 mt-2 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={!pin.trim() || loading}
            className="w-full mt-4 bg-accent-purple hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-xl py-2.5 transition-all duration-150 active:scale-[0.98]"
          >
            {loading ? "Verifying..." : "Unlock"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-2 text-[12px] text-zinc-500 hover:text-zinc-300 py-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin, setAdmin } = useTimetableStore();

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved === "true") setAdmin(true);
  }, [setAdmin]);

  const handleLoginSuccess = () => {
    setAdmin(true);
    sessionStorage.setItem("admin_auth", "true");
    setShowLogin(false);
  };

  const handleLogout = () => {
    setAdmin(false);
    sessionStorage.removeItem("admin_auth");
    setChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <main
        className="transition-all duration-300"
        style={{
          marginRight: chatOpen && isAdmin ? "min(420px, 100vw)" : "0",
          transition: "margin-right 280ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <Timetable />
        <div className="h-24" />
      </main>

      {isAdmin && <ChatSidebar open={chatOpen} onClose={() => setChatOpen(false)} />}

      {showLogin && (
        <AdminLoginModal
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Bottom-right buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Admin status / login button */}
        {isAdmin ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/80 border border-zinc-700/60 rounded-full text-[11px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-all backdrop-blur-sm"
              title="Logout"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="3" fill="#4ade80" />
              </svg>
              Admin
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-0.5 opacity-60">
                <path d="M2 3L5 6L8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/80 border border-zinc-700/60 rounded-full text-[11px] text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all backdrop-blur-sm"
            title="Admin login"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
              <path d="M4 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            Admin
          </button>
        )}

        {/* Chat toggle — only for admin */}
        {isAdmin && (
          <button
            onClick={() => setChatOpen((o) => !o)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 active:scale-95 ${
              chatOpen
                ? "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700"
                : "bg-accent-purple hover:bg-indigo-400 text-white"
            }`}
            style={{
              boxShadow: chatOpen ? "none" : "0 8px 32px rgba(129, 140, 248, 0.35)",
              transition: "all 150ms ease",
              transform: chatOpen ? "scale(0.95)" : "scale(1)",
            }}
            title={chatOpen ? "Close chat" : "Open AI Coach"}
          >
            {chatOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 7h14M4 11h10M4 15h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="18" cy="15" r="3" fill="white" opacity="0.9" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
