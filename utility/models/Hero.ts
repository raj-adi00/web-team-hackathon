// models/Professor.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  name: string;
  title: string;
  credentials: string;
  department: string;
  university: string;
  specialization: string;
  tagline: string;
  image: string;
  linkedinUrl: string;
}

const HeroSchema = new Schema<IHero>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    credentials: { type: String, required: true },
    department: { type: String, required: true },
    university: { type: String, required: true },
    specialization: { type: String, required: true },
    tagline: { type: String, required: true },
    image: { type: String, required: true },
    linkedinUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Professor ||
  mongoose.model<IHero>("Professor", HeroSchema);
