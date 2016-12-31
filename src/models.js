import mongoose from 'mongoose';
mongoose.connect(process.env.MONGOLAB_URI);

export const History = mongoose.model('History', {
  service: String,
  user: String,
  item: String,
  updateDate: Date
});
