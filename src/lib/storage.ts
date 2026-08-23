export interface UserProfile {
  name: string;
  email: string;
  targetCompany: string;
  targetRole: string;
  streakDays: number;
  atsScore: number;
  placementProbability: number;
}

export interface DSAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  url: string;
  acceptanceRate: string;
  companies: string[];
}

export interface ATSReport {
  id: string;
  date: string;
  role: string;
  score: number;
  strengths: string[];
  missingKeywords: string[];
  improvements: string[];
  resumeTextSnippet: string;
}

export interface MockInterviewResult {
  id: string;
  date: string;
  company: string;
  role: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  feedback: string;
}

// Default Initial Data
export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Alex Doe",
  email: "alex@example.com",
  targetCompany: "Google",
  targetRole: "Software Engineer",
  streakDays: 12,
  atsScore: 85,
  placementProbability: 92,
};

export const INITIAL_DSA_PROBLEMS: DSAProblem[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/two-sum/', acceptanceRate: '54.2%', companies: ['Google', 'Amazon', 'Meta'] },
  { id: '2', title: 'Valid Anagram', difficulty: 'Easy', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/valid-anagram/', acceptanceRate: '65.1%', companies: ['Uber', 'Google'] },
  { id: '3', title: 'Group Anagrams', difficulty: 'Medium', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/group-anagrams/', acceptanceRate: '68.5%', companies: ['Amazon', 'Microsoft'] },
  { id: '4', title: 'Top K Frequent Elements', difficulty: 'Medium', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/top-k-frequent-elements/', acceptanceRate: '63.9%', companies: ['Meta', 'Amazon'] },
  { id: '5', title: 'Valid Palindrome', difficulty: 'Easy', category: 'Two Pointers', url: 'https://leetcode.com/problems/valid-palindrome/', acceptanceRate: '48.9%', companies: ['Microsoft', 'Apple'] },
  { id: '6', title: '3Sum', difficulty: 'Medium', category: 'Two Pointers', url: 'https://leetcode.com/problems/3sum/', acceptanceRate: '34.8%', companies: ['Google', 'Amazon', 'Meta'] },
  { id: '7', title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', url: 'https://leetcode.com/problems/container-with-most-water/', acceptanceRate: '55.3%', companies: ['Google', 'Amazon'] },
  { id: '8', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', acceptanceRate: '34.7%', companies: ['Amazon', 'Bloomberg'] },
  { id: '9', title: 'Climbing Stairs', difficulty: 'Easy', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/climbing-stairs/', acceptanceRate: '52.7%', companies: ['Google', 'Apple'] },
  { id: '10', title: 'Coin Change', difficulty: 'Medium', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/coin-change/', acceptanceRate: '44.1%', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: '11', title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', acceptanceRate: '55.8%', companies: ['Meta', 'Google'] },
  { id: '12', title: 'Number of Islands', difficulty: 'Medium', category: 'Graphs', url: 'https://leetcode.com/problems/number-of-islands/', acceptanceRate: '59.2%', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: '13', title: 'Clone Graph', difficulty: 'Medium', category: 'Graphs', url: 'https://leetcode.com/problems/clone-graph/', acceptanceRate: '56.4%', companies: ['Meta', 'Uber'] },
  { id: '14', title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', url: 'https://leetcode.com/problems/course-schedule/', acceptanceRate: '47.9%', companies: ['Amazon', 'Google'] },
  { id: '15', title: 'Merge K Sorted Lists', difficulty: 'Hard', category: 'Heap / Priority Queue', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', acceptanceRate: '52.1%', companies: ['Google', 'Microsoft', 'Amazon'] }
];

export const INITIAL_SOLVED_IDS: string[] = ['1', '2', '5'];

export const INITIAL_ATS_REPORTS: ATSReport[] = [
  {
    id: 'report-1',
    date: '2026-08-20',
    role: 'Software Engineer',
    score: 85,
    strengths: ['Clear project impact metrics', 'Strong technical skill keywords (React, Node, TypeScript)', 'Clean single-column layout'],
    missingKeywords: ['System Design', 'CI/CD Pipelines', 'GraphQL'],
    improvements: ['Quantify achievement in backend role', 'Add link to GitHub open-source contributions', 'Shorten summary section'],
    resumeTextSnippet: 'Experienced full stack developer skilled in React, Next.js, and Node.js...'
  }
];

export const INITIAL_MOCK_INTERVIEWS: MockInterviewResult[] = [
  {
    id: 'mock-1',
    date: '2026-08-21',
    company: 'Google',
    role: 'Software Engineer',
    overallScore: 88,
    technicalScore: 90,
    communicationScore: 85,
    feedback: 'Excellent explanation of time complexity in space optimization. Work on structuring STAR framework answers faster for behavioral prompts.',
  }
];

export const STORAGE_KEYS = {
  PROFILE: 'placement_user_profile',
  SOLVED_DSA: 'placement_solved_dsa_ids',
  ATS_REPORTS: 'placement_ats_reports',
  MOCK_INTERVIEWS: 'placement_mock_interviews',
  BOOKMARKS: 'placement_bookmarks',
};

// Safe LocalStorage Loaders & Savers
export function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') return INITIAL_USER_PROFILE;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : INITIAL_USER_PROFILE;
  } catch {
    return INITIAL_USER_PROFILE;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile:', e);
  }
}

export function getStoredSolvedDSA(): string[] {
  if (typeof window === 'undefined') return INITIAL_SOLVED_IDS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SOLVED_DSA);
    return data ? JSON.parse(data) : INITIAL_SOLVED_IDS;
  } catch {
    return INITIAL_SOLVED_IDS;
  }
}

export function saveStoredSolvedDSA(solvedIds: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SOLVED_DSA, JSON.stringify(solvedIds));
  } catch (e) {
    console.error('Error saving solved DSA:', e);
  }
}

export function getStoredATSReports(): ATSReport[] {
  if (typeof window === 'undefined') return INITIAL_ATS_REPORTS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATS_REPORTS);
    return data ? JSON.parse(data) : INITIAL_ATS_REPORTS;
  } catch {
    return INITIAL_ATS_REPORTS;
  }
}

export function saveStoredATSReports(reports: ATSReport[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ATS_REPORTS, JSON.stringify(reports));
  } catch (e) {
    console.error('Error saving ATS reports:', e);
  }
}

export function getStoredMockInterviews(): MockInterviewResult[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_INTERVIEWS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MOCK_INTERVIEWS);
    return data ? JSON.parse(data) : INITIAL_MOCK_INTERVIEWS;
  } catch {
    return INITIAL_MOCK_INTERVIEWS;
  }
}

export function saveStoredMockInterviews(interviews: MockInterviewResult[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.MOCK_INTERVIEWS, JSON.stringify(interviews));
  } catch (e) {
    console.error('Error saving mock interviews:', e);
  }
}

export function getStoredBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredBookmarks(bookmarks: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Error saving bookmarks:', e);
  }
}
