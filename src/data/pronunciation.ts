import { PronunciationTopic } from '../types';

export const PRONUNCIATION_DATA: PronunciationTopic[] = [
  {
    id: 'p1',
    title: 'Ending "s/es"',
    theory: 'Cách phát âm đuôi "s/es" có 3 trường hợp: \n1. /s/: Khi từ kết thúc bằng âm vô thanh (p, t, k, f, th). \n2. /ɪz/: Khi từ kết thúc bằng (s, ss, ch, sh, x, z, ge, ce). \n3. /z/: Các trường hợp còn lại.',
    examples: [
      { text: 'Books /s/', audio: 'Books' },
      { text: 'Watches /ɪz/', audio: 'Watches' },
      { text: 'Dogs /z/', audio: 'Dogs' }
    ]
  },
  {
    id: 'p2',
    title: 'Ending "ed"',
    theory: 'Cách phát âm đuôi "ed": \n1. /t/: Khi từ kết thúc bằng âm vô thanh (p, k, f, sh, ch, s). \n2. /ɪd/: Khi từ kết thúc bằng (t, d). \n3. /d/: Các trường hợp còn lại.',
    examples: [
      { text: 'Walked /t/', audio: 'Walked' },
      { text: 'Wanted /ɪd/', audio: 'Wanted' },
      { text: 'Played /d/', audio: 'Played' }
    ]
  },
  {
    id: 'p3',
    title: 'Word Stress (1)',
    theory: 'Trọng âm từ là khi một âm tiết trong từ được đọc to và rõ hơn. \nVí dụ: Với các danh từ 2 âm tiết, trọng âm thường rơi vào âm tiết đầu.',
    examples: [
      { text: 'SCHOOL-boy', audio: 'Schoolboy' },
      { text: 'TEA-cher', audio: 'Teacher' }
    ]
  }
];
