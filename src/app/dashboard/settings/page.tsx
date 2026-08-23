"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Save, Key, User, Building } from 'lucide-react';
import { getStoredProfile, saveStoredProfile, UserProfile, INITIAL_USER_PROFILE } from '@/lib/storage';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Settings size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.8rem' }}>Profile & Target Settings</h1>
        </div>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>
          Manage your personal details, target placement targets, and API integration preferences.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              value={profile.name} 
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={profile.email} 
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Target Company</label>
            <input 
              type="text" 
              value={profile.targetCompany} 
              onChange={(e) => setProfile({ ...profile, targetCompany: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Target Role</label>
            <input 
              type="text" 
              value={profile.targetRole} 
              onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>

          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              <Key size={18} /> Gemini API Integration
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', marginTop: '0.3rem' }}>
              Your Gemini API Key is configured in <code>.env.local</code> as <code>GEMINI_API_KEY</code>. Smart fallbacks are enabled if not set.
            </p>
          </div>

          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            <Save size={16} /> Save Changes
          </button>

          {saved && (
            <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
              ✓ Settings saved successfully!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
