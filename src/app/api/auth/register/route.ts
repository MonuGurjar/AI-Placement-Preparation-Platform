import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_placement_ai_jwt_key_2026';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    try {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        targetCompany: 'Google',
        targetRole: 'Software Engineer',
        streakDays: 1,
        atsScore: 80,
        placementProbability: 85,
        solvedDsaIds: ['1', '2'],
        bookmarks: []
      });

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, name: newUser.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          targetCompany: newUser.targetCompany,
          targetRole: newUser.targetRole,
          streakDays: newUser.streakDays,
          atsScore: newUser.atsScore,
          placementProbability: newUser.placementProbability
        },
        source: 'mongodb'
      });
    } catch (dbErr) {
      console.warn('MongoDB connection unavailable during register, returning mock fallback:', dbErr);
      const fallbackToken = jwt.sign({ name, email }, JWT_SECRET, { expiresIn: '7d' });
      return NextResponse.json({
        success: true,
        token: fallbackToken,
        user: {
          name,
          email,
          targetCompany: 'Google',
          targetRole: 'Software Engineer',
          streakDays: 1,
          atsScore: 80,
          placementProbability: 85
        },
        source: 'fallback',
        notice: 'MongoDB unavailable. Session stored in local state.'
      });
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
