import React, { useState } from "react";
import {
  Search,
  Edit3,
  Trash2,
  Copy,
  PlusCircle,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { OptionKey, Question } from "../types";
import { Translations } from "../i18n";

interface QuestionBankViewProps {
  t: Translations;
  questions: Question[];
  subjects: string[];
  bookmarks: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onEditQuestion: (q: Question) => void;
  onDuplicateQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onGoToConstructor: () => void;
}

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  t,
  questions,
  subjects,
  bookmarks,
  onToggleBookmark,
  onEditQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
  onGoToConstructor,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("ALL");
  const [filterTopic, setFilterTopic] = useState("ALL");
  const [filterLang, setFilterLang] = useState("ALL");

  const availableTopics = Array.from(
    new Set(
      questions
        .filter((q) => filterSubject === "ALL" || q.subject === filterSubject)
        .map((q) => q.topic || "General")
    )
  );

  const filtered = questions.filter((q) => {
    if (filterSubject !== "ALL" && q.subject !== filterSubject) return false;
    if (filterTopic !== "ALL" && q.topic !== filterTopic) return false;
    if (filterLang !== "ALL" && (q.language || "uk") !== filterLang) return false;
    if (searchQuery.trim()) {
      const needle = searchQuery.toLowerCase();
      const matchText = q.text.toLowerCase().includes(needle);
      const matchExpl = (q.explanation || "").toLowerCase().includes(needle);
      const matchTopic = (q.topic || "").toLowerCase().includes(needle);
      const matchOpts = Object.values(q.options).some((v) =>
        v.toLowerCase().includes(needle)
      );
      return matchText || matchExpl || matchTopic || matchOpts;
    }
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#141413]">
            {t.bank.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#575653] mt-0.5">
            {t.bank.subtitle} ({filtered.length} / {questions.length})
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToConstructor}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.bank.addNewQuestionBtn}</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] p-4 mb-6 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-[#8C8B85] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.filters.searchPlaceholder}
            className="w-full pl-9 pr-3.5 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterSubject}
            onChange={(e) => {
              setFilterSubject(e.target.value);
              setFilterTopic("ALL");
            }}
            className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-semibold text-[#141413]"
          >
            <option value="ALL">{t.filters.allSubjects}</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-semibold text-[#141413]"
          >
            <option value="ALL">{t.filters.allTopics}</option>
            {availableTopics.map((top) => (
              <option key={top} value={top}>
                {top}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <select
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-semibold text-[#141413]"
          >
            <option value="ALL">{t.filters.allLanguages}</option>
            <option value="uk">UA (Українська)</option>
            <option value="en">EN (English)</option>
            <option value="es">ES (Español)</option>
            <option value="ru">RU (Русский)</option>
          </select>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-3">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-xl border border-[#E5E2DC] p-5 hover:border-stone-300 transition-all shadow-2xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-[#141413] text-white font-mono-tabular text-xs font-bold">
                  #{q.number}
                </span>
                {q.subject && (
                  <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-800 text-xs font-semibold">
                    {q.subject}
                  </span>
                )}
                {q.topic && (
                  <span className="px-2.5 py-0.5 rounded bg-[#EFECE6] text-[#141413] text-xs font-medium">
                    {q.topic}
                  </span>
                )}
                {q.language && (
                  <span className="px-2 py-0.5 rounded border border-[#E5E2DC] font-mono-tabular uppercase text-[10px] font-bold text-[#575653]">
                    {q.language}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onToggleBookmark(q.id)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    bookmarks[q.id]
                      ? "bg-amber-50 border-amber-300 text-amber-600"
                      : "border-[#E5E2DC] text-[#575653] hover:text-[#141413]"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onEditQuestion(q)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#E5E2DC] text-xs font-semibold text-[#141413] hover:bg-[#F8F7F4] cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t.bank.editBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDuplicateQuestion(q)}
                  className="p-1.5 rounded-lg border border-[#E5E2DC] text-[#575653] hover:text-indigo-600 cursor-pointer"
                  title={t.bank.duplicateBtn}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteQuestion(q.id)}
                  className="p-1.5 rounded-lg border border-[#E5E2DC] text-[#575653] hover:text-red-600 hover:border-red-200 cursor-pointer"
                  title={t.bank.deleteBtn}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-[#141413] mb-3">
              {q.text}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {OPTION_KEYS.map((k) => {
                const isCorrect = q.correctOption === k;
                return (
                  <div
                    key={k}
                    className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 ${
                      isCorrect
                        ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold"
                        : "bg-[#F8F7F4] border-[#E5E2DC] text-[#575653]"
                    }`}
                  >
                    <span className="font-mono-tabular font-bold">{k})</span>
                    <span className="flex-1">{q.options[k]}</span>
                    {isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {q.explanation && (
              <div className="text-xs text-[#575653] bg-[#F8F7F4] p-3 rounded-lg border border-[#E5E2DC]">
                <span className="font-bold text-[#141413]">
                  {t.trainer.explanationTitle}:{" "}
                </span>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
