
import React from 'react';
import { BookOpen } from 'lucide-react';
import { LessonData } from '../types';
import BottomNav from './BottomNav';

interface Props {
  data: LessonData;
  navProps?: any;
}

const StepReading: React.FC<Props> = ({ data, navProps }) => {
  const { passage } = data;

  return (
    <div className="flex flex-col space-y-6 animate-fade-in pb-24">
      <div className="flex items-center space-x-2 text-orange-600 font-bold text-lg border-b-2 border-orange-200 pb-2">
        <BookOpen className="w-6 h-6" />
        <h2>본문 읽기</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
        <div className="bg-orange-500 px-6 py-4">
          <h3 className="text-white font-bold text-xl flex items-center justify-center">
            {passage.reference}
          </h3>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          {passage.verses.map((verse) => (
            <div key={verse.number} className="flex cross-start">
              <span className="text-orange-500 font-bold text-lg mr-3 mt-1 shrink-0">
                {verse.number}절
              </span>
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium break-keep break-words">
                {verse.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-xl text-center text-orange-700 text-sm">
        소리 내어 3번 읽어보세요!
      </div>
      
      <BottomNav theme="orange" {...navProps} />
    </div>
  );
};

export default StepReading;
