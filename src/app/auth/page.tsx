"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrainCircuit, Mail } from 'lucide-react';
import './auth.css';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication and redirect to dashboard
    router.push('/dashboard');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Optionally update URL without reloading
    const newMode = !isLogin ? 'login' : 'signup';
    router.replace(`/auth?mode=${newMode}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel animate-fade-in-scale">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <BrainCircuit color="var(--color-primary)" />
            <span>PlacementAI</span>
          </Link>
          <h1 className="auth-title">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Enter your details to access your dashboard.' 
              : 'Start your placement preparation journey today.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => { if (!isLogin) toggleMode(); }}
            type="button"
          >
            Login
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => { if (isLogin) toggleMode(); }}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form 
          key={isLogin ? 'login' : 'signup'}
          className="auth-form animate-fade-in-up"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-input" 
                  placeholder="Alex Doe" 
                  required={!isLogin} 
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="alex@example.com" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-input" 
                placeholder="••••••••" 
                required 
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="form-checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
                <Link href="#" className="form-link">Forgot password?</Link>
              </div>
            )}

            <button type="submit" className="btn-primary auth-submit">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
        </form>

        <div>
          <div className="auth-divider">Or continue with</div>
          <div className="social-auth">
            <button className="btn-social" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg> GitHub
            </button>
            <button className="btn-social" type="button">
              <Mail size={20} /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="auth-container">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
