
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const parentId = searchParams.get('parentId');
    
    const query = {};
    if (type) query.type = type;
    if (parentId) query.parentId = parentId;

    const comments = await Comment.find(query)
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const comment = await Comment.create(data);
    const populated = await comment.populate('userId', 'name avatar');
    return NextResponse.json(populated, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
