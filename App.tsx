import React, { useState } from 'react';
import { Step, AppView } from './types';
import RootMenu from './components/RootMenu';
import StepIntro from './components/StepIntro';
import StepReading from './components/StepReading';
import StepQuestions from './components/StepQuestions';
import StepQuiz from './components/StepQuiz';
import ProgressBar from './components/ProgressBar';
import BibleChapterSelect from './components/BibleChapterSelect';
import BibleChapterView from './components/BibleChapterView';
import { LESSONS, REVELATION_CONTENTS } from './data';

const TOTAL_STEPS = 4; 

export default function App() {
  // Global Navigation State
  const [currentView, setCurrentView] = useState<AppView>(AppView.ROOT);

  // MYE Lesson State
  const [step, setStep] = useState<Step>(Step.INTRO);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(null);
  const [myeSelectedChapter, setMyeSelectedChapter] = useState<number>(1);

  // Bible State
  const [currentBibleChapter, setCurrentBibleChapter] = useState<number>(1);

  // --- MYE Logic ---
  const selectMyeChapter = (chapter: number) => {
    setMyeSelectedChapter(chapter);
    setCurrentView(AppView.MYE_LESSON);
    setStep(Step.INTRO);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startMyeLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setStep(Step.READING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => Math.min(prev + 1, Step.QUIZ));
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => Math.max(prev - 1, Step.READING));
  };

  const goMyeList = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(AppView.MYE_CHAPTER_SELECT);
  };
  
  const goMyeHome = () => {
    setStep(Step.INTRO);
    setCurrentLessonIndex(null);
  };

  const restartLesson = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(Step.READING);
  };

  // --- Bible Logic ---
  const selectBibleChapter = (chapter: number) => {
    setCurrentBibleChapter(chapter);
    setCurrentView(AppView.BIBLE_VIEW);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextBibleChapter = () => {
    if (currentBibleChapter < 22) {
      setCurrentBibleChapter(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevBibleChapter = () => {
    if (currentBibleChapter > 1) {
      setCurrentBibleChapter(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- Navigation Helpers ---
  const goRoot = () => {
    setCurrentView(AppView.ROOT);
    setStep(Step.INTRO);
    setCurrentLessonIndex(null);
  };

  const goBibleList = () => {
     setCurrentView(AppView.BIBLE_SELECT);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLessonData = currentLessonIndex !== null ? LESSONS[currentLessonIndex] : null;

  // Render Content Switcher
  const renderContent = () => {
    switch (currentView) {
      case AppView.ROOT:
        return (
          <RootMenu 
            onSelectMye={() => setCurrentView(AppView.MYE_CHAPTER_SELECT)} 
            onSelectBible={() => setCurrentView(AppView.BIBLE_SELECT)} 
          />
        );
      
      case AppView.MYE_CHAPTER_SELECT:
        // Filter chapters that actually have MYE lessons
        const myeAvailableChapters = new Set(LESSONS.map(l => l.config.chapterNumber));
        return (
          <BibleChapterSelect 
             title="MYE心 학습 - 장 선택"
             availableChapters={myeAvailableChapters}
             onSelectChapter={selectMyeChapter}
             onBack={goRoot}
             theme="orange"
             navProps={{
               onHome: goRoot
             }}
          />
        );

      case AppView.BIBLE_SELECT:
        // Filter chapters that have Recitation content
        const bibleAvailableChapters = new Set(REVELATION_CONTENTS.map(c => c.chapter));
        return (
          <BibleChapterSelect 
            title="요한계시록 암송 - 장 선택"
            availableChapters={bibleAvailableChapters}
            onSelectChapter={selectBibleChapter} 
            onBack={goRoot} 
            theme="blue"
            navProps={{
               onHome: goRoot
            }}
          />
        );

      case AppView.BIBLE_VIEW:
        return (
          <BibleChapterView 
            chapter={currentBibleChapter} 
            onBack={goBibleList}
            navProps={{
               onHome: goRoot,
               onList: goBibleList,
               onPrev: currentBibleChapter > 1 ? prevBibleChapter : undefined,
               onNext: currentBibleChapter < 22 ? nextBibleChapter : undefined
            }}
          />
        );

      case AppView.MYE_LESSON:
        // Inside MYE Lesson Sub-app
        if (step === Step.INTRO || !currentLessonData) {
          return (
             <StepIntro 
                selectedChapter={myeSelectedChapter}
                onSelectLesson={startMyeLesson} 
                onBack={goMyeList} 
                navProps={{
                   onHome: goRoot,
                   onList: goMyeList
                }}
             />
          );
        }
        
        const commonNav = {
           onHome: goRoot,
           onList: goMyeHome,
        };

        switch (step) {
          case Step.READING:
            return (
              <StepReading 
                data={currentLessonData} 
                navProps={{
                   ...commonNav,
                   onNext: nextStep
                }}
              />
            );
          case Step.QUESTIONS:
            return (
              <StepQuestions
                data={currentLessonData}
                navProps={{
                  ...commonNav,
                  onPrev: prevStep,
                  onNext: nextStep,
                  nextLabel: '빈칸 넣기'
                }}
              />
            );
          case Step.QUIZ:
            return (
              <StepQuiz 
                data={currentLessonData} 
                navProps={{
                   ...commonNav,
                   onPrev: prevStep,
                   onRetry: restartLesson
                }}
              />
            );
          default:
            return null;
        }
      
      default:
        return null;
    }
  };

  // Only show progress bar in MYE active lesson mode
  const showProgressBar = currentView === AppView.MYE_LESSON && step !== Step.INTRO;
  
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-gray-800 pb-safe">
      {showProgressBar && <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />}

      <main className="max-w-2xl mx-auto px-4 pt-8 md:pt-12">
        {renderContent()}
      </main>
    </div>
  );
}