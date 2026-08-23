"use client";

import React, { useState, useEffect } from 'react';
import { Bookmark, Code2, ExternalLink } from 'lucide-react';
import { INITIAL_DSA_PROBLEMS, getStoredBookmarks } from '@/lib/storage';

export default function BookmarksPage() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    setBookmarkedIds(getStoredBookmarks());
  }, []);

  const bookmarkedProblems = INITIAL_DSA_PROBLEMS.filter(p => bookmarkedIds.includes(p.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Bookmark size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.8rem' }}>Bookmarked Questions & Resources</h1>
        </div>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>
          Quick access to saved DSA problems and interview questions for revision.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        {bookmarkedProblems.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookmarkedProblems.map(p => (
              <div key={p.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{p.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>{p.category} • {p.difficulty}</span>
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Solve <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
            No bookmarks saved yet. Click the bookmark icon on any problem in the DSA tracker to save it here!
          </div>
        )}
      </div>
    </div>
  );
}
