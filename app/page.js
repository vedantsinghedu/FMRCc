'use client'
import { useState, useEffect, useRef, useCallback, } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 1, name: "SBI RuPay SimplyCLICK", bank: "SBI", joining_fee: 499, annual_fee: 499,
    rewards_type: "Shopping", reward_rate: "10x on online spends", eligibility: "Salaried / Self-employed, Income ₹3L+",
    match_tags: ["shopping", "student", "salaried"], income_min: 300000,
    color: "#1E3A5F", accent: "#3B7DD8",
    benefits: ["10x reward on Amazon, BookMyShow, Cleartrip", "1% fuel surcharge waiver", "₹500 e-voucher on ₹1L spend", "Contactless payments"],
    highlight: "Best for online shopping",
  },
  {
    id: 2, name: "HDFC RuPay Millennia", bank: "HDFC", joining_fee: 1000, annual_fee: 1000,
    rewards_type: "Cashback", reward_rate: "5% cashback on top brands",  eligibility: "Salaried, Income ₹4L+",
    match_tags: ["shopping", "salaried", "travel"], income_min: 400000,
    color: "#1A3C34", accent: "#22C55E",
    benefits: ["5% cashback on Amazon, Flipkart, Swiggy", "Lounge access – 2 per quarter", "1% cashback on all spends", "Zero lost card liability"],
    highlight: "Best cashback card",
  },
  {
    id: 3, name: "ICICI RuPay Coral", bank: "ICICI", joining_fee: 500, annual_fee: 500,
    rewards_type: "Rewards", reward_rate: "2 PAYBACK points per ₹100",  eligibility: "Salaried / Self-employed, Income ₹3.6L+",
    match_tags: ["travel", "salaried", "fuel"], income_min: 360000,
    color: "#3B1A52", accent: "#A855F7",
    benefits: ["2 PAYBACK points per ₹100", "1 complimentary railway lounge", "1% fuel surcharge waiver", "Movie discount ₹100 off 2 tickets/month"],
    highlight: "Great rewards everyday",
  },
  {
    id: 4, name: "Axis RuPay Magnus", bank: "Axis", joining_fee: 12500, annual_fee: 12500,
    rewards_type: "Travel & Lifestyle", reward_rate: "12 EDGE points per ₹200",  eligibility: "Salaried, Income ₹18L+",
    match_tags: ["travel", "salaried", "business"], income_min: 1800000,
    color: "#3B2A0A", accent: "#F59E0B",
    benefits: ["Unlimited airport lounge access", "12 EDGE points per ₹200 spend", "5x on travel & dining", "Complimentary golf rounds", "Concierge services"],
    highlight: "Premium travel lifestyle",
  },
  {
    id: 5, name: "Kotak RuPay 811", bank: "Kotak", joining_fee: 0, annual_fee: 0,
    rewards_type: "Cashback", reward_rate: "1% cashback on all spends",  eligibility: "Anyone with Kotak 811 savings account",
    match_tags: ["student", "shopping", "fuel"], income_min: 0,
    color: "#1C2B3A", accent: "#06B6D4",
    benefits: ["No annual fee forever", "1% cashback on all spends", "Instant virtual card issuance", "UPI + RuPay enabled", "Zero forex markup on RuPay Global"],
    highlight: "Zero-fee beginner card",
  },
  {
    id: 6, name: "SBI RuPay IRCTC", bank: "SBI", joining_fee: 500, annual_fee: 300,
    rewards_type: "Travel", reward_rate: "10% value back on train tickets",  eligibility: "Salaried / Self-employed, Income ₹2.4L+",
    match_tags: ["travel", "salaried", "student"], income_min: 240000,
    color: "#2D1A1A", accent: "#EF4444",
    benefits: ["10% value back on IRCTC bookings", "1% fuel surcharge waiver", "Free railway lounge access – 4/year", "Complimentary accident insurance ₹10L"],
    highlight: "Best card for train travel",
  },
  {
    id: 7, name: "HDFC RuPay Business", bank: "HDFC", joining_fee: 2500, annual_fee: 2500,
    rewards_type: "Business", reward_rate: "3x rewards on biz spends",  eligibility: "Business owners, GST registered",
    match_tags: ["business", "travel", "salaried"], income_min: 600000,
    color: "#0F2A1A", accent: "#10B981",
    benefits: ["3x rewards on business expenses", "GST input credit", "Quarterly airport lounge – 4 per year", "Dedicated business concierge", "Zero liability on fraud"],
    highlight: "Made for entrepreneurs",
  },
  {
    id: 8, name: "ICICI RuPay Platinum", bank: "ICICI", joining_fee: 0, annual_fee: 0,
    rewards_type: "Rewards", reward_rate: "2 PAYBACK points per ₹100",  eligibility: "Salaried, Income ₹2L+",
    match_tags: ["student", "salaried", "shopping"], income_min: 200000,
    color: "#1A1A2E", accent: "#6366F1",
    benefits: ["No annual fee (lifetime free)", "2 PAYBACK points per ₹100", "1% fuel surcharge waiver", "Insurance cover ₹50K"],
    highlight: "Best lifetime free card",
  },
  {
    id: 9, name: "Axis RuPay Ace", bank: "Axis", joining_fee: 499, annual_fee: 499,
    rewards_type: "Cashback", reward_rate: "5% on bill payments via GPay",  eligibility: "Salaried, Income ₹3L+",
    match_tags: ["shopping", "salaried", "fuel"], income_min: 300000,
    color: "#2A1A0A", accent: "#F97316",
    benefits: ["5% cashback on bill payments", "4% on Swiggy, Zomato, Ola", "1.5% on all other spends", "1% fuel surcharge waiver"],
    highlight: "Cashback on daily spends",
  },
  {
    id: 10, name: "Kotak RuPay Royale", bank: "Kotak", joining_fee: 5000, annual_fee: 5000,
    rewards_type: "Lifestyle", reward_rate: "4 reward points per ₹150",  eligibility: "Self-employed / Salaried, Income ₹9L+",
    match_tags: ["travel", "business", "lifestyle"], income_min: 900000,
    color: "#2A1F0A", accent: "#EAB308",
    benefits: ["Unlimited domestic lounge access", "4 reward points per ₹150", "Golf privileges – 6 rounds/year", "Global lounge via Priority Pass", "Travel insurance ₹50L"],
    highlight: "Premium lifestyle card",
  },
  {
    id: 11, name: "SBI RuPay Elite", bank: "SBI", joining_fee: 4999, annual_fee: 4999,
    rewards_type: "Travel & Dining", reward_rate: "5 reward points per ₹100",  eligibility: "Salaried, Income ₹12L+",
    match_tags: ["travel", "dining", "salaried"], income_min: 1200000,
    color: "#1A2A1A", accent: "#84CC16",
    benefits: ["Complimentary domestic + intl lounge", "5 reward points per ₹100", "₹1,000 movie vouchers/year", "Concierge 24/7", "Forex markup just 1.99%"],
    highlight: "Elite travel perks",
  },
  {
    id: 12, name: "HDFC RuPay Infinia", bank: "HDFC", joining_fee: 12500, annual_fee: 12500,
    rewards_type: "Ultra Premium", reward_rate: "5 reward points per ₹150",  eligibility: "Invite-only, Income ₹25L+",
    match_tags: ["business", "travel", "lifestyle"], income_min: 2500000,
    color: "#1A1A1A", accent: "#C0C0C0",
    benefits: ["Unlimited Priority Pass lounge", "5 reward points per ₹150", "Unlimited golf rounds", "Dedicated relationship manager", "Zero forex markup"],
    highlight: "India's top RuPay card",
  },
];

