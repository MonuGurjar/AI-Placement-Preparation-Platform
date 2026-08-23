import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { connectToDatabase } from '@/lib/mongodb';
import ATSReportModel from '@/models/ATSReport';

export async function POST(req: Request) {
  try {
    const { resumeText, targetRole, userId } = await req.json();

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    let report: any = null;
    let source = 'fallback';

    // Check if valid Gemini API key is provided
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are an expert ATS (Applicant Tracking System) & Tech Resume Evaluator.
Analyze the following candidate resume for the target role: "${targetRole || 'Software Engineer'}".

Resume Text:
"""
${resumeText}
"""

Return your evaluation ONLY as a valid JSON object with the following exact keys:
{
  "score": <number between 0 and 100>,
  "strengths": [<array of string strengths>],
  "missingKeywords": [<array of key missing technical/domain skills or ATS keywords>],
  "improvements": [<array of actionable advice to improve bullet points, formatting, or metrics>]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const textResponse = response.text || '';
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          report = JSON.parse(jsonMatch[0]);
          source = 'gemini';
        }
      } catch (aiErr) {
        console.warn('Gemini API call failed or misconfigured, falling back to smart analysis:', aiErr);
      }
    }

    if (!report) {
      // Fallback Smart Heuristic Analysis
      const lowerText = resumeText.toLowerCase();
      const desiredRole = (targetRole || 'Software Engineer').toLowerCase();

      const techKeywords = ['react', 'next.js', 'typescript', 'node.js', 'python', 'java', 'sql', 'dsa', 'aws', 'docker', 'system design', 'rest api', 'git', 'ci/cd', 'graphql'];
      const foundKeywords = techKeywords.filter(k => lowerText.includes(k));
      const missing = techKeywords.filter(k => !lowerText.includes(k)).slice(0, 4);

      let calculatedScore = Math.min(95, Math.max(50, Math.floor(foundKeywords.length * 6 + (resumeText.length > 500 ? 25 : 10))));
      if (desiredRole.includes('full stack') || desiredRole.includes('software')) {
        calculatedScore = Math.min(98, calculatedScore + 5);
      }

      report = {
        score: calculatedScore,
        strengths: [
          `Good technical coverage detected: ${foundKeywords.slice(0, 4).join(', ') || 'Core CS fundamentals'}.`,
          resumeText.length > 400 ? 'Comprehensive detail provided in work & project descriptions.' : 'Concise section layout.',
          'Clear educational and skill section formatting.'
        ],
        missingKeywords: missing.length > 0 ? missing : ['System Architecture', 'CI/CD Pipelines', 'Performance Benchmarks'],
        improvements: [
          'Include measurable metrics and impact percentages in project descriptions (e.g. "Improved query performance by 40%").',
          'Highlight experience with system design and database scalability.',
          `Tailor the header summary specifically towards ${targetRole || 'Software Engineer'} roles.`
        ]
      };
    }

    // Persist into MongoDB if database is available
    try {
      await connectToDatabase();
      await ATSReportModel.create({
        userId,
        role: targetRole || 'Software Engineer',
        score: report.score,
        strengths: report.strengths,
        missingKeywords: report.missingKeywords,
        improvements: report.improvements,
        resumeTextSnippet: resumeText.slice(0, 150) + '...'
      });
    } catch (dbErr) {
      console.warn('MongoDB report insert bypassed:', dbErr);
    }

    return NextResponse.json({ 
      success: true, 
      report, 
      source,
      notice: apiKey === 'your_gemini_api_key_here' ? 'Using fallback ATS scanner. Replace GEMINI_API_KEY in .env.local for live Gemini AI evaluation.' : undefined
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
