"use client";

import React, { useState } from 'react';
import { Box, CheckCircle2, ExternalLink, RefreshCw } from 'lucide-react';

export default function CodingPlatformsPage() {
  const [synced, setSynced] = useState(false);

  const platforms = [
    { name: 'LeetCode', username: 'alex_coder', solved: 124, rating: '1785 (Top 12%)', color: '#ffa116' },
    { name: 'GeeksforGeeks', username: 'alexdoe_gfg', solved: 85, score: '420 pts', color: '#2f9d51' },
    { name: 'Codeforces', username: 'alex_master', rating: '1420 (Specialist)', color: '#1f8acb' },
    { name: 'HackerRank', username: 'alex_doe', badges: '6 Stars (Problem Solving)', color: '#2ec866' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Box size={28} color="var(--color-primary)" />
            <h1 style={{ fontSize: '1.8rem' }}>Connected Coding Platforms</h1>
          </div>
          <p style={{ color: 'var(--color-on-surface-variant)' }}>
            Consolidate your competitive programming profiles and track overall stats across LeetCode, Codeforces, GFG & HackerRank.
          </p>
        </div>
        <button 
          onClick={() => setSynced(!synced)}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <RefreshCw size={16} /> {synced ? 'Synced Just Now' : 'Sync Profiles'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {platforms.map((p, idx) => (
          <div key={idx} className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.color }}></span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{p.name}</h2>
              </div>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>@{p.username}</p>
              <div style={{ marginTop: '0.8rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                {p.solved ? `${p.solved} Problems Solved` : p.rating || p.badges}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
              <CheckCircle2 size={20} /> Connected
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