const BANKS = ["SBI", "HDFC", "ICICI", "Axis", "Kotak"];
const REWARD_TYPES = ["Cashback", "Rewards", "Travel", "Shopping", "Business", "Lifestyle"];

// ─── TAQDEER AI ───────────────────────────────────────────────────────────────
async function askTaqdeer(messages) {
  const cardContext = CARDS.map(c =>
    `Card: ${c.name} | Bank: ${c.bank} | Annual Fee: ₹${c.annual_fee} | Rewards: ${c.reward_rate} | Type: ${c.rewards_type} | Eligibility: ${c.eligibility} | Benefits: ${c.benefits.join(", ")} | Highlight: ${c.highlight}`
  ).join("\n");

  const systemPrompt = `You are Taqdeer, a smart and friendly AI financial assistant on FMRCc — Find My RuPay Credit Card platform.

Here is the complete database of available RuPay credit cards:
${cardContext}

You:
- Recommend cards based on user needs, referencing actual cards from the database above
- Compare cards clearly when asked
- Explain financial terms simply and concisely
- Never ask for personal sensitive data
- Always prioritize user benefit (not banks)
- Give concise, insightful answers with actual card names

Tone: Friendly, clear, helpful, slightly witty. Not robotic.

Rules:
- Always reference specific card names from the database
- For recommendations, give top 2-3 options with brief reasoning
- For comparisons, use a clean structured format
- Keep replies under 200 words unless comparing multiple cards
- Start responses naturally, no preambles like "Great question!"`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";
}

