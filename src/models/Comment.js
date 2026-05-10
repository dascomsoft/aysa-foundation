
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  type: { type: String, enum: ['article', 'event', 'announcement'], default: 'article' },
  parentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;
