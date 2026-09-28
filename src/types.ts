export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type UILanguage = 'uk' | 'en' | 'es' | 'ru';

export interface Question {
  id: string;
  number: number;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: OptionKey;
  explanation: string;
  topic?: string;
  subject?: string;
  language?: UILanguage;
}

export type AppViewMode = 'train' | 'exam' | 'constructor' | 'bank' | 'stats';

export type FilterScope = 'all' | 'mistakes' | 'bookmarked' | 'unanswered';

export interface ExamAttemptRecord {
  id: string;
  date: string;
  subject: string;
  topic: string;
  mode: 'train' | 'exam';
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  scorePercent: number;
  durationSeconds: number;
  timeLimitMinutes: number | null;
}
