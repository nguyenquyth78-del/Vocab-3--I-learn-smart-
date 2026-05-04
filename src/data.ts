import { VocabularyWord, QuizQuestion, PronunciationTheory } from './types';

export const SAMPLE_VOCABULARY: VocabularyWord[] = [
  {
    id: 'U1_01',
    unit: 1,
    topic: 'My Friends',
    word: 'friend',
    ipa: '/frend/',
    meaning: 'bạn, người bạn',
    example: 'This is my friend.'
  },
  {
    id: 'U1_02',
    unit: 1,
    topic: 'My Friends',
    word: 'hello',
    ipa: '/həˈləʊ/',
    meaning: 'xin chào',
    example: 'Hello, I am Joy.'
  },
  {
    id: 'v3',
    unit: 1,
    topic: 'My Friends',
    word: 'teacher',
    ipa: '/ˈtiːtʃə(r)/',
    meaning: 'giáo viên',
    example: 'Our teacher is very kind.'
  },
  {
    id: 'v4',
    unit: 2,
    word: 'School',
    ipa: '/skuːl/',
    meaning: 'Trường học',
    example: 'I go to school every day.'
  },
  {
    id: 'v5',
    unit: 2,
    word: 'Pencil',
    ipa: '/ˈpensl/',
    meaning: 'Bút chì',
    example: 'I have a new pencil.'
  },
  {
    id: 'v6',
    unit: 2,
    word: 'Book',
    ipa: '/bʊk/',
    meaning: 'Quyển sách',
    example: 'Open your book, please.'
  }
];

export const SAMPLE_QUIZZES: QuizQuestion[] = [
  {
    id: 'S1',
    type: 'spelling-missing',
    question: 'fr__nd',
    answer: 'friend',
    options: ['friend', 'freind', 'frend']
  },
  {
    id: 'S2',
    type: 'spelling-scrambled',
    question: 'rfeind',
    answer: 'friend'
  },
  {
    id: 'L1',
    type: 'listening',
    question: 'Listen and choose',
    answer: 'friend',
    options: ['friend', 'family', 'father']
  },
  {
    id: 'M1',
    type: 'meaning-en-vn',
    question: 'friend',
    answer: 'bạn',
    options: ['bạn', 'mẹ', 'bố']
  },
  {
    id: 'M2',
    type: 'meaning-vn-en',
    question: 'bạn',
    answer: 'friend',
    options: ['friend', 'family', 'school']
  },
  {
    id: 'q3',
    type: 'meaning-en-vn',
    question: 'Teacher',
    options: ['Học sinh', 'Giáo viên', 'Bác sĩ', 'Kỹ sư'],
    answer: 'Giáo viên'
  },
  {
    id: 'q4',
    type: 'meaning-vn-en',
    question: 'Trường học',
    options: ['Home', 'School', 'Park', 'Zoo'],
    answer: 'School'
  }
];

export const PRONUNCIATION_THEORY: PronunciationTheory[] = [
  {
    id: 'P1',
    title: 'Cách phát âm đuôi "s/es"',
    category: 's/es',
    content: `
- /s/: Sau các âm vô thanh /p/, /t/, /k/, /f/, /θ/ (ví dụ: cups, cats, books).
- /ɪz/: Sau các âm /s/, /z/, /ʃ/, /tʃ/, /dʒ/, /ʒ/ (ví dụ: buses, roses, watches).
- /z/: Các trường hợp còn lại (ví dụ: dogs, trees, pens).
    `,
    exercises: [
      {
        id: 'PE1',
        type: 'meaning-en-vn', // Reusing the UI for MCQ
        question: 'Chọn từ có phát âm đuôi là /s/:',
        options: ['cats', 'dogs', 'boxes'],
        answer: 'cats'
      },
      {
        id: 'PE2',
        type: 'meaning-en-vn',
        question: 'Chọn từ có phát âm đuôi là /ɪz/:',
        options: ['books', 'pens', 'buses'],
        answer: 'buses'
      }
    ]
  },
  {
    id: 'P2',
    title: 'Cách phát âm đuôi "ed"',
    category: 'ed',
    content: `
- /ɪd/: Sau âm /t/, /d/ (ví dụ: wanted, needed).
- /t/: Sau các âm vô thanh /p/, /k/, /f/, /s/, /ʃ/, /tʃ/ (ví dụ: stopped, cooked, laughed).
- /d/: Các trường hợp còn lại (ví dụ: played, cleaned, loved).
    `,
    exercises: [
      {
        id: 'PE3',
        type: 'meaning-en-vn',
        question: 'Chọn từ có phát âm đuôi là /ɪd/:',
        options: ['wanted', 'stopped', 'played'],
        answer: 'wanted'
      }
    ]
  }
];
