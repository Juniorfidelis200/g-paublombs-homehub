import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import avatar from "@/assets/assistant-avatar.png";

type Msg = { role: "user" | "assistant"; text: string };

const WHATSAPP = "https://wa.me/2348032272932";

const QUICK_REPLIES = [
  { label: "View Current Projects 🏗️", reply: "We currently have three active developments: Paublo Heights (Lekki Phase 1), Legacy Court Townhouses (Orile Iganmu) and Paublo Plaza mixed-use. Which would you like more details on?" },
  { label: "Invest with G-Paublo 📈", reply: "Wonderful — we offer project-backed equity and debt structures with quarterly reporting. Share your name and email and our investor relations team will send the pack." },
  { label: "Book a Site Tour 🗝️", reply: `Of course — tap the button below to message our sales team on WhatsApp and pick a time: ${WHATSAPP}` },
];

const INTRO = "Welcome 👋 I'm Paublo Concierge — your G-Paublo Homes guide. Looking for the perfect door, an investment opportunity, or to book a private consultation?";

function smartReply(input: string): string {
  const t = input.toLowerCase();
  if (/(price|cost|how much|payment|plan)/.test(t)) return "Unit prices and flexible payment plans vary by project. Share which development you're interested in and I'll connect you with our sales team.";
  if (/(invest|return|roi|partner)/.test(t)) return "We offer project-backed investment structures with quarterly reporting, site visits, and exit aligned to handover. Tap 'Invest with G-Paublo' to request the pack.";
  if (/(location|where|address|office)/.test(t)) return "Our head office is at Block K Shop 40, STI Market, Orile Iganmu, Lagos. We develop across Lagos — Lekki, Mainland and more.";
  if (/(open|hour|time)/.test(t)) return "Our office is open Monday to Saturday, 8:00 am – 6:00 pm. Site tours are by appointment.";
  if (/(tour|visit|inspect|site)/.test(t)) return "Happy to arrange a site tour. Which project — Paublo Heights, Legacy Court, or Paublo Plaza?";
  if (/(project|building|develop|apartment|house|home)/.test(t)) return "Our active projects are Paublo Heights (apartments, Lekki Phase 1), Legacy Court (townhouses, Orile Iganmu) and Paublo Plaza (mixed-use). Which appeals most?";
  return "Thanks for your message! For the fastest reply our team is on WhatsApp — or tell me a bit more and I'll guide you.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", text: INTRO }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string, presetReply?: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: presetReply ?? smartReply(text) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-clay text-cream shadow-lg shadow-clay/40 flex items-center justify-center hover:bg-clay-deep transition-all hover:scale-105"
      >
        <span className={`absolute inset-0 flex items-center justify-center transition-all ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}>
          <MessageCircle size={24} />
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}>
          <X size={24} />
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold ring-2 ring-background animate-pulse" />
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed z-50 bottom-24 right-5 w-[calc(100vw-2.5rem)] sm:w-[380px] max-h-[calc(100svh-7rem)] bg-card border border-border rounded-lg shadow-2xl shadow-ink/20 flex flex-col overflow-hidden origin-bottom-right transition-all duration-300 ${
          open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-clay text-cream px-4 py-3 flex items-center gap-3">
          <div className="relative">
            <img src={avatar} alt="G-Paublo Homes Assistant" className="h-10 w-10 rounded-full object-cover bg-cream" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-clay" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display text-base leading-tight">Paublo Concierge</div>
            <div className="text-xs text-cream/70">Online · Replies instantly</div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="text-cream/80 hover:text-cream">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <img src={avatar} alt="" className="h-7 w-7 rounded-full object-cover bg-cream shrink-0" />
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2 text-sm leading-relaxed rounded-2xl ${
                  m.role === "user"
                    ? "bg-clay text-cream rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2 justify-start">
              <img src={avatar} alt="" className="h-7 w-7 rounded-full object-cover bg-cream shrink-0" />
              <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-clay/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-clay/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-clay/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Quick replies */}
        <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 border-t border-border bg-card">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q.label}
              onClick={() => send(q.label, q.reply)}
              className="text-xs px-3 py-1.5 rounded-full border border-clay/30 text-clay hover:bg-clay hover:text-cream transition"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 flex items-center gap-2 bg-card"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            className="flex-1 h-10 px-3 rounded-full bg-secondary text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-clay"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            className="h-10 w-10 rounded-full bg-clay text-cream flex items-center justify-center hover:bg-clay-deep transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}