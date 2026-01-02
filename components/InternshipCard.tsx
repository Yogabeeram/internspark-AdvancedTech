
import React from 'react';
import { MatchResult } from '../types';

interface Props {
  job: MatchResult;
}

const InternshipCard: React.FC<Props> = ({ job }) => {
  const getBadgeColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (percentage >= 60) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-200 group relative">
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(job.matchPercentage)}`}>
        {job.matchPercentage}% AI Match
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
        <p className="text-slate-600 font-medium flex items-center gap-2">
          <span className="text-blue-500">🏢</span> {job.company} 
          <span className="text-slate-300">|</span> 
          <span className="text-xs uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-semibold">{job.mode}</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
        <p className="text-sm text-slate-600 italic flex gap-2">
          <span className="shrink-0">✨</span> {job.aiReasoning}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-slate-400 flex items-center gap-1">
          📍 {job.loc}
        </span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-lg shadow-blue-200">
          Quick Apply
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
