"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTimetableStore } from "@/lib/store";
import { WEEKS } from "@/lib/data";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isSearching?: boolean;
  searchQueries?: string[];
  timetableActions?: TimetableAction[];
}

interface TimetableAction {
  action: "mark_complete" | "mark_incomplete" | "add_note";
  week_id: string;
  day_index: number;
  note?: string;
}

function MarkdownText({ content }: { content: string }) {
  const renderLine = (line: string, key: number) => {
    if (line.startsWith("### ")) return <h3 key={key} className="font-semibold text-zinc-200 text-sm mt-3 mb-1">{line.slice(4)}</h3>;
    if (line.startsWith("## ")) return <h2 key={key} className="font-semibold text-zinc-100 text-sm mt-3 mb-1">{line.slice(3)}</h2>;
    if (line.startsWith("# ")) return <h1 key={key} className="font-semibold text-zinc-100 text-[15px] mt-3 mb-1">{line.slice(2)}</h1>;
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return <li key={key} className="text-zinc-300 text-[13px] leading-relaxed ml-4 list-disc">{renderInline(line.slice(2))}</li>;
    }
    if (line.match(/^\d+\. /)) {
      return <li key={key} className="text-zinc-300 text-[13px] leading-relaxed ml-4 list-decimal">{renderInline(line.replace(/^\d+\. /, ""))}</li>;
    }
    if (line === "") return <br key={key} />;
    return <p key={key} className="text-zinc-300 text-[13px] leading-relaxed">{renderInline(line)}</p>;
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-zinc-100">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={i} className="bg-zinc-800 text-zinc-200 px-1 rounded text-[12px] font-mono">{part.slice(1, -1)}</code>;
      }
      if (part.match(/^\[[^\]]+\]\([^)]+\)$/)) {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) return <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-accent-purple underline underline-offset-2 hover:text-indigo-300">{m[1]}</a>;
      }
      return part;
    });
  };

  const blocks: React.ReactNode[] = [];
  let inCode = false;
  let codeLang = "";
  let codeLines: string[] = [];
  let textLines: string[] = [];

  const flushText = () => {
    if (textLines.length) {
      blocks.push(
        <div key={blocks.length} className="chat-markdown">
          {textLines.map((line, i) => renderLine(line, i))}
        </div>
      );
      textLines = [];
    }
  };

  for (const line of content.split("\n")) {
    if (line.startsWith("```")) {
      if (!inCode) {
        flushText();
        inCode = true;
        codeLang = line.slice(3);
        codeLines = [];
      } else {
        blocks.push(
          <div key={blocks.length} className="chat-code my-2">
            {codeLang && <div className="text-[10px] text-zinc-500 mb-1">{codeLang}</div>}
            <pre className="whitespace-pre-wrap text-[12px] text-zinc-300">{codeLines.join("\n")}</pre>
          </div>
        );
        inCode = false;
        codeLines = [];
        codeLang = "";
      }
    } else if (inCode) {
      codeLines.push(line);
    } else {
      textLines.push(line);
    }
  }
  flushText();
  if (inCode && codeLines.length) {
    blocks.push(
      <div key={blocks.length} className="chat-code">
        <pre className="whitespace-pre-wrap text-[12px] text-zinc-300">{codeLines.join("\n")}</pre>
      </div>
    );
  }

  return <>{blocks}</>;
}

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "What should I focus on today?",
  "Explain RAG in simple terms",
  "How does LoRA fine-tuning work?",
  "Search for the latest LangGraph updates",
  "Mark week 0 day 1 as complete",
];

