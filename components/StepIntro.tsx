
import React from 'react';
import { BookOpen, Heart, ArrowRight, Share2, ArrowLeft } from 'lucide-react';
import { APP_TITLE, LESSONS } from '../data';
import BottomNav from './BottomNav';

interface Props {
  onSelectLesson: (index: number) => void;
  onBack: () => void;
  selectedChapter?: number;
  navProps?: any;
}

const StepIntro: React.FC<Props> = ({ onSelectLesson, onBack, selectedChapter, navProps }) => {
  
  // Filter lessons based on selectedChapter if provided
  const displayLessons = selectedChapter 
    ? LESSONS.filter(lesson => lesson.config.chapterNumber === selectedChapter)
    : LESSONS;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${APP_TITLE.main}${APP_TITLE.sub}`,
          text: APP_TITLE.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('주소가 복사되었습니다. 카카오톡이나 텔레그램에 붙여넣기 하세요!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-fade-in-up pb-24">
      <div className="w-full max-w-sm mb-6 flex justify-start">
         <button onClick={onBack} className="flex items-center text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5 mr-1" />
            {selectedChapter ? '장 선택으로' : '홈으로'}
         </button>
      </div>

      <div className="bg-orange-100 p-6 rounded-full mb-8 shadow-inner relative">
        <Heart className="w-20 h-20 text-orange-500 fill-orange-500 animate-pulse" />
        <div className="absolute -right-2 -top-2 bg-white p-2 rounded-full shadow-md animate-bounce">
           <span className="text-2xl">✨</span>
        </div>
      </div>
      
      <h1 className="text-4xl font-black text-gray-800 mb-2 tracking-tight">
        <span className="text-orange-500">{APP_TITLE.main}</span> {APP_TITLE.sub}
      </h1>
      <p className="text-gray-500 mb-12 text-lg font-medium">
        {selectedChapter ? `요한계시록 ${selectedChapter}장 학습` : APP_TITLE.description}
      </p>

      <div className="w-full max-w-sm space-y-4 mb-10">
        <div className="text-left text-sm font-bold text-gray-400 ml-2 mb-2">학습할 본문을 선택하세요</div>
        
        {displayLessons.length > 0 ? (
          displayLessons.map((lesson) => {
            const originalIndex = LESSONS.findIndex(l => l === lesson);
            
            return (
              <button
                key={originalIndex}
                onClick={() => onSelectLesson(originalIndex)}
                className="group w-full relative flex items-center justify-between px-6 py-5 bg-white border-2 border-orange-100 rounded-2xl shadow-sm hover:border-orange-500 hover:shadow-md transition-all duration-300 text-left"
              >
                <div>
                  <div className="text-xs font-bold text-orange-500 mb-1 flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    LESSON
                  </div>
                  <div className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {lesson.config.title}
                  </div>
                </div>
                <div className="bg-orange-50 p-2 rounded-full group-hover:bg-orange-500 transition-colors">
                  <ArrowRight className="w-5 h-5 text-orange-400 group-hover:text-white transition-colors" />
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            아직 등록된 학습 내용이 없습니다.
          </div>
        )}
      </div>

      <button
        onClick={handleShare}
        className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-orange-400 transition-all duration-200 bg-transparent rounded-full hover:bg-orange-50 hover:text-orange-600 focus:outline-none"
      >
        <Share2 className="ml-2 w-4 h-4 mr-2" />
        친구에게 공유하기
      </button>

      <BottomNav theme="orange" {...navProps} />
    </div>
  );
};

export default StepIntro;
