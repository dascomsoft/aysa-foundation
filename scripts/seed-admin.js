

// Script pour créer le premier SUPER_ADMIN
// Usage: node scripts/seed-admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dascomsoft_user:dascomsoftaysa@aysa-foundation.bih7gld.mongodb.net/?retryWrites=true&w=majority&appName=aysa-foundation';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model('User', UserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@aysafoundation.org' });
    
    if (existingAdmin) {
      console.log('⚠️  Un SUPER_ADMIN existe déjà :', existingAdmin.email);
      await mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin123!', 12);

    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'admin@aysafoundation.org',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ SUPER_ADMIN créé avec succès !');
    console.log('   Email : admin@aysafoundation.org');
    console.log('   Mot de passe : Admin123!');
    console.log('   Rôle : SUPER_ADMIN');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Erreur :', error.message);
  }
}

seed();
