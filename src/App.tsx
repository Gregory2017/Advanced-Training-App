import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  AppViewMode,
  ExamAttemptRecord,
  FilterScope,
  OptionKey,
  Question,
  UILanguage,
} from "./types";
import { initialQuestions } from "./initialQuestions";
import { translations } from "./i18n";
import { HeaderBar } from "./components/HeaderBar";
import { PracticeTrainerView } from "./components/PracticeTrainerView";
import { TimedExamView } from "./components/TimedExamView";
import { ConstructorView } from "./components/ConstructorView";
import { QuestionBankView } from "./components/QuestionBankView";
import { AnalyticsView } from "./components/AnalyticsView";
import { Clock, X } from "lucide-react";

const STORAGE_KEYS = {
  QUESTIONS: "advanced_trainer_questions_v1",
  ANSWERS: "advanced_trainer_answers_v1",
  BOOKMARKS: "advanced_trainer_bookmarks_v1",
  HISTORY: "advanced_trainer_exam_history_v1",
  LANG: "advanced_trainer_ui_lang_v1",
};

export default function App() {
  // 1. UI Language state (EN, UK, ES, RU)
  const [uiLang, setUiLang] = useState<UILanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved === "uk" || saved === "en" || saved === "es" || saved === "ru") {
      return saved;
    }
    return "uk";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, uiLang);
  }, [uiLang]);

  const t = translations[uiLang];

  // 2. Question Bank State (Preloaded with initial 140 EFVV Linguistics questions)
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initialQuestions
    }
    return initialQuestions;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    } catch {
      // ignore storage quota errors
    }
  }, [questions]);

  // 3. Practice User Answers & Bookmarks
  const [userAnswers, setUserAnswers] = useState<Record<string, OptionKey>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(userAnswers));
    } catch {
      // ignore
    }
  }, [userAnswers]);

  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  // 4. Exam History
  const [examHistory, setExamHistory] = useState<ExamAttemptRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(examHistory));
    } catch {
      // ignore
    }
  }, [examHistory]);

  // 5. Navigation & Filtering State
  const [activeView, setActiveView] = useState<AppViewMode>("train");
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [filterScope, setFilterScope] = useState<FilterScope>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // 6. Configurable Practice Timer State
  const [timerInitialSeconds, setTimerInitialSeconds] = useState<number | null>(
    null
  );
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning || timerSeconds === null) return;
    if (timerSeconds <= 0) {
      setTimerRunning(false);
      setShowTimeUpModal(true);
      return;
    }
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleSetCustomTimer = (minutes: number | null) => {
    if (minutes === null) {
      setTimerInitialSeconds(null);
      setTimerSeconds(null);
      setTimerRunning(false);
    } else {
      const secs = minutes * 60;
      setTimerInitialSeconds(secs);
      setTimerSeconds(secs);
      setTimerRunning(true);
    }
  };

  // 7. Timed Exam Simulation State
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<string, OptionKey>>({});
  const [examFlags, setExamFlags] = useState<Record<string, boolean>>({});
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0);
  const [examRemainingSeconds, setExamRemainingSeconds] = useState<number>(0);
  const [examTotalInitialSeconds, setExamTotalInitialSeconds] =
    useState<number>(0);

  const handleSubmitExam = useCallback(() => {
    setIsExamActive(false);
    setExamFinished(true);
    const totalQ = examQuestions.length;
    const answeredCount = examQuestions.filter(
      (q) => examAnswers[q.id] !== undefined
    ).length;
    const correctCount = examQuestions.filter(
      (q) => examAnswers[q.id] === q.correctOption
    ).length;
    const scorePercent =
      totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

    // Also record answers into main userAnswers so Mistakes filter captures them
    setUserAnswers((prev) => ({ ...prev, ...examAnswers }));

    const newRecord: ExamAttemptRecord = {
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      subject: examQuestions[0]?.subject || "Mixed",
      topic: examQuestions[0]?.topic || "Mixed",
      mode: "exam",
      totalQuestions: totalQ,
      answeredCount,
      correctCount,
      scorePercent,
      durationSeconds: Math.max(
        0,
        examTotalInitialSeconds - examRemainingSeconds
      ),
      timeLimitMinutes: Math.round(examTotalInitialSeconds / 60),
    };
    setExamHistory((prev) => [newRecord, ...prev.slice(0, 19)]);
  }, [
    examQuestions,
    examAnswers,
    examTotalInitialSeconds,
    examRemainingSeconds,
  ]);

  useEffect(() => {
    if (!isExamActive) return;
    if (examRemainingSeconds <= 0) {
      handleSubmitExam();
      setShowTimeUpModal(true);
      return;
    }
    const interval = setInterval(() => {
      setExamRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamActive, examRemainingSeconds, handleSubmitExam]);

  const handleStartExam = (config: {
    subject: string;
    topic: string;
    count: number;
    timeMinutes: number;
    shuffle: boolean;
  }) => {
    let pool = questions.filter((q) => {
      if (config.subject !== "ALL" && q.subject !== config.subject) return false;
      if (config.topic !== "ALL" && q.topic !== config.topic) return false;
      return true;
    });

    if (config.shuffle) {
      pool = [...pool].sort(() => Math.random() - 0.5);
    }

    const chosen = pool.slice(0, config.count);
    const totalSecs = config.timeMinutes * 60;

    setExamQuestions(chosen);
    setExamAnswers({});
    setExamFlags({});
    setExamCurrentIndex(0);
    setExamTotalInitialSeconds(totalSecs);
    setExamRemainingSeconds(totalSecs);
    setExamFinished(false);
    setIsExamActive(true);
  };

  const handleAbortExam = () => {
    setIsExamActive(false);
    setExamFinished(false);
    setExamQuestions([]);
    setExamAnswers({});
    setExamFlags({});
  };

  // Distinct Subjects & Topics
  const subjects = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => {
      if (q.subject) set.add(q.subject);
      else set.add("Мовознавство (ЄФВВ)");
    });
    return Array.from(set);
  }, [questions]);

  const topics = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => {
      const qSubj = q.subject || "Мовознавство (ЄФВВ)";
      if (selectedSubject === "ALL" || qSubj === selectedSubject) {
        if (q.topic) set.add(q.topic);
      }
    });
    return Array.from(set);
  }, [questions, selectedSubject]);

  // Filtered Practice Questions
  const filteredPracticeQuestions = useMemo(() => {
    return questions.filter((q) => {
      const qSubj = q.subject || "Мовознавство (ЄФВВ)";
      if (selectedSubject !== "ALL" && qSubj !== selectedSubject) return false;
      if (selectedTopic !== "ALL" && q.topic !== selectedTopic) return false;

      if (filterScope === "mistakes") {
        return (
          userAnswers[q.id] !== undefined &&
          userAnswers[q.id] !== q.correctOption
        );
      }
      if (filterScope === "bookmarked") {
        return Boolean(bookmarks[q.id]);
      }
      if (filterScope === "unanswered") {
        return userAnswers[q.id] === undefined;
      }
      return true;
    });
  }, [
    questions,
    selectedSubject,
    selectedTopic,
    filterScope,
    userAnswers,
    bookmarks,
  ]);

  // Keep currentIndex in bounds
  useEffect(() => {
    if (
      currentIndex >= filteredPracticeQuestions.length &&
      filteredPracticeQuestions.length > 0
    ) {
      setCurrentIndex(0);
    }
  }, [filteredPracticeQuestions.length, currentIndex]);

  // Handlers for Question CRUD
  const handleSelectPracticeAnswer = (questionId: string, option: OptionKey) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleToggleBookmark = (questionId: string) => {
    setBookmarks((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleShuffleQuestions = () => {
    setQuestions((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const handleResetCurrentAnswers = () => {
    const idsToClear = new Set(filteredPracticeQuestions.map((q) => q.id));
    setUserAnswers((prev) => {
      const next = { ...prev };
      idsToClear.forEach((id) => delete next[id]);
      return next;
    });
    setCurrentIndex(0);
  };

  const handleSaveQuestion = (q: Question, isEdit: boolean) => {
    if (isEdit) {
      setQuestions((prev) => prev.map((item) => (item.id === q.id ? q : item)));
    } else {
      setQuestions((prev) => [...prev, q]);
    }
  };

  const handleBulkAddQuestions = (newQuestions: Question[]) => {
    setQuestions((prev) => [...prev, ...newQuestions]);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) =>
      prev
        .filter((q) => q.id !== id)
        .map((q, idx) => ({ ...q, number: idx + 1 }))
    );
  };

  const handleDuplicateQuestion = (q: Question) => {
    const copy: Question = {
      ...q,
      id: `dup-${Date.now()}`,
      number: questions.length + 1,
      text: `${q.text} (Copy)`,
    };
    setQuestions((prev) => [...prev, copy]);
  };

  const handleResetToInitial140 = () => {
    setQuestions(initialQuestions);
    setSelectedSubject("ALL");
    setSelectedTopic("ALL");
    setFilterScope("all");
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#141413]">
      {/* Global Header with Language Switcher & Timer */}
      <HeaderBar
        uiLang={uiLang}
        setUiLang={setUiLang}
        t={t}
        activeView={activeView}
        setActiveView={setActiveView}
        totalBankCount={questions.length}
        timerSeconds={timerSeconds}
        timerRunning={timerRunning}
        onSetCustomTimer={handleSetCustomTimer}
        onToggleTimer={() => setTimerRunning((prev) => !prev)}
        onResetTimer={() => {
          if (timerInitialSeconds !== null) {
            setTimerSeconds(timerInitialSeconds);
            setTimerRunning(false);
          }
        }}
        isExamActive={isExamActive}
        examRemainingSeconds={examRemainingSeconds}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === "train" && (
          <PracticeTrainerView
            t={t}
            questions={filteredPracticeQuestions}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            userAnswers={userAnswers}
            onSelectAnswer={handleSelectPracticeAnswer}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            subjects={subjects}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            topics={topics}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            filterScope={filterScope}
            setFilterScope={setFilterScope}
            onShuffleQuestions={handleShuffleQuestions}
            onResetCurrentAnswers={handleResetCurrentAnswers}
            onEditQuestion={(q) => {
              setEditingQuestion(q);
              setActiveView("constructor");
            }}
            onGoToConstructor={() => {
              setEditingQuestion(null);
              setActiveView("constructor");
            }}
          />
        )}

        {activeView === "exam" && (
          <TimedExamView
            t={t}
            allQuestions={questions}
            subjects={subjects}
            isExamActive={isExamActive}
            examFinished={examFinished}
            examQuestions={examQuestions}
            examAnswers={examAnswers}
            examFlags={examFlags}
            examCurrentIndex={examCurrentIndex}
            setExamCurrentIndex={setExamCurrentIndex}
            examRemainingSeconds={examRemainingSeconds}
            examDurationUsedSeconds={Math.max(
              0,
              examTotalInitialSeconds - examRemainingSeconds
            )}
            onStartExam={handleStartExam}
            onSelectExamAnswer={(qId, opt) =>
              setExamAnswers((prev) => ({ ...prev, [qId]: opt }))
            }
            onToggleExamFlag={(qId) =>
              setExamFlags((prev) => ({ ...prev, [qId]: !prev[qId] }))
            }
            onSubmitExam={handleSubmitExam}
            onAbortExam={handleAbortExam}
            onTrainMistakesFromExam={() => {
              setIsExamActive(false);
              setExamFinished(false);
              setFilterScope("mistakes");
              setCurrentIndex(0);
              setActiveView("train");
            }}
          />
        )}

        {activeView === "constructor" && (
          <ConstructorView
            t={t}
            uiLang={uiLang}
            questions={questions}
            subjects={subjects}
            topics={topics}
            editingQuestion={editingQuestion}
            onClearEditing={() => setEditingQuestion(null)}
            onSaveQuestion={handleSaveQuestion}
            onBulkAddQuestions={handleBulkAddQuestions}
            onReplaceAllQuestions={setQuestions}
            onResetToInitial140={handleResetToInitial140}
          />
        )}

        {activeView === "bank" && (
          <QuestionBankView
            t={t}
            questions={questions}
            subjects={subjects}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onEditQuestion={(q) => {
              setEditingQuestion(q);
              setActiveView("constructor");
            }}
            onDuplicateQuestion={handleDuplicateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onGoToConstructor={() => {
              setEditingQuestion(null);
              setActiveView("constructor");
            }}
          />
        )}

        {activeView === "stats" && (
          <AnalyticsView
            t={t}
            questions={questions}
            userAnswers={userAnswers}
            bookmarks={bookmarks}
            examHistory={examHistory}
            onTrainMistakes={() => {
              setFilterScope("mistakes");
              setCurrentIndex(0);
              setActiveView("train");
            }}
          />
        )}
      </main>

      {/* Non-blocking Custom Time-Up Modal */}
      {showTimeUpModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E2DC] max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 text-red-600 font-bold text-base">
                <Clock className="w-5 h-5" />
                <span>{t.timer.timeUpTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowTimeUpModal(false)}
                className="p-1 text-[#8C8B85] hover:text-[#141413] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#575653] leading-relaxed mb-5">
              {t.timer.timeUpMessage}
            </p>
            <button
              type="button"
              onClick={() => setShowTimeUpModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#141413] hover:bg-indigo-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
