
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Eye, RefreshCw, Sparkles } from 'lucide-react';
import { REVELATION_CONTENTS } from '../data';
import BottomNav from './BottomNav';

interface Props {
  chapter: number;
  onBack: () => void;
  navProps?: any;
}

interface Segment {
  text: string;
  isBlank: boolean;
  id: string;
}

const BibleChapterView: React.FC<Props> = ({ chapter, onBack, navProps }) => {
  // Store IDs of segments that are REVEALED. (So empty set = all hidden)
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  // Data fetching
  const chapterData = REVELATION_CONTENTS.find(c => c.chapter === chapter);
  
  // Parse content into verses and segments
  const parsedVerses = useMemo(() => {
    if (!chapterData) return [];
    
    const lines = chapterData.content.split('\n').filter(line => line.trim().length > 0);
    
    return lines.map((line, lineIndex) => {
      // 1. Extract verse number
      const match = line.match(/^(\[)?(\d+)(절|\.)?(\])?\s*/);
      const number = match ? parseInt(match[2], 10) : 0;
      let textContent = match ? line.replace(match[0], '') : line;

      // 2. Parse segments for Quiz Mode (split by {})
      // Example: "Hello {world} this is {test}" -> ["Hello ", "{world}", " this is ", "{test}"]
      const rawSegments = textContent.split(/({[^}]+})/g);
      
      const segments: Segment[] = rawSegments.map((part, segIndex) => {
        const isBlank = part.startsWith('{') && part.endsWith('}');
        return {
          id: `${chapter}-${number}-${lineIndex}-${segIndex}`,
          text: isBlank ? part.slice(1, -1) : part,
          isBlank
        };
      });

      return {
        number,
        segments
      };
    });
  }, [chapterData, chapter]);

  // Reset state when chapter changes
  useEffect(() => {
    setRevealedIds(new Set());
  }, [chapter]);

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showAll = () => {
    const allIds = new Set<string>();
    parsedVerses.forEach(v => {
      v.segments.forEach(s => {
        if (s.isBlank) allIds.add(s.id);
      });
    });
    setRevealedIds(allIds);
  };

  const hideAll = () => {
    setRevealedIds(new Set());
  };

  if (!chapterData) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
       <p className="text-gray-500 font-medium">데이터가 준비되지 않았습니다.</p>
       <button onClick={onBack} className="text-blue-500 font-bold hover:underline">돌아가기</button>
       <BottomNav theme="blue" {...navProps} />
    </div>
  );

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F0]/95 backdrop-blur-sm z-30 pt-4 pb-2 mb-4 border-b border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 ml-1">계시록 {chapter}장 암송</h1>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex gap-2 pb-2 animate-fade-in px-1">
          <button 
            onClick={hideAll}
            className="flex-1 flex items-center justify-center bg-blue-100 text-blue-700 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-200 transition-colors active:scale-95 shadow-sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 하기
          </button>
          <button 
            onClick={showAll}
            className="flex-1 flex items-center justify-center bg-white text-gray-600 py-2.5 rounded-xl text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-colors active:scale-95 shadow-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            모두 보기
          </button>
        </div>
      </div>

      {/* Content - Recitation Mode Only */}
      <div className="space-y-6 animate-fade-in">
        <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm font-medium flex items-center justify-center">
          <Sparkles className="w-4 h-4 mr-2" />
          빈칸을 누르면 정답이 보입니다.
        </div>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-blue-100">
          {parsedVerses.map((verse) => (
              <div key={verse.number} className="flex cross-start mb-8 last:mb-0">
                <span className="text-blue-500 font-bold text-lg w-10 shrink-0 pt-1.5 select-none">{verse.number}절</span>
                <div className="text-base md:text-lg leading-loose font-medium text-gray-800 break-keep break-words w-full">
                  {verse.segments.map((segment, idx) => {
                    if (segment.isBlank) {
                      const isRevealed = revealedIds.has(segment.id);
                      return (
                        <span
                          key={segment.id}
                          onClick={() => toggleReveal(segment.id)}
                          className={`
                            inline-flex items-center justify-center 
                            mx-1 px-1.5 py-0.5 rounded-lg border-b-2 cursor-pointer transition-all duration-200 select-none
                            align-baseline
                            ${isRevealed 
                              ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' 
                              : 'bg-gray-100 border-gray-300 text-transparent min-w-[30px] hover:bg-gray-200'
                            }
                          `}
                        >
                          {segment.text}
                        </span>
                      );
                    }
                    return <span key={idx}>{segment.text}</span>;
                  })}
                </div>
              </div>
          ))}
        </div>
      </div>

      <BottomNav 
        theme="blue" 
        {...navProps}
        prevLabel={`${chapter-1}장`}
        nextLabel={`${chapter+1}장`}
      />
    </div>
  );
};

export default BibleChapterView;
