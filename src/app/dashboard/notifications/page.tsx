"use client";

import React from 'react';
import { Bell, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'Gemini AI Resume Feedback Ready', desc: 'Your recent ATS scan completed with a score of 85%. Review missing keywords now.', time: '2 hours ago', icon: Sparkles, color: 'var(--color-primary)' },
    { id: 2, title: 'Target Company Roadmap Updated', desc: 'Google updated its candidate selection criteria for 2026 roles.', time: '1 day ago', icon: AlertCircle, color: '#ffba79' },
    { id: 3, title: '12-Day Streak Milestone Achieved', desc: 'Congratulations! You solved 3 DSA problems in a row.', time: '2 days ago', icon: CheckCircle, color: '#75ff9e' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Bell size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.8rem' }}>Notifications & Alerts</h1>
        </div>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>
          Stay updated on your preparation milestones, AI reports, and company roadmap updates.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: n.color }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{n.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>{n.time}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', marginTop: '0.2rem' }}>{n.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
