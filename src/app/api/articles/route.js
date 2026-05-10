
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET() {
  try {
    await connectDB();
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Ajouter un authorName par défaut si pas d'auteur
    if (!data.author && !data.authorName) {
      data.authorName = 'AYSA Foundation';
    }

    const article = await Article.create(data);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('POST article error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
