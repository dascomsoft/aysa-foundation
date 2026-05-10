import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: {
    fr: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  image: { type: String, default: '' },
  email: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
