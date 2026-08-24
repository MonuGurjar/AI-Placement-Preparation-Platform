import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { connectToDatabase } from '@/lib/mongodb';
import ATSReportModel from '@/models/ATSReport';
import mammoth from 'mammoth';

export async function POST(req: Request) {
  try {
    let resumeText = '';
    let targetRole = 'Software Engineer';
    let userId = '';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      targetRole = (formData.get('targetRole') as string) || 'Software Engineer';
      userId = (formData.get('userId') as string) || '';

      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.pdf')) {
        try {
          // Dynamically load pdf-parse on demand to avoid top-level canvas DOMMatrix SSR issues
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const pdfParse = require('pdf-parse');
          const pdfData = await pdfParse(buffer);
          resumeText = pdfData.text || '';
        } catch (pdfErr) {
          console.warn('PDF parse error, falling back to raw buffer string:', pdfErr);
          resumeText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        }
      } else if (fileName.endsWith('.docx')) {
        try {
          const docxData = await mammoth.extractRawText({ buffer });
          resumeText = docxData.value || '';
        } catch (docxErr) {
          console.warn('DOCX parse error:', docxErr);
          resumeText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        }
      } else {
        resumeText = buffer.toString('utf-8');
      }
    } else {
      const body = await req.json();
      resumeText = body.resumeText || '';
      targetRole = body.targetRole || 'Software Engineer';
      userId = body.userId || '';
    }

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return NextResponse.json({ error: 'Failed to extract text from resume. Please ensure the file is not password protected.' }, { status: 400 });
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
      extractedSnippet: resumeText.slice(0, 300) + '...',
      notice: apiKey === 'your_gemini_api_key_here' ? 'Using fallback ATS scanner. Replace GEMINI_API_KEY in .env.local for live Gemini AI evaluation.' : undefined
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
