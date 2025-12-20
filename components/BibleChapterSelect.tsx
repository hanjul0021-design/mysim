
import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import BottomNav from './BottomNav';

interface Props {
  onSelectChapter: (chapter: number) => void;
  onBack: () => void;
  title?: string;
  availableChapters?: Set<number>;
  theme?: 'orange' | 'blue';
  navProps?: any;
}

const BibleChapterSelect: React.FC<Props> = ({ 
  onSelectChapter, 
  onBack, 
  title = "요한계시록 암송",
  availableChapters,
  theme = 'blue',
  navProps
}) => {
  // Create array 1 to 22
  const allChapters = Array.from({ length: 22 }, (_, i) => i + 1);
  const themeColor = theme === 'orange' ? 'text-orange-800' : 'text-blue-800';
  const infoBg = theme === 'orange' ? 'bg-orange-50 text-orange-800' : 'bg-blue-50 text-blue-800';
  const borderColor = theme === 'orange' ? 'border-orange-100 hover:border-orange-500' : 'border-blue-100 hover:border-blue-500';

  return (
    <div className="animate-fade-in pb-24">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className={`text-2xl font-bold ml-2 ${themeColor}`}>{title}</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {allChapters.map((num) => {
          const isAvailable = availableChapters ? availableChapters.has(num) : true;
          
          return (
            <button
              key={num}
              onClick={() => isAvailable ? onSelectChapter(num) : alert('데이터가 준비중입니다.')}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-200
                ${isAvailable
                  ? `bg-white ${borderColor} text-gray-700 hover:shadow-md hover:scale-105 active:scale-95` 
                  : 'bg-gray-50 border-transparent text-gray-300 cursor-not-allowed'
                }
              `}
            >
              <span className={`text-lg font-bold ${isAvailable ? 'text-gray-800' : 'text-gray-300'}`}>{num}</span>
              <span className="text-[10px] font-medium mt-1">장</span>
            </button>
          );
        })}
      </div>
      
      <div className={`mt-8 p-4 rounded-xl flex items-start text-sm ${infoBg}`}>
        <BookOpen className="w-5 h-5 mr-2 shrink-0" />
        <p>원하는 장을 선택하세요. 데이터가 없는 장은 회색으로 표시됩니다.</p>
      </div>

      <BottomNav theme={theme} {...navProps} />
    </div>
  );
};

export default BibleChapterSelect;
