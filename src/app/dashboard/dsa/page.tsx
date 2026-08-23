"use client";

import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Search, 
  Filter, 
  Sparkles,
  Trophy,
  Flame,
  Bookmark
} from 'lucide-react';
import { 
  INITIAL_DSA_PROBLEMS, 
  DSAProblem, 
  getStoredSolvedDSA, 
  saveStoredSolvedDSA,
  getStoredBookmarks,
  saveStoredBookmarks 
} from '@/lib/storage';

export default function DSATrackerPage() {
  const [problems] = useState<DSAProblem[]>(INITIAL_DSA_PROBLEMS);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  useEffect(() => {
    setSolvedIds(getStoredSolvedDSA());
    setBookmarks(getStoredBookmarks());
  }, []);

  const toggleSolved = (id: string) => {
    const next = solvedIds.includes(id) 
      ? solvedIds.filter(i => i !== id) 
      : [...solvedIds, id];
    setSolvedIds(next);
    saveStoredSolvedDSA(next);
  };

  const toggleBookmark = (id: string) => {
    const next = bookmarks.includes(id)
      ? bookmarks.filter(i => i !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    saveStoredBookmarks(next);
  };

  const categories = ['All', ...Array.from(new Set(problems.map(p => p.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const solvedCount = solvedIds.length;
  const totalCount = problems.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header & Stats */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <Code2 size={28} color="var(--color-primary)" />
              <h1 style={{ fontSize: '1.8rem' }}>DSA Preparation Tracker</h1>
            </div>
            <p style={{ color: 'var(--color-on-surface-variant)' }}>
              Track curated LeetCode & interview problems grouped by pattern and target company.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>Solved Progress</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {solvedCount} / {totalCount} <span style={{ fontSize: '1rem', fontWeight: 400 }}>({progressPercent}%)</span>
              </div>
            </div>
            <div style={{ width: '100px' }}>
              <div className="progress-bar-container" style={{ height: '10px' }}>
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '8px 14px', borderRadius: '8px', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--color-on-surface-variant)" />
          <input 
            type="text" 
            placeholder="Search problem title, topic, or company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>Topic:</span>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ background: 'rgba(28,32,37,0.9)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>Difficulty:</span>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{ background: 'rgba(28,32,37,0.9)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
            >
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Difficulty</th>
              <th style={{ padding: '12px' }}>Top Companies</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((prob) => {
              const isSolved = solvedIds.includes(prob.id);
              const isBookmarked = bookmarks.includes(prob.id);

              const diffColor = prob.difficulty === 'Easy' ? '#75ff9e' : prob.difficulty === 'Medium' ? '#ffba79' : '#ffb4ab';

              return (
                <tr key={prob.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => toggleSolved(prob.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      {isSolved ? (
                        <CheckCircle2 size={22} color="var(--color-primary)" />
                      ) : (
                        <Circle size={22} color="var(--color-outline)" />
                      )}
                    </button>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 500, color: isSolved ? 'var(--color-on-surface-variant)' : 'white' }}>
                    <span style={{ textDecoration: isSolved ? 'line-through' : 'none' }}>
                      {prob.title}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                    {prob.category}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '12px', background: `${diffColor}20`, color: diffColor, fontSize: '0.8rem', fontWeight: 600 }}>
                      {prob.difficulty}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {prob.companies.map((comp, idx) => (
                        <span key={idx} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                          {comp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.8rem' }}>
                      <button 
                        onClick={() => toggleBookmark(prob.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? '#ffba79' : 'var(--color-outline)' }}
                      >
                        <Bookmark size={18} fill={isBookmarked ? '#ffba79' : 'none'} />
                      </button>
                      <a 
                        href={prob.url} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-primary)', fontSize: '0.85rem' }}
                      >
                        Solve <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
