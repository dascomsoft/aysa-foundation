
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';

export async function GET() {
  try {
    await connectDB();
    const announcements = await Announcement.find()
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(50);
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const announcement = await Announcement.create(data);
    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
