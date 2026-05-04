/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabularyWord {
  id: string;
  unit: number;
  topic: string;
  word: string;
  ipa: string;
  meaning: string;
  example: string;
  audioText: string;
}

export type QuizType = 'spelling' | 'listening' | 'meaning';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  wordId: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
}

export interface PronunciationTopic {
  id: string;
  title: string;
  theory: string;
  examples: { text: string; audio: string }[];
}

export interface UserProgress {
  score: number;
  stars: number;
  completedUnits: number[];
  completedQuizzes: string[];
}
