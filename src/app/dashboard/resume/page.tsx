"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  RefreshCw,
  Award,
  Target
} from 'lucide-react';
import { 
  getStoredProfile, 
  getStoredATSReports, 
  saveStoredATSReports, 
  ATSReport 
} from '@/lib/storage';

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [analyzing, setAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<ATSReport | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.targetRole) {
      setTargetRole(profile.targetRole);
    }
    const reports = getStoredATSReports();
    if (reports.length > 0) {
      setCurrentReport(reports[0]);
    }
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setAnalyzing(true);
    setNotice(null);

    try {
      const res = await fetch('/api/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole })
      });

      const data = await res.json();
      if (data.success && data.report) {
        const newReport: ATSReport = {
          id: `report-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          role: targetRole,
          score: data.report.score,
          strengths: data.report.strengths || [],
          missingKeywords: data.report.missingKeywords || [],
          improvements: data.report.improvements || [],
          resumeTextSnippet: resumeText.slice(0, 100) + '...'
        };

        setCurrentReport(newReport);
        const existing = getStoredATSReports();
        saveStoredATSReports([newReport, ...existing]);

        if (data.notice) {
          setNotice(data.notice);
        }
      }
    } catch (err) {
      console.error('Failed to analyze resume:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const loadSampleResume = () => {
    setResumeText(`Alex Doe
Software Engineer | Full Stack Developer
Email: alex@example.com | GitHub: github.com/alexdoe | LinkedIn: linkedin.com/in/alexdoe

SUMMARY
Results-driven Software Engineer with 2+ years of experience building scalable web applications using React, Next.js, Node.js, and TypeScript. Passionate about clean architecture and algorithm optimization.

TECHNICAL SKILLS
- Languages: TypeScript, JavaScript, Python, C++, SQL
- Frontend: React, Next.js, HTML5, CSS3, TailwindCSS, Redux
- Backend: Node.js, Express, REST APIs, PostgreSQL, MongoDB
- Tools & Cloud: Git, Docker, AWS (S3, EC2), Jest, Vercel

PROJECTS
Placement AI Platform | Next.js, TypeScript, Gemini API
- Engineered an interactive placement preparation platform featuring resume ATS parsing and mock interviews.
- Integrated automated feedback loops reducing preparation friction for 1,000+ active students.

Algorithmic Trading Dashboard | Python, React, WebSockets
- Built real-time market visualization tools consuming WebSocket feeds with sub-100ms latency.
- Implemented backtesting engine for quantitative trading strategies.

EDUCATION
B.S. in Computer Science | State University (Graduation: 2025)
GPA: 3.8 / 4.0`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <FileText size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.8rem' }}>AI Resume & ATS Analyzer</h1>
        </div>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>
          Paste your resume text below to analyze your ATS keyword compatibility, formatting quality, and alignment with target engineering roles.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {/* Form Input */}
        <div className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Resume Content</h2>
            <button 
              type="button" 
              onClick={loadSampleResume}
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.85rem' }}
            >
              Load Sample Resume
            </button>
          </div>

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                Target Role
              </label>
              <input 
                type="text" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineer, Backend Lead" 
                style={{ 
                  width: '100%', 
                  padding: '10px 14px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white' 
                }}
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                Resume Plain Text
              </label>
              <textarea 
                value={resumeText} 
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the full text of your resume here..." 
                rows={14}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: '0.88rem',
                  resize: 'vertical' 
                }}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={analyzing}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Analyzing with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Scan Resume with AI
                </>
              )}
            </button>
          </form>

          {notice && (
            <div style={{ padding: '0.8rem', background: 'rgba(255, 186, 121, 0.1)', border: '1px solid var(--color-tertiary-container)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-tertiary)' }}>
              {notice}
            </div>
          )}
        </div>

        {/* Scan Results Display */}
        <div className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>ATS Evaluation Report</h2>

          {currentReport ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Score Metric */}
              <div style={{ 
                padding: '1.5rem', 
                background: 'rgba(117, 255, 158, 0.05)', 
                border: '1px solid rgba(117, 255, 158, 0.2)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Match Score ({currentReport.role})
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {currentReport.score}%
                  </div>
                </div>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(117, 255, 158, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={32} color="var(--color-primary)" />
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <CheckCircle size={18} /> Strengths & Highlights
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentReport.strengths.map((s, idx) => (
                    <li key={idx} style={{ padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.9rem' }}>
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords */}
              <div>
                <h3 style={{ fontSize: '1rem', color: '#ffba79', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <AlertTriangle size={18} /> Missing ATS Keywords
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentReport.missingKeywords.map((kw, idx) => (
                    <span key={idx} style={{ padding: '4px 12px', background: 'rgba(255, 186, 121, 0.15)', border: '1px solid rgba(255, 186, 121, 0.3)', borderRadius: '16px', fontSize: '0.85rem', color: '#ffba79' }}>
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <Target size={18} /> Suggested Bullet Optimizations
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentReport.improvements.map((imp, idx) => (
                    <li key={idx} style={{ padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.9rem', borderLeft: '3px solid var(--color-primary)' }}>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
              <Upload size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No active report. Paste your resume text on the left and click "Scan Resume with AI" to generate an ATS breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
