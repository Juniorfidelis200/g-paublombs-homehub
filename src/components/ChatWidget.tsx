import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import avatar from "@/assets/assistant-avatar.png";

type Msg = { role: "user" | "assistant"; text: string };

const WHATSAPP = "https://wa.me/2348032272932";

const QUICK_REPLIES = [
  { label: "Calculate Tile Needs 📐", reply: "I'd love to help! Please share the room dimensions (length × width in metres) and I'll estimate the tiles and boxes you'll need." },
  { label: "Browse Interior Catalog 🏢", reply: "We carry Italian, Spanish and Nigerian tiles, marble, doors, and bathroom collections. Which space are you designing — living room, bathroom, kitchen, or exterior?" },
  { label: "Talk to an Agent 💬", reply: `Of course — tap the button below to chat live with our team on WhatsApp: ${WHATSAPP}` },
];

const INTRO = "Hi, I'm your G.paublo Showroom Assistant 👋 How can I help you find the perfect materials today?";

function smartReply(input: string): string {
  const t = input.toLowerCase();
  if (/(price|cost|how much|quote)/.test(t)) return "Prices vary by collection and quantity. Share the tile type and square metres needed and I'll get you a quote within minutes.";
  if (/(deliver|shipping|location|where)/.test(t)) return "We deliver nationwide across Nigeria from our Orile Iganmu showroom in Lagos. Delivery time depends on your state.";
  if (/(open|hour|time)/.test(t)) return "We're open Monday to Saturday, 8:00 am – 6:00 pm.";
  if (/(install|fit|fix)/.test(t)) return "Yes — we offer end-to-end installation and structuring support alongside supply.";
  if (/(tile|marble|porcelain)/.test(t)) return "Great choice! We stock polished porcelain, large-format marble looks, mosaics and Nigerian patterns. Want me to send catalogue images on WhatsApp?";
  if (/(door)/.test(t)) return "We carry interior, security and decorative door systems. What style are you after?";
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
            <img src={avatar} alt="G.paublo Showroom Assistant" className="h-10 w-10 rounded-full object-cover bg-cream" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-clay" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display text-base leading-tight">G.paublo Showroom Assistant</div>
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