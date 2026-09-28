import { OptionKey, Question, UILanguage } from "../types";

const CYRILLIC_TO_LATIN_OPTION: Record<string, OptionKey> = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  А: "A",
  Б: "B",
  В: "C",
  Г: "D",
  Д: "D",
};

function normalizeOptionLetter(raw: string): OptionKey | null {
  const upper = raw.trim().toUpperCase();
  return CYRILLIC_TO_LATIN_OPTION[upper] || null;
}

export function parseBulkQuestionsText(
  rawText: string,
  defaultSubject: string,
  defaultTopic: string,
  defaultLanguage: UILanguage,
  startingNumber: number
): Question[] {
  const lines = rawText
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim());

  const parsed: Question[] = [];
  let currentText = "";
  let currentOptions: Partial<Record<OptionKey, string>> = {};
  let currentCorrect: OptionKey = "A";
  let currentExplanation = "";
  let currentTopic = defaultTopic || "General";

  const flushCurrent = () => {
    if (
      currentText.trim() &&
      currentOptions.A &&
      currentOptions.B &&
      currentOptions.C &&
      currentOptions.D
    ) {
      const idx = parsed.length;
      parsed.push({
        id: `custom-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        number: startingNumber + idx,
        text: currentText.trim(),
        options: {
          A: currentOptions.A.trim(),
          B: currentOptions.B.trim(),
          C: currentOptions.C.trim(),
          D: currentOptions.D.trim(),
        },
        correctOption: currentCorrect,
        explanation: currentExplanation.trim() || "",
        topic: currentTopic.trim() || defaultTopic || "General",
        subject: defaultSubject.trim() || "General Subject",
        language: defaultLanguage,
      });
    }
    currentText = "";
    currentOptions = {};
    currentCorrect = "A";
    currentExplanation = "";
    currentTopic = defaultTopic || "General";
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      continue;
    }

    // Check if line specifies Answer / Відповідь / Ответ / Respuesta
    const answerMatch = line.match(
      /^(?:відповідь|правильна відповідь|answer|correct|ответ|правильный ответ|respuesta|correcta)\s*[:\-–=]\s*([A-Da-dА-ГҐа-гґ])/i
    );
    if (answerMatch) {
      const norm = normalizeOptionLetter(answerMatch[1]);
      if (norm) currentCorrect = norm;
      continue;
    }

    // Check if line specifies Explanation / Пояснення / Объяснение / Explicación
    const explMatch = line.match(
      /^(?:пояснення|коментар|explanation|rationale|объяснение|комментарий|explicación|explicacion)\s*[:\-–=]\s*(.+)$/i
    );
    if (explMatch) {
      currentExplanation = explMatch[1].trim();
      continue;
    }

    // Check if line specifies Topic / Тема / Tema
    const topicMatch = line.match(/^(?:тема|topic|tema|раздел)\s*[:\-–=]\s*(.+)$/i);
    if (topicMatch) {
      currentTopic = topicMatch[1].trim();
      continue;
    }

    // Check if line is an Option A/B/C/D or А/Б/В/Г (with optional leading * for correct answer)
    const optionMatch = line.match(
      /^(\*)?\s*([A-Da-dАБВГабвг])\s*[\)\.\:\-]\s*(.+)$/
    );
    if (optionMatch) {
      const isStarred = Boolean(optionMatch[1]);
      const optKey = normalizeOptionLetter(optionMatch[2]);
      const optVal = optionMatch[3].trim();
      if (optKey) {
        currentOptions[optKey] = optVal.replace(/^\*+|\*+$/g, "").trim();
        if (isStarred) {
          currentCorrect = optKey;
        }
        continue;
      }
    }

    // Check if a new question starts (either we already have all 4 options, or line starts with number like "1." or "Q1:")
    const numberedStart = line.match(/^(?:Q|Питання|Вопрос|Pregunta)?\s*\d+\s*[\.\)\:]\s*(.+)$/i);
    if (
      currentOptions.A &&
      currentOptions.B &&
      currentOptions.C &&
      currentOptions.D
    ) {
      flushCurrent();
    }

    if (numberedStart) {
      if (currentText && Object.keys(currentOptions).length > 0) {
        flushCurrent();
      }
      currentText = numberedStart[1].trim();
    } else if (Object.keys(currentOptions).length === 0) {
      currentText = currentText ? `${currentText} ${line}` : line;
    } else if (currentExplanation) {
      currentExplanation = `${currentExplanation} ${line}`;
    }
  }

  flushCurrent();
  return parsed;
}
