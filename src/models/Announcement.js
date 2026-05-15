// import mongoose from 'mongoose';

// const announcementSchema = new mongoose.Schema({
//   title: {
//     fr: { type: String, required: true },
//     en: { type: String, required: true },
//   },
//   content: {
//     fr: { type: String, required: true },
//     en: { type: String, default: '' },
//   },
//   type: {
//     type: String,
//     enum: ['official', 'press', 'urgent', 'general'],
//     default: 'general',
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   isPinned: {
//     type: Boolean,
//     default: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);
// export default Announcement;

















import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['official', 'press', 'urgent', 'general'],
    default: 'general',
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);
export default Announcement;
