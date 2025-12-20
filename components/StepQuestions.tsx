import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { LessonData } from '../types';
import BottomNav from './BottomNav';

interface Props {
  data: LessonData;
  navProps?: any;
}

const StepQuestions: React.FC<Props> = ({ data, navProps }) => {
  const { qna } = data;
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const handleReveal = (id: number) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const revealAll = () => {
    const allIds = new Set(qna.map(item => item.id));
    setRevealedIds(allIds);
  };

  return (
    <div className="flex flex-col space-y-6 animate-fade-in pb-24">
      <div className="flex items-center justify-between border-b-2 border-orange-200 pb-2">
        <div className="flex items-center space-x-2 text-orange-600 font-bold text-lg">
          <HelpCircle className="w-6 h-6" />
          <h2>질문하기</h2>
        </div>
        {revealedIds.size < qna.length && (
          <button 
            onClick={revealAll}
            className="text-xs font-bold text-orange-400 hover:text-orange-600 bg-orange-50 px-3 py-1 rounded-full"
          >
            모두 보기
          </button>
        )}
      </div>

      <div className="space-y-6">
        {qna.map((item) => {
          const isRevealed = revealedIds.has(item.id);

          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden transition-all duration-300">
              {/* Question Section */}
              <div className="p-6 pb-4">
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold mr-4 shrink-0">
                    Q{item.id}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 leading-snug pt-1 break-keep">
                    {item.question}
                  </h3>
                </div>
              </div>

              {/* Interaction Section */}
              <div className="px-6 pb-6">
                {!isRevealed ? (
                  // State: Not Revealed (Placeholder + Button)
                  <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 gap-4 animate-fade-in">
                    <p className="text-gray-400 font-medium text-sm text-center">
                      스스로 답을 생각해보세요
                    </p>
                    <button 
                      onClick={() => handleReveal(item.id)}
                      className="flex items-center px-5 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-full font-bold text-sm shadow-md transition-all active:scale-95"
                    >
                      답 보기
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ) : (
                  // State: Revealed (Answer)
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100 animate-fade-in-up">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-1" />
                      <p className="text-gray-800 leading-relaxed font-medium break-keep">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav theme="orange" {...navProps} />
    </div>
  );
};

export default StepQuestions;