import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { companyName } = await req.json();

    if (!companyName) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Provide a comprehensive recruitment preparation guide for ${companyName}.
Return ONLY a valid JSON object with keys:
{
  "company": "${companyName}",
  "overview": "<short summary of company culture and tech stack>",
  "rounds": [<array of string interview round descriptions>],
  "topTopics": [<array of top technical topics to master>],
  "frequentlyAskedQuestions": [<array of 4 representative DSA or system design questions>],
  "tips": [<array of 3 expert preparation tips>]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, guide: parsed, source: 'gemini' });
        }
      } catch (err) {
        console.warn('Gemini company prep guide generation failed, using fallback:', err);
      }
    }

    // Default curated fallback guides
    const fallbackMap: Record<string, any> = {
      Google: {
        company: 'Google',
        overview: 'Focuses heavily on clean code, optimal time/space complexity, scalability, and Google leadership principles (Googliness).',
        rounds: [
          'Online Assessment (2 Coding Problems, 60-90 mins)',
          'Technical Phone Screen (1-2 Coding Problems, 45 mins)',
          'Onsite / Virtual Loop (3 Coding Rounds + 1 System Design + 1 Googliness & Leadership)'
        ],
        topTopics: ['Graphs (BFS/DFS, Dijkstra)', 'Dynamic Programming', 'Trees & Tries', 'System Design'],
        frequentlyAskedQuestions: [
          'Word Ladder / Shortest Path in Graph',
          'Course Schedule (Topological Sort)',
          'Serialize and Deserialize Binary Tree',
          'Design Google Drive / File System'
        ],
        tips: [
          'Always think out loud and state constraints before coding.',
          'Analyze space and time complexity using Big-O notation explicitly.',
          'Test edge cases (empty input, nulls, negative numbers) systematically.'
        ]
      },
      Amazon: {
        company: 'Amazon',
        overview: 'Famous for strict adherence to the 16 Leadership Principles alongside technical competency in Data Structures and System Design.',
        rounds: [
          'Online Assessment (2 Coding Problems + Work Simulation + Personality Assessment)',
          'Technical Phone Screen (45-60 mins coding + LP discussion)',
          'Onsite Loop (4 Rounds: 3 Technical + 1 Bar Raiser, all featuring LP questions)'
        ],
        topTopics: ['Arrays & Hash Maps', 'Trees & Binary Search', 'Object-Oriented Design', 'Leadership Principles (STAR method)'],
        frequentlyAskedQuestions: [
          'Two Sum / Top K Frequent Elements',
          'LRU Cache Implementation',
          'Design Amazon Shopping Cart (OOD)',
          'Tell me about a time you took ownership of a failed project.'
        ],
        tips: [
          'Prepare at least two detailed STAR stories for every Leadership Principle.',
          'Emphasize customer obsession and bias for action in your answers.',
          'Write modular, clean code during live coding.'
        ]
      }
    };

    const guide = fallbackMap[companyName] || {
      company: companyName,
      overview: `${companyName} conducts comprehensive technical and behavioral evaluations focusing on problem solving, computer science fundamentals, and team fit.`,
      rounds: [
        'Aptitude & Technical Online Assessment',
        'Technical Interview Round 1 (Data Structures & Algorithms)',
        'Technical Interview Round 2 (System Design / Core CS)',
        'HR / Managerial Behavioral Round'
      ],
      topTopics: ['Arrays & Strings', 'Trees & Graphs', 'SQL & Database Design', 'Object-Oriented Programming'],
      frequentlyAskedQuestions: [
        'Reverse a Linked List',
        'Validate Binary Search Tree',
        'Find duplicate numbers in array',
        'Explain ACID properties and Indexing in SQL'
      ],
      tips: [
        'Master basic data structures and write bug-free code quickly.',
        'Review core CS fundamentals: OS, DBMS, Computer Networks.',
        'Research company products and demonstrate enthusiasm during the HR round.'
      ]
    };

    return NextResponse.json({ success: true, guide, source: 'fallback' });

  } catch (error) {
    console.error('Company prep API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
