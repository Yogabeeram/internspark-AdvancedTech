
import React, { useState } from 'react';
import { UserProfile, MatchResult } from './types';
import { MOCK_INTERNSHIPS } from './constants';
import { getAIMatches } from './services/geminiService';
import InternshipCard from './components/InternshipCard';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    userName: '',
    userEdu: '',
    userMode: 'Online',
    userLoc: '',
    userGoals: '',
    userSkills: ''
  });
  const [results, setResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    
    // Call Gemini Service
    const matches = await getAIMatches(profile, MOCK_INTERNSHIPS);
    setResults(matches);
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-indigo-950 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <h1 className="text-xl font-extrabold tracking-tight">Intern<span className="text-blue-400">Spark</span></h1>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-300 transition-colors">Find Internships</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Career Resources</a>
            <a href="#" className="hover:text-blue-300 transition-colors">About AI Match</a>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          
          {/* Profile Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-lg text-lg">👤</span>
                Build Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={profile.userName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Education</label>
                    <select
                      name="userEdu"
                      value={profile.userEdu}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                      required
                    >
                      <option value="">Level</option>
                      <option value="12th">12th Pass</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Under Graduate">Under Grad</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mode</label>
                    <select
                      name="userMode"
                      value={profile.userMode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Location / City</label>
                  <input
                    type="text"
                    name="userLoc"
                    value={profile.userLoc}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai, remote"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Career Goals</label>
                  <input
                    type="text"
                    name="userGoals"
                    value={profile.userGoals}
                    onChange={handleInputChange}
                    placeholder="e.g. Become a PM"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Skills</label>
                  <textarea
                    name="userSkills"
                    value={profile.userSkills}
                    onChange={handleInputChange}
                    placeholder="Python, SQL, Figma, etc."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  ) : (
                    <>
                      Find AI Matches
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </aside>

          {/* Results Area */}
          <main>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {searched ? (loading ? 'Analyzing Matches...' : `Top Recommendations for ${profile.userName || 'You'}`) : 'Recommended Opportunities'}
              </h2>
              {searched && !loading && (
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {results.length} Matches Found
                </span>
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-slate-200 h-48 w-full"></div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map(job => (
                  <InternshipCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to launch your career?</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Fill out your profile details on the left and our AI will find the perfect internships matching your specific skills and goals.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="mt-auto py-10 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">© 2025 InternSpark. Powered by Google Gemini AI.</p>
          <div className="flex justify-center gap-6 mt-4 opacity-60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
