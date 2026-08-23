import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { connectToDatabase } from '@/lib/mongodb';
import MockInterviewModel from '@/models/MockInterview';

export async function POST(req: Request) {
  try {
    const { action, question, answer, company, role, userId } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (action === 'evaluate') {
      if (!question || !answer) {
        return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
      }

      let evaluation: any = null;
      let source = 'fallback';

      if (apiKey && apiKey !== 'your_gemini_api_key_here') {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are a Senior Tech Lead interviewing a candidate for a ${role || 'Software Engineer'} position at ${company || 'Google'}.
Evaluate candidate's answer to the question:
Question: "${question}"
Answer: "${answer}"

Return ONLY a valid JSON object with the exact keys:
{
  "overallScore": <number 0-100>,
  "technicalScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "feedback": "<detailed constructive feedback on time/space complexity, clarity, structural STAR technique, and areas to improve>"
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });

          const textResponse = response.text || '';
          const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            evaluation = JSON.parse(jsonMatch[0]);
            source = 'gemini';
          }
        } catch (err) {
          console.warn('Gemini evaluation failed, using fallback:', err);
        }
      }

      if (!evaluation) {
        // Fallback evaluation
        const lengthBonus = Math.min(30, Math.floor(answer.length / 10));
        const hasKeywords = ['complexity', 'time', 'space', 'O(n)', 'O(1)', 'tradeoff', 'scale', 'edge case'].some(w => answer.toLowerCase().includes(w));
        const techScore = Math.min(95, 60 + lengthBonus + (hasKeywords ? 10 : 0));
        const commScore = Math.min(95, 65 + Math.min(25, Math.floor(answer.length / 15)));
        const overall = Math.round((techScore + commScore) / 2);

        evaluation = {
          overallScore: overall,
          technicalScore: techScore,
          communicationScore: commScore,
          feedback: `Good structured response! ${hasKeywords ? 'Great mention of technical trade-offs and complexity.' : 'Consider explicitly mentioning time/space complexity and edge case handling.'} Elaborate slightly more on practical experience.`
        };
      }

      // Persist into MongoDB if available
      try {
        await connectToDatabase();
        await MockInterviewModel.create({
          userId,
          company: company || 'Google',
          role: role || 'Software Engineer',
          overallScore: evaluation.overallScore,
          technicalScore: evaluation.technicalScore,
          communicationScore: evaluation.communicationScore,
          feedback: evaluation.feedback
        });
      } catch (dbErr) {
        console.warn('MongoDB mock interview insert bypassed:', dbErr);
      }

      return NextResponse.json({
        success: true,
        evaluation,
        source
      });
    }

    // Default action: Generate dynamic interview questions
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Generate 3 high-frequency technical and behavioral interview questions asked at ${company || 'Google'} for a ${role || 'Software Engineer'} position.
Return ONLY a valid JSON array of objects with keys: "id", "type" ("Technical" or "Behavioral"), "topic", "question", "hint".`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const textResponse = response.text || '';
        const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, questions: parsed, source: 'gemini' });
        }
      } catch (err) {
        console.warn('Gemini question generation failed, using default:', err);
      }
    }

    return NextResponse.json({
      success: true,
      questions: [
        { id: 'q1', type: 'Technical', topic: 'Data Structures', question: `How would you design an LRU Cache with O(1) time complexity for get and put operations?`, hint: 'Think about combining a Doubly Linked List with a Hash Map.' },
        { id: 'q2', type: 'Behavioral', topic: 'Conflict Resolution', question: `Tell me about a time you disagreed with a technical decision made by a peer or manager. How did you resolve it?`, hint: 'Use the STAR method (Situation, Task, Action, Result) focusing on objective data and collaboration.' },
        { id: 'q3', type: 'Technical', topic: 'System Design', question: `How would you design a scalable rate limiter for an API endpoint handling 100k requests/second?`, hint: 'Consider algorithms like Token Bucket, Leaky Bucket, or Fixed/Sliding Window Counter using Redis.' }
      ],
      source: 'fallback'
    });

  } catch (error) {
    console.error('Mock interview API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
