import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        return NextResponse.json({ success: true, user, source: 'mongodb' });
      }
    } catch (err) {
      console.warn('MongoDB profile fetch error:', err);
    }

    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, targetCompany, targetRole, solvedDsaIds, bookmarks, name } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const updateData: any = {};
      if (name) updateData.name = name;
      if (targetCompany) updateData.targetCompany = targetCompany;
      if (targetRole) updateData.targetRole = targetRole;
      if (solvedDsaIds) updateData.solvedDsaIds = solvedDsaIds;
      if (bookmarks) updateData.bookmarks = bookmarks;

      const user = await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $set: updateData },
        { new: true }
      );

      if (user) {
        return NextResponse.json({ success: true, user, source: 'mongodb' });
      }
    } catch (err) {
      console.warn('MongoDB profile update error:', err);
    }

    return NextResponse.json({ success: false, message: 'Updated in local storage only' });
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
