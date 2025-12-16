import React from 'react';

interface AIInsightProps {
  analysis: string;
  loading: boolean;
}

const AIInsight: React.FC<AIInsightProps> = ({ analysis, loading }) => {
  return (
    <div className="bg-gradient-to-br from-[#004e92] to-[#000428] rounded-xl shadow-lg text-white p-6 mb-8 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold">تحلیل هوشمند بازار (AI)</h2>
          {loading && <span className="animate-pulse text-xs bg-white/20 px-2 py-0.5 rounded">در حال تحلیل...</span>}
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 text-sm leading-7 text-gray-100 text-justify font-light">
          {loading ? (
             <div className="space-y-2">
               <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
               <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
               <div className="h-4 bg-white/10 rounded w-4/6 animate-pulse"></div>
             </div>
          ) : (
            analysis.split('\n').map((para, idx) => <p key={idx} className="mb-2 last:mb-0">{para}</p>)
          )}
        </div>
        <p className="text-[10px] text-blue-200 mt-2 text-left opacity-70">
          Powered by Gemini 2.5 Flash
        </p>
      </div>
    </div>
  );
};

export default AIInsight;