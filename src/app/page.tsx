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
  X
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
          style={{ animationDelay: '0.4s' }}
        >
          {/* Mockup Placeholder */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '200px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}></div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
              <div style={{ width: '250px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}></div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '12px', display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', padding: '1rem' }}>
                <div style={{ background: 'rgba(117, 255, 158, 0.05)', borderRadius: '8px', border: '1px solid rgba(117, 255, 158, 0.2)' }}></div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}></div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}></div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}></div>
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
