import React from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { LessonData } from '../types';
import BottomNav from './BottomNav';

interface Props {
  data: LessonData;
  navProps?: any;
}

const StepAnswers: React.FC<Props> = ({ data, navProps }) => {
  const { qna } = data;

  return (
    <div className="flex flex-col space-y-6 animate-fade-in pb-24">
      <div className="flex items-center space-x-2 text-orange-600 font-bold text-lg border-b-2 border-orange-200 pb-2">
        <MessageCircle className="w-6 h-6" />
        <h2>답하기</h2>
      </div>

      <div className="space-y-6">
        {qna.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-50">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-start">
                 <span className="text-orange-500 font-bold mr-3 shrink-0">Q{item.id}.</span>
                 <p className="font-medium text-gray-700 break-keep">{item.question}</p>
              </div>
            </div>
            <div className="p-6 bg-orange-50/50">
              <div className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-1" />
                <p className="text-gray-800 leading-relaxed font-medium break-keep">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav theme="orange" {...navProps} />
    </div>
  );
};

export default StepAnswers;