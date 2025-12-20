import React from 'react';
import { Heart, Book, ChevronRight } from 'lucide-react';
import { APP_TITLE } from '../data';

interface Props {
  onSelectMye: () => void;
  onSelectBible: () => void;
}

const RootMenu: React.FC<Props> = ({ onSelectMye, onSelectBible }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in-up pb-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-800 mb-3 tracking-tight">
          <span className="text-orange-500">{APP_TITLE.main}</span> {APP_TITLE.sub}
        </h1>
        <p className="text-gray-500 font-medium">
          성경 말씀 암송 및 심화 학습
        </p>
      </div>

      <div className="w-full max-w-sm space-y-6">
        <button
          onClick={onSelectMye}
          className="w-full relative group overflow-hidden bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-lg hover:border-orange-500 hover:shadow-orange-100/50 transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-md">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">MYE心 학습법</h2>
              <p className="text-gray-400 text-sm font-medium">질문과 답으로 깊이 있게</p>
            </div>
            <ChevronRight className="w-6 h-6 text-orange-300 group-hover:text-orange-500 transition-colors" />
          </div>
        </button>

        <button
          onClick={onSelectBible}
          className="w-full relative group overflow-hidden bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-lg hover:border-orange-500 hover:shadow-orange-100/50 transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-md">
                <Book className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">계시록 전장 암송</h2>
              <p className="text-gray-400 text-sm font-medium">1장부터 22장까지 통암송</p>
            </div>
            <ChevronRight className="w-6 h-6 text-blue-300 group-hover:text-blue-500 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default RootMenu;