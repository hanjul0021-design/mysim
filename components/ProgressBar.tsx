import React from 'react';
import { Step } from '../types';

interface Props {
  currentStep: Step;
  totalSteps: number;
}

const ProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
  // Intro(0) -> Read(1) -> QnA(2) -> Quiz(3)
  // We want the bar to fill up as we go.
  // When at Intro, 0 width.
  // When at Read, 33%.
  // When at QnA, 66%.
  // When at Quiz, 100%.
  
  if (currentStep === Step.INTRO) return null;

  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full bg-orange-100 h-2 fixed top-0 left-0 z-50">
      <div 
        className="h-full bg-orange-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;