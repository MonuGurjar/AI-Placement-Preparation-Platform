"use client";

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  RefreshCw,
  Building2,
  ChevronRight
} from 'lucide-react';
import { getStoredProfile, saveStoredProfile } from '@/lib/storage';

export default function CompanyRoadmapPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>('Google');
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const companiesList = ['Google', 'Amazon', 'Microsoft', 'Meta', 'TCS', 'Uber', 'Apple', 'Netflix'];

  const fetchGuide = async (company: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/company-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: company })
      });
      const data = await res.json();
      if (data.success && data.guide) {
        setGuide(data.guide);
      }
    } catch (err) {
      console.error('Error fetching company guide:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.targetCompany) {
      setSelectedCompany(profile.targetCompany);
      fetchGuide(profile.targetCompany);
    } else {
      fetchGuide('Google');
    }
  }, []);

  const handleSelectCompany = (comp: string) => {
    setSelectedCompany(comp);
    fetchGuide(comp);
  };

  const handleSetTarget = (comp: string) => {
    const profile = getStoredProfile();
    profile.targetCompany = comp;
    saveStoredProfile(profile);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Briefcase size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.8rem' }}>Company Preparation Roadmaps</h1>
        </div>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>
          Company-specific preparation tracks curated with past interview round breakdowns, top DSA topics, and AI-recommended strategies.
        </p>
      </div>

      {/* Company Selector Chips */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '0.8rem', overflowX: 'auto', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', fontWeight: 500, marginRight: '0.5rem' }}>
          Select Company:
        </span>
        {companiesList.map(comp => (
          <button
            key={comp}
            onClick={() => handleSelectCompany(comp)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: selectedCompany === comp ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)',
              background: selectedCompany === comp ? 'rgba(117, 255, 158, 0.15)' : 'rgba(255,255,255,0.03)',
              color: selectedCompany === comp ? 'var(--color-primary)' : 'var(--color-on-surface)',
              fontWeight: selectedCompany === comp ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {comp}
          </button>
        ))}
      </div>

      {/* Guide Content */}
      {loading ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <RefreshCw className="animate-spin" size={32} style={{ marginBottom: '1rem' }} />
          <p>Generating tailored {selectedCompany} interview guide with AI...</p>
        </div>
      ) : guide ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
          {/* Company Hero Card */}
          <div className="col-span-12 glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <Building2 size={24} color="var(--color-primary)" />
                <h2 style={{ fontSize: '1.6rem' }}>{guide.company} Placement Roadmap</h2>
              </div>
              <p style={{ color: 'var(--color-on-surface-variant)', maxWidth: '800px' }}>
                {guide.overview}
              </p>
            </div>
            <button 
              onClick={() => handleSetTarget(guide.company)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Set as Target Company
            </button>
          </div>

          {/* Interview Rounds */}
          <div className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} /> Interview Process & Rounds
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {guide.rounds?.map((rnd: string, idx: number) => (
                <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--color-primary)', borderRadius: '6px', fontSize: '0.92rem' }}>
                  <span style={{ fontWeight: 600, color: 'white' }}>Round {idx + 1}: </span> {rnd}
                </div>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffba79', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} /> High-Yield Preparation Topics
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {guide.topTopics?.map((top: string, idx: number) => (
                <div key={idx} style={{ padding: '10px 16px', background: 'rgba(255,186,121,0.1)', border: '1px solid rgba(255,186,121,0.25)', borderRadius: '8px', fontSize: '0.9rem', color: '#ffba79', fontWeight: 500 }}>
                  ✓ {top}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <Lightbulb size={20} /> Pro Tips for {guide.company}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {guide.tips?.map((tp: string, idx: number) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--color-on-surface-variant)', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: '6px' }}>
                  • {tp}
                </li>
              ))}
            </ul>
          </div>

          {/* Frequently Asked Questions */}
          <div className="col-span-12 glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <HelpCircle size={20} color="var(--color-primary)" /> Frequently Asked Problems at {guide.company}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {guide.frequentlyAskedQuestions?.map((q: string, idx: number) => (
                <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{q}</span>
                  <ChevronRight size={16} color="var(--color-primary)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
