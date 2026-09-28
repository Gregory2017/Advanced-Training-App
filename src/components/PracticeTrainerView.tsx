import React, { useEffect } from "react";
import {
  Bookmark,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  BookOpen,
  Edit3,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { FilterScope, OptionKey, Question } from "../types";
import { Translations } from "../i18n";

interface PracticeTrainerViewProps {
  t: Translations;
  questions: Question[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  userAnswers: Record<string, OptionKey>;
  onSelectAnswer: (questionId: string, option: OptionKey) => void;
  bookmarks: Record<string, boolean>;
  onToggleBookmark: (questionId: string) => void;
  // Filters
  subjects: string[];
  selectedSubject: string;
  setSelectedSubject: (s: string) => void;
  topics: string[];
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  filterScope: FilterScope;
  setFilterScope: (scope: FilterScope) => void;
  onShuffleQuestions: () => void;
  onResetCurrentAnswers: () => void;
  onEditQuestion: (question: Question) => void;
  onGoToConstructor: () => void;
}

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

export const PracticeTrainerView: React.FC<PracticeTrainerViewProps> = ({
  t,
  questions,
  currentIndex,
  setCurrentIndex,
  userAnswers,
  onSelectAnswer,
  bookmarks,
  onToggleBookmark,
  subjects,
  selectedSubject,
  setSelectedSubject,
  topics,
  selectedTopic,
  setSelectedTopic,
  filterScope,
  setFilterScope,
  onShuffleQuestions,
  onResetCurrentAnswers,
  onEditQuestion,
  onGoToConstructor,
}) => {
  const currentQuestion = questions[currentIndex];

  // Keyboard shortcuts for rapid scholarly training
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }
      if (!currentQuestion) return;

      const key = e.key.toUpperCase();
      if (key === "1" || key === "A" || key === "А") {
        onSelectAnswer(currentQuestion.id, "A");
      } else if (key === "2" || key === "B" || key === "Б") {
        onSelectAnswer(currentQuestion.id, "B");
      } else if (key === "3" || key === "C" || key === "В") {
        onSelectAnswer(currentQuestion.id, "C");
      } else if (key === "4" || key === "D" || key === "Г") {
        onSelectAnswer(currentQuestion.id, "D");
      } else if (e.key === "ArrowRight") {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      } else if (key === "B") {
        onToggleBookmark(currentQuestion.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentQuestion,
    currentIndex,
    questions.length,
    onSelectAnswer,
    setCurrentIndex,
    onToggleBookmark,
  ]);

  // Compute live session stats for current filtered deck
  const answeredCount = questions.filter((q) => userAnswers[q.id] !== undefined).length;
  const correctCount = questions.filter(
    (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correctOption
  ).length;
  const mistakeCount = answeredCount - correctCount;
  const accuracy =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      {/* Top Filter & Subject Control Bar */}
      <div className="bg-white rounded-xl border border-[#E5E2DC] p-3.5 mb-6 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Subject Selector */}
          <div className="flex items-center gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#575653]">
              {t.filters.subject}:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic("ALL");
                setCurrentIndex(0);
              }}
              className="px-2.5 py-1.5 bg-[#F8F7F4] border border-[#E5E2DC] rounded-lg text-xs font-semibold text-[#141413] focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="ALL">{t.filters.allSubjects}</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Selector */}
          <div className="flex items-center gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#575653]">
              {t.filters.topic}:
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentIndex(0);
              }}
              className="px-2.5 py-1.5 bg-[#F8F7F4] border border-[#E5E2DC] rounded-lg text-xs font-semibold text-[#141413] focus:outline-none focus:border-indigo-600 cursor-pointer max-w-[220px]"
            >
              <option value="ALL">{t.filters.allTopics}</option>
              {topics.map((top) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>

          {/* Scope Segmented Filter */}
          <div className="flex items-center bg-[#F8F7F4] p-0.5 rounded-lg border border-[#E5E2DC]">
            {(
              [
                { id: "all", label: t.filters.scopeAll },
                { id: "mistakes", label: t.filters.scopeMistakes },
                { id: "bookmarked", label: t.filters.scopeBookmarked },
                { id: "unanswered", label: t.filters.scopeUnanswered },
              ] as { id: FilterScope; label: string }[]
            ).map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setFilterScope(sc.id);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterScope === sc.id
                    ? "bg-[#141413] text-white shadow-2xs"
                    : "text-[#575653] hover:text-[#141413]"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deck Actions: Shuffle, Reset Answers, Add Question */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShuffleQuestions}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F8F7F4] hover:bg-[#EFECE6] border border-[#E5E2DC] rounded-lg text-xs font-semibold text-[#141413] transition-colors cursor-pointer"
            title={t.trainer.shuffleBtn}
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.trainer.shuffleBtn}</span>
          </button>

          <button
            type="button"
            onClick={onResetCurrentAnswers}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F8F7F4] hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-[#E5E2DC] rounded-lg text-xs font-semibold text-[#575653] transition-colors cursor-pointer"
            title={t.trainer.resetProgressBtn}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.trainer.resetProgressBtn}</span>
          </button>

          <button
            type="button"
            onClick={onGoToConstructor}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.bank.addNewQuestionBtn}</span>
          </button>
        </div>
      </div>

      {/* Empty State if no questions match filters */}
      {!currentQuestion ? (
        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-12 text-center max-w-xl mx-auto my-8">
          <BookOpen className="w-10 h-10 text-[#8C8B85] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#141413] mb-2">
            {t.trainer.noQuestionsMatch}
          </h3>
          <button
            type="button"
            onClick={() => {
              setSelectedSubject("ALL");
              setSelectedTopic("ALL");
              setFilterScope("all");
              setCurrentIndex(0);
            }}
            className="mt-3 px-4 py-2 bg-[#141413] text-white text-xs font-semibold rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            {t.trainer.clearFiltersBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left/Main Column: Active Question Stage (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-xs p-6 sm:p-8">
              {/* Question Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E5E2DC]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md bg-[#141413] text-white font-mono-tabular text-xs font-bold">
                    {t.trainer.questionOf} {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F8F7F4] border border-[#E5E2DC] font-mono-tabular text-xs font-semibold text-[#575653]">
                    #{currentQuestion.number}
                  </span>
                  {currentQuestion.subject && (
                    <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-xs font-semibold">
                      {currentQuestion.subject}
                    </span>
                  )}
                  {currentQuestion.topic && (
                    <span className="px-2.5 py-1 rounded-md bg-[#EFECE6] text-[#141413] text-xs font-medium">
                      {currentQuestion.topic}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditQuestion(currentQuestion)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E5E2DC] text-xs font-medium text-[#575653] hover:text-[#141413] hover:bg-[#F8F7F4] transition-colors cursor-pointer"
                    title={t.trainer.editThisQuestion}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.bank.editBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleBookmark(currentQuestion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      bookmarks[currentQuestion.id]
                        ? "bg-amber-50 border-amber-300 text-amber-800"
                        : "bg-white border-[#E5E2DC] text-[#575653] hover:text-[#141413]"
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarks[currentQuestion.id]
                          ? "fill-amber-500 text-amber-600"
                          : ""
                      }`}
                    />
                    <span>
                      {bookmarks[currentQuestion.id]
                        ? t.trainer.bookmarkedBtn
                        : t.trainer.bookmarkBtn}
                    </span>
                  </button>
                </div>
              </div>

              {/* Question Prompt Text */}
              <h2 className="text-lg sm:text-xl font-bold text-[#141413] leading-relaxed mb-6 max-w-[68ch]">
                {currentQuestion.text}
              </h2>

              {/* Answer Options A, B, C, D */}
              <div className="space-y-3">
                {OPTION_KEYS.map((optionKey) => {
                  const selectedOption = userAnswers[currentQuestion.id];
                  const isAnswered = selectedOption !== undefined;
                  const isSelected = selectedOption === optionKey;
                  const isCorrectOption = currentQuestion.correctOption === optionKey;

                  let cardStyles =
                    "bg-white border-[#E5E2DC] hover:border-indigo-400 hover:bg-[#F8F7F4]/60 text-[#141413]";
                  let badgeStyles =
                    "bg-[#F8F7F4] border-[#E5E2DC] text-[#141413] group-hover:border-indigo-400";

                  if (isAnswered) {
                    if (isCorrectOption) {
                      cardStyles =
                        "bg-emerald-50/90 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500/30";
                      badgeStyles =
                        "bg-emerald-600 border-emerald-600 text-white";
                    } else if (isSelected && !isCorrectOption) {
                      cardStyles =
                        "bg-red-50/90 border-red-400 text-red-950";
                      badgeStyles = "bg-red-600 border-red-600 text-white";
                    } else {
                      cardStyles =
                        "bg-[#F8F7F4]/60 border-[#E5E2DC] text-[#8C8B85] opacity-75";
                      badgeStyles =
                        "bg-[#EFECE6] border-[#E5E2DC] text-[#8C8B85]";
                    }
                  }

                  return (
                    <button
                      key={optionKey}
                      type="button"
                      onClick={() => onSelectAnswer(currentQuestion.id, optionKey)}
                      className={`w-full group flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${cardStyles}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg border font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${badgeStyles}`}
                      >
                        {optionKey}
                      </span>
                      <span className="flex-1 text-[15px] font-medium leading-snug pt-0.5">
                        {currentQuestion.options[optionKey]}
                      </span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Verification & Academic Explanation Callout */}
              {userAnswers[currentQuestion.id] !== undefined && (
                <div
                  className={`mt-6 p-5 rounded-xl border ${
                    userAnswers[currentQuestion.id] === currentQuestion.correctOption
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-amber-50/70 border-amber-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {userAnswers[currentQuestion.id] ===
                    currentQuestion.correctOption ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {t.trainer.correctBadge} ({currentQuestion.correctOption})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-800">
                        <XCircle className="w-4 h-4 text-red-600" />
                        {t.trainer.incorrectBadge} {currentQuestion.correctOption}
                      </span>
                    )}
                  </div>
                  {currentQuestion.explanation && (
                    <div className="mt-2 pt-2 border-t border-black/5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#575653] mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{t.trainer.explanationTitle}:</span>
                      </div>
                      <p className="text-sm text-[#141413] leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Navigation Footer */}
              <div className="mt-7 pt-5 border-t border-[#E5E2DC] flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5E2DC] bg-white hover:bg-[#F8F7F4] disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-[#141413] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.trainer.prevBtn}</span>
                </button>

                <span className="text-[11px] text-[#8C8B85] hidden sm:inline font-mono-tabular">
                  {t.trainer.keyboardHint}
                </span>

                <button
                  type="button"
                  disabled={currentIndex >= questions.length - 1}
                  onClick={() =>
                    setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))
                  }
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-indigo-600 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  <span>{t.trainer.nextBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Progress & Question Map (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Live Session Telemetry Strip */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC]">
                  <div className="text-[11px] font-medium text-[#575653]">
                    {t.trainer.answered}
                  </div>
                  <div className="text-lg font-bold font-mono-tabular text-[#141413]">
                    {answeredCount}{" "}
                    <span className="text-xs font-normal text-[#8C8B85]">
                      / {questions.length}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="text-[11px] font-medium text-emerald-800">
                    {t.trainer.correct}
                  </div>
                  <div className="text-lg font-bold font-mono-tabular text-emerald-700">
                    {correctCount}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-red-50/60 border border-red-200/80">
                  <div className="text-[11px] font-medium text-red-800">
                    {t.trainer.mistakes}
                  </div>
                  <div className="text-lg font-bold font-mono-tabular text-red-700">
                    {mistakeCount}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200/80">
                  <div className="text-[11px] font-medium text-indigo-800">
                    {t.trainer.accuracy}
                  </div>
                  <div className="text-lg font-bold font-mono-tabular text-indigo-700">
                    {accuracy}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#EFECE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{
                    width: `${
                      questions.length > 0
                        ? Math.round((answeredCount / questions.length) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Interactive Question Navigator Matrix */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413]">
                  {t.trainer.navigatorTitle} ({questions.length})
                </h3>
              </div>

              <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-7 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const ans = userAnswers[q.id];
                  const isCurrent = idx === currentIndex;
                  const isBookmarked = bookmarks[q.id];

                  let cellStyle =
                    "bg-[#F8F7F4] text-[#575653] border-[#E5E2DC] hover:border-indigo-400";
                  if (ans !== undefined) {
                    if (ans === q.correctOption) {
                      cellStyle =
                        "bg-emerald-600 text-white border-emerald-600 font-bold";
                    } else {
                      cellStyle = "bg-red-600 text-white border-red-600 font-bold";
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative h-8 rounded-lg border font-mono-tabular text-xs flex items-center justify-center transition-all cursor-pointer ${cellStyle} ${
                        isCurrent
                          ? "ring-2 ring-indigo-600 ring-offset-1 font-extrabold"
                          : ""
                      }`}
                      title={`#${q.number}: ${q.text.slice(0, 50)}...`}
                    >
                      {idx + 1}
                      {isBookmarked && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
