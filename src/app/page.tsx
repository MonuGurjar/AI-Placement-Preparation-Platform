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
  CheckCircle,
  AlertTriangle,
  PlayCircle
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
          style={{ 
            animationDelay: '0.4s', 
            textAlign: 'left',
            height: 'auto',
            minHeight: '520px',
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '0',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}
        >
          {/* Main Container Layout */}
          <div style={{ display: 'flex', minHeight: '520px', width: '100%' }}>
            {/* Sidebar */}
            <div style={{ 
              width: '210px', 
              background: '#101419', 
              borderRight: '1px solid rgba(255,255,255,0.06)', 
              padding: '20px 14px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}>
              <div>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '1.8rem', paddingLeft: '6px' }}>
                  <BrainCircuit size={22} color="#75ff9e" />
                  <span>PlacementAI</span>
                </div>

                {/* Nav Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(117,255,158,0.12)', color: '#75ff9e', fontSize: '0.85rem', fontWeight: 600 }}>
                    <LayoutDashboard size={18} /> Dashboard
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <Code2 size={18} /> DSA
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <Briefcase size={18} /> Companies
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <MessageSquare size={18} /> Interview Questions
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <FileText size={18} /> Resume Analyzer
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <TrendingUp size={18} /> ATS Reports
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <Rocket size={18} /> Coding Platforms
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <Target size={18} /> Bookmarks
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                    <TrendingUp size={18} /> Progress
                  </div>
                </div>
              </div>

              {/* Bottom Nav Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                  <Bell size={18} /> Notifications
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px', borderRadius: '8px', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                  <Rocket size={18} /> Settings
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0d1117' }}>
              {/* Top Search & Profile Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '8px 16px', width: '320px', fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                  <Search size={16} color="var(--color-on-surface-variant)" />
                  <span>Search for companies, questions, topics...</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 152, 0, 0.12)', border: '1px solid rgba(255, 152, 0, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', color: '#ff9800', fontWeight: 600 }}>
                    <Flame size={16} color="#ff9800" />
                    <span>12 Day Streak</span>
                  </div>

                  <div style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell size={16} />
                    <span style={{ position: 'absolute', top: '0px', right: '0px', background: '#ff4d4d', color: 'white', borderRadius: '50%', width: '14px', height: '14px', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                  </div>

                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #75ff9e' }}>
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Monu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>

              {/* Welcome Hero Banner */}
              <div style={{ 
                background: 'rgba(28, 32, 37, 0.5)', 
                border: '1px solid rgba(117, 255, 158, 0.15)', 
                borderRadius: '14px', 
                padding: '20px 24px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                    Welcome back, <span style={{ color: '#75ff9e' }}>Monu!</span>
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
                    Targeting: <strong style={{ color: 'white' }}>Software Engineer @ Google</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ background: 'transparent', border: '1px solid rgba(117,255,158,0.4)', color: '#75ff9e', borderRadius: '8px', padding: '10px 18px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={16} /> View Company Roadmap
                  </button>
                  <button style={{ background: '#75ff9e', border: 'none', color: '#003918', borderRadius: '8px', padding: '10px 18px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PlayCircle size={16} /> Analyze Resume
                  </button>
                </div>
              </div>

              {/* 4 KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                <div style={{ background: 'rgba(28, 32, 37, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem', fontWeight: 500 }}>
                    <span>ATS Score</span>
                    <FileCheck size={16} color="#75ff9e" />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '8px 0 4px' }}>85%</div>
                  <div style={{ fontSize: '0.75rem', color: '#75ff9e', fontWeight: 600 }}>+5% this week</div>
                </div>

                <div style={{ background: 'rgba(28, 32, 37, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem', fontWeight: 500 }}>
                    <span>Placement Prob.</span>
                    <Target size={16} color="#75ff9e" />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '8px 0 4px' }}>92%</div>
                  <div style={{ fontSize: '0.75rem', color: '#75ff9e', fontWeight: 600 }}>High chance</div>
                </div>

                <div style={{ background: 'rgba(28, 32, 37, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem', fontWeight: 500 }}>
                    <span>DSA Solved</span>
                    <Trophy size={16} color="#75ff9e" />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '8px 0 4px' }}>3</div>
                  <div style={{ fontSize: '0.75rem', color: '#75ff9e', fontWeight: 600 }}>Top 15%</div>
                </div>

                <div style={{ background: 'rgba(28, 32, 37, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem', fontWeight: 500 }}>
                    <span>Mock Interviews</span>
                    <TrendingUp size={16} color="#75ff9e" />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '8px 0 4px' }}>1</div>
                  <div style={{ fontSize: '0.75rem', color: '#75ff9e', fontWeight: 600 }}>Completed</div>
                </div>
              </div>

              {/* Lower Section: Checklist (Left) & Topic Proficiency (Right) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '14px' }}>
                {/* Daily Preparation Checklist */}
                <div style={{ background: 'rgba(28, 32, 37, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>Daily Preparation Checklist</h3>

                  {/* Task 1 */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'rgba(117,255,158,0.1)', padding: '8px', borderRadius: '8px', color: '#75ff9e' }}>
                        <BrainCircuit size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>Daily DSA: Two Sum (LeetCode)</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Topic: Arrays & Hashing | Difficulty: Easy</div>
                      </div>
                    </div>
                    <button style={{ background: 'transparent', border: '1px solid rgba(117,255,158,0.4)', color: '#75ff9e', borderRadius: '6px', padding: '6px 14px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Solve Now
                    </button>
                  </div>

                  {/* Task 2 */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'rgba(117,255,158,0.1)', padding: '8px', borderRadius: '8px', color: '#75ff9e' }}>
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>Behavioral Question of the Day</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>"Tell me about a time you had a conflict with a teammate."</div>
                      </div>
                    </div>
                    <button style={{ background: 'transparent', border: '1px solid rgba(117,255,158,0.4)', color: '#75ff9e', borderRadius: '6px', padding: '6px 14px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Practice
                    </button>
                  </div>

                  {/* Task 3 */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'rgba(255, 180, 171, 0.1)', padding: '8px', borderRadius: '8px', color: '#ffb4ab' }}>
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>Action Required: Resume Optimization</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Your recent ATS scan found missing keywords for System Design & GraphQL.</div>
                      </div>
                    </div>
                    <button style={{ background: '#75ff9e', border: 'none', color: '#003918', borderRadius: '6px', padding: '6px 14px', fontSize: '0.75rem', fontWeight: 700 }}>
                      Fix Now
                    </button>
                  </div>
                </div>

                {/* Topic Proficiency */}
                <div style={{ background: 'rgba(28, 32, 37, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>Topic Proficiency</h3>

                  {/* Bar 1 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--color-on-surface)' }}>Arrays & Hashing</span>
                      <span style={{ color: '#75ff9e', fontWeight: 600 }}>90%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '90%', height: '100%', background: '#75ff9e', borderRadius: '10px' }}></div>
                    </div>
                  </div>

                  {/* Bar 2 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--color-on-surface)' }}>Two Pointers</span>
                      <span style={{ color: '#75ff9e', fontWeight: 600 }}>75%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '75%', height: '100%', background: '#75ff9e', borderRadius: '10px' }}></div>
                    </div>
                  </div>

                  {/* Bar 3 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--color-on-surface)' }}>Dynamic Programming</span>
                      <span style={{ color: '#ffb4ab', fontWeight: 600 }}>30%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '30%', height: '100%', background: '#ffb4ab', borderRadius: '10px' }}></div>
                    </div>
                  </div>

                  {/* Bar 4 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--color-on-surface)' }}>Graphs</span>
                      <span style={{ color: '#ff9800', fontWeight: 600 }}>45%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '45%', height: '100%', background: '#ff9800', borderRadius: '10px' }}></div>
                    </div>
                  </div>
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
