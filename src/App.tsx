import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Sparkles,
  History,
  Trash,
  AlertCircle,
  Check,
  Scale,
  BookMarked,
  Moon,
  Sun,
  Layers,
  Award,
  Book,
  FileText,
  Bookmark,
  ChevronRight,
  HelpCircle,
  Copy,
  Info,
  Compass,
  CornerDownRight,
  Lightbulb,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { samples } from "./sampleData";
import { TalmudAnalysis, SavedAnalysis } from "./types";

// Rhetorical type meta mapping for colors requested:
// מימרא (blue), קושיא (red), תירוץ (green), שאלה (yellow), תשובה (purple), ראיה (orange)
export const talmudicTypeMeta: Record<string, {
  labelHe: string;
  labelEn: string;
  lightBg: string;
  lightBorder: string;
  lightBadge: string;
  darkBg: string;
  darkBorder: string;
  darkBadge: string;
  dot: string;
  textCol: string;
  borderCol: string;
}> = {
  מימרא: {
    labelHe: "מימרא",
    labelEn: "Statement (Memra)",
    lightBg: "bg-blue-50/70 hover:bg-blue-100/40 border-blue-200/50",
    lightBorder: "border-blue-200",
    lightBadge: "bg-blue-50 text-blue-800 border-blue-250",
    darkBg: "bg-[#162032]/40 hover:bg-[#1a2842]/50 border-blue-900/45",
    darkBorder: "border-blue-900/40",
    darkBadge: "bg-blue-950 text-blue-300 border-blue-800/40",
    dot: "bg-blue-500",
    textCol: "text-blue-600 dark:text-blue-300",
    borderCol: "border-blue-500"
  },
  קושיא: {
    labelHe: "קושיא",
    labelEn: "Objection (Kushya)",
    lightBg: "bg-red-50/70 hover:bg-red-100/40 border-red-200/50",
    lightBorder: "border-red-205",
    lightBadge: "bg-red-50 text-red-800 border-red-250",
    darkBg: "bg-[#2d1717]/40 hover:bg-[#3d1a1a]/50 border-red-900/45",
    darkBorder: "border-red-900/40",
    darkBadge: "bg-red-950 text-red-300 border-red-800/40",
    dot: "bg-red-500",
    textCol: "text-red-600 dark:text-red-300",
    borderCol: "border-red-500"
  },
  תירוץ: {
    labelHe: "תירוץ",
    labelEn: "Resolution (Terutz)",
    lightBg: "bg-emerald-50/70 hover:bg-emerald-100/40 border-emerald-200/50",
    lightBorder: "border-emerald-250",
    lightBadge: "bg-emerald-50 text-emerald-800 border-emerald-250",
    darkBg: "bg-[#14261c]/40 hover:bg-[#193324]/50 border-emerald-900/45",
    darkBorder: "border-emerald-900/40",
    darkBadge: "bg-emerald-950 text-emerald-300 border-emerald-850/40",
    dot: "bg-emerald-500",
    textCol: "text-emerald-700 dark:text-emerald-300",
    borderCol: "border-emerald-500"
  },
  שאלה: {
    labelHe: "שאלה",
    labelEn: "Query (She'ela)",
    lightBg: "bg-amber-50/80 hover:bg-amber-100/40 border-amber-200/50",
    lightBorder: "border-amber-250",
    lightBadge: "bg-amber-50 text-amber-800 border-amber-255",
    darkBg: "bg-[#2b2111]/40 hover:bg-[#3b2d15]/50 border-amber-900/35",
    darkBorder: "border-amber-900/30",
    darkBadge: "bg-[#453415] text-amber-300 border-[#5e471d]",
    dot: "bg-amber-500",
    textCol: "text-amber-600 dark:text-amber-300",
    borderCol: "border-amber-500"
  },
  תשובה: {
    labelHe: "תשובה",
    labelEn: "Answer (Teshuvah)",
    lightBg: "bg-purple-50/70 hover:bg-purple-100/40 border-purple-200/50",
    lightBorder: "border-purple-200",
    lightBadge: "bg-purple-50 text-purple-800 border-purple-255",
    darkBg: "bg-[#25182e]/40 hover:bg-[#341d44]/50 border-purple-900/45",
    darkBorder: "border-purple-900/40",
    darkBadge: "bg-purple-950 text-purple-300 border-purple-800/40",
    dot: "bg-purple-500",
    textCol: "text-purple-600 dark:text-purple-300",
    borderCol: "border-purple-500"
  },
  ראיה: {
    labelHe: "ראיה",
    labelEn: "Proof (Raya)",
    lightBg: "bg-orange-50/75 hover:bg-orange-100/40 border-orange-200/50",
    lightBorder: "border-orange-200",
    lightBadge: "bg-orange-55 text-orange-850 border-orange-200",
    darkBg: "bg-[#2d1c12]/40 hover:bg-[#3e2313]/50 border-orange-900/45",
    darkBorder: "border-orange-900/40",
    darkBadge: "bg-[#4a230c] text-orange-300 border-[#6b310f]",
    dot: "bg-orange-500",
    textCol: "text-orange-600 dark:text-orange-305",
    borderCol: "border-orange-500"
  }
};

export function getNormalizedTalmudicType(typeString?: string, textHe?: string, textEn?: string): string {
  if (!typeString) {
    const t = ((textHe || "") + " " + (textEn || "")).toLowerCase();
    if (t.includes("תנן") || t.includes("תניא") || t.includes("אמר ר") || t.includes("איתמר") || t.includes("statement") || t.includes("memra")) return "מימרא";
    if (t.includes("קשיא") || t.includes("תיובתא") || t.includes("objection") || t.includes("refut")) return "קושיא";
    if (t.includes("תירוץ") || t.includes("משני") || t.includes("תרגם") || t.includes("resolution") || t.includes("reconcil")) return "תירוץ";
    if (t.includes("מאימתי") || t.includes("בעיא") || t.includes("מתקיף") || t.includes("שאלה") || t.includes("query") || t.includes("question")) return "שאלה";
    if (t.includes("תשובה") || t.includes("משום ד") || t.includes("אילא") || t.includes("answer") || t.includes("reply")) return "תשובה";
    if (t.includes("ראיה") || t.includes("שמע מינה") || t.includes("תא שמע") || t.includes("proof") || t.includes("evidence")) return "ראיה";
    return "מימרא";
  }

  const clean = typeString.trim().toLowerCase();
  
  if (clean.includes("מימרא") || clean.includes("statement") || clean.includes("memra")) return "מימרא";
  if (clean.includes("קושיא") || clean.includes("קשיא") || clean.includes("objection") || clean.includes("kushya") || clean.includes("challenge") || clean.includes("refut")) return "קושיא";
  if (clean.includes("תירוץ") || clean.includes("resolution") || clean.includes("terutz") || clean.includes("reconcil") || clean.includes("defense")) return "תירוץ";
  if (clean.includes("שאלה") || clean.includes("query") || clean.includes("sheela") || clean.includes("she'ela") || clean.includes("question")) return "שאלה";
  if (clean.includes("תשובה") || clean.includes("answer") || clean.includes("teshuvah") || clean.includes("reply")) return "תשובה";
  if (clean.includes("ראיה") || clean.includes("ראייה") || clean.includes("proof") || clean.includes("raya") || clean.includes("evidence") || clean.includes("support")) return "ראיה";

  return "מימרא";
}

