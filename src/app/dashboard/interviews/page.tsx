"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Award, 
  Send, 
  RefreshCw, 
  PlayCircle, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { 
  getStoredProfile, 
  getStoredMockInterviews, 
  saveStoredMockInterviews, 
  MockInterviewResult 
} from '@/lib/storage';

export default function InterviewQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [history, setHistory] = useState<MockInterviewResult[]>([]);
  const [company, setCompany] = useState('Google');
  const [role, setRole] = useState('Software Engineer');

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'questions', company, role })
      });
      const data = await res.json();
      if (data.success && data.questions) {
        setQuestions(data.questions);
        setActiveQuestionIndex(0);
        setUserAnswer('');
        setCurrentEvaluation(null);
      }
    } catch (err) {
      console.error('Failed to fetch interview questions:', err);
    }
  };

  useEffect(() => {
    const profile = getStoredProfile();
    if (profile.targetCompany) setCompany(profile.targetCompany);
    if (profile.targetRole) setRole(profile.targetRole);

    setHistory(getStoredMockInterviews());
    fetchQuestions();
  }, []);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !questions[activeQuestionIndex]) return;

    setEvaluating(true);
    const activeQ = questions[activeQuestionIndex];

    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          question: activeQ.question,
          answer: userAnswer,
          company,
          role
        })
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setCurrentEvaluation(data.evaluation);

        const newResult: MockInterviewResult = {
          id: `mock-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          company,
          role,
          overallScore: data.evaluation.overallScore,
          technicalScore: data.evaluation.technicalScore,
          communicationScore: data.evaluation.communicationScore,
          feedback: data.evaluation.feedback
        };

        const nextHist = [newResult, ...history];
        setHistory(nextHist);
        saveStoredMockInterviews(nextHist);
      }
    } catch (err) {
      console.error('Error evaluating answer:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const activeQuestion = questions[activeQuestionIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <MessageSquare size={28} color="var(--color-primary)" />
            <h1 style={{ fontSize: '1.8rem' }}>AI Mock Interview & Practice</h1>
          </div>
          <p style={{ color: 'var(--color-on-surface-variant)' }}>
            Simulate technical and behavioral interviews tailored for <strong>{company} ({role})</strong> with real-time AI feedback.
          </p>
        </div>
        <button 
          onClick={fetchQuestions}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <RefreshCw size={16} /> Load New Questions
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {/* Main Practice Simulator */}
        <div className="col-span-8 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Question Selector Header */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.8rem' }}>
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveQuestionIndex(idx); setCurrentEvaluation(null); setUserAnswer(''); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: activeQuestionIndex === idx ? '1px solid var(--color-primary)' : 'none',
                  background: activeQuestionIndex === idx ? 'rgba(117,255,158,0.15)' : 'rgba(255,255,255,0.03)',
                  color: activeQuestionIndex === idx ? 'var(--color-primary)' : 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>

          {activeQuestion ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,186,121,0.15)', color: '#ffba79', fontSize: '0.8rem', fontWeight: 600 }}>
                  {activeQuestion.type} • {activeQuestion.topic}
                </span>
              </div>

              <h2 style={{ fontSize: '1.25rem', lineHeight: 1.4 }}>{activeQuestion.question}</h2>

              {activeQuestion.hint && (
                <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid #ffba79', borderRadius: '4px', fontSize: '0.88rem', color: 'var(--color-on-surface-variant)' }}>
                  💡 <strong>Hint:</strong> {activeQuestion.hint}
                </div>
              )}

              <form onSubmit={handleSubmitAnswer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                  Your Response (Type your structured answer below):
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Explain your approach, code design, or behavioral situation (STAR method)..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={evaluating}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', alignSelf: 'flex-end' }}
                >
                  {evaluating ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} /> Evaluating...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Answer for AI Feedback
                    </>
                  )}
                </button>
              </form>

              {/* Evaluation Output */}
              {currentEvaluation && (
                <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(117,255,158,0.05)', border: '1px solid rgba(117,255,158,0.2)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>AI Feedback & Ratings</h3>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {currentEvaluation.overallScore}/100 Overall
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>Technical Accuracy</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>{currentEvaluation.technicalScore}%</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>Communication & Structure</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>{currentEvaluation.communicationScore}%</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-on-surface)', lineHeight: 1.5 }}>
                    {currentEvaluation.feedback}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Practice History */}
        <div className="col-span-4 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Recent Interview Scores</h2>
          {history.length > 0 ? (
            history.map((item) => (
              <div key={item.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.company} ({item.role})</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{item.overallScore}%</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                  {item.date} • Tech: {item.technicalScore}% | Comm: {item.communicationScore}%
                </p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
              No mock interview history recorded yet. Practice above to save evaluations!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