export function ChatSidebar({ open, onClose }: ChatSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toggleDayDone, setDayNote, getDayState } = useTimetableStore();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const applyTimetableAction = useCallback((action: TimetableAction) => {
    if (action.action === "mark_complete") {
      const ds = useTimetableStore.getState().getDayState(action.week_id, action.day_index);
      if (!ds.done) toggleDayDone(action.week_id, action.day_index);
    } else if (action.action === "mark_incomplete") {
      const ds = useTimetableStore.getState().getDayState(action.week_id, action.day_index);
      if (ds.done) toggleDayDone(action.week_id, action.day_index);
    } else if (action.action === "add_note" && action.note) {
      setDayNote(action.week_id, action.day_index, action.note);
    }
  }, [toggleDayDone, setDayNote]);

  const buildProgressSnapshot = useCallback(() => {
    let totalDays = 0;
    let doneDays = 0;
    const weekSummaries: string[] = [];
    let currentWeek: string | null = null;

    for (const week of WEEKS) {
      const weekDone = week.days.filter((_, i) => getDayState(week.id, i).done).length;
      totalDays += week.days.length;
      doneDays += weekDone;

      if (weekDone === week.days.length) {
        weekSummaries.push(`${week.label} (${week.id}): COMPLETE (${weekDone}/${week.days.length} days)`);
      } else if (weekDone > 0) {
        const completedDays = week.days
          .map((d, i) => getDayState(week.id, i).done ? d.name : null)
          .filter(Boolean);
        weekSummaries.push(`${week.label} (${week.id}): IN PROGRESS (${weekDone}/${week.days.length} days done: ${completedDays.join(", ")})`);
        currentWeek = week.label;
      }
    }

    if (doneDays === 0) {
      return `PROGRESS: Dhanush has NOT started the roadmap yet. 0/${totalDays} days completed. No weeks have any progress. Dhanush is at the very beginning.`;
    }

    return [
      `PROGRESS: ${doneDays}/${totalDays} days completed (${Math.round((doneDays / totalDays) * 100)}%).`,
      currentWeek ? `Currently on: ${currentWeek}.` : "",
      `Week breakdown:`,
      ...weekSummaries,
      weekSummaries.length < WEEKS.length
        ? `All other weeks: NOT STARTED`
        : "",
    ].filter(Boolean).join("\n");
  }, [getDayState]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput("");
    const userMsg: ChatMessage = { role: "user", content };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setLoading(true);

    const assistantMsg: ChatMessage = { role: "assistant", content: "", isSearching: false };
    setMessages([...newMsgs, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs.map((m) => ({ role: m.role, content: m.content })),
          progress: buildProgressSnapshot(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "API error");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));

            if (data.type === "text") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + data.text,
                  isSearching: false,
                };
                return updated;
              });
            } else if (data.type === "searching") {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  isSearching: true,
                  searchQueries: data.queries,
                };
                return updated;
              });
            } else if (data.type === "timetable_action") {
              applyTimetableAction(data.action as TimetableAction);
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  timetableActions: [...(last.timetableActions ?? []), data.action],
                };
                return updated;
              });
            }
          } catch {
            // ignore parse errors on partial chunks
          }
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: `Error: ${errMsg}`,
          isSearching: false,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-bg-base border-l border-zinc-800/60 flex flex-col z-40 transition-transform duration-300`}
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/60 shrink-0">
          <div className="w-8 h-8 rounded-full bg-accent-bg border border-accent-purple/30 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" fill="#818cf8" />
              <circle cx="8" cy="8" r="6.5" stroke="#818cf8" strokeOpacity="0.4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[13px] font-semibold text-zinc-100 leading-tight">AI Coach</h2>
            <p className="text-[11px] text-zinc-500 leading-tight">Claude + web research</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg hover:bg-bg-muted"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 3L12 12M12 3L3 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col gap-4 h-full">
              <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center px-4">
                <div className="w-12 h-12 rounded-full bg-accent-bg border border-accent-purple/30 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="4" fill="#818cf8" />
                    <circle cx="11" cy="11" r="9.5" stroke="#818cf8" strokeOpacity="0.3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-zinc-200">Ask your AI Coach</p>
                  <p className="text-[12px] text-zinc-500 mt-1 leading-relaxed">
                    Ask about concepts, modify your plan, research topics, or get unstuck on anything in the roadmap.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[11px] text-zinc-600 font-medium uppercase tracking-wide px-1">Suggestions</p>
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(p)}
                    className="text-left px-3 py-2.5 bg-bg-card border border-zinc-800/60 rounded-lg text-[12px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-all duration-150 active:scale-[0.98]"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 msg-enter ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              {msg.role === "user" ? (
                <div className="max-w-[85%] bg-accent-bg border border-accent-purple/20 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                  <p className="text-[13px] text-zinc-200 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              ) : (
                <div className="max-w-[92%] w-full">
                  {msg.isSearching && (
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <div className="flex gap-1">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        Searching{msg.searchQueries?.length ? `: ${msg.searchQueries.slice(0, 2).join(", ")}${msg.searchQueries.length > 2 ? "..." : ""}` : "..."}
                      </span>
                    </div>
                  )}

                  {msg.timetableActions?.map((action, ai) => (
                    <div key={ai} className="flex items-center gap-2 mb-2 px-1 py-1.5 bg-green-950/40 border border-green-900/30 rounded-lg text-[11px] text-green-400">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Timetable updated: {action.action.replace("_", " ")} {action.week_id} day {action.day_index + 1}
                    </div>
                  ))}

                  {msg.content ? (
                    <div className="bg-bg-card border border-zinc-800/60 rounded-2xl rounded-tl-sm px-4 py-3">
                      <MarkdownText content={msg.content} />
                    </div>
                  ) : msg.isSearching ? null : (
                    <div className="bg-bg-card border border-zinc-800/60 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1 items-center">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-zinc-800/60 shrink-0">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about the roadmap..."
              rows={1}
              className="flex-1 bg-bg-card border border-zinc-700/60 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-accent-purple/50 resize-none max-h-[120px] transition-colors font-sans leading-relaxed"
              style={{ minHeight: "42px" }}
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 120) + "px";
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-[42px] h-[42px] bg-accent-purple hover:bg-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 2L2 6.5L7 8.5L9.5 13.5L14 2Z" fill="white" />
                <path d="M7 8.5L10 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-zinc-700 mt-1.5 text-center">
            Shift+Enter for newline · Enter to send
          </p>
        </div>
      </div>
    </>
  );
}
