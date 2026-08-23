"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, Flame, CheckCircle } from 'lucide-react';
import { getStoredProfile, getStoredSolvedDSA, getStoredATSReports, INITIAL_USER_PROFILE, UserProfile } from '@/lib/storage';

export default function ProgressPage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    setProfile(getStoredProfile());
    setSolvedCount(getStoredSolvedDSA().length);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <TrendingUp size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.8rem' }}>Placement Readiness Analytics</h1>
        </div>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>
          Detailed breakdown of your interview readiness, weekly activity, and placement probability metrics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        <div className="col-span-4 glass-panel" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>Placement Probability</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0.5rem 0' }}>
            {profile.placementProbability}%
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
            High likelihood for target role ({profile.targetRole} at {profile.targetCompany}).
          </p>
        </div>

        <div className="col-span-4 glass-panel" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>Active Streak</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ff9800', margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={32} color="#ff9800" /> {profile.streakDays} Days
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
            Keep solving daily problems to maintain momentum!
          </p>
        </div>

        <div className="col-span-4 glass-panel" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>DSA Questions Solved</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', margin: '0.5rem 0' }}>
            {solvedCount}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
            Across Arrays, Dynamic Programming, Graphs & Trees.
          </p>
        </div>
      </div>
    </div>
  );
}
