


// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Comment from '@/models/Comment';

// export async function DELETE(request, { params }) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     await Comment.findByIdAndDelete(id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


















import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    const comment = await Comment.findByIdAndUpdate(id, { message: data.message }, { new: true });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}