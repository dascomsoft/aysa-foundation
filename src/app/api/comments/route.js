
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import User from '@/models/User'; // <-- IMPORTER User pour l'enregistrer

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
      .sort({ createdAt: -1 })
      .lean(); // <-- Évite l'erreur de populate
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('GET comments error:', error.message);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const comment = await Comment.create({
      type: data.type || 'article',
      parentId: data.parentId,
      userId: data.userId || null,
      message: data.message,
    });
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('POST comment error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