// ─── SCORE ENGINE ─────────────────────────────────────────────────────────────
function scoreCard(card, prefs) {
  let score = 0;
  if (prefs.profession && card.match_tags.includes(prefs.profession)) score += 35;
  if (prefs.spending && card.match_tags.includes(prefs.spending)) score += 30;
  const income = parseInt(prefs.income) || 0;
  if (income >= card.income_min) score += 20;
  if (card.annual_fee === 0) score += 10;
  else if (card.annual_fee <= 500) score += 7;
  else if (card.annual_fee <= 2500) score += 4;
  return Math.min(score, 99);
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18 }) => {
  const icons = {
    stars: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
    compare: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    chat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    rupee: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12M6 8h12M15 21L9 3"/><path d="M6 13h5a4 4 0 0 0 0-8H6"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="8 21 12 17 16 21"/><path d="M18 2h-12v8a6 6 0 0 0 12 0V2z"/><line x1="6" y1="11.99" x2="6" y2="15.01"/><line x1="18" y1="11.99" x2="18" y2="15.01"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
    sparkle: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/><path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z" opacity=".6"/></svg>,
  };
  return icons[name] || null;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function FMRCcApp() {
  const [page, setPage] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([
    { role: "assistant", content: "Hey! I'm **Taqdeer** — your RuPay credit card advisor. Ask me anything: best card for students, travel perks, cashback options, or what 'reward rate' even means. I've got you. 😊" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs]);

  const nav = (p) => { setPage(p); setMobileMenu(false); window.scrollTo(0, 0); };

  const toggleCompare = (card) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === card.id)) return prev.filter(c => c.id !== card.id);
      if (prev.length >= 3) return prev;
      return [...prev, card];
    });
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    const newMsgs = [...chatMsgs.filter(m => m.role !== "assistant" || chatMsgs.indexOf(m) > 0), userMsg];
    setChatMsgs(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const apiMsgs = newMsgs.map(m => ({ role: m.role, content: m.content }));
      const reply = await askTaqdeer(apiMsgs);
      setChatMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMsgs(prev => [...prev, { role: "assistant", content: "Oops, hit a snag. Try again in a moment!" }]);
    }
    setChatLoading(false);
  };

  const renderMd = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');

  return (
    <div style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", background: "#0A0A0F", minHeight: "100vh", color: "#E8E8F0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0F; } ::-webkit-scrollbar-thumb { background: #2A2A3A; border-radius: 2px; }
        .btn-primary { background: linear-gradient(135deg, #6366F1, #8B5CF6); color: #fff; border: none; padding: 12px 24px; border-radius: 12px; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
        .btn-ghost { background: rgba(255,255,255,0.06); color: #C8C8D8; border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 10px; font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .glass-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; backdrop-filter: blur(12px); }
        .tag { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
        input, select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; color: #E8E8F0; font-family: 'Sora', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; width: 100%; }
        input:focus, select:focus { border-color: #6366F1; }
        select option { background: #1A1A2E; }
        .nav-link { background: none; border: none; color: #A8A8B8; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; padding: 6px 12px; border-radius: 8px; transition: all 0.2s; }
        .nav-link:hover, .nav-link.active { color: #fff; background: rgba(255,255,255,0.06); }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .card-hover { transition: all 0.25s; } .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.14); }
        .score-bar { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .score-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #6366F1, #8B5CF6); transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .chat-bubble-user { background: linear-gradient(135deg, #6366F1, #8B5CF6); border-radius: 16px 4px 16px 16px; }
        .chat-bubble-ai { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); border-radius: 4px 16px 16px 16px; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); } 50% { box-shadow: 0 0 0 8px rgba(99,102,241,0); } }
        .compare-badge { position: absolute; top: -6px; right: -6px; background: #6366F1; color: #fff; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .stack-mobile { flex-direction: column !important; } .grid-2 { grid-template-columns: 1fr !important; } }
        .gradient-text { background: linear-gradient(135deg, #A5B4FC, #C084FC, #F9A8D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .rupay-chip { display: inline-flex; align-items: center; gap: 5px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: #A5B4FC; letter-spacing: 0.5px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="rupee" size={18} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>FMRCc</span>
        </button>

        <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
          {[["home", "Home"], ["explore", "Explore Cards"], ["recommend", "Get Recommendations"], ["compare", "Compare"]].map(([p, l]) => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => nav(p)}>{l}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {compareList.length > 0 && (
            <button className="btn-ghost" onClick={() => nav("compare")} style={{ display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
              <Icon name="compare" size={15} />
              <span className="hide-mobile">Compare</span>
              <span className="compare-badge">{compareList.length}</span>
            </button>
          )}
          <button className="btn-primary pulse" onClick={() => setChatOpen(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px" }}>
            <Icon name="sparkle" size={15} />
            <span>Ask Taqdeer</span>
          </button>
          <button className="hide-mobile" style={{ display: "none" }} />
          <button onClick={() => setMobileMenu(p => !p)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer" }} className="show-mobile">
            <Icon name="menu" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileMenu && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "rgba(10,10,15,0.97)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: 16 }}>
          {[["home", "Home"], ["explore", "Explore Cards"], ["recommend", "Get Recommendations"], ["compare", "Compare"]].map(([p, l]) => (
            <button key={p} className="nav-link" onClick={() => nav(p)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px" }}>{l}</button>
          ))}
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <div style={{ paddingTop: 64 }}>
        {page === "home" && <HomePage nav={nav} cards={CARDS} toggleCompare={toggleCompare} compareList={compareList} setSelectedCard={setSelectedCard} setChatOpen={setChatOpen} />}
        {page === "explore" && <ExplorePage cards={CARDS} toggleCompare={toggleCompare} compareList={compareList} setSelectedCard={setSelectedCard} nav={nav} />}
        {page === "detail" && selectedCard && <DetailPage card={selectedCard} nav={nav} toggleCompare={toggleCompare} compareList={compareList} setChatOpen={setChatOpen} />}
        {page === "compare" && <ComparePage compareList={compareList} toggleCompare={toggleCompare} nav={nav} />}
        {page === "recommend" && <RecommendPage cards={CARDS} nav={nav} setSelectedCard={setSelectedCard} setChatOpen={setChatOpen} />}
      </div>

      {/* ── TAQDEER CHAT ── */}
      {chatOpen && (
        <div style={{ position: "fixed", bottom: 24, right: 24, width: 380, maxWidth: "calc(100vw - 32px)", zIndex: 200, display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", background: "#0F0F1A" }} className="fade-in">
          {/* Chat header */}
          <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✨</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Taqdeer</div>
                <div style={{ fontSize: 11, color: "#A5B4FC" }}>AI Card Advisor • Always online</div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", padding: 4 }}><Icon name="close" size={18} /></button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, maxHeight: 360, minHeight: 200 }}>
            {chatMsgs.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"} style={{ maxWidth: "82%", padding: "10px 14px", fontSize: 13.5, lineHeight: 1.6, color: msg.role === "user" ? "#fff" : "#D8D8E8" }}
                  dangerouslySetInnerHTML={{ __html: renderMd(msg.content) }} />
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="chat-bubble-ai" style={{ padding: "10px 14px", fontSize: 13 }}>
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    {[0, 0.2, 0.4].map((d, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366F1", animation: `pulse 1.2s infinite ${d}s`, display: "inline-block" }} />)}
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick prompts */}
          <div style={{ padding: "8px 12px", display: "flex", gap: 6, overflowX: "auto", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {["Best for students?", "Zero annual fee?", "Top travel card?"].map(q => (
              <button key={q} onClick={() => { setChatInput(q); }} style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#A5B4FC", borderRadius: 20, padding: "5px 12px", fontSize: 11.5, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Sora', sans-serif" }}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask about any RuPay card..." style={{ flex: 1, borderRadius: 12, padding: "10px 14px", fontSize: 13.5 }} />
            <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} className="btn-primary" style={{ padding: "10px 14px", borderRadius: 12, opacity: chatLoading || !chatInput.trim() ? 0.5 : 1 }}>
              <Icon name="send" size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav, cards, toggleCompare, compareList, setSelectedCard, setChatOpen }) {
  const featuredCards = cards.slice(0, 4);

  return (
    <div className="fade-in">
      {/* Hero */}
      <section style={{ minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        {/* BG glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "20%", width: 300, height: 300, background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="rupay-chip" style={{ marginBottom: 24 }}>
          <Icon name="shield" size={12} /> RuPay Exclusive • Zero Data Collected
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-1.5px", color: "#fff", marginBottom: 20, maxWidth: 780 }}>
          Find Your Perfect<br /><span className="gradient-text">RuPay Credit Card</span>
        </h1>

        <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#888899", maxWidth: 560, lineHeight: 1.75, marginBottom: 40, fontWeight: 400 }}>
          AI-powered recommendations. No login. No personal data. Just the best RuPay card for you, guided by Taqdeer.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => nav("recommend")} style={{ fontSize: 15, padding: "14px 28px", borderRadius: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="sparkle" size={16} /> Get My Recommendations
          </button>
          <button className="btn-ghost" onClick={() => nav("explore")} style={{ fontSize: 15, padding: "14px 28px", borderRadius: 14 }}>
            Explore All Cards →
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap", justifyContent: "center" }}>
          {[["12+", "RuPay Cards"], ["5", "Top Banks"], ["100%", "Privacy First"], ["AI", "Powered Advice"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#A5B4FC" }}>{v}</div>
              <div style={{ fontSize: 12, color: "#666677", fontWeight: 500, letterSpacing: "0.5px", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cards */}
      <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6366F1", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Popular Picks</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>Featured Cards</h2>
          </div>
          <button className="btn-ghost" onClick={() => nav("explore")} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            View All <Icon name="arrow" size={14} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {featuredCards.map(card => (
            <CardTile key={card.id} card={card} toggleCompare={toggleCompare} compareList={compareList} onView={() => { setSelectedCard(card); nav("detail"); }} />
          ))}
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div className="glass-card" style={{ padding: "48px 40px", textAlign: "center", background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))", borderColor: "rgba(99,102,241,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.5px" }}>Meet Taqdeer, Your Card Advisor</h2>
          <p style={{ color: "#8888A8", fontSize: 16, marginBottom: 28, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px" }}>
            Ask anything — best card for travel, cashback, students, or just confused about what a joining fee is. Taqdeer knows it all.
          </p>
          <button className="btn-primary" onClick={() => setChatOpen(true)} style={{ fontSize: 15, padding: "13px 26px" }}>
            Chat with Taqdeer
          </button>
        </div>
      </section>

      {/* Privacy section */}
      <section style={{ padding: "60px 24px 80px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "#D8D8E8", marginBottom: 32 }}>Zero Data. Zero Worry.</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            ["🔒", "No Login Required", "Use everything without signing up. Your privacy is not negotiable."],
            ["🚫", "No Personal Data", "No phone, no email, no PAN — we never ask for sensitive info."],
            ["🤖", "AI on Your Side", "Taqdeer is trained to find your best card, not push bank deals."]
          ].map(([icon, title, desc]) => (
            <div key={title} className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#C8C8D8", marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 12.5, color: "#66667A", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── CARD TILE ────────────────────────────────────────────────────────────────
function CardTile({ card, toggleCompare, compareList, onView }) {
  const isComparing = compareList.find(c => c.id === card.id);
  return (
    <div className="glass-card card-hover fade-in" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
      {/* Top gradient band */}
      <div style={{ height: 100, background: `linear-gradient(135deg, ${card.color}, ${card.accent}22)`, position: "relative", padding: "20px 20px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.8px", textTransform: "uppercase" }}>{card.bank}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 3, lineHeight: 1.3 }}>{card.name.replace(card.bank + " ", "")}</div>
          </div>
          <div style={{ background: card.accent + "33", border: `1px solid ${card.accent}55`, borderRadius: 8, padding: "4px 8px", fontSize: 10, fontWeight: 700, color: card.accent, letterSpacing: "0.5px" }}>
            {card.rewards_type.toUpperCase()}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ fontSize: 12, color: "#666677", marginBottom: 8 }}>
          <span style={{ color: card.accent, fontWeight: 600 }}>₹{card.annual_fee}</span>
          <span> / year • </span>
          <span style={{ color: "#88889A" }}>{card.reward_rate}</span>
        </div>
        <div style={{ fontSize: 12.5, color: "#888899", marginBottom: 16, fontStyle: "italic" }}>{card.highlight}</div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onView} className="btn-primary" style={{ flex: 1, padding: "9px 12px", fontSize: 13, borderRadius: 10 }}>View Details</button>
          <button onClick={() => toggleCompare(card)} className="btn-ghost" style={{ padding: "9px 12px", borderRadius: 10, fontSize: 12, borderColor: isComparing ? card.accent + "66" : undefined, color: isComparing ? card.accent : undefined }}>
            {isComparing ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EXPLORE PAGE ─────────────────────────────────────────────────────────────
function ExplorePage({ cards, toggleCompare, compareList, setSelectedCard, nav }) {
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("All");
  const [feeFilter, setFeeFilter] = useState("All");
  const [rewardFilter, setRewardFilter] = useState("All");

  const filtered = cards.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.bank.toLowerCase().includes(search.toLowerCase());
    const matchBank = bankFilter === "All" || c.bank === bankFilter;
    const matchFee = feeFilter === "All" || (feeFilter === "Free" && c.annual_fee === 0) || (feeFilter === "Under 500" && c.annual_fee <= 500 && c.annual_fee > 0) || (feeFilter === "Under 2500" && c.annual_fee <= 2500 && c.annual_fee > 500) || (feeFilter === "Premium" && c.annual_fee > 2500);
    const matchReward = rewardFilter === "All" || c.rewards_type === rewardFilter;
    return matchSearch && matchBank && matchFee && matchReward;
  });

  return (
    <div className="fade-in" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Explore RuPay Cards</h1>
      <p style={{ color: "#66667A", marginBottom: 32, fontSize: 15 }}>{cards.length} cards from top Indian banks, all on RuPay network</p>

      {/* Filters */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 28, display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 12, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#555566" }}><Icon name="search" size={16} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cards or banks..." style={{ paddingLeft: 38 }} />
        </div>
        <select value={bankFilter} onChange={e => setBankFilter(e.target.value)} style={{ width: "auto", minWidth: 120 }}>
          <option>All</option>
          {BANKS.map(b => <option key={b}>{b}</option>)}
        </select>
        <select value={feeFilter} onChange={e => setFeeFilter(e.target.value)} style={{ width: "auto", minWidth: 120 }}>
          <option>All</option>
          <option>Free</option>
          <option>Under 500</option>
          <option>Under 2500</option>
          <option>Premium</option>
        </select>
        <select value={rewardFilter} onChange={e => setRewardFilter(e.target.value)} style={{ width: "auto", minWidth: 140 }}>
          <option>All</option>
          {REWARD_TYPES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: 16, fontSize: 13, color: "#66667A" }}>{filtered.length} cards found</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {filtered.map(card => (
          <CardTile key={card.id} card={card} toggleCompare={toggleCompare} compareList={compareList} onView={() => { setSelectedCard(card); nav("detail"); }} />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 80, color: "#555566" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16 }}>No cards match your filters.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function DetailPage({ card, nav, toggleCompare, compareList, setChatOpen }) {
  const isComparing = compareList.find(c => c.id === card.id);
  return (
    <div className="fade-in" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <button onClick={() => nav("explore")} className="btn-ghost" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
        <Icon name="back" size={15} /> Back to Explore
      </button>

      {/* Hero banner */}
      <div className="glass-card" style={{ marginBottom: 28, overflow: "hidden", padding: 0 }}>
        <div style={{ height: 180, background: `linear-gradient(135deg, ${card.color}, ${card.accent}33)`, padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{card.bank} • RuPay</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{card.name}</h1>
            <div className="tag" style={{ background: card.accent + "22", color: card.accent, border: `1px solid ${card.accent}44` }}>{card.rewards_type}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Annual Fee</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>₹{card.annual_fee === 0 ? "FREE" : card.annual_fee.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ padding: "20px 36px", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => toggleCompare(card)} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="compare" size={15} /> {isComparing ? "Remove from Compare" : "Add to Compare"}
          </button>
          <button className="btn-ghost" onClick={() => setChatOpen(true)} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="chat" size={15} /> Ask Taqdeer about this card
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Benefits */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16 }}>Key Benefits</div>
          {card.benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, background: card.accent + "22", border: `1px solid ${card.accent}44`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <Icon name="check" size={11} />
              </div>
              <span style={{ fontSize: 14, color: "#C8C8D8", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Fees & Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16 }}>Fees & Charges</div>
            {[["Joining Fee", `₹${card.joining_fee}`], ["Annual Fee", card.annual_fee === 0 ? "Free (Lifetime)" : `₹${card.annual_fee}/yr`], ["Reward Rate", card.reward_rate]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 13.5, color: "#66667A" }}>{k}</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#C8C8D8" }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>Eligibility</div>
            <p style={{ fontSize: 14, color: "#888899", lineHeight: 1.6 }}>{card.eligibility}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARE PAGE ─────────────────────────────────────────────────────────────
function ComparePage({ compareList, toggleCompare, nav }) {
  if (compareList.length === 0) return (
    <div className="fade-in" style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>⚖️</div>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Nothing to compare yet</h2>
      <p style={{ color: "#66667A", marginBottom: 28 }}>Add 2–3 cards from the explore page to compare them side by side.</p>
      <button className="btn-primary" onClick={() => nav("explore")}>Explore Cards</button>
    </div>
  );

  const rows = [
    ["Bank", c => c.bank],
    ["Rewards Type", c => c.rewards_type],
    ["Annual Fee", c => c.annual_fee === 0 ? "FREE" : `₹${c.annual_fee}`],
    ["Joining Fee", c => c.joining_fee === 0 ? "FREE" : `₹${c.joining_fee}`],
    ["Reward Rate", c => c.reward_rate],
    ["Eligibility", c => c.eligibility],
    ["Highlight", c => c.highlight],
  ];

  return (
    <div className="fade-in" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}>Compare Cards</h1>
          <p style={{ color: "#66667A", marginTop: 4 }}>Side-by-side breakdown</p>
        </div>
        <button className="btn-ghost" onClick={() => nav("explore")}>+ Add More</button>
      </div>

      {/* Card headers */}
      <div style={{ display: "grid", gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`, gap: 12, marginBottom: 16 }}>
        <div />
        {compareList.map(card => (
          <div key={card.id} className="glass-card" style={{ padding: "20px 18px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: card.accent }} />
            <button onClick={() => toggleCompare(card)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#555", cursor: "pointer" }}><Icon name="close" size={14} /></button>
            <div style={{ fontSize: 11, color: "#555566", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{card.bank}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{card.name.replace(card.bank + " ", "")}</div>
          </div>
        ))}
      </div>

      {/* Comparison rows */}
      {rows.map(([label, fn]) => (
        <div key={label} style={{ display: "grid", gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`, gap: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", padding: "14px 0", fontSize: 13, fontWeight: 600, color: "#66667A" }}>{label}</div>
          {compareList.map(card => (
            <div key={card.id} className="glass-card" style={{ padding: "14px 18px", textAlign: "center", fontSize: 13.5, color: "#C8C8D8", lineHeight: 1.5 }}>
              {fn(card)}
            </div>
          ))}
        </div>
      ))}

      {/* Benefits comparison */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)`, gap: 12 }}>
        <div style={{ padding: "14px 0", fontSize: 13, fontWeight: 600, color: "#66667A" }}>Benefits</div>
        {compareList.map(card => (
          <div key={card.id} className="glass-card" style={{ padding: 18 }}>
            {card.benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, fontSize: 12.5, color: "#AAAABC" }}>
                <span style={{ color: card.accent, fontWeight: 700, marginTop: 1 }}>✓</span> {b}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RECOMMEND PAGE ───────────────────────────────────────────────────────────
function RecommendPage({ cards, nav, setSelectedCard, setChatOpen }) {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ profession: "", income: "", spending: "" });
  const [results, setResults] = useState(null);

  const professions = [["student", "🎓 Student"], ["salaried", "💼 Salaried"], ["business", "🏢 Business Owner"]];
  const incomeRanges = [["200000", "Under ₹2L/yr"], ["400000", "₹2L – ₹4L/yr"], ["800000", "₹4L – ₹8L/yr"], ["1500000", "₹8L – ₹15L/yr"], ["3000000", "₹15L+/yr"]];
  const spendCategories = [["shopping", "🛒 Shopping"], ["travel", "✈️ Travel"], ["fuel", "⛽ Fuel"], ["dining", "🍽️ Dining"]];

  const getResults = () => {
    const scored = cards.map(c => ({ ...c, score: scoreCard(c, prefs) }))
      .sort((a, b) => b.score - a.score).slice(0, 5);
    setResults(scored);
    setStep(4);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6366F1", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>AI-Powered</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Find Your Card</h1>
        <p style={{ color: "#66667A" }}>Answer 3 quick questions — no personal data needed</p>
      </div>

      {/* Step indicator */}
      {step < 4 && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40, gap: 0 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= s ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "rgba(255,255,255,0.06)", border: step >= s ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: step >= s ? "#fff" : "#555566", flexShrink: 0 }}>{s}</div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > s ? "#6366F1" : "rgba(255,255,255,0.06)", margin: "0 8px" }} />}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 20 }}>What best describes you?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {professions.map(([val, label]) => (
              <button key={val} onClick={() => { setPrefs(p => ({ ...p, profession: val })); setStep(2); }}
                className="glass-card" style={{ padding: "24px 16px", textAlign: "center", cursor: "pointer", border: `1px solid ${prefs.profession === val ? "#6366F1" : "rgba(255,255,255,0.08)"}`, background: prefs.profession === val ? "rgba(99,102,241,0.1)" : undefined, transition: "all 0.2s" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{label.split(" ")[0]}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#C8C8D8" }}>{label.split(" ").slice(1).join(" ")}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 20 }}>Your annual income range?</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {incomeRanges.map(([val, label]) => (
              <button key={val} onClick={() => { setPrefs(p => ({ ...p, income: val })); setStep(3); }}
                className="glass-card card-hover" style={{ padding: "16px 20px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", border: `1px solid ${prefs.income === val ? "#6366F1" : "rgba(255,255,255,0.08)"}` }}>
                <span style={{ fontSize: 15, color: "#C8C8D8" }}>{label}</span>
                <Icon name="arrow" size={15} />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 20 }}>What do you spend most on?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 32 }}>
            {spendCategories.map(([val, label]) => (
              <button key={val} onClick={() => setPrefs(p => ({ ...p, spending: val }))}
                className="glass-card" style={{ padding: "20px", textAlign: "center", cursor: "pointer", border: `1px solid ${prefs.spending === val ? "#6366F1" : "rgba(255,255,255,0.08)"}`, background: prefs.spending === val ? "rgba(99,102,241,0.1)" : undefined, transition: "all 0.2s" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{label.split(" ")[0]}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#C8C8D8" }}>{label.split(" ").slice(1).join(" ")}</div>
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={getResults} disabled={!prefs.spending} style={{ width: "100%", padding: "14px", fontSize: 15, opacity: prefs.spending ? 1 : 0.5 }}>
            <Icon name="sparkle" size={16} /> Find My Cards
          </button>
        </div>
      )}

      {step === 4 && results && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Your Top Picks</h2>
            <p style={{ color: "#66667A" }}>Based on your profile: {prefs.profession}, {incomeRanges.find(r => r[0] === prefs.income)?.[1]}, {prefs.spending}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            {results.map((card, idx) => (
              <div key={card.id} className="glass-card fade-in" style={{ padding: "20px 24px", display: "flex", gap: 20, alignItems: "center", borderLeft: `3px solid ${card.accent}`, animation: `fadeIn 0.4s ease ${idx * 0.1}s both` }}>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: idx === 0 ? "#F59E0B" : idx === 1 ? "#9CA3AF" : "#CD7C3C" }}>#{idx + 1}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#555566", textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.bank}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{card.name}</div>
                  <div style={{ fontSize: 12.5, color: "#666677", marginBottom: 10 }}>{card.highlight}</div>
                  <div className="score-bar" style={{ width: "100%" }}>
                    <div className="score-fill" style={{ width: `${card.score}%` }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#6366F1", marginTop: 5, fontWeight: 600 }}>Match score: {card.score}%</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#555566", marginBottom: 2 }}>Annual</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>₹{card.annual_fee === 0 ? "FREE" : card.annual_fee.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setChatOpen(true)} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icon name="chat" size={15} /> Ask Taqdeer for details
            </button>
            <button className="btn-ghost" onClick={() => { setStep(1); setPrefs({ profession: "", income: "", spending: "" }); setResults(null); }}>
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
