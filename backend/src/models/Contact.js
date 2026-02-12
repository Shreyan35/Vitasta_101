import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    firstName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);
