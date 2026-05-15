


import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(100);
    return NextResponse.json(messages.reverse());
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const message = await Message.create({
      sender: data.sender,
      senderId: data.senderId,
      message: data.message,
      createdAt: new Date(),
    });
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
