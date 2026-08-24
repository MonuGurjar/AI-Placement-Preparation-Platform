"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Award,
  Target,
  FileCheck,
  X,
  FileType
} from 'lucide-react';
import { 
  getStoredProfile, 
  getStoredATSReports, 
  saveStoredATSReports, 
  ATSReport 
} from '@/lib/storage';

export default function ResumeAnalyzerPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [analyzing, setAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<ATSReport | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const isValidFile = (file: File) => {
    const validExtensions = ['pdf', 'docx', 'txt'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    return validExtensions.includes(ext);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    if (activeTab === 'upload' && !selectedFile) {
      alert('Please select or drop a resume file (.pdf, .docx, .txt)');
      return;
    }
    if (activeTab === 'text' && !resumeText.trim()) {
      alert('Please paste plain text of your resume.');
      return;
    }

    setAnalyzing(true);

    try {
      let res;

      if (activeTab === 'upload' && selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('targetRole', targetRole);

        res = await fetch('/api/resume-analyze', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('/api/resume-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText, targetRole })
        });
      }

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
          resumeTextSnippet: selectedFile ? `File: ${selectedFile.name}` : (resumeText.slice(0, 100) + '...')
        };

        setCurrentReport(newReport);
        const existing = getStoredATSReports();
        saveStoredATSReports([newReport, ...existing]);

        if (data.notice) {
          setNotice(data.notice);
        }
      } else if (data.error) {
        alert(data.error);
      }
    } catch (err) {
      console.error('Failed to analyze resume:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const loadSampleResume = () => {
    setActiveTab('text');
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
          Upload your resume file (PDF, DOCX, TXT) or paste plain text to receive real-time ATS keyword matching, formatting evaluation, and role alignment analysis.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {/* Input Card */}
        <div className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'upload' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'upload' ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Upload size={16} /> File Upload (.pdf, .docx)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'text' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'text' ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <FileType size={16} /> Paste Plain Text
            </button>
          </div>

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                Target Engineering Role
              </label>
              <input 
                type="text" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineer, Full Stack Developer" 
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

            {activeTab === 'upload' ? (
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                  Resume Document File
                </label>
                
                {/* Drag and Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: dragActive ? '2px dashed var(--color-primary)' : '2px dashed rgba(255,255,255,0.15)',
                    background: dragActive ? 'rgba(117,255,158,0.05)' : 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />

                  {selectedFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                      <FileCheck size={28} color="var(--color-primary)" />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{selectedFile.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                          {(selectedFile.size / 1024).toFixed(1)} KB • Click or drop another to replace
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: 'white', marginLeft: '0.5rem' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(117, 255, 158, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Upload size={24} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                          Drag & drop your resume file here, or <span style={{ color: 'var(--color-primary)' }}>browse</span>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                          Supports PDF (.pdf), Word (.docx), and Plain Text (.txt) up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                    Resume Plain Text
                  </label>
                  <button 
                    type="button" 
                    onClick={loadSampleResume}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Load Sample
                  </button>
                </div>
                <textarea 
                  value={resumeText} 
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the text content of your resume here..." 
                  rows={12}
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
                />
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={analyzing}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Analyzing Document with Gemini AI...
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
              <p>No active report. Upload your resume file or paste text on the left and click "Scan Resume with AI".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
