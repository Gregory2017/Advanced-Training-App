import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  Sliders,
  Database,
  BarChart3,
  Globe,
  Play,
  Pause,
  RotateCcw,
  Timer,
  ChevronDown,
} from "lucide-react";
import { AppViewMode, UILanguage } from "../types";
import { Translations } from "../i18n";

interface HeaderBarProps {
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
  t: Translations;
  activeView: AppViewMode;
  setActiveView: (view: AppViewMode) => void;
  totalBankCount: number;
  // Practice timer state
  timerSeconds: number | null;
  timerRunning: boolean;
  onSetCustomTimer: (minutes: number | null) => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  isExamActive: boolean;
  examRemainingSeconds: number;
}

const LANG_OPTIONS: { code: UILanguage; short: string; label: string }[] = [
  { code: "uk", short: "UA", label: "Українська" },
  { code: "en", short: "EN", label: "English" },
  { code: "es", short: "ES", label: "Español" },
  { code: "ru", short: "RU", label: "Русский" },
];

export const HeaderBar: React.FC<HeaderBarProps> = ({
  uiLang,
  setUiLang,
  t,
  activeView,
  setActiveView,
  totalBankCount,
  timerSeconds,
  timerRunning,
  onSetCustomTimer,
  onToggleTimer,
  onResetTimer,
  isExamActive,
  examRemainingSeconds,
}) => {
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState("30");

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const navItems: { id: AppViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "train", label: t.nav.train, icon: <BookOpen className="w-4 h-4" /> },
    { id: "exam", label: t.nav.exam, icon: <Timer className="w-4 h-4" /> },
    { id: "constructor", label: t.nav.constructor, icon: <Sliders className="w-4 h-4" /> },
    {
      id: "bank",
      label: t.nav.bank,
      icon: <Database className="w-4 h-4" />,
      badge: totalBankCount,
    },
    { id: "stats", label: t.nav.stats, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const activeSeconds = isExamActive ? examRemainingSeconds : timerSeconds;
  const isLowTime = activeSeconds !== null && activeSeconds > 0 && activeSeconds <= 60;

  return (
    <header className="sticky top-0 z-30 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#E5E2DC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setActiveView("train")}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#141413] text-[#F8F7F4] flex items-center justify-center font-mono-tabular font-bold text-sm tracking-tighter shadow-xs group-hover:bg-indigo-600 transition-colors">
              AT
            </div>
            <div className="truncate">
              <div className="font-bold text-[15px] tracking-tight text-[#141413] leading-tight">
                {t.appName}
              </div>
              <div className="text-[11px] text-[#575653] hidden sm:block truncate max-w-[260px] lg:max-w-[340px]">
                {t.appSubtitle}
              </div>
            </div>
          </button>
        </div>

        {/* Center Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center bg-[#EFECE6] p-1 rounded-lg border border-[#E5E2DC]">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#141413] shadow-xs border border-[#E5E2DC]/80"
                    : "text-[#575653] hover:text-[#141413]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono-tabular ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-bold"
                        : "bg-[#E5E2DC] text-[#575653]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Configurable Timer + 4-Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Timer Control */}
          <div className="relative">
            {isExamActive ? (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono-tabular text-xs font-semibold ${
                  isLowTime
                    ? "bg-red-50 border-red-300 text-red-700 animate-pulse"
                    : "bg-indigo-50 border-indigo-200 text-indigo-900"
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{formatTime(examRemainingSeconds)}</span>
              </div>
            ) : (
              <div className="flex items-center bg-white border border-[#E5E2DC] rounded-lg shadow-2xs">
                <button
                  type="button"
                  onClick={() => setShowTimerMenu((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium cursor-pointer hover:bg-[#F8F7F4] rounded-l-lg transition-colors ${
                    isLowTime ? "text-red-600 font-bold" : "text-[#141413]"
                  }`}
                  title={t.timer.setTimer}
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-mono-tabular font-semibold">
                    {timerSeconds !== null ? formatTime(timerSeconds) : t.timer.noLimit}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#8C8B85]" />
                </button>

                {timerSeconds !== null && (
                  <div className="flex items-center border-l border-[#E5E2DC] px-1 gap-0.5">
                    <button
                      type="button"
                      onClick={onToggleTimer}
                      className="p-1 text-[#575653] hover:text-indigo-600 cursor-pointer"
                      title={timerRunning ? t.timer.pauseTimer : t.timer.startTimer}
                    >
                      {timerRunning ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onResetTimer}
                      className="p-1 text-[#575653] hover:text-red-600 cursor-pointer"
                      title={t.timer.resetTimer}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Dropdown menu for setting custom training time */}
            {showTimerMenu && !isExamActive && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#E5E2DC] p-3 z-50">
                <div className="text-xs font-bold text-[#141413] mb-2 flex items-center justify-between">
                  <span>{t.timer.setTimer}</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSetCustomTimer(null);
                      setShowTimerMenu(false);
                    }}
                    className="text-[11px] font-medium text-indigo-600 hover:underline cursor-pointer"
                  >
                    {t.timer.noLimit}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  {[10, 20, 30, 45, 60, 90, 120, 180].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => {
                        onSetCustomTimer(mins);
                        setShowTimerMenu(false);
                      }}
                      className="px-2 py-1.5 text-xs font-mono-tabular font-semibold bg-[#F8F7F4] hover:bg-indigo-50 hover:text-indigo-700 border border-[#E5E2DC] rounded-md transition-colors cursor-pointer"
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-[#E5E2DC]">
                  <input
                    type="number"
                    min={1}
                    max={600}
                    value={customMinutesInput}
                    onChange={(e) => setCustomMinutesInput(e.target.value)}
                    placeholder={t.timer.customMinutes}
                    className="w-full px-2.5 py-1.5 text-xs font-mono-tabular border border-[#E5E2DC] rounded-md focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const parsed = parseInt(customMinutesInput, 10);
                      if (!isNaN(parsed) && parsed > 0) {
                        onSetCustomTimer(parsed);
                        setShowTimerMenu(false);
                      }
                    }}
                    className="px-3 py-1.5 bg-[#141413] hover:bg-indigo-600 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    {t.timer.startTimer}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangMenu((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F8F7F4] border border-[#E5E2DC] rounded-lg text-xs font-bold text-[#141413] shadow-2xs transition-colors cursor-pointer"
              aria-label="Language switcher"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-mono-tabular uppercase">{uiLang}</span>
              <ChevronDown className="w-3 h-3 text-[#8C8B85]" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#E5E2DC] py-1.5 z-50">
                {LANG_OPTIONS.map((opt) => {
                  const active = uiLang === opt.code;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setUiLang(opt.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        active
                          ? "bg-indigo-50/80 text-indigo-700 font-bold"
                          : "text-[#141413] hover:bg-[#F8F7F4] font-medium"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-mono-tabular text-[11px] uppercase px-1.5 py-0.5 rounded bg-[#EFECE6] text-[#575653]">
                        {opt.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden items-center justify-around border-t border-[#E5E2DC] bg-[#F8F7F4] px-2 py-1.5 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap ${
                isActive
                  ? "bg-[#141413] text-white"
                  : "text-[#575653] hover:text-[#141413]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
