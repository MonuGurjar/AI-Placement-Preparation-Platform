import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_placement_ai_jwt_key_2026';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    try {
      await connectToDatabase();

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      if (user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          targetCompany: user.targetCompany,
          targetRole: user.targetRole,
          streakDays: user.streakDays,
          atsScore: user.atsScore,
          placementProbability: user.placementProbability,
          solvedDsaIds: user.solvedDsaIds,
          bookmarks: user.bookmarks
        },
        source: 'mongodb'
      });
    } catch (dbErr) {
      console.warn('MongoDB connection unavailable during login, returning session fallback:', dbErr);
      const fallbackToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
      const name = email.split('@')[0];
      return NextResponse.json({
        success: true,
        token: fallbackToken,
        user: {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          targetCompany: 'Google',
          targetRole: 'Software Engineer',
          streakDays: 12,
          atsScore: 85,
          placementProbability: 92
        },
        source: 'fallback',
        notice: 'MongoDB unavailable. Authenticated into local demo session.'
      });
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
