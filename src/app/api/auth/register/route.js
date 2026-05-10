
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken, ROLES } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    // ==================== VALIDATION ====================
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom doit contenir au moins 2 caractères' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Veuillez fournir un email valide' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // ==================== VÉRIFICATION DOUBLON ====================
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé. Veuillez vous connecter.' },
        { status: 409 }
      );
    }

    // ==================== CRÉATION UTILISATEUR ====================
    // Les nouveaux inscrits deviennent MEMBER (pas VISITOR)
    const hashedPassword = await hashPassword(password);
    
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: ROLES.MEMBER, // ← CORRECTION : MEMBER au lieu de VISITOR
      isActive: true,
      avatar: '',
      lastLogin: new Date(),
    });

    // ==================== GÉNÉRATION TOKEN ====================
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };

    const token = generateToken(tokenPayload, user.role);

    // ==================== RÉPONSE ====================
    const userData = user.toJSON();

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        isActive: userData.isActive,
        createdAt: userData.createdAt,
      },
      message: `Bienvenue ${userData.name} ! Votre compte a été créé avec succès.`,
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Register error:', error);
    
    // Gestion des erreurs Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: messages.join('. ') },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
