"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrainCircuit, Mail } from 'lucide-react';
import { getStoredProfile, saveStoredProfile } from '@/lib/storage';
import './auth.css';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.user) {
        const currentProfile = getStoredProfile();
        saveStoredProfile({
          ...currentProfile,
          name: data.user.name || name || 'Alex Doe',
          email: data.user.email || email || 'alex@example.com',
          targetCompany: data.user.targetCompany || currentProfile.targetCompany,
          targetRole: data.user.targetRole || currentProfile.targetRole,
        });
        localStorage.setItem('placement_logged_in', 'true');
        localStorage.setItem('token', data.token || 'auth-session-token');
        localStorage.setItem('placement_auth_token', data.token || 'auth-session-token');
      }
    } catch (err) {
      console.warn('Auth API fallback:', err);
      const currentProfile = getStoredProfile();
      saveStoredProfile({
        ...currentProfile,
        name: name.trim() || currentProfile.name || (email ? email.split('@')[0] : 'Alex Doe'),
        email: email.trim() || currentProfile.email || 'alex@example.com'
      });
      localStorage.setItem('placement_logged_in', 'true');
      localStorage.setItem('token', 'auth-session-token');
    } finally {
      router.push('/dashboard');
    }
  };

  const handleSocialAuth = (providerName: string) => {
    const currentProfile = getStoredProfile();
    const updatedProfile = {
      ...currentProfile,
      name: `${providerName} User`,
      email: `user@${providerName.toLowerCase()}.com`
    };
    saveStoredProfile(updatedProfile);
    localStorage.setItem('placement_logged_in', 'true');
    localStorage.setItem('token', 'social-auth-token');
    router.push('/dashboard');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="form-checkbox">
                  <input type="checkbox" defaultChecked />
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
            <button className="btn-social" type="button" onClick={() => handleSocialAuth('GitHub')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg> GitHub
            </button>
            <button className="btn-social" type="button" onClick={() => handleSocialAuth('Google')}>
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
