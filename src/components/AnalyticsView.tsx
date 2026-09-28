import React from "react";
import {
  BarChart3,
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  Clock,
  BookOpen,
} from "lucide-react";
import { ExamAttemptRecord, OptionKey, Question } from "../types";
import { Translations } from "../i18n";

interface AnalyticsViewProps {
  t: Translations;
  questions: Question[];
  userAnswers: Record<string, OptionKey>;
  bookmarks: Record<string, boolean>;
  examHistory: ExamAttemptRecord[];
  onTrainMistakes: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  t,
  questions,
  userAnswers,
  bookmarks,
  examHistory,
  onTrainMistakes,
}) => {
  const totalBank = questions.length;
  const answeredList = questions.filter((q) => userAnswers[q.id] !== undefined);
  const correctList = answeredList.filter(
    (q) => userAnswers[q.id] === q.correctOption
  );
  const mistakeList = answeredList.filter(
    (q) => userAnswers[q.id] !== q.correctOption
  );
  const bookmarkedCount = questions.filter((q) => bookmarks[q.id]).length;

  const coveragePct =
    totalBank > 0 ? Math.round((answeredList.length / totalBank) * 100) : 0;
  const accuracyPct =
    answeredList.length > 0
      ? Math.round((correctList.length / answeredList.length) * 100)
      : 0;

  // Group by Subject
  const bySubject: Record<
    string,
    { total: number; answered: number; correct: number }
  > = {};
  questions.forEach((q) => {
    const s = q.subject || "Мовознавство (ЄФВВ)";
    if (!bySubject[s]) bySubject[s] = { total: 0, answered: 0, correct: 0 };
    bySubject[s].total += 1;
    if (userAnswers[q.id] !== undefined) {
      bySubject[s].answered += 1;
      if (userAnswers[q.id] === q.correctOption) {
        bySubject[s].correct += 1;
      }
    }
  });

  // Group by Topic
  const byTopic: Record<
    string,
    { total: number; answered: number; correct: number }
  > = {};
  questions.forEach((q) => {
    const top = q.topic || "General";
    if (!byTopic[top]) byTopic[top] = { total: 0, answered: 0, correct: 0 };
    byTopic[top].total += 1;
    if (userAnswers[q.id] !== undefined) {
      byTopic[top].answered += 1;
      if (userAnswers[q.id] === q.correctOption) {
        byTopic[top].correct += 1;
      }
    }
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#141413]">
            {t.stats.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#575653] mt-0.5">
            {t.stats.subtitle}
          </p>
        </div>

        {mistakeList.length > 0 && (
          <button
            type="button"
            onClick={onTrainMistakes}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {t.stats.trainMistakesCta} ({mistakeList.length})
            </span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#575653] mb-2">
            <span>{t.stats.totalAnswered}</span>
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-[#141413]">
            {answeredList.length}{" "}
            <span className="text-sm font-normal text-[#8C8B85]">
              / {totalBank} ({coveragePct}%)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#575653] mb-2">
            <span>{t.stats.accuracyRate}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-emerald-700">
            {accuracyPct}%
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#575653] mb-2">
            <span>{t.stats.mistakeCount}</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-red-600">
            {mistakeList.length}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#575653] mb-2">
            <span>{t.stats.bookmarkedCount}</span>
            <Bookmark className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-amber-600">
            {bookmarkedCount}
          </div>
        </div>
      </div>

      {/* Subject & Topic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Subject */}
        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 shadow-2xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#141413] mb-4">
            {t.stats.bySubjectTitle}
          </h2>
          <div className="space-y-3">
            {Object.entries(bySubject).map(([subj, st]) => {
              const acc =
                st.answered > 0
                  ? Math.round((st.correct / st.answered) * 100)
                  : 0;
              return (
                <div
                  key={subj}
                  className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC]"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#141413] mb-1.5">
                    <span>{subj}</span>
                    <span className="font-mono-tabular text-indigo-700">
                      {st.correct}/{st.answered} ({acc}%) · Total: {st.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E5E2DC] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600"
                      style={{
                        width: `${Math.round((st.answered / st.total) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Topic */}
        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 shadow-2xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#141413] mb-4">
            {t.stats.byTopicTitle}
          </h2>
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {Object.entries(byTopic).map(([top, st]) => {
              const acc =
                st.answered > 0
                  ? Math.round((st.correct / st.answered) * 100)
                  : 0;
              return (
                <div
                  key={top}
                  className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#141413]">{top}</div>
                    <div className="text-[11px] text-[#575653] font-mono-tabular">
                      {t.trainer.answered}: {st.answered}/{st.total}
                    </div>
                  </div>
                  <div className="text-right font-mono-tabular">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        st.answered === 0
                          ? "bg-[#EFECE6] text-[#575653]"
                          : acc >= 75
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {acc}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timed Exam History */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 shadow-2xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#141413] mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>{t.stats.recentExamsTitle}</span>
        </h2>

        {examHistory.length === 0 ? (
          <p className="text-xs text-[#575653] py-4">{t.stats.noExamsYet}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {examHistory.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#141413]">
                    {rec.subject}
                  </div>
                  <div className="text-[11px] text-[#575653]">
                    {rec.date} · {rec.correctCount}/{rec.totalQuestions} Q
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-lg font-mono-tabular text-sm font-extrabold ${
                    rec.scorePercent >= 70
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {rec.scorePercent}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
