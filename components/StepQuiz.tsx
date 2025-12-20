
import React, { useState } from 'react';
import { PenTool, RefreshCw } from 'lucide-react';
import { LessonData } from '../types';
import BottomNav from './BottomNav';

interface Props {
  data: LessonData;
  navProps?: any;
}

const StepQuiz: React.FC<Props> = ({ data, navProps }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [allRevealed, setAllRevealed] = useState(false);
  
  const { quiz } = data;

  const toggleReveal = (id: string) => {
    if (allRevealed) return;
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRevealAll = () => {
    const newRevealed: Record<string, boolean> = {};
    quiz.filter(s => s.isBlank).forEach(s => {
      newRevealed[s.id] = true;
    });
    setRevealed(newRevealed);
    setAllRevealed(true);
  };

  const handleReset = () => {
    setRevealed({});
    setAllRevealed(false);
  };

  return (
    <div className="flex flex-col space-y-6 animate-fade-in pb-24">
      <div className="flex items-center justify-between border-b-2 border-orange-200 pb-2">
        <div className="flex items-center space-x-2 text-orange-600 font-bold text-lg">
          <PenTool className="w-6 h-6" />
          <h2>빈칸 채우기</h2>
        </div>
        <div className="flex space-x-2">
          {!allRevealed ? (
            <button 
              onClick={handleRevealAll}
              className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium hover:bg-orange-200 transition-colors"
            >
              전체 정답
            </button>
          ) : (
            <button 
              onClick={handleReset}
              className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              가리기
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 md:p-8">
        <div className="leading-loose text-base md:text-lg font-medium text-gray-800 break-keep break-words">
          {quiz.map((segment) => {
            if (segment.isBlank) {
              const isShown = revealed[segment.id];
              return (
                <span
                  key={segment.id}
                  onClick={() => toggleReveal(segment.id)}
                  className={`
                    inline-flex items-center justify-center 
                    mx-1 px-1.5 py-0.5 rounded-lg border-b-2 cursor-pointer transition-all duration-300
                    min-w-[30px] text-center select-none align-baseline
                    ${isShown 
                      ? 'bg-orange-100 border-orange-400 text-orange-800 font-bold' 
                      : 'bg-gray-100 border-gray-300 text-transparent hover:bg-gray-200'
                    }
                  `}
                >
                  {segment.text}
                </span>
              );
            }
            return (
              <span key={segment.id}>
                 {segment.verseNum && (
                   <span className="font-bold text-orange-500 mr-2 block md:inline mt-4 md:mt-0">
                     {segment.verseNum}절
                   </span>
                 )}
                 {segment.text}
              </span>
            );
          })}
        </div>
      </div>
      
      <div className="bg-orange-50 text-orange-700 p-4 rounded-xl text-center text-sm font-medium">
        빈칸을 터치하여 정답을 확인해보세요.
      </div>

      <BottomNav theme="orange" {...navProps} />
    </div>
  );
};

export default StepQuiz;
