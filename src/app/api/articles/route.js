import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();
    const articles = await Article.find()
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const user = requireAdmin(request);
    
    const data = await request.json();
    const article = await Article.create({
      ...data,
      author: user.userId,
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('required') ? 401 : 500 }
    );
  }
}