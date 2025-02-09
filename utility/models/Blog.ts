import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  heading: string;
  body: string;
  imageUrl?: string; // Cloudinary image URL (optional)
  videoUrl?: string; // Cloudinary video URL (optional)
}

const BlogSchema = new Schema<IBlog>(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String, default: null },
    videoUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
