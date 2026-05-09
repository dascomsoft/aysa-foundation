import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  images: [{
    type: String,
  }],
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);