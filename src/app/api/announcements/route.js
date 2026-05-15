
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Announcement from '@/models/Announcement';

// export async function GET() {
//   try {
//     await connectDB();
//     const announcements = await Announcement.find()
//       .sort({ isPinned: -1, createdAt: -1 })
//       .limit(50);
//     return NextResponse.json(announcements);
//   } catch (error) {
//     return NextResponse.json([], { status: 200 });
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();
//     const data = await request.json();
//     const announcement = await Announcement.create(data);
//     return NextResponse.json(announcement, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }












import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';

export async function GET() {
  try {
    await connectDB();
    const announcements = await Announcement.find()
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(50);
    
    console.log('📋 Announcements found:', announcements.length);
    if (announcements.length > 0) {
      console.log('📷 First announcement image:', announcements[0].image);
    }
    
    return NextResponse.json(announcements);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    console.log('📥 Received data keys:', Object.keys(data));
    console.log('📷 Image value:', data.image);
    
    // Forcer l'image
    const payload = {
      title: data.title,
      content: data.content,
      type: data.type || 'general',
      isPinned: data.isPinned || false,
      image: data.image || '',
      createdAt: data.createdAt || new Date(),
    };
    
    console.log('💾 Saving payload:', JSON.stringify(payload).substring(0, 200));
    
    const announcement = await Announcement.create(payload);
    console.log('✅ Saved! Image in DB:', announcement.image);
    
    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error('❌ POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
