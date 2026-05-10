const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://dascomsoft_user:dascomsoftaysa@aysa-foundation.bih7gld.mongodb.net/?retryWrites=true&w=majority&appName=aysa-foundation';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
});

const User = mongoose.model('User', UserSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const admin = await User.findOne({ email: 'admin@aysafoundation.org' });
    
    if (!admin) {
      console.log('❌ Aucun admin trouvé !');
      await mongoose.connection.close();
      return;
    }

    console.log('📋 Infos Admin :');
    console.log('   Nom    :', admin.name);
    console.log('   Email  :', admin.email);
    console.log('   Rôle   :', admin.role);
    console.log('   Actif  :', admin.isActive);
    console.log('   Pass   :', admin.password.substring(0, 20) + '...\n');

    // Tester le mot de passe
    const testPassword = 'Admin123!';
    const isValid = await bcrypt.compare(testPassword, admin.password);
    
    if (isValid) {
      console.log('✅ Mot de passe "Admin123!" est CORRECT');
    } else {
      console.log('❌ Mot de passe "Admin123!" est INCORRECT');
      console.log('   → Mise à jour du mot de passe...');
      
      const newHash = await bcrypt.hash('Admin123!', 12);
      admin.password = newHash;
      await admin.save();
      console.log('✅ Mot de passe mis à jour avec succès !');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Erreur :', error.message);
  }
}

check();
