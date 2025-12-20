
import React, { useState } from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import { LessonData } from '../types';
import BottomNav from './BottomNav';

interface Props {
  data: LessonData;
  onNextStep: () => void;
  onPrevStep: () => void;
  navProps?: any;
}

const StepQnA: React.FC<Props> = ({ data, onNextStep, onPrevStep, navProps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const { qna } = data;
  const currentItem = qna[currentIndex];
  const isLastQuestion = currentIndex === qna.length - 1;

  const handleShowAnswer = () => {
    setIsAnswerRevealed(true);
  };

  const handleNext = () => {
    // If answer not shown, show it first? Or just disable next?
    // Current UX: Button says "Show Answer" then "Next".
    // We will simulate this with the bottom nav 'Next' or 'Main Action'.
    
    if (!isAnswerRevealed) {
       handleShowAnswer();
       return;
    }

    if (isLastQuestion) {
      onNextStep();
    } else {
      setIsAnswerRevealed(false);
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Logic for Bottom Nav props
  // We hijack the 'onNext' from props to handle internal Question navigation first
  const customNext = handleNext;
  
  // Custom label based on state
  const nextLabel = isLastQuestion ? '퀴즈' : '다음';
  
  // If answer is NOT revealed, we can force the "Next" button to act as "Reveal" 
  // OR we can use the mainAction prop for "Reveal".
  // Let's use mainAction for "Answer" and Next for "Next".
  
  return (
    <div className="flex flex-col space-y-6 animate-fade-in pb-32">
      <div className="flex items-center justify-between border-b-2 border-orange-200 pb-2">
        <div className="flex items-center space-x-2 text-orange-600 font-bold text-lg">
          <HelpCircle className="w-6 h-6" />
          <h2>질문하기</h2>
        </div>
        <span className="text-sm font-bold text-orange-400">
          {currentIndex + 1} / {qna.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
        <div className="bg-orange-50 px-6 py-6 border-b border-orange-100">
          <div className="flex items-start">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold mr-4 shrink-0 shadow-md">
              Q{currentItem.id}
            </span>
            <h3 className="text-xl font-bold text-gray-800 leading-snug pt-0.5 break-keep break-words">
              {currentItem.question}
            </h3>
          </div>
        </div>
        
        <div className="p-6 min-h-[120px] flex items-center justify-center">
          {!isAnswerRevealed ? (
            <div className="text-center w-full">
               <div className="w-16 h-16 bg-orange-100 text-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 animate-pulse" />
               </div>
               <p className="text-gray-500 font-medium">질문을 읽고 답을 생각해보세요.</p>
            </div>
          ) : (
            <div className="w-full bg-green-50 rounded-xl p-5 border border-green-100 animate-fade-in-up">
              <div className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-1" />
                <p className="text-gray-800 text-lg leading-relaxed font-medium break-keep break-words">
                  {currentItem.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav 
         theme="orange"
         {...navProps}
         onPrev={onPrevStep}
         onNext={customNext}
         nextLabel={nextLabel}
         // If answer is hidden, show 'Answer' button in center. If shown, rely on 'Next' button
         onMainAction={!isAnswerRevealed ? handleShowAnswer : undefined}
         mainActionLabel="정답 보기"
      />
    </div>
  );
};

export default StepQnA;
