export interface VocabularyWord {
  id: string;
  unit: number;
  topic?: string;
  word: string;
  ipa: string;
  meaning: string;
  example: string;
}

export interface QuizQuestion {
  id: string;
  type: 'spelling-missing' | 'spelling-scrambled' | 'listening' | 'meaning-en-vn' | 'meaning-vn-en';
  question: string;
  options?: string[];
  answer: string;
  audioUrl?: string; // For listening quiz
}

export interface PronunciationTheory {
  id: string;
  title: string;
  category: 's/es' | 'ed' | 'word-stress' | 'sentence-stress';
  content: string;
  exercises?: QuizQuestion[];
}

export interface UserProgress {
  totalScore: number;
  stars: number;
  completedUnits: number[];
  quizStats: {
    [key: string]: {
      correct: number;
      total: number;
    };
  };
}
