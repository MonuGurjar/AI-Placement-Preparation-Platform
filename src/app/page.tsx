"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  FileText, 
  Code2, 
  Briefcase, 
  Target, 
  LayoutDashboard,
  BrainCircuit,
  Menu,
  X,
  Search,
  Flame,
  Bell,
  FileCheck,
  Trophy,
  TrendingUp,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import './page.css';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <BrainCircuit color="var(--color-primary)" />
          <span>PlacementAI</span>
        </div>
        <div className="nav-links">
          <Link href="#features" className="nav-item">Features</Link>
          <Link href="#companies" className="nav-item">Companies</Link>
          <Link href="#dsa" className="nav-item">DSA Tracker</Link>
          <Link href="#resume" className="nav-item">Resume Analyzer</Link>
          <Link href="#pricing" className="nav-item">Pricing</Link>
        </div>
        <div className="nav-actions">
          <Link href="/auth?mode=login">
            <button className="btn-secondary">Login</button>
          </Link>
          <Link href="/auth?mode=signup">
            <button className="btn-primary">Get Started</button>
          </Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} color="var(--color-on-surface)" /> : <Menu size={24} color="var(--color-on-surface)" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
          <Link href="#companies" onClick={() => setMobileMenuOpen(false)}>Companies</Link>
          <Link href="#dsa" onClick={() => setMobileMenuOpen(false)}>DSA Tracker</Link>
          <Link href="#resume" onClick={() => setMobileMenuOpen(false)}>Resume Analyzer</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <div className="mobile-menu-actions">
            <Link href="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
              <button className="btn-secondary" style={{ width: '100%' }}>Login</button>
            </Link>
            <Link href="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
              <button className="btn-primary" style={{ width: '100%' }}>Get Started</button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <h1 
          className="hero-title animate-fade-in-up"
        >
          Crack Your Dream Company with AI-Powered Preparation
        </h1>
        <p 
          className="hero-subtitle animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          A comprehensive platform designed to streamline your placement journey. 
          Get personalized DSA tracking, ATS-friendly resume analysis, and company-specific roadmaps.
        </p>
        <div 
          className="hero-actions animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <Link href="/auth?mode=signup">
            <button className="btn-primary">Start Your Journey</button>
          </Link>
          <button className="btn-secondary">View Demo</button>
        </div>
        
        <div 
          className="hero-mockup animate-fade-in-up"
          style={{ animationDelay: '0.4s', textAlign: 'left' }}
        >
          {/* Mock Browser Header Bar */}
          <div style={{ background: 'rgba(16, 20, 25, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px 16px', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BrainCircuit size={12} color="var(--color-primary)" /> placementai.app/dashboard
            </div>
            <div style={{ width: '40px' }}></div>
          </div>

          {/* Live Application Mockup Body */}
          <div style={{ display: 'flex', height: 'calc(100% - 37px)', background: '#101419' }}>
            {/* Sidebar */}
            <div style={{ width: '180px', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(28, 32, 37, 0.6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', padding: '4px 8px' }}>
                <BrainCircuit size={18} /> PlacementAI
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(117,255,158,0.15)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <LayoutDashboard size={16} /> Dashboard
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem' }}>
                  <Code2 size={16} /> DSA Tracker
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem' }}>
                  <Briefcase size={16} /> Companies
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem' }}>
                  <FileText size={16} /> Resume ATS
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem' }}>
                  <MessageSquare size={16} /> Mock Interview
                </div>
              </div>
            </div>

            {/* Main Dashboard Panel */}
            <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'hidden' }}>
              {/* Topbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(28,32,37,0.4)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px', width: '220px', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
                  <Search size={14} /> Search companies, DSA...
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,152,0,0.15)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', color: '#ff9800', fontWeight: 600 }}>
                    <Flame size={14} color="#ff9800" /> 12 Streak
                  </div>
                  <div style={{ position: 'relative', color: 'var(--color-on-surface)' }}>
                    <Bell size={16} />
                    <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }}></span>
                  </div>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--color-primary)', color: '#003918', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    AD
                  </div>
                </div>
              </div>

              {/* Hero Banner inside mockup */}
              <div style={{ background: 'linear-gradient(135deg, rgba(117,255,158,0.1) 0%, rgba(28,32,37,0.6) 100%)', border: '1px solid rgba(117,255,158,0.2)', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>Welcome back, <span style={{ color: 'var(--color-primary)' }}>Alex!</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Targeting: <strong>Software Engineer @ Google</strong></div>
                </div>
                <button style={{ background: 'var(--color-primary)', color: '#003918', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  View Roadmap
                </button>
              </div>

              {/* KPI Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{ background: 'rgba(28,32,37,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', display: 'flex', justifyContent: 'space-between' }}>
                    ATS Score <FileCheck size={12} color="var(--color-primary)" />
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', margin: '2px 0' }}>85%</div>
                  <div style={{ fontSize: '0.65rem', color: '#75ff9e' }}>+5% this week</div>
                </div>

                <div style={{ background: 'rgba(28,32,37,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', display: 'flex', justifyContent: 'space-between' }}>
                    Placement Prob. <Target size={12} color="var(--color-primary)" />
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', margin: '2px 0' }}>92%</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-primary)' }}>High Chance</div>
                </div>

                <div style={{ background: 'rgba(28,32,37,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', display: 'flex', justifyContent: 'space-between' }}>
                    DSA Solved <Trophy size={12} color="var(--color-primary)" />
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', margin: '2px 0' }}>124</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-on-surface-variant)' }}>Top 15% User</div>
                </div>

                <div style={{ background: 'rgba(28,32,37,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', display: 'flex', justifyContent: 'space-between' }}>
                    Mock Interviews <TrendingUp size={12} color="var(--color-primary)" />
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', margin: '2px 0' }}>4</div>
                  <div style={{ fontSize: '0.65rem', color: '#ffba79' }}>Score: 88/100</div>
                </div>
              </div>

              {/* Action List Preview */}
              <div style={{ background: 'rgba(28,32,37,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>Daily Preparation Checklist</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={14} color="var(--color-primary)" />
                    <span>Daily DSA: Two Sum (Arrays & Hashing)</span>
                  </div>
                  <span style={{ padding: '2px 8px', background: 'rgba(117,255,158,0.15)', color: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600 }}>Solved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <h2 className="section-title">Everything you need to succeed</h2>
        <p className="section-subtitle">We identified the core challenges of placement preparation and solved them with AI.</p>
        
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon">
              <FileText size={24} />
            </div>
            <h3 className="feature-title">Resume Analyzer</h3>
            <p className="feature-desc">Get instant ATS feedback. Fix missing keywords, formatting issues, and tailor your resume for specific roles.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">
              <Code2 size={24} />
            </div>
            <h3 className="feature-title">DSA Progress Tracker</h3>
            <p className="feature-desc">Track your problem-solving journey across platforms. Identify weak topics and get AI-recommended questions.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">
              <Briefcase size={24} />
            </div>
            <h3 className="feature-title">Company Roadmaps</h3>
            <p className="feature-desc">Curated preparation guides for top tech companies. Know exactly what to study for your target company.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">
              <Target size={24} />
            </div>
            <h3 className="feature-title">Mock Interviews</h3>
            <p className="feature-desc">Practice with our AI interviewer. Get feedback on your communication, technical accuracy, and confidence.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="feature-title">Personalized Dashboard</h3>
            <p className="feature-desc">Your command center. View your daily streak, upcoming goals, and overall placement probability.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">
              <Rocket size={24} />
            </div>
            <h3 className="feature-title">AI Recommendations</h3>
            <p className="feature-desc">Smart suggestions on what to focus on next based on your current progress and target role.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: '1.5rem' }}>
              <BrainCircuit color="var(--color-primary)" />
              <span>PlacementAI</span>
            </div>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
              Empowering students to crack their dream jobs with structured, AI-driven preparation.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link href="#">Features</Link></li>
              <li><Link href="#">Pricing</Link></li>
              <li><Link href="#">Testimonials</Link></li>
              <li><Link href="#">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link href="#">DSA Guide</Link></li>
              <li><Link href="#">Resume Tips</Link></li>
              <li><Link href="#">Interview Questions</Link></li>
              <li><Link href="#">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Smart Placement Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
