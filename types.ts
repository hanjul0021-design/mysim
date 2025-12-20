
export interface Verse {
  number: number;
  text: string;
}

export interface QAItem {
  id: number;
  question: string;
  answer: string;
}

export interface QuizSegment {
  id: string;
  text: string;
  isBlank: boolean;
  verseNum?: number;
}

export enum Step {
  INTRO = 0,
  READING = 1,
  QUESTIONS = 2,
  QUIZ = 3
}

// Global View State
export enum AppView {
  ROOT = 'ROOT',
  MYE_CHAPTER_SELECT = 'MYE_CHAPTER_SELECT',
  MYE_LESSON = 'MYE_LESSON',
  BIBLE_SELECT = 'BIBLE_SELECT',
  BIBLE_VIEW = 'BIBLE_VIEW'
}

// Data structure for the raw configuration in data.ts
export interface LessonConfig {
  title: string;
  chapterNumber: number; 
  passageInfo: {
    book: string;
    chapter: string;
  };
  verses: Verse[];
  qna: {
    question: string;
    answer: string;
  }[];
  quizRawText: string[];
}

// Data structure passed to components at runtime
export interface LessonData {
  config: LessonConfig;
  passage: {
    reference: string;
    verses: Verse[];
  };
  qna: QAItem[];
  quiz: QuizSegment[];
}

export interface BibleChapterData {
  chapter: number;
  content: string; // Raw text block
}