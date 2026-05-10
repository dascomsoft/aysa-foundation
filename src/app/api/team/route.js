
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET() {
  try {
    await connectDB();
    const members = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const member = await TeamMember.create(data);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
