import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Save,
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Layers,
} from "lucide-react";
import { OptionKey, Question, UILanguage } from "../types";
import { Translations } from "../i18n";
import { parseBulkQuestionsText } from "../utils/bulkParser";
import { sampleSubjectPresets } from "../initialQuestions";

interface ConstructorViewProps {
  t: Translations;
  uiLang: UILanguage;
  questions: Question[];
  subjects: string[];
  topics: string[];
  editingQuestion: Question | null;
  onClearEditing: () => void;
  onSaveQuestion: (q: Question, isEdit: boolean) => void;
  onBulkAddQuestions: (newQuestions: Question[]) => void;
  onReplaceAllQuestions: (newQuestions: Question[]) => void;
  onResetToInitial140: () => void;
}

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

export const ConstructorView: React.FC<ConstructorViewProps> = ({
  t,
  uiLang,
  questions,
  subjects,
  topics,
  editingQuestion,
  onClearEditing,
  onSaveQuestion,
  onBulkAddQuestions,
  onReplaceAllQuestions,
  onResetToInitial140,
}) => {
  const [subTab, setSubTab] = useState<"single" | "bulk" | "json">("single");
  const [subject, setSubject] = useState("Мовознавство (ЄФВВ)");
  const [topic, setTopic] = useState("Загальне мовознавство");
  const [qLang, setQLang] = useState<UILanguage>(uiLang);
  const [text, setText] = useState("");
  const [options, setOptions] = useState<Record<OptionKey, string>>({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [correctOption, setCorrectOption] = useState<OptionKey>("B");
  const [explanation, setExplanation] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Bulk parser state
  const [bulkSubject, setBulkSubject] = useState("Мовознавство (ЄФВВ)");
  const [bulkTopic, setBulkTopic] = useState("Загальне мовознавство");
  const [bulkLang, setBulkLang] = useState<UILanguage>(uiLang);
  const [bulkText, setBulkText] = useState("");
  const [parsedPreview, setParsedPreview] = useState<Question[]>([]);

  useEffect(() => {
    if (editingQuestion) {
      setSubTab("single");
      setSubject(editingQuestion.subject || "Мовознавство (ЄФВВ)");
      setTopic(editingQuestion.topic || "Загальне мовознавство");
      setQLang(editingQuestion.language || uiLang);
      setText(editingQuestion.text);
      setOptions({ ...editingQuestion.options });
      setCorrectOption(editingQuestion.correctOption);
      setExplanation(editingQuestion.explanation || "");
    }
  }, [editingQuestion, uiLang]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !options.A.trim() || !options.B.trim()) return;

    const payload: Question = {
      id: editingQuestion ? editingQuestion.id : `q-${Date.now()}`,
      number: editingQuestion ? editingQuestion.number : questions.length + 1,
      text: text.trim(),
      options: {
        A: options.A.trim(),
        B: options.B.trim(),
        C: options.C.trim() || "—",
        D: options.D.trim() || "—",
      },
      correctOption,
      explanation: explanation.trim(),
      subject: subject.trim() || "General",
      topic: topic.trim() || "General",
      language: qLang,
    };

    onSaveQuestion(payload, Boolean(editingQuestion));
    showToast(t.constructor.savedToast);

    if (!editingQuestion) {
      setText("");
      setOptions({ A: "", B: "", C: "", D: "" });
      setExplanation("");
    } else {
      onClearEditing();
    }
  };

  const handleParseBulk = () => {
    const parsed = parseBulkQuestionsText(
      bulkText,
      bulkSubject,
      bulkTopic,
      bulkLang,
      questions.length + 1
    );
    setParsedPreview(parsed);
  };

  const handleImportBulk = () => {
    if (parsedPreview.length === 0) return;
    onBulkAddQuestions(parsedPreview);
    showToast(`${t.constructor.parsedCountLabel} +${parsedPreview.length}`);
    setBulkText("");
    setParsedPreview([]);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `advanced-trainer-questions-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(String(ev.target?.result));
        if (Array.isArray(raw) && raw.length > 0) {
          const sanitized: Question[] = raw
            .filter((item) => item && item.text && item.options)
            .map((item, idx) => ({
              id: item.id || `imp-${Date.now()}-${idx}`,
              number: item.number || questions.length + idx + 1,
              text: String(item.text),
              options: {
                A: String(item.options.A || ""),
                B: String(item.options.B || ""),
                C: String(item.options.C || ""),
                D: String(item.options.D || ""),
              },
              correctOption: (["A", "B", "C", "D"].includes(item.correctOption)
                ? item.correctOption
                : "B") as OptionKey,
              explanation: String(item.explanation || ""),
              topic: String(item.topic || "General"),
              subject: String(item.subject || "Imported Subject"),
              language: (item.language || uiLang) as UILanguage,
            }));
          onBulkAddQuestions(sanitized);
          showToast(`+${sanitized.length} questions imported!`);
        }
      } catch {
        // ignore invalid json
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#141413]">
            {t.constructor.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#575653] mt-0.5">
            {t.constructor.subtitle}
          </p>
        </div>

        {toastMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 mb-6 bg-[#EFECE6] p-1 rounded-xl border border-[#E5E2DC] w-fit">
        <button
          type="button"
          onClick={() => setSubTab("single")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            subTab === "single"
              ? "bg-white text-[#141413] shadow-2xs"
              : "text-[#575653] hover:text-[#141413]"
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{t.constructor.singleTab}</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("bulk")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            subTab === "bulk"
              ? "bg-white text-[#141413] shadow-2xs"
              : "text-[#575653] hover:text-[#141413]"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t.constructor.bulkTab}</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("json")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            subTab === "json"
              ? "bg-white text-[#141413] shadow-2xs"
              : "text-[#575653] hover:text-[#141413]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.constructor.importExportTab}</span>
        </button>
      </div>

      {/* TAB 1: SINGLE QUESTION VISUAL BUILDER */}
      {subTab === "single" && (
        <form
          onSubmit={handleSingleSubmit}
          className="bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-8 shadow-xs space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DC]">
            <h2 className="text-base font-bold text-[#141413]">
              {editingQuestion
                ? `${t.constructor.editModeTitle} #${editingQuestion.number}`
                : t.constructor.createModeTitle}
            </h2>
            {editingQuestion && (
              <button
                type="button"
                onClick={onClearEditing}
                className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
              >
                {t.constructor.cancelEditBtn}
              </button>
            )}
          </div>

          {/* Subject, Topic, Language */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1.5">
                {t.constructor.subjectLabel}
              </label>
              <input
                list="subjects-datalist"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t.constructor.subjectPlaceholder}
                className="w-full px-3.5 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
              />
              <datalist id="subjects-datalist">
                {subjects.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1.5">
                {t.constructor.topicLabel}
              </label>
              <input
                list="topics-datalist"
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.constructor.topicPlaceholder}
                className="w-full px-3.5 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
              />
              <datalist id="topics-datalist">
                {topics.map((top) => (
                  <option key={top} value={top} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1.5">
                {t.constructor.questionLangLabel}
              </label>
              <select
                value={qLang}
                onChange={(e) => setQLang(e.target.value as UILanguage)}
                className="w-full px-3.5 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600"
              >
                <option value="uk">Українська (UK)</option>
                <option value="en">English (EN)</option>
                <option value="es">Español (ES)</option>
                <option value="ru">Русский (RU)</option>
              </select>
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <label className="block text-xs font-bold text-[#141413] mb-1.5">
              {t.constructor.questionTextLabel}
            </label>
            <textarea
              rows={3}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.constructor.questionTextPlaceholder}
              className="w-full px-3.5 py-2.5 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Options A, B, C, D with radio button for Correct Answer */}
          <div>
            <label className="block text-xs font-bold text-[#141413] mb-2">
              {t.constructor.optionsLabel}
            </label>
            <div className="space-y-2.5">
              {OPTION_KEYS.map((key) => {
                const isCorrect = correctOption === key;
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border transition-colors ${
                      isCorrect
                        ? "bg-emerald-50/70 border-emerald-400"
                        : "bg-[#F8F7F4] border-[#E5E2DC]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setCorrectOption(key)}
                      className={`w-8 h-8 rounded-lg font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                        isCorrect
                          ? "bg-emerald-600 text-white"
                          : "bg-white border border-[#E5E2DC] text-[#575653] hover:border-indigo-400"
                      }`}
                      title={t.constructor.correctOptionLabel}
                    >
                      {key}
                    </button>
                    <input
                      type="text"
                      required
                      value={options[key]}
                      onChange={(e) =>
                        setOptions((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      placeholder={`${t.constructor.optionPlaceholder} ${key}...`}
                      className="w-full px-3 py-1.5 bg-white border border-[#E5E2DC] rounded-lg text-sm focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-xs font-bold text-[#141413] mb-1.5">
              {t.constructor.explanationLabel}
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder={t.constructor.explanationPlaceholder}
              className="w-full px-3.5 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#141413] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>
                {editingQuestion
                  ? t.constructor.updateQuestionBtn
                  : t.constructor.saveQuestionBtn}
              </span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SMART BULK TEXT PARSER */}
      {subTab === "bulk" && (
        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[#141413]">
                {t.constructor.bulkInstructionsTitle}
              </h2>
              <p className="text-xs text-[#575653] mt-0.5">
                {t.constructor.bulkInstructionsDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBulkText(t.constructor.bulkTextareaPlaceholder)}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              {t.constructor.loadSampleTemplateBtn}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1">
                {t.constructor.bulkDefaultSubject}
              </label>
              <input
                type="text"
                value={bulkSubject}
                onChange={(e) => setBulkSubject(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1">
                {t.constructor.bulkDefaultTopic}
              </label>
              <input
                type="text"
                value={bulkTopic}
                onChange={(e) => setBulkTopic(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#141413] mb-1">
                {t.constructor.bulkDefaultLang}
              </label>
              <select
                value={bulkLang}
                onChange={(e) => setBulkLang(e.target.value as UILanguage)}
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl text-xs font-semibold"
              >
                <option value="uk">Українська (UK)</option>
                <option value="en">English (EN)</option>
                <option value="es">Español (ES)</option>
                <option value="ru">Русский (RU)</option>
              </select>
            </div>
          </div>

          <textarea
            rows={9}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={t.constructor.bulkTextareaPlaceholder}
            className="w-full p-4 bg-[#F8F7F4] border border-[#E5E2DC] rounded-xl font-mono-tabular text-xs leading-relaxed focus:outline-none focus:border-indigo-600"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleParseBulk}
              className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.constructor.parsePreviewBtn}</span>
            </button>

            {parsedPreview.length > 0 && (
              <button
                type="button"
                onClick={handleImportBulk}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {t.constructor.importParsedBtn} ({parsedPreview.length})
                </span>
              </button>
            )}
          </div>

          {parsedPreview.length > 0 && (
            <div className="pt-4 border-t border-[#E5E2DC] space-y-2.5 max-h-80 overflow-y-auto">
              <div className="text-xs font-bold text-emerald-700">
                {t.constructor.parsedCountLabel} {parsedPreview.length}
              </div>
              {parsedPreview.map((pq, i) => (
                <div
                  key={pq.id}
                  className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs"
                >
                  <div className="font-bold text-[#141413] mb-1">
                    {i + 1}. {pq.text}
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[#575653]">
                    {OPTION_KEYS.map((k) => (
                      <span
                        key={k}
                        className={
                          pq.correctOption === k
                            ? "font-bold text-emerald-700"
                            : ""
                        }
                      >
                        {k}) {pq.options[k]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: JSON IMPORT/EXPORT & MULTILINGUAL STARTER PACKS */}
      {subTab === "json" && (
        <div className="space-y-6">
          {/* Starter Subject Packs */}
          <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#141413] mb-1">
              {t.constructor.starterPacksTitle}
            </h2>
            <p className="text-xs text-[#575653] mb-4">
              {t.constructor.starterPacksDesc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(sampleSubjectPresets).map(([key, pack]) => (
                <div
                  key={key}
                  className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] flex flex-col justify-between gap-3"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono-tabular text-[10px] font-bold mb-1.5">
                      {pack.lang} · {pack.questions.length} Q
                    </span>
                    <div className="text-xs font-bold text-[#141413]">
                      {pack.label}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const formatted: Question[] = pack.questions.map(
                        (item, idx) => ({
                          ...item,
                          id: `preset-${key}-${Date.now()}-${idx}`,
                          number: questions.length + idx + 1,
                        })
                      );
                      onBulkAddQuestions(formatted);
                      showToast(`+${formatted.length} (${pack.label})`);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-white hover:bg-indigo-600 hover:text-white border border-[#E5E2DC] text-xs font-bold text-[#141413] transition-colors cursor-pointer"
                  >
                    + {t.constructor.addStarterPackBtn}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* JSON Export & Import */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#141413] mb-1">
                  {t.constructor.exportJsonTitle}
                </h3>
                <p className="text-xs text-[#575653] mb-4">
                  {t.constructor.exportJsonDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportJson}
                className="w-full py-2.5 px-4 rounded-xl bg-[#141413] hover:bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {t.constructor.downloadJsonBtn} ({questions.length})
                </span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#141413] mb-1">
                  {t.constructor.importJsonTitle}
                </h3>
                <p className="text-xs text-[#575653] mb-4">
                  {t.constructor.importJsonDesc}
                </p>
              </div>
              <label className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{t.constructor.uploadJsonBtn}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJsonFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Restore default 140 EFVV Questions */}
          <div className="bg-white rounded-2xl border border-[#E5E2DC] p-5 flex items-center justify-between gap-4">
            <span className="text-xs font-medium text-[#575653]">
              {t.constructor.resetToInitialBtn}
            </span>
            <button
              type="button"
              onClick={() => {
                onResetToInitial140();
                showToast(t.constructor.resetConfirmText);
              }}
              className="px-4 py-2 rounded-xl border border-[#E5E2DC] hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-bold text-[#141413] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.constructor.resetToInitialBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
