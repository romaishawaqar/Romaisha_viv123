import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
});

export default mongoose.model('Course', courseSchema);

