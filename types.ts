
export interface Internship {
  id: number;
  title: string;
  company: string;
  skills: string[];
  loc: string;
  mode: 'Online' | 'Offline';
  edu: string;
  description: string;
}

export interface UserProfile {
  userName: string;
  userEdu: string;
  userMode: string;
  userLoc: string;
  userGoals: string;
  userSkills: string;
}

export interface MatchResult extends Internship {
  matchPercentage: number;
  aiReasoning: string;
}
