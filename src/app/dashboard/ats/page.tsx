"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, FileText, Calendar, Award, ArrowRight } from 'lucide-react';
import { getStoredATSReports, ATSReport } from '@/lib/storage';

export default function ATSReportsPage() {
  const [reports, setReports] = useState<ATSReport[]>([]);

  useEffect(() => {
    setReports(getStoredATSReports());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <BarChart size={28} color="var(--color-primary)" />
            <h1 style={{ fontSize: '1.8rem' }}>ATS Scan History</h1>
          </div>
          <p style={{ color: 'var(--color-on-surface-variant)' }}>
            Review past resume analysis reports, tracked improvements over time, and target role alignments.
          </p>
        </div>
        <Link href="/dashboard/resume">
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> New Resume Scan
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="col-span-6 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{report.role}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', marginTop: '0.2rem' }}>
                    <Calendar size={14} /> {report.date}
                  </div>
                </div>
                <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(117, 255, 158, 0.15)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                  {report.score}%
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', marginBottom: '0.4rem' }}>Strengths Summary</h3>
                <p style={{ fontSize: '0.9rem', color: 'white' }}>{report.strengths[0]}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.9rem', color: '#ffba79', marginBottom: '0.4rem' }}>Missing Keywords</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {report.missingKeywords.map((kw, i) => (
                    <span key={i} style={{ padding: '2px 8px', background: 'rgba(255,186,121,0.1)', border: '1px solid rgba(255,186,121,0.2)', borderRadius: '4px', fontSize: '0.8rem', color: '#ffba79' }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
            No past ATS reports found. Click "New Resume Scan" above to run your first evaluation!
          </div>
        )}
      </div>
    </div>
  );
}
