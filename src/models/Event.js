
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    fr: { type: String, required: true },
    en: { type: String, default: '' },
  },
  date: {
    type: Date,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  images: [{
    type: String,
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;
