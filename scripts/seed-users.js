

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://dascomsoft_user:dascomsoftaysa@aysa-foundation.bih7gld.mongodb.net/?retryWrites=true&w=majority&appName=aysa-foundation';

const UserSchema = new mongoose.Schema({
  name: String, email: String, password: String, role: String,
  isActive: Boolean, avatar: String, createdAt: Date, updatedAt: Date,
});

const User = mongoose.model('User', UserSchema);

const users = [
  { name: 'Super Admin', email: 'admin@aysafoundation.org', password: 'Admin123!', role: 'SUPER_ADMIN' },
  { name: 'Président AYSA', email: 'president@aysafoundation.org', password: 'President123!', role: 'PRESIDENT' },
  { name: 'Administrateur', email: 'adminuser@aysafoundation.org', password: 'Admin123!', role: 'ADMIN' },
  { name: 'Membre Test', email: 'member@aysafoundation.org', password: 'Member123!', role: 'MEMBER' },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(`⚠️  ${u.email} existe déjà (${exists.role})`);
      } else {
        const hash = await bcrypt.hash(u.password, 12);
        await User.create({ ...u, password: hash, isActive: true, createdAt: new Date(), updatedAt: new Date() });
        console.log(`✅ ${u.email} créé (${u.role})`);
      }
    }

    await mongoose.connection.close();
    console.log('\n✅ Terminé !');
  } catch (err) {
    console.error('❌', err.message);
  }
}

seed();


