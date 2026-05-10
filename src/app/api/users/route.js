
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth, requireRole, ROLES } from '@/lib/auth';

// GET - Liste des utilisateurs (ADMIN+)
export async function GET(request) {
  try {
    await connectDB();
    const user = requireRole(request, [ROLES.SUPER_ADMIN, ROLES.PRESIDENT, ROLES.ADMIN]);
    
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('Access denied') ? 403 : 500 }
    );
  }
}

// PATCH - Modifier le rôle d'un utilisateur (SUPER_ADMIN seulement)
export async function PATCH(request) {
  try {
    await connectDB();
    const admin = requireRole(request, [ROLES.SUPER_ADMIN]);
    
    const { userId, newRole } = await request.json();

    if (![ROLES.SUPER_ADMIN, ROLES.PRESIDENT, ROLES.ADMIN, ROLES.MEMBER, ROLES.VISITOR].includes(newRole)) {
      return NextResponse.json(
        { error: 'Rôle invalide' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