export default function App() {
  // Input and settings state
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<TalmudAnalysis | null>(null);
  
  // Explanation Language: 'en' = English, 'he' = Hebrew
  const [explainLang, setExplainLang] = useState<"en" | "he">("en");
  
  // Design Layout theme: "bento" (academic cards) or "vilna" (traditional Shas folio layout)
  const [layoutMode, setLayoutMode] = useState<"bento" | "vilna">("vilna");
  
  // Cosmetic Themes: "light" (ivory parchment) or "dark" (imperial midnight Shas)
  const [cosmeticTheme, setCosmeticTheme] = useState<"light" | "dark">("light");

  // Interactive hover/highlight tracking
  const [hoveredLineIndex, setHoveredLineIndex] = useState<number | null>(null);
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);

  // History & Storage states
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Copy confirmation feedback
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Scroll and alignment reference refs for traditional layout synchronization
  const originalLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const commentCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Checking secrets
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  // Fetch API key presence on component mount
  useEffect(() => {
    fetch("/api/config-check")
      .then((res) => res.json())
      .then((data) => setHasApiKey(!!data.hasApiKey))
      .catch(() => setHasApiKey(false));

    // Load history from localStorage
    try {
      const stored = localStorage.getItem("talmud_explainer_history");
      if (stored) {
        setSavedAnalyses(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local history empty or corrupted", e);
    }
  }, []);

  // Sync scroll highlights
  const handleLineClick = (idx: number) => {
    setSelectedLineIndex(selectedLineIndex === idx ? null : idx);
    // Smooth scroll corresponding translation card into focus if in Bento view
    if (layoutMode === "bento") {
      commentCardsRef.current[idx]?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  // Save changes to localStorage
  const saveToHistory = (newAnalysis: TalmudAnalysis, original: string) => {
    const fresh: SavedAnalysis = {
      id: Math.random().toString(36).substring(2, 9),
      originalText: original,
      timestamp: new Date().toLocaleDateString(explainLang === "he" ? "he-IL" : "en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      analysis: newAnalysis
    };

    const updated = [fresh, ...savedAnalyses.filter(item => item.originalText.trim() !== original.trim())].slice(0, 15);
    setSavedAnalyses(updated);
    localStorage.setItem("talmud_explainer_history", JSON.stringify(updated));
  };

  const deleteFromHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedAnalyses.filter((item) => item.id !== id);
    setSavedAnalyses(updated);
    localStorage.setItem("talmud_explainer_history", JSON.stringify(updated));
  };

  // Submit text for AI dissection
  const handleAnalyze = async (textToAnalyze: string) => {
    const normalized = textToAnalyze.trim();
    if (!normalized) return;

    setIsLoading(true);
    setError(null);
    setHoveredLineIndex(null);
    setSelectedLineIndex(null);

    try {
      const response = await fetch("/api/explain-talmud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: normalized }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      const parsed: TalmudAnalysis = await response.json();
      setAnalysis(parsed);
      saveToHistory(parsed, normalized);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to parse Talmud text. Please verify connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load sample content helper
  const loadSample = (sampleText: string) => {
    setInputText(sampleText);
    setError(null);
  };

  // Clear states
  const handleReset = () => {
    setInputText("");
    setAnalysis(null);
    setError(null);
    setHoveredLineIndex(null);
    setSelectedLineIndex(null);
  };

  // Copy full translation or text segments to helper clipboard
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Dictionary text helpers based on current viewer language
  const t = {
    en: {
      tagline: "Dissect, translate, and trace the logical flow of Talmudic Aramaic",
      titleLabel: "Talmud Passage Dissected",
      tractate: "Tractate / Folio",
      category: "Passage Category",
      overallTitle: "Socio-Legal Context & Scholarly Thesis",
      interactiveGuide: "💡 Study tip: Hover or click on any phrase in the central Hebrew column. The corresponding translation and critical commentary columns will instantly light up and highlight their context.",
      originalPane: "Original Talmud Inner Column (פנים)",
      analysisTabs: "Academic Commentary Logs",
      lineTranslation: "Line-by-Line Translation & Expansions",
      vocabulary: "Sages & Keywords",
      rhetoricalFlow: "Dialectical Debate Flow (שקלא וטריא)",
      sagesTitle: "Sages Expressed",
      keywordsTitle: "Lexicon & Rhetorical Connectives",
      legalTitle: "Abstract Legal & Philosophical Principles",
      explanationText: "Explanation Summary",
      translationText: "Translation",
      commentaryText: "Analytical Commentary",
      noDataYet: "Ready for study. Input an Aramaic passage above, or click on a leather-stamped classic sample to commence.",
      conceptHead: "Scholarly Concept",
      applicationHead: "Passage Context & Impact",
      roleText: "Role / Age",
      clearBtn: "Start Over",
      savedAnalysesTitle: "Beit Midrash Study Journal",
      noSaved: "No saved passages are in your study journal yet.",
      viewAnalysis: "Load analysis",
      closeHistory: "Close Drawer",
      noApiKeyWarning: "No GEMINI_API_KEY detected. Please configure your key in Settings > Secrets to enable live AI analysis.",
      direction: "ltr" as const,
      layoutSelectorEn: "Modern Academic View",
      layoutSelectorHe: "Traditional Vilna Folio",
      themePrompt: "Switch style theme",
      sagesDesc: "Historical legal figures contributing to this debate:",
      vocabularyDesc: "Central Aramaic verbs and hermeneutic keywords driving the logical dialogue:",
    },
    he: {
      tagline: "פענוח, תרגום וסיווג המבנה הלוגי והשקלא וטריא בסוגיות הגמרא",
      titleLabel: "ניתוח הסוגיה התלמודית",
      tractate: "מסכת / דף",
      category: "סיווג הקטע",
      overallTitle: "הקשר כללי, רקע ותמצית הסוגיה",
      interactiveGuide: "💡 טיפ למידה: רחפו או לחצו מעל שורות הטקסט המרכזיות. תרגומן והפירוש המעמיק שלהן (המדמים את עמודי רש\"י ותוספות) יואר ויודגש מיידית.",
      originalPane: "עמוד הגמרא - השורות המקוריות",
      analysisTabs: "פירושי הסוגיה ומדדי מחקר",
      lineTranslation: "תרגום, פירוש וביאור שורה אחר שורה",
      vocabulary: "תנאים, אמוראים ומונחי מפתח לפענוח",
      rhetoricalFlow: "מהלך השקלא וטריא והשאלות והתשובות",
      sagesTitle: "חכמי הסוגיה המוזכרים",
      keywordsTitle: "מינוח ארמי כלי רטוריקה תלמודית",
      legalTitle: "עקרונות משפטיים ומטא-הלכתיים בסוגיה",
      explanationText: "ביאור ממצה",
      translationText: "תרגום לעברית בת זמננו",
      commentaryText: "סברות למדניות והעמקה",
      noDataYet: "מוכן ללמידה. הזן קטע גמרא או בחר באחת משלושת הסוגיות לדוגמה בלחצנים למעלה.",
      conceptHead: "העיקרון או המושג הלמדני",
      applicationHead: "יישום והבנה בגוף הסוגיה",
      roleText: "תפקיד / תקופה",
      clearBtn: "נקה והתחל מחדש",
      savedAnalysesTitle: "יומן הלימוד והסוגיות שלי",
      noSaved: "עדיין לא נשמרו סוגיות ביומן הלימוד המקומי.",
      viewAnalysis: "טען ניתוח סוגיה",
      closeHistory: "סגור היכל",
      noApiKeyWarning: "לא נמצא מפתח GEMINI_API_KEY. יש להגדיר את מפתח הסודות בהגדרות כדי להפעיל בינה מלאכותית חיה.",
      direction: "rtl" as const,
      layoutSelectorEn: "תצוגה אקדמית מודרנית",
      layoutSelectorHe: "צורת הדף המסורתית (וילנא)",
      themePrompt: "החלף ערכת עיצוב",
      sagesDesc: "התנאים והאמוראים המשתתפים באופן פעיל בקטע:",
      vocabularyDesc: "קטגוריות השפה והמילים בארמית המניעות את המשא ומתן ההלכתי:",
    }
  };

  const currT = t[explainLang];

  // Dynamic class mapping based on Cosmetic Theme
  const themeBgClass = cosmeticTheme === "light" 
    ? "bg-parchment-50 text-stone-900" 
    : "bg-[#181512] text-stone-100";
    
  const textPrimaryClass = cosmeticTheme === "light"
    ? "text-stone-900" 
    : "text-[#f5ebd2]";

  const textSecondaryClass = cosmeticTheme === "light"
    ? "text-stone-600"
    : "text-[#c2b69d]";

  const cardBgClass = cosmeticTheme === "light"
    ? "bg-white border-stone-300/80"
    : "bg-[#211d18] border-[#3a3227]";

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 flex flex-col ${themeBgClass}`}>
      
      {/* EXQUISITE BEIT MIDRASH HEADER */}
      <header className={`border-b-4 border-double sticky top-0 backdrop-blur-md z-30 transition-all ${
        cosmeticTheme === "light" 
          ? "border-parchment-300 bg-parchment-100/90" 
          : "border-[#4a3b22] bg-[#1d1915]/95 shadow-lg"
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-4">
            <span className={`p-3 rounded-xl shadow-md transition-colors ${
              cosmeticTheme === "light" 
                ? "bg-parchment-800 text-parchment-100" 
                : "bg-amber-gold text-stone-950"
            }`}>
              <BookOpen className="h-7 w-7" id="header-book-icon" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-2xl tracking-tight sm:text-3xl">
                  {explainLang === "he" ? "מפרש התלמוד הדיגיטלי" : "Beit Midrash Explainer"}
                </h1>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                  cosmeticTheme === "light"
                    ? "bg-parchment-200 text-parchment-800 border border-parchment-300"
                    : "bg-[#3e3423] text-amber-gold border border-[#584931]"
                }`}>
                  Talmud AI Shas
                </span>
              </div>
              <p className={`text-xs font-semibold tracking-wide mt-0.5 ${textSecondaryClass}`}>
                {currT.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
            
            {/* SAVED JOURNAL LIBRARY BUTTON */}
            <button
              id="btn-trigger-history"
              onClick={() => setShowHistory(true)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl hover:shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                cosmeticTheme === "light"
                  ? "bg-white text-stone-700 border border-stone-300 hover:border-parchment-800 hover:bg-parchment-100"
                  : "bg-[#29231c] text-[#f5ebd2] border border-[#4a3b22] hover:border-amber-gold hover:bg-[#342c23]"
              }`}
            >
              <History className="h-4 w-4" />
              <span>{explainLang === "he" ? "יומן לימוד" : "Study Journal"}</span>
              {savedAnalyses.length > 0 && (
                <span className={`ml-1 px-2 py-0.5 text-xs rounded-full font-mono font-bold ${
                  cosmeticTheme === "light" ? "bg-parchment-800 text-white" : "bg-amber-gold text-stone-950"
                }`}>
                  {savedAnalyses.length}
                </span>
              )}
            </button>

            {/* LIGHT/DARK THEME TOGGLE */}
            <button
              id="cosmetic-theme-toggle"
              onClick={() => setCosmeticTheme(cosmeticTheme === "light" ? "dark" : "light")}
              className={`p-2 rounded-xl transition-all border cursor-pointer hover:scale-105 ${
                cosmeticTheme === "light"
                  ? "bg-white border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  : "bg-[#211d18] border-[#3e3423] text-amber-gold hover:bg-[#322a1f]"
              }`}
              title={currT.themePrompt}
            >
              {cosmeticTheme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>

            {/* LANGUAGE CHANGER */}
            <div className={`p-1 rounded-xl shadow-xs inline-flex ${
              cosmeticTheme === "light" ? "bg-stone-200/60" : "bg-[#2d251d]"
            }`}>
              <button
                id="lang-btn-english"
                onClick={() => setExplainLang("en")}
                className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  explainLang === "en"
                    ? cosmeticTheme === "light" 
                      ? "bg-white text-stone-900 shadow-sm" 
                      : "bg-amber-gold text-stone-950 shadow-md animate-pulse"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                EN
              </button>
              <button
                id="lang-btn-hebrew"
                onClick={() => setExplainLang("he")}
                className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  explainLang === "he"
                    ? cosmeticTheme === "light" 
                      ? "bg-parchment-800 text-white shadow-sm"
                      : "bg-[#f5ebd2] text-stone-950 shadow-md"
                    : "text-stone-500 hover:text-stone-850"
                }`}
              >
                עב
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* DETAILED WORKING MARGIN SPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* API Key Missing Notification banner */}
        {hasApiKey === false && (
          <div className={`border-l-4 p-4 rounded-xl flex items-start gap-3 shadow-sm ${
            cosmeticTheme === "light"
              ? "bg-amber-50/80 border-amber-500 text-stone-800"
              : "bg-[#2c2011] border-amber-gold text-[#f9f2e3]"
          }`} id="api-key-banner">
            <AlertCircle className="h-5.5 w-5.5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="font-bold text-sm">
                {currT.noApiKeyWarning}
              </p>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">
                {explainLang === "he" 
                  ? "תוכל להציג את כל הדוגמאות המקצועיות המובנות ביומן ללא הגדרת מפתח. כדי להזין קטעים מותאמים עם הבינה המלאכותית, הגדר מפתח סודי בשם GEMINI_API_KEY במסך ה-Secrets."
                  : "You can fully explore all built-in high fidelity Talmuds without any API configurations. To study your own custom copied texts, please add your GEMINI_API_KEY to the AI Studio Secrets panel."
                }
              </p>
            </div>
          </div>
        )}

        {/* INPUT AND PRE-BUILT LEATHER SPIN TABS */}
        <section className={`border-2 rounded-2xl shadow-lg p-6 relative overflow-hidden transition-all ${cardBgClass}`} id="paster-gilded-box">
          {/* Ancient Ornamental Corners */}
          <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 pointer-events-none ${cosmeticTheme === "light" ? "border-parchment-300" : "border-[#4e3c27]"}`} />
          <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 pointer-events-none ${cosmeticTheme === "light" ? "border-parchment-300" : "border-[#4e3c27]"}`} />
          <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 pointer-events-none ${cosmeticTheme === "light" ? "border-parchment-300" : "border-[#4e3c27]"}`} />
          <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 pointer-events-none ${cosmeticTheme === "light" ? "border-parchment-300" : "border-[#4e3c27]"}`} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${cosmeticTheme === "light" ? "bg-parchment-800" : "bg-amber-gold"}`} />
              <h2 className="font-display font-black text-xl tracking-tight">
                {explainLang === "he" ? "העתק והדבק קטע תלמודי חדש" : "Talmud Copier & Annotation Engine"}
              </h2>
            </div>
            {inputText && (
              <button
                id="reset-input-action"
                onClick={handleReset}
                className="text-xs font-mono font-bold transition-all px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash className="h-3.5 w-3.5" />
                <span>{currT.clearBtn}</span>
              </button>
            )}
          </div>

          <textarea
            id="talmud-textarea-field"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={currT.pastePlaceholder}
            className={`w-full min-h-[160px] p-5 text-xl font-hebrew leading-relaxed rounded-xl outline-none focus:ring-2 transition-all shadow-inner relative border ${
              cosmeticTheme === "light"
                ? "bg-parchment-100/50 border-stone-300/80 focus:border-parchment-850 focus:ring-parchment-200/60 text-stone-900"
                : "bg-[#181512] border-[#3a3227] focus:border-amber-gold focus:ring-amber-gold/25 text-[#f9f2e3] placeholder-[#6e5e49]"
            }`}
            dir="rtl"
          />

          <div className="mt-6 flex flex-col lg:flex-row lg:items-center gap-6 justify-between border-t border-stone-200/50 dark:border-[#3e3423] pt-5">
            
            {/* Quick Slices pre-mangled looking like fine book bindings */}
            <div className="flex-1">
              <span className={`text-xs font-bold block mb-3 font-mono uppercase tracking-widest ${
                cosmeticTheme === "light" ? "text-stone-500" : "text-[#b4a485]"
              }`}>
                {currT.loadExample}
              </span>
              <div className="flex flex-wrap gap-3">
                {samples.map((sample) => (
                  <button
                    key={sample.id}
                    id={`spine-sample-${sample.id}`}
                    onClick={() => loadSample(sample.text)}
                    className={`group px-3.5 py-2 rounded-xl text-left transition-all border font-semibold flex flex-col relative overflow-hidden cursor-pointer ${
                      inputText.includes(sample.text.substring(0, 30))
                        ? cosmeticTheme === "light"
                          ? "bg-parchment-800 border-parchment-900 text-white shadow-md scale-102"
                          : "bg-[#bfa06b] border-amber-gold text-stone-950 shadow-md scale-102"
                        : cosmeticTheme === "light"
                        ? "bg-parchment-100 hover:bg-parchment-200 border-parchment-300 text-stone-800 shadow-2xs hover:scale-102"
                        : "bg-[#2a241e] hover:bg-[#382f26] border-[#4a3f30] text-[#eee4ce] shadow-sm hover:scale-102"
                    }`}
                  >
                    {/* Spine Ridge indicator lines */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-stone-950/20" />
                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-white/10" />
                    
                    <span className="text-xs font-display flex items-center gap-1.5">
                      <Book className="h-3 w-3 shrink-0" />
                      {sample.title}
                    </span>
                    <span className={`text-[10px] font-mono mt-0.5 ${
                      inputText.includes(sample.text.substring(0,30))
                        ? cosmeticTheme === "light" ? "text-parchment-200" : "text-stone-900/60"
                        : "text-stone-400 group-hover:text-amber-gold"
                    }`}>
                      {sample.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Explainer Button with shimmer effect */}
            <div className="shrink-0">
              <button
                id="submit-analysis-trigger"
                onClick={() => handleAnalyze(inputText)}
                disabled={isLoading || !inputText.trim()}
                className={`w-full lg:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 cursor-pointer ${
                  isLoading
                    ? "bg-stone-500 text-stone-300 cursor-not-allowed"
                    : !inputText.trim()
                    ? cosmeticTheme === "light"
                      ? "bg-stone-200 text-stone-400 border border-stone-300 cursor-not-allowed"
                      : "bg-[#2d2720] text-stone-600 border border-[#3e3423] cursor-not-allowed"
                    : cosmeticTheme === "light"
                    ? "bg-parchment-800 hover:bg-parchment-900 text-parchment-50 ring-2 ring-parchment-400 ring-offset-2 hover:shadow-lg"
                    : "bg-amber-gold hover:bg-[#eadebc] text-stone-950 ring-2 ring-[#584931] ring-offset-2 ring-offset-stone-900 hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{currT.analyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4.5 w-4.5" />
                    <span>{currT.analyzeBtn}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </section>

        {/* ERROR SCREEN ALERT */}
        {error && (
          <div className="bg-red-50 dark:bg-[#2c1313] border-2 border-red-500/75 p-5 rounded-2xl flex items-start gap-4 shadow-lg animate-fade-in" id="workspace-error-alert">
            <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-red-800 dark:text-red-300 text-sm">Study Interruption Notice</h4>
              <p className="text-sm text-red-700 dark:text-red-200 mt-1 leading-relaxed">{error}</p>
              <div className="mt-4 flex gap-3">
                <button
                  id="error-retry-action"
                  onClick={() => handleAnalyze(inputText)}
                  className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ANALYSIS PANELS VISUALIZER */}
        {analysis ? (
          <div className="space-y-8 animate-fade-in">
            
            {/* INTRO JUMBOTRON SUMMARY (OVERALL ESSAY) */}
            <div className={`rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden transition-all border ${
              cosmeticTheme === "light"
                ? "bg-stone-900 border-stone-950 text-parchment-50"
                : "bg-[#1d1915] border-amber-gold/30 text-[#f5ebd2]"
            }`} id="jumbotron-context-card">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none text-[220px] font-serif transform translate-x-12 -translate-y-16">
                ת
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-6 w-1 bg-amber-gold rounded-full" />
                  <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-amber-gold">
                    {currT.titleLabel}
                  </span>
                </div>

                <h2 className="font-display font-black text-3xl sm:text-4xl leading-tight tracking-tight text-white dark:text-amber-gold mb-3">
                  {analysis.title}
                </h2>

                <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 mt-1 border-y border-stone-800 dark:border-[#382f25] py-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400">{currT.tractate}:</span>
                    <span className="font-mono bg-stone-800/80 px-2.5 py-1 rounded-md text-amber-100 font-bold border border-stone-700/50">
                      {analysis.tractate}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400">{currT.category}:</span>
                    <span className="bg-stone-800/80 px-2.5 py-1 rounded-md text-amber-100 font-bold border border-stone-700/50">
                      {analysis.category}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5" />
                    {currT.overallTitle}
                  </h3>
                  <p className={`text-stone-200 text-base sm:text-lg leading-relaxed ${
                    explainLang === "he" ? "text-right font-light leading-loose" : ""
                  }`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                    {explainLang === "he" ? analysis.overallExplanationHe : analysis.overallExplanationEn}
                  </p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE LAYOUT SELECTOR AND HELP INFO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-parchment-100 dark:bg-[#25201a] p-3 rounded-2xl border border-parchment-200 dark:border-[#3a3227]">
              
              <div className="flex items-center gap-2.5">
                <Layers className={`h-5 w-5 ${cosmeticTheme === "light" ? "text-parchment-850" : "text-amber-gold"}`} />
                <span className={`text-xs font-bold font-mono tracking-wide ${textPrimaryClass}`}>
                  {explainLang === "he" ? "צורת סידור הלימוד:" : "STUDY VIEW LAYOUT:"}
                </span>
              </div>

              {/* Toggle Buttons */}
              <div className="inline-flex rounded-xl p-1 bg-stone-200/50 dark:bg-[#1a1612] border border-stone-300/40 dark:border-[#322a20] w-full sm:w-auto">
                <button
                  id="layout-btn-vilna"
                  onClick={() => setLayoutMode("vilna")}
                  className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    layoutMode === "vilna"
                      ? cosmeticTheme === "light"
                        ? "bg-white text-stone-900 shadow-sm"
                        : "bg-amber-gold text-stone-950 shadow-md font-extrabold"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  🏫 {currT.layoutSelectorHe}
                </button>
                <button
                  id="layout-btn-bento"
                  onClick={() => setLayoutMode("bento")}
                  className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    layoutMode === "bento"
                      ? cosmeticTheme === "light"
                        ? "bg-white text-stone-900 shadow-sm"
                        : "bg-[#f5ebd2] text-stone-950 shadow-md font-extrabold"
                      : "text-stone-500 hover:text-stone-850"
                  }`}
                >
                  📊 {currT.layoutSelectorEn}
                </button>
              </div>

            </div>

            {/* RHETORICAL COLOUR LEGEND */}
            <div className={`p-4 rounded-2xl border transition-all ${
              cosmeticTheme === "light" 
                ? "bg-white border-stone-200 shadow-sm"
                : "bg-[#1f1a14] border-[#3a3227] shadow"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-stone-200/60 dark:border-stone-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-gold animate-pulse" />
                  <span className="text-xs font-black tracking-wider uppercase font-mono">
                    {explainLang === "he" ? "מפתח צבעי הטיעון התלמודי:" : "TALMUDIC RHETORICAL COLOR MAP:"}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  {explainLang === "he" ? "* חלקי התרגום ייצבעו על פי המהלך ההלכתי של הסוגיה" : "* Hover/Click any passage line to trace study layers"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Object.entries(talmudicTypeMeta).map(([key, value]) => (
                  <div 
                    key={key} 
                    className={`p-2 rounded-lg border text-xs flex items-center gap-2.5 transition-all hover:scale-[1.02] cursor-default ${
                      cosmeticTheme === "light" ? value.lightBg.split(" ")[0] + " " + value.lightBorder : value.darkBg.split(" ")[0] + " " + value.darkBorder
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full shrink-0 ${value.dot}`} />
                    <div className="flex flex-col">
                      <span className="font-bold text-stone-900 dark:text-[#f3edd7]">{value.labelHe}</span>
                      <span className="text-[9px] text-stone-500 font-mono leading-none mt-0.5">{value.labelEn}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC LAYOUT ENGINE RENDERING */}
            <AnimatePresence mode="wait">
              
              {layoutMode === "vilna" ? (
                
                /* ================== TRADITIONAL TRIPLE-COLUMN SHAS VILNA LAYOUT ================== */
                <motion.div
                  key="vilna-layout"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                  id="vilna-folio-view"
                >
                  
                  {/* LEFT COLUMN: THE SURROUNDING "RASHI" COLUMN - Contains Line-by-Line Modern Translation/Badges */}
                  <div className="lg:col-span-3 lg:max-h-[750px] lg:overflow-y-auto pr-1 flex flex-col gap-4">
                    <div className="text-center pb-2 border-b-2 border-stone-300 dark:border-[#3e3423] sticky top-0 bg-white/70 backdrop-blur-xs dark:bg-[#181512]/90 z-10 py-1">
                      <span className="text-[10px] tracking-widest uppercase font-mono font-black text-amber-gold block">
                        Surrounding Commentary A
                      </span>
                      <h4 className="font-display font-bold text-sm text-stone-700 dark:text-[#c2b69d]">
                        {explainLang === "he" ? "תרגום פשט שוטף (רש\"י)" : "Literal Plain Translation"}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {analysis.lineByLine.map((line, idx) => {
                        const isHovered = hoveredLineIndex === idx;
                        const isSelected = selectedLineIndex === idx;
                        const rType = getNormalizedTalmudicType(line.talmudicType, line.translationHe, line.translationEn);
                        const meta = talmudicTypeMeta[rType];

                        let bgStyleClass = "";
                        let borderStyleClass = "";

                        if (isSelected) {
                          bgStyleClass = cosmeticTheme === "light"
                            ? "bg-amber-100/70 border-amber-500 shadow-md ring-1 ring-amber-500/30"
                            : "bg-[#3e3223] border-amber-gold shadow-md ring-1 ring-amber-500/30";
                          borderStyleClass = "border-amber-gold";
                        } else if (isHovered) {
                          bgStyleClass = cosmeticTheme === "light"
                            ? meta.lightBg
                            : meta.darkBg;
                          borderStyleClass = cosmeticTheme === "light"
                            ? meta.lightBorder
                            : meta.darkBorder;
                        } else {
                          bgStyleClass = cosmeticTheme === "light"
                            ? meta.lightBg.split(" ")[0]
                            : meta.darkBg.split(" ")[0];
                          borderStyleClass = cosmeticTheme === "light"
                            ? meta.lightBorder
                            : meta.darkBorder;
                        }

                        return (
                          <div
                            key={idx}
                            ref={(el) => { commentCardsRef.current[idx] = el; }}
                            onMouseEnter={() => setHoveredLineIndex(idx)}
                            onMouseLeave={() => setHoveredLineIndex(null)}
                            onClick={() => setSelectedLineIndex(isSelected ? null : idx)}
                            className={`p-3 rounded-lg border text-xs leading-relaxed transition-all cursor-pointer relative ${bgStyleClass} ${borderStyleClass}`}
                          >
                            <div className="flex justify-between items-center mb-1 bg-stone-100/60 dark:bg-stone-850/40 px-1.5 py-0.5 rounded">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-black text-[9px] text-stone-400"># {idx + 1}</span>
                                <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full uppercase font-black border tracking-wider flex items-center gap-1 shrink-0 ${
                                  cosmeticTheme === "light" ? meta.lightBadge : meta.darkBadge
                                }`}>
                                  <span className={`w-1 h-1 rounded-full ${meta.dot}`} />
                                  {explainLang === "he" ? meta.labelHe : meta.labelEn}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(explainLang === "he" ? line.translationHe : line.translationEn, idx);
                                }}
                                className="text-[9px] text-stone-400 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                                title="Copy translation"
                              >
                                {copiedIndex === idx ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-2.5 w-2.5" />}
                              </button>
                            </div>

                            <p className={`font-semibold ${textPrimaryClass}`}>
                              {explainLang === "he" ? line.translationHe : line.translationEn}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CENTER COLUMN: THE CORE GEMARA IN THE COLUMN OF PRIDE (פנים) */}
                  <div className="lg:col-span-6 flex flex-col">
                    <div className={`border-4 border-double rounded-3xl p-6 sm:p-8 shadow-xl relative study-tomb-shape transition-all flex-1 flex flex-col ${
                      cosmeticTheme === "light"
                        ? "bg-parchment-100 border-parchment-300"
                        : "bg-[#25211d] border-[#4a3b22]"
                    }`}>
                      
                      {/* Gilded Top Seal */}
                      <div className="text-center border-b border-stone-350 dark:border-[#3e3423] pb-4 mb-5">
                        <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-amber-gold block mb-1">
                          {currT.originalPane}
                        </span>
                        
                        <div className="flex justify-center items-center gap-1 text-md sm:text-lg text-amber-950 font-bold">
                          <span className={`font-display tracking-tight text-xl ${cosmeticTheme === "light" ? "text-stone-800" : "text-amber-gold"}`}>
                            {analysis.title}
                          </span>
                        </div>
                        
                        <p className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-1">
                          {analysis.tractate} • {analysis.category}
                        </p>
                      </div>

                      {/* Interactive Instruction guide tooltip */}
                      <div className="bg-amber-100/35 border border-amber-gold/20 p-3 rounded-lg text-xs text-stone-600 dark:text-[#c2b69d] mb-6 leading-relaxed flex items-start gap-2">
                        <span className="animate-pulse text-amber-600 shrink-0 select-none">✨</span>
                        <p>{currT.interactiveGuide}</p>
                      </div>

                      {/* Actual visual simulated parchment wrapper for Hebrew text */}
                      <div className={`p-6 rounded-2xl border-2 border-dashed shadow-inner flex-1 flex flex-col justify-center ${
                        cosmeticTheme === "light"
                          ? "bg-parchment-50 border-stone-300"
                          : "bg-[#181512] border-[#3a3227]"
                      }`} dir="rtl">
                        <div className="text-right text-xl leading-10 font-hebrew font-semibold select-all">
                          
                          {/* We segment and space each individual original Aramaic phrase */}
                          {analysis.lineByLine.map((line, idx) => {
                            const isHovered = hoveredLineIndex === idx;
                            const isSelected = selectedLineIndex === idx;
                            
                            return (
                              <span
                                key={idx}
                                ref={(el: any) => { originalLinesRef.current[idx] = el; }}
                                onMouseEnter={() => setHoveredLineIndex(idx)}
                                onMouseLeave={() => setHoveredLineIndex(null)}
                                onClick={() => handleLineClick(idx)}
                                className={`inline mx-1 px-1 py-0.5 rounded cursor-pointer select-all transition-all duration-150 border-b border-transparent relative leading-loose ${
                                  isSelected
                                    ? "bg-amber-gold/30 dark:bg-amber-gold/45 text-stone-900 dark:text-white font-black border-dashed border-amber-600 shadow-2xs"
                                    : isHovered
                                    ? "bg-amber-100/50 dark:bg-[#342c22]/50 text-stone-900 dark:text-amber-100 border-b border-[#bfa06b]"
                                    : cosmeticTheme === "light"
                                    ? "text-stone-900 hover:bg-parchment-100"
                                    : "text-[#eee4ce] hover:bg-[#25201a]"
                                }`}
                              >
                                {line.original}
                                {/* Traditional Footnote indicator */}
                                <sup className="text-[10px] font-sans text-amber-gold font-bold ml-1 inline-block select-none bg-stone-200/50 dark:bg-stone-800/80 w-4 h-4 text-center rounded-full leading-3 border border-stone-300/40 transform -translate-y-1">
                                  {idx + 1}
                                </sup>
                              </span>
                            );
                          })}

                        </div>
                      </div>

                      {/* Gilded bottom stamps and layout seals */}
                      <div className="mt-5 pt-3 border-t border-stone-300/60 dark:border-[#382f25] flex justify-between items-center text-[10px] text-stone-400 font-mono">
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          <span>Talmudic Rhetoric Shakla-Vetarya Integration</span>
                        </div>
                        <span>חבר הבית</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: THE OUTSIDE "TOSAFOT" COLUMN - Detailed Analytical Commentary + Legal Principles */}
                  <div className="lg:col-span-3 lg:max-h-[750px] lg:overflow-y-auto pl-1 flex flex-col gap-4">
                    <div className="text-center pb-2 border-b-2 border-stone-300 dark:border-[#3e3423] sticky top-0 bg-white/70 backdrop-blur-xs dark:bg-[#181512]/90 z-10 py-1">
                      <span className="text-[10px] tracking-widest uppercase font-mono font-black text-amber-gold block">
                        Surrounding Commentary B
                      </span>
                      <h4 className="font-display font-bold text-sm text-stone-700 dark:text-[#c2b69d]">
                        {explainLang === "he" ? "פרשנות העמקה והקשר (תוספות)" : "Analytical Deep Commentary"}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {analysis.lineByLine.map((line, idx) => {
                        const isHovered = hoveredLineIndex === idx;
                        const isSelected = selectedLineIndex === idx;

                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoveredLineIndex(idx)}
                            onMouseLeave={() => setHoveredLineIndex(null)}
                            onClick={() => setSelectedLineIndex(isSelected ? null : idx)}
                            className={`p-3 rounded-lg border text-xs leading-relaxed transition-all cursor-pointer relative ${
                              isSelected
                                ? "bg-amber-100/60 dark:bg-[#342a1f] border-amber-gold dark:border-amber-gold shadow-sm ring-1 ring-amber-500/20"
                                : isHovered
                                ? "bg-amber-105/20 dark:bg-[#25201a] border-[#bfa06b]/40"
                                : cosmeticTheme === "light"
                                ? "bg-stone-50 border-stone-200"
                                : "bg-[#1f1a16] border-[#2f271e] hover:border-[#42372a]"
                            }`}
                          >
                            <span className="font-sans font-bold text-[9px] text-[#bfa06b] block mb-1">
                              EXPANSION CARD {idx + 1}
                            </span>
                            <p className={textSecondaryClass}>
                              {explainLang === "he" ? line.commentaryHe : line.commentaryEn}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
                
              ) : (
                
                /* ================== MODERN BENTO ACADEMIC DETAILS BLOCK ================== */
                <motion.div
                  key="bento-layout"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  id="scholarly-bento-view"
                >
                  
                  {/* LEFT DETAILED LINE EXAMINER PANEL */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className={`p-6 rounded-2xl border shadow-sm ${cardBgClass}`} id="bento-card-lines-dissect">
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800">
                        <FileText className="h-5 w-5 text-amber-gold" />
                        <h3 className="font-display font-bold text-lg">
                          {currT.lineTranslation}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {analysis.lineByLine.map((line, idx) => {
                          const isHovered = hoveredLineIndex === idx;
                          const isSelected = selectedLineIndex === idx;
                          const rType = getNormalizedTalmudicType(line.talmudicType, line.translationHe, line.translationEn);
                          const meta = talmudicTypeMeta[rType];

                          let bgStyleClass = "";
                          let borderStyleClass = "";

                          if (isSelected) {
                            bgStyleClass = cosmeticTheme === "light"
                              ? "bg-amber-100/30 border-amber-500 shadow-md"
                              : "bg-[#342a1f]/70 border-amber-gold shadow-md";
                          } else if (isHovered) {
                            bgStyleClass = cosmeticTheme === "light"
                              ? meta.lightBg
                              : meta.darkBg;
                            borderStyleClass = cosmeticTheme === "light"
                              ? meta.lightBorder
                              : meta.darkBorder;
                          } else {
                            bgStyleClass = cosmeticTheme === "light"
                              ? meta.lightBg.split(" ")[0]
                              : meta.darkBg.split(" ")[0];
                            borderStyleClass = cosmeticTheme === "light"
                              ? meta.lightBorder
                              : meta.darkBorder;
                          }

                          return (
                            <div
                              key={idx}
                              id={`bento-line-card-${idx}`}
                              onMouseEnter={() => setHoveredLineIndex(idx)}
                              onMouseLeave={() => setHoveredLineIndex(null)}
                              className={`p-4 rounded-xl border transition-all relative ${bgStyleClass} ${borderStyleClass}`}
                            >
                              {/* Accent ribbon */}
                              <div className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-md transition-all ${meta.dot}`} />
                              
                              {/* Original sentence in Hebrew Shas typography */}
                              <div className="flex gap-4 justify-between items-center mb-3" dir="rtl">
                                <div className="flex items-center gap-2">
                                  <span className={`font-sans text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 border select-none ${
                                    cosmeticTheme === "light" 
                                      ? "bg-parchment-200 text-parchment-800 border-parchment-300" 
                                      : "bg-[#2d251c] text-amber-gold border-[#4e3c27]"
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-black border tracking-wider flex items-center gap-1 shrink-0 ${
                                    cosmeticTheme === "light" ? meta.lightBadge : meta.darkBadge
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                                    {explainLang === "he" ? meta.labelHe : meta.labelEn}
                                  </span>
                                </div>
                                <p className="font-hebrew text-xl font-bold text-stone-850 dark:text-[#f3edd7] text-right flex-1 select-all hover:text-amber-805 leading-relaxed">
                                  {line.original}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 border-t border-stone-200/50 dark:border-stone-800/80 pt-3 text-xs sm:text-sm">
                                {/* Translation Column */}
                                <div className={explainLang === "he" ? "text-right" : "text-left"}>
                                  <span className="text-[10px] font-mono text-stone-400 font-bold block mb-1">
                                    {currT.translationText}
                                  </span>
                                  <p className={`font-semibold ${textPrimaryClass}`}>
                                    {explainLang === "he" ? line.translationHe : line.translationEn}
                                  </p>
                                </div>

                                {/* Commentary Column */}
                                <div className={explainLang === "he" ? "text-right" : "text-left"}>
                                  <span className="text-[10px] font-mono text-[#bfa06b] font-bold block mb-1">
                                    {currT.commentaryText}
                                  </span>
                                  <p className={`leading-relaxed text-xs ${textSecondaryClass}`}>
                                    {explainLang === "he" ? line.commentaryHe : line.commentaryEn}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* INTERACTIVE TIMELINE (SHAKLA VETARYA) */}
                    <div className={`p-6 rounded-2xl border shadow-sm ${cardBgClass}`} id="bento-discussion-timeline">
                      <div className="flex items-center gap-2 mb-6 pb-2 border-b border-stone-200 dark:border-stone-800">
                        <Compass className="h-5 w-5 text-amber-gold" />
                        <h3 className="font-display font-bold text-lg">
                          {currT.rhetoricalFlow}
                        </h3>
                      </div>

                      <div className="relative pl-6 border-l-2 border-dashed border-stone-200 dark:border-stone-750 space-y-8 ml-3">
                        {analysis.discussionFlow.map((step, idx) => (
                          <div key={idx} className="relative group">
                            
                            {/* Marker node */}
                            <span className={`absolute -left-[35px] top-1 text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center border shadow-sm transition-all group-hover:scale-110 ${
                              cosmeticTheme === "light"
                                ? "bg-stone-850 border-stone-900 text-stone-100"
                                : "bg-amber-gold border-amber-900 text-stone-950 font-black"
                            }`}>
                              {step.stepNumber}
                            </span>

                            <div className={`p-4 rounded-xl border transition-all ${
                              cosmeticTheme === "light"
                                ? "bg-stone-50/80 hover:bg-stone-50 border-stone-200"
                                : "bg-[#241f1a]/60 hover:bg-[#241f1a] border-[#3e3423]"
                            }`}>
                              <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
                                <span className={`font-bold font-display text-sm sm:text-base ${
                                  cosmeticTheme === "light" ? "text-stone-900" : "text-amber-gold"
                                }`}>
                                  {explainLang === "he" ? step.stageHe : step.stageEn}
                                </span>
                                <span className="text-[10px] font-mono text-stone-400">
                                  Logical Turn {step.stepNumber}
                                </span>
                              </div>
                              
                              <p className={`text-xs sm:text-sm leading-relaxed ${textSecondaryClass}`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                                {explainLang === "he" ? step.detailsHe : step.detailsEn}
                              </p>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT BENTO ACCESSORY COLUMN (SAGES, LEXICON, JURISPRUDENCE) */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    
                    {/* Sages panel */}
                    <div className={`p-5 rounded-2xl border shadow-sm ${cardBgClass}`} id="bento-sages">
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-light">
                        <Award className="h-4.5 w-4.5 text-amber-gold" />
                        <h4 className="font-display font-bold">
                          {currT.sagesTitle}
                        </h4>
                      </div>

                      <p className="text-xs text-stone-400 mb-3 block">
                        {currT.sagesDesc}
                      </p>

                      {analysis.sages.length === 0 ? (
                        <p className="text-stone-400 text-xs italic">
                          No specific Sages indexed.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {analysis.sages.map((sage, i) => (
                            <div key={i} className={`p-3.5 rounded-xl border transition-all ${
                              cosmeticTheme === "light"
                                ? "bg-stone-50 hover:bg-amber-50/20 border-stone-200"
                                : "bg-[#1f1a16] hover:bg-[#2b241e] border-[#31291f]"
                            }`}>
                              <div className="flex justify-between items-baseline gap-2">
                                <h5 className={`font-bold text-sm ${textPrimaryClass}`}>
                                  {explainLang === "he" ? sage.nameHe : sage.nameEn}
                                </h5>
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-amber- gold/20 border border-amber-gold/45 text-amber-500 rounded-md">
                                  {sage.role}
                                </span>
                              </div>
                              <p className={`text-xs mt-2 leading-relaxed ${textSecondaryClass}`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                                {explainLang === "he" ? sage.descriptionHe : sage.descriptionEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Keywords lexicon definitions panel */}
                    <div className={`p-5 rounded-2xl border shadow-sm ${cardBgClass}`} id="bento-vocab">
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-105">
                        <Bookmark className="h-4.5 w-4.5 text-amber-gold" />
                        <h4 className="font-display font-bold">
                          {currT.keywordsTitle}
                        </h4>
                      </div>

                      <p className="text-xs text-stone-400 mb-3 block">
                        {currT.vocabularyDesc}
                      </p>

                      {analysis.keywords.length === 0 ? (
                        <p className="text-stone-400 text-xs italic">
                          No terminology cards categorized.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {analysis.keywords.map((word, i) => (
                            <div key={i} className={`p-3 rounded-lg border flex gap-3 ${
                              cosmeticTheme === "light" ? "bg-[#faf8f5] border-stone-200" : "bg-[#1c1814] border-[#29231c]"
                            }`}>
                              <span className="font-hebrew text-lg font-black text-amber-700 bg-amber-100/40 p-2 rounded shadow-2xs self-start max-h-12 flex items-center shrink-0 border border-amber-gold/25">
                                {word.term}
                              </span>
                              <div className="flex-1 min-w-0 text-xs text-left">
                                <h5 className={`font-bold text-xs ${textPrimaryClass}`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                                  {explainLang === "he" ? word.meaningHe : word.meaningEn}
                                </h5>
                                <p className={`text-[10px] leading-relaxed mt-1.5 ${textSecondaryClass}`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                                  <strong className="text-amber-800 dark:text-amber-gold">{explainLang === "he" ? "תפקיד: " : "Action: "}</strong>
                                  {explainLang === "he" ? word.functionHe : word.functionEn}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Legal Principles conceptual grid */}
                    <div className={`p-5 rounded-2xl border shadow-sm ${cardBgClass}`} id="bento-jurisprudence">
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-105">
                        <Scale className="h-4.5 w-4.5 text-amber-gold" />
                        <h4 className="font-display font-bold">
                          {currT.legalTitle}
                        </h4>
                      </div>

                      {analysis.legalPrinciples.length === 0 ? (
                        <p className="text-stone-400 text-xs italic">
                          No conceptual jurisprudence categorized.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {analysis.legalPrinciples.map((lemma, i) => (
                            <div key={i} className={`p-3.5 rounded-xl border flex gap-3 ${
                              cosmeticTheme === "light" ? "bg-stone-50 border-stone-200" : "bg-[#1a1714] border-[#29231c]"
                            }`}>
                              <span className="p-1 px-1.5 bg-amber-100 text-[#4a3b22] rounded-md h-7 shrink-0 text-[10px] font-bold">Concept</span>
                              <div className="flex-1 min-w-0">
                                <h5 className={`font-bold text-xs sm:text-sm ${textPrimaryClass}`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                                  {explainLang === "he" ? lemma.conceptHe : lemma.conceptEn}
                                </h5>
                                <p className={`text-[11px] leading-relaxed mt-1.5 ${textSecondaryClass}`} dir={explainLang === "he" ? "rtl" : "ltr"}>
                                  {explainLang === "he" ? lemma.applicationHe : lemma.applicationEn}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>
        ) : (
          
          /* IMMERSIVE EMPTY STATE WITH EXAMPLES GRID */
          <div className={`border rounded-2xl p-12 text-center relative overflow-hidden transition-all md:py-20 ${cardBgClass}`} id="empty-workspace-state">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <span className={`p-4 rounded-full shadow-inner mb-5 inline-block ${
                cosmeticTheme === "light" ? "bg-parchment-100" : "bg-[#25201a]"
              }`}>
                <BookMarked className={`h-11 w-11 ${cosmeticTheme === "light" ? "text-parchment-800" : "text-amber-gold"}`} />
              </span>
              <h3 className="font-display font-black text-xl tracking-tight mb-2">
                {currT.noDataYet.split(".")[0]}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${textSecondaryClass}`}>
                {currT.noDataYet.split(".")[1]}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-gold rounded-full" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-amber-gold">
                  Beit Midrash Study Companion
                </span>
                <span className="w-1.5 h-1.5 bg-amber-gold rounded-full" />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* DETAILED RICH FOOTER */}
      <footer className={`mt-auto border-t py-6 text-center text-xs transition-colors ${
        cosmeticTheme === "light"
          ? "border-parchment-350 bg-stone-100/50 text-stone-500"
          : "border-[#2b241c] bg-[#1d1915] text-[#8e826b]"
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>
            © {new Date().getFullYear()} Beit Midrash AI Platform. Built with modern React, Vite, and Google AI Studio.
          </p>
          <div className="flex gap-4 font-semibold">
            <span className="hover:text-amber-gold cursor-help" title="Study Talmud easily in English and modern Hebrew">Folio Study System</span>
            <span>•</span>
            <span className="hover:text-amber-gold cursor-help" title="Local storage keeps saved history safe">Journal Active</span>
          </div>
        </div>
      </footer>

      {/* FULL STUDIED HISTORY SLIDE OVER SHEET (JOURNAL DRAWER) */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex justify-end" id="dialog-overlay-journal">
            
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-stone-950/60"
            />

            {/* Slide block */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`w-full max-w-md h-full shadow-2xl flex flex-col relative z-10 border-l ${
                cosmeticTheme === "light"
                  ? "bg-white border-stone-200"
                  : "bg-[#181512] border-[#3e3423] text-stone-100"
              }`}
              dir={explainLang === "he" ? "rtl" : "ltr"}
            >
              
              <div className={`p-5 border-b flex justify-between items-center ${
                cosmeticTheme === "light" ? "bg-stone-50 border-stone-200" : "bg-[#211d18] border-[#3a3227]"
              }`}>
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-amber-gold animate-pulse" />
                  <h3 className="font-display font-black text-lg">
                    {currT.savedAnalysesTitle}
                  </h3>
                </div>
                <button
                  id="dialog-close-btn"
                  onClick={() => setShowHistory(false)}
                  className="p-1 px-2.5 bg-stone-200/40 hover:bg-stone-300/60 font-black rounded-lg text-xs cursor-pointer text-stone-500 hover:text-stone-900"
                >
                  ✕
                </button>
              </div>

              {/* Saved records list scrollbar */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {savedAnalyses.length === 0 ? (
                  <div className="text-center py-16 text-stone-400 text-sm">
                    <p>{currT.noSaved}</p>
                  </div>
                ) : (
                  savedAnalyses.map((historyItem) => (
                    <div
                      key={historyItem.id}
                      onClick={() => {
                        setAnalysis(historyItem.analysis);
                        setInputText(historyItem.originalText);
                        setShowHistory(false);
                        setError(null);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all group relative ${
                        cosmeticTheme === "light"
                          ? "bg-stone-50 hover:bg-amber-50/20 border-stone-200 hover:border-amber-gold"
                          : "bg-[#211d18] hover:bg-[#2d251d] border-[#342c23] hover:border-amber-gold"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="font-bold text-sm line-clamp-1 flex-1">
                          {historyItem.analysis.title}
                        </h4>
                        <button
                          id={`delete-btn-${historyItem.id}`}
                          onClick={(e) => deleteFromHistory(historyItem.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-stone-450 hover:text-red-650 hover:bg-red-50/20 rounded transition-opacity cursor-pointer text-xs"
                          title="Delete from journal"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-[10px] text-stone-400 font-mono mb-2">
                        {historyItem.timestamp} • {historyItem.analysis.tractate}
                      </p>

                      <p className={`font-hebrew text-xs line-clamp-2 text-right leading-relaxed p-2 rounded border border-stone-250/25 ${
                        cosmeticTheme === "light" ? "bg-white/90 text-stone-700" : "bg-[#181512]/95 text-stone-300"
                      }`} dir="rtl">
                        {historyItem.originalText}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className={`p-4 border-t ${
                cosmeticTheme === "light" ? "bg-stone-50 border-stone-200" : "bg-[#211d18] border-[#3a3227]"
              }`}>
                <button
                  id="close-drawer-bottom-btn"
                  onClick={() => setShowHistory(false)}
                  className="w-full py-3 bg-stone-850 hover:bg-stone-900 text-[#fcfbf7] font-bold text-center rounded-xl transition-colors cursor-pointer text-xs"
                >
                  {currT.closeHistory}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
