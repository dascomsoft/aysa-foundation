import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['article', 'event', 'announcement'], 
    default: 'article' 
  },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Forcer l'enregistrement du modèle User avant
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;

