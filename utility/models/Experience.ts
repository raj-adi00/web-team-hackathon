import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  instituteName: string;
  startDate: { month: string; year: number };
  endDate: { month: string; year: number };
  courses: string[];
  description?: string;
}

const ExperienceSchema = new Schema<IExperience>({
  instituteName: { type: String, required: true },
  startDate: {
    month: { type: String, required: true },
    year: { type: Number, required: true },
  },
  endDate: {
    month: { type: String, required: true },
    year: { type: Number, required: true },
  },
  courses: { type: [String], required: true },
  description: { type: String, required: false },
});

export default mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);
