
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  content: {
    fr: { type: String, required: true },
    en: { type: String, default: '' },
  },
  image: {
    type: String,
    default: '',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  authorName: {
    type: String,
    default: 'AYSA Foundation',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;
