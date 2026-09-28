import React, { useState } from "react";
import {
  Timer,
  Play,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Award,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { OptionKey, Question } from "../types";
import { Translations } from "../i18n";

interface TimedExamViewProps {
  t: Translations;
  allQuestions: Question[];
  subjects: string[];
  // Active exam state managed by parent so HeaderBar also shows countdown
  isExamActive: boolean;
  examFinished: boolean;
  examQuestions: Question[];
  examAnswers: Record<string, OptionKey>;
  examFlags: Record<string, boolean>;
  examCurrentIndex: number;
  setExamCurrentIndex: (idx: number) => void;
  examRemainingSeconds: number;
  examDurationUsedSeconds: number;
  onStartExam: (config: {
    subject: string;
    topic: string;
    count: number;
    timeMinutes: number;
    shuffle: boolean;
  }) => void;
  onSelectExamAnswer: (questionId: string, option: OptionKey) => void;
  onToggleExamFlag: (questionId: string) => void;
  onSubmitExam: () => void;
  onAbortExam: () => void;
  onTrainMistakesFromExam: (mistakeIds: string[]) => void;
}

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

export const TimedExamView: React.FC<TimedExamViewProps> = ({
  t,
  allQuestions,
  subjects,
  isExamActive,
  examFinished,
  examQuestions,
  examAnswers,
  examFlags,
  examCurrentIndex,
  setExamCurrentIndex,
  examRemainingSeconds,
  examDurationUsedSeconds,
  onStartExam,
  onSelectExamAnswer,
  onToggleExamFlag,
  onSubmitExam,
  onAbortExam,
  onTrainMistakesFromExam,
}) => {
  const [setupSubject, setSetupSubject] = useState<string>("ALL");
  const [setupTopic, setSetupTopic] = useState<string>("ALL");
  const [setupCount, setSetupCount] = useState<number>(30);
  const [setupMinutes, setSetupMinutes] = useState<number>(30);
  const [setupShuffle, setSetupShuffle] = useState<boolean>(true);

  const availablePool = allQuestions.filter((q) => {
    if (setupSubject !== "ALL" && q.subject !== setupSubject) return false;
    if (setupTopic !== "ALL" && q.topic !== setupTopic) return false;
    return true;
  });

  const availableTopics = Array.from(
    new Set(
      allQuestions
        .filter((q) => setupSubject === "ALL" || q.subject === setupSubject)
        .map((q) => q.topic || "General")
    )
  );

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // 1. SETUP VIEW
  if (!isExamActive && !examFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-xs p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#141413]">
                {t.exam.setupTitle}
              </h1>
              <p className="text-xs text-[#575653]">{t.exam.setupSubtitle}</p>
            </div>
          </div>

          <div className="mt-6 space-y-5 pt-5 border-t border-[#E5E2DC]">
            {/* Subject Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#141413] mb-1.5">
                  {t.exam.selectSubject}
                </label>
                <select
                  value={setupSubject}
                  onChange={(e) => {
                    setSetupSubject(e.target.value);
                    setSetupTopic("ALL");
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-sm font-medium text-[#141413] focus:outline-none focus:border-indigo-600"
                >
                  <option value="ALL">{t.filters.allSubjects}</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141413] mb-1.5">
                  {t.exam.selectTopic}
                </label>
                <select
                  value={setupTopic}
                  onChange={(e) => setSetupTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-sm font-medium text-[#141413] focus:outline-none focus:border-indigo-600"
                >
                  <option value="ALL">{t.filters.allTopics}</option>
                  {availableTopics.map((top) => (
                    <option key={top} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question Count Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#141413]">
                  {t.exam.questionCount}
                </label>
                <span className="text-xs font-mono-tabular text-[#575653]">
                  Available: {availablePool.length}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[10, 20, 30, 50, 100, availablePool.length].map((cnt, idx) => {
                  const actual = Math.min(cnt, availablePool.length);
                  const isAll = idx === 5;
                  return (
                    <button
                      key={`${cnt}-${idx}`}
                      type="button"
                      onClick={() => setSetupCount(actual)}
                      className={`py-2 px-3 rounded-xl border font-mono-tabular text-xs font-bold transition-all cursor-pointer ${
                        setupCount === actual
                          ? "bg-[#141413] text-white border-[#141413]"
                          : "bg-[#F8F7F4] text-[#141413] border-[#E5E2DC] hover:border-indigo-400"
                      }`}
                    >
                      {isAll ? `All (${availablePool.length})` : cnt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Limit Selection */}
            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1.5">
                {t.exam.timeLimit}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 items-center">
                {[10, 15, 30, 45, 60, 120].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSetupMinutes(m)}
                    className={`py-2 px-3 rounded-xl border font-mono-tabular text-xs font-bold transition-all cursor-pointer ${
                      setupMinutes === m
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-[#F8F7F4] text-[#141413] border-[#E5E2DC] hover:border-indigo-400"
                    }`}
                  >
                    {m} {t.timer.minutes}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={600}
                  value={setupMinutes}
                  onChange={(e) =>
                    setSetupMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  className="py-2 px-2.5 rounded-xl border border-[#E5E2DC] bg-white font-mono-tabular text-xs font-bold text-center focus:outline-none focus:border-indigo-600"
                  title={t.timer.customMinutes}
                />
              </div>
            </div>

            {/* Shuffle Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={setupShuffle}
                onChange={(e) => setSetupShuffle(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-[#141413]">
                {t.exam.shuffleQuestions}
              </span>
            </label>

            {/* Start Button */}
            <div className="pt-4 border-t border-[#E5E2DC]">
              <button
                type="button"
                disabled={availablePool.length === 0}
                onClick={() =>
                  onStartExam({
                    subject: setupSubject,
                    topic: setupTopic,
                    count: Math.min(setupCount, availablePool.length),
                    timeMinutes: setupMinutes,
                    shuffle: setupShuffle,
                  })
                }
                className="w-full py-3.5 px-6 rounded-xl bg-[#141413] hover:bg-indigo-600 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {t.exam.startExamBtn} (
                  {Math.min(setupCount, availablePool.length)} Q · {setupMinutes}{" "}
                  {t.timer.minutes})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE EXAM SIMULATION VIEW
  if (isExamActive) {
    const currentQ = examQuestions[examCurrentIndex];
    const answeredTotal = Object.keys(examAnswers).length;

    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        {/* Active Exam Top Status Strip */}
        <div className="bg-[#141413] text-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-indigo-600 text-xs font-bold uppercase tracking-wider">
              {t.exam.activeExamBadge}
            </span>
            <span className="text-xs font-mono-tabular text-stone-300">
              {t.trainer.answered}: {answeredTotal} / {examQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1.5 rounded-lg font-mono-tabular text-sm font-bold flex items-center gap-2 ${
                examRemainingSeconds <= 60
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-white/10 text-white"
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>{formatTime(examRemainingSeconds)}</span>
            </div>

            <button
              type="button"
              onClick={onSubmitExam}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {t.exam.submitExamBtn}
            </button>

            <button
              type="button"
              onClick={onAbortExam}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              {t.exam.abortExamBtn}
            </button>
          </div>
        </div>

        {currentQ && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E2DC]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#141413] text-white font-mono-tabular text-xs font-bold">
                    {t.trainer.questionOf} {examCurrentIndex + 1} /{" "}
                    {examQuestions.length}
                  </span>
                  {currentQ.subject && (
                    <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-xs font-semibold">
                      {currentQ.subject}
                    </span>
                  )}
                  {currentQ.topic && (
                    <span className="px-2.5 py-1 rounded-md bg-[#EFECE6] text-[#141413] text-xs font-medium">
                      {currentQ.topic}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onToggleExamFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                    examFlags[currentQ.id]
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-white border-[#E5E2DC] text-[#575653]"
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Flag</span>
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#141413] leading-relaxed mb-6">
                {currentQ.text}
              </h2>

              <div className="space-y-3">
                {OPTION_KEYS.map((opt) => {
                  const isSelected = examAnswers[currentQ.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onSelectExamAnswer(currentQ.id, opt)}
                      className={`w-full flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-50/90 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600/20"
                          : "bg-white border-[#E5E2DC] hover:border-indigo-400 text-[#141413]"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg border font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-[#F8F7F4] border-[#E5E2DC] text-[#141413]"
                        }`}
                      >
                        {opt}
                      </span>
                      <span className="flex-1 text-[15px] font-medium leading-snug pt-0.5">
                        {currentQ.options[opt]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 pt-5 border-t border-[#E5E2DC] flex items-center justify-between">
                <button
                  type="button"
                  disabled={examCurrentIndex === 0}
                  onClick={() =>
                    setExamCurrentIndex(Math.max(0, examCurrentIndex - 1))
                  }
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5E2DC] bg-white hover:bg-[#F8F7F4] disabled:opacity-40 text-xs font-bold text-[#141413] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.trainer.prevBtn}</span>
                </button>

                {examCurrentIndex < examQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setExamCurrentIndex(examCurrentIndex + 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-indigo-600 text-xs font-bold text-white cursor-pointer"
                  >
                    <span>{t.trainer.nextBtn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSubmitExam}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white cursor-pointer"
                  >
                    <span>{t.exam.submitExamBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Exam Question Map */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413] mb-3">
                {t.trainer.navigatorTitle} ({answeredTotal}/{examQuestions.length})
              </h3>
              <div className="grid grid-cols-7 gap-1.5 max-h-[420px] overflow-y-auto pr-1">
                {examQuestions.map((q, idx) => {
                  const isAns = examAnswers[q.id] !== undefined;
                  const isCurr = idx === examCurrentIndex;
                  const isFlagged = examFlags[q.id];
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setExamCurrentIndex(idx)}
                      className={`relative h-8 rounded-lg border font-mono-tabular text-xs flex items-center justify-center transition-all cursor-pointer ${
                        isAns
                          ? "bg-indigo-600 text-white border-indigo-600 font-bold"
                          : "bg-[#F8F7F4] text-[#575653] border-[#E5E2DC]"
                      } ${isCurr ? "ring-2 ring-amber-500 ring-offset-1" : ""}`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-1 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. EXAM RESULTS & BREAKDOWN VIEW
  const totalQ = examQuestions.length;
  const correctQ = examQuestions.filter(
    (q) => examAnswers[q.id] === q.correctOption
  ).length;
  const answeredQ = examQuestions.filter(
    (q) => examAnswers[q.id] !== undefined
  ).length;
  const incorrectQ = answeredQ - correctQ;
  const unansweredQ = totalQ - answeredQ;
  const scorePercent = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
  const mistakeIds = examQuestions
    .filter((q) => examAnswers[q.id] !== q.correctOption)
    .map((q) => q.id);

  // Topic breakdown
  const topicStats: Record<string, { total: number; correct: number }> = {};
  examQuestions.forEach((q) => {
    const top = q.topic || "General";
    if (!topicStats[top]) topicStats[top] = { total: 0, correct: 0 };
    topicStats[top].total += 1;
    if (examAnswers[q.id] === q.correctOption) {
      topicStats[top].correct += 1;
    }
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Summary Score Card */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E2DC]">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                scorePercent >= 70
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#141413]">
                {t.exam.resultsTitle}
              </h1>
              <span
                className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${
                  scorePercent >= 70
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {scorePercent >= 70 ? t.exam.passedBadge : t.exam.needsWorkBadge}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-[#575653]">
              {t.exam.scoreLabel}
            </div>
            <div className="text-4xl font-extrabold font-mono-tabular text-[#141413]">
              {scorePercent}%
            </div>
          </div>
        </div>

        {/* 4 Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-xs font-medium text-emerald-800">
              {t.exam.correctAnswersLabel}
            </div>
            <div className="text-2xl font-bold font-mono-tabular text-emerald-700">
              {correctQ} / {totalQ}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
            <div className="text-xs font-medium text-red-800">
              {t.exam.incorrectAnswersLabel}
            </div>
            <div className="text-2xl font-bold font-mono-tabular text-red-700">
              {incorrectQ}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC]">
            <div className="text-xs font-medium text-[#575653]">
              {t.exam.unansweredLabel}
            </div>
            <div className="text-2xl font-bold font-mono-tabular text-[#141413]">
              {unansweredQ}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200">
            <div className="text-xs font-medium text-indigo-800">
              {t.exam.timeSpentLabel}
            </div>
            <div className="text-2xl font-bold font-mono-tabular text-indigo-700">
              {formatTime(examDurationUsedSeconds)}
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#575653] mb-3">
            {t.exam.topicBreakdownTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.entries(topicStats).map(([top, st]) => {
              const pct = Math.round((st.correct / st.total) * 100);
              return (
                <div
                  key={top}
                  className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] flex items-center justify-between"
                >
                  <span className="text-xs font-semibold text-[#141413] truncate pr-2">
                    {top}
                  </span>
                  <span className="font-mono-tabular text-xs font-bold text-indigo-700 shrink-0">
                    {st.correct}/{st.total} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5E2DC]">
          {mistakeIds.length > 0 && (
            <button
              type="button"
              onClick={() => onTrainMistakesFromExam(mistakeIds)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {t.exam.reviewMistakesBtn} ({mistakeIds.length})
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={onAbortExam}
            className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.exam.newExamBtn}</span>
          </button>
        </div>
      </div>

      {/* Detailed Question-by-Question Review List */}
      <div className="space-y-3">
        {examQuestions.map((q, idx) => {
          const userAns = examAnswers[q.id];
          const isRight = userAns === q.correctOption;
          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border p-5 ${
                isRight ? "border-emerald-200" : "border-red-200"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono-tabular font-bold text-[#575653]">
                  #{idx + 1} · {q.topic}
                </span>
                {isRight ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" /> {userAns}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700">
                    <XCircle className="w-4 h-4" /> {userAns || "—"} →{" "}
                    {q.correctOption}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-[#141413] mb-2">{q.text}</p>
              <p className="text-xs text-emerald-800 font-semibold mb-1">
                {t.bank.correctAnswer}: {q.correctOption}) {q.options[q.correctOption]}
              </p>
              {q.explanation && (
                <p className="text-xs text-[#575653] mt-1.5 pt-1.5 border-t border-[#E5E2DC]">
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
