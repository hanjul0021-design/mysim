import React from 'react';
import { Home, Menu, ChevronLeft, ChevronRight, RefreshCw, CheckCircle2 } from 'lucide-react';

interface Props {
  onHome?: () => void;
  onList?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onRetry?: () => void;
  
  // Labels override
  nextLabel?: string;
  prevLabel?: string;
  
  // State for QnA/Interactive
  isNextDisabled?: boolean;
  mainActionLabel?: string;
  onMainAction?: () => void;
  
  theme?: 'orange' | 'blue';
}

const BottomNav: React.FC<Props> = ({
  onHome,
  onList,
  onPrev,
  onNext,
  onRetry,
  nextLabel = '다음',
  prevLabel = '이전',
  isNextDisabled = false,
  mainActionLabel,
  onMainAction,
  theme = 'orange',
}) => {
  const bgColor = theme === 'orange' ? 'bg-orange-500' : 'bg-blue-600';
  const buttonHover = theme === 'orange' ? 'hover:bg-orange-600' : 'hover:bg-blue-700';
  const buttonActive = theme === 'orange' ? 'active:bg-orange-700' : 'active:bg-blue-800';

  return (
    <div className={`fixed bottom-0 left-0 w-full ${bgColor} text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 pb-safe`}>
      <div className="max-w-2xl mx-auto px-2 py-3 flex items-center justify-between">
        
        {/* Left Group: Navigation */}
        <div className="flex gap-1">
          {onHome && (
            <button
              onClick={onHome}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg ${buttonHover} ${buttonActive} transition-colors min-w-[3.5rem]`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium opacity-90">홈</span>
            </button>
          )}
          {onList && (
            <button
              onClick={onList}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg ${buttonHover} ${buttonActive} transition-colors min-w-[3.5rem]`}
            >
              <Menu className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium opacity-90">목록</span>
            </button>
          )}
        </div>

        {/* Center/Right Group: Actions */}
        <div className="flex gap-2 items-center">
          
          {/* Custom Main Action (e.g. Reveal Answer) */}
          {onMainAction && (
             <button
               onClick={onMainAction}
               className={`flex items-center px-4 py-2 rounded-full bg-white text-gray-800 font-bold shadow-sm hover:bg-gray-100 active:scale-95 transition-all mr-2`}
             >
               {theme === 'orange' ? <CheckCircle2 className="w-4 h-4 mr-1.5 text-orange-500" /> : <RefreshCw className="w-4 h-4 mr-1.5 text-blue-500" />}
               <span className="text-sm">{mainActionLabel}</span>
             </button>
          )}

          {/* Retry Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className={`flex items-center px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 font-bold backdrop-blur-sm transition-all`}
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              <span className="text-sm">다시하기</span>
            </button>
          )}

          {/* Previous Button */}
          {onPrev && (
            <button
              onClick={onPrev}
              className={`flex items-center px-3 py-2 rounded-lg ${buttonHover} ${buttonActive} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-bold ml-0.5 hidden sm:inline">{prevLabel}</span>
            </button>
          )}

          {/* Next Button */}
          {onNext && (
            <button
              onClick={onNext}
              disabled={isNextDisabled}
              className={`flex items-center pl-3 pr-2 py-2 rounded-lg bg-white text-gray-800 font-bold shadow-md hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-sm mr-0.5">{nextLabel}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
