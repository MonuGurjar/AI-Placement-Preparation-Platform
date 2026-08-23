"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileCheck, 
  Target, 
  Trophy, 
  TrendingUp, 
  PlayCircle,
  BrainCircuit,
  Calendar,
  AlertCircle,
  ArrowRight,
  Code2,
  Briefcase
} from 'lucide-react';
import { 
  getStoredProfile, 
  getStoredSolvedDSA, 
  getStoredATSReports,
  getStoredMockInterviews,
  UserProfile,
  ATSReport,
  INITIAL_USER_PROFILE
} from '@/lib/storage';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [latestATS, setLatestATS] = useState<ATSReport | null>(null);
  const [mockCount, setMockCount] = useState<number>(0);

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);

    const solved = getStoredSolvedDSA();
    setSolvedCount(solved.length);

    const ats = getStoredATSReports();
    if (ats.length > 0) setLatestATS(ats[0]);

    const mocks = getStoredMockInterviews();
    setMockCount(mocks.length);
  }, []);

  return (
    <div className="dashboard-grid">
      {/* Hero Card */}
      <div className="col-span-12 glass-panel hero-card">
        <div className="hero-card-content">
          <h1>Welcome back, <span>{profile.name}!</span></h1>
          <p>Targeting: <strong>{profile.targetRole} @ {profile.targetCompany}</strong></p>
        </div>
        <div className="hero-card-actions" style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/dashboard/companies">
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Briefcase size={16} /> View Company Roadmap
            </button>
          </Link>
          <Link href="/dashboard/resume">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlayCircle size={18} /> Analyze Resume
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="col-span-3 glass-panel kpi-card">
        <div className="kpi-header">
          <span>ATS Score</span>
          <FileCheck size={18} color="var(--color-primary)" />
        </div>
        <div className="kpi-value">{latestATS ? `${latestATS.score}%` : `${profile.atsScore}%`}</div>
        <div className="kpi-trend positive">+5% this week</div>
      </div>

      <div className="col-span-3 glass-panel kpi-card">
        <div className="kpi-header">
          <span>Placement Prob.</span>
          <Target size={18} color="var(--color-primary)" />
        </div>
        <div className="kpi-value">{profile.placementProbability}%</div>
        <div className="kpi-trend positive">High chance</div>
      </div>

      <div className="col-span-3 glass-panel kpi-card">
        <div className="kpi-header">
          <span>DSA Solved</span>
          <Trophy size={18} color="var(--color-primary)" />
        </div>
        <div className="kpi-value">{solvedCount}</div>
        <div className="kpi-trend positive">Top 15%</div>
      </div>

      <div className="col-span-3 glass-panel kpi-card">
        <div className="kpi-header">
          <span>Mock Interviews</span>
          <TrendingUp size={18} color="var(--color-primary)" />
        </div>
        <div className="kpi-value">{mockCount}</div>
        <div className="kpi-trend positive">{mockCount > 0 ? 'Completed' : 'Needs practice'}</div>
      </div>

      {/* Daily Preparation */}
      <div className="col-span-8 glass-panel" style={{ padding: '2rem' }}>
        <h3 className="card-title">Daily Preparation Checklist</h3>
        
        <div className="list-item">
          <div className="list-item-icon">
            <BrainCircuit size={20} />
          </div>
          <div className="list-item-content">
            <h4>Daily DSA: Two Sum (LeetCode)</h4>
            <p>Topic: Arrays & Hashing | Difficulty: Easy</p>
          </div>
          <Link href="/dashboard/dsa">
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Solve Now</button>
          </Link>
        </div>

        <div className="list-item">
          <div className="list-item-icon">
            <Calendar size={20} />
          </div>
          <div className="list-item-content">
            <h4>Behavioral Question of the Day</h4>
            <p>"Tell me about a time you had a conflict with a teammate."</p>
          </div>
          <Link href="/dashboard/interviews">
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Practice</button>
          </Link>
        </div>

        <div className="list-item">
          <div className="list-item-icon" style={{ background: 'rgba(255, 180, 171, 0.1)', color: 'var(--color-error)' }}>
            <AlertCircle size={20} />
          </div>
          <div className="list-item-content">
            <h4>Action Required: Resume Optimization</h4>
            <p>Your recent ATS scan found missing keywords for System Design & GraphQL.</p>
          </div>
          <Link href="/dashboard/resume">
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Fix Now</button>
          </Link>
        </div>
      </div>

      {/* Weak Topics */}
      <div className="col-span-4 glass-panel" style={{ padding: '2rem' }}>
        <h3 className="card-title">Topic Proficiency</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Arrays & Hashing</span>
            <span style={{ color: 'var(--color-primary)' }}>90%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '90%' }}></div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Two Pointers</span>
            <span style={{ color: 'var(--color-primary)' }}>75%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Dynamic Programming</span>
            <span style={{ color: 'var(--color-error)' }}>30%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '30%', background: 'var(--color-error)' }}></div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Graphs</span>
            <span style={{ color: '#ff9800' }}>45%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '45%', background: '#ff9800' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
