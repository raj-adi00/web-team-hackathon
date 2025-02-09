import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  yearOfCompletion: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, required: false, trim: true },
    institution: { type: String, required: true, trim: true },
    yearOfCompletion: { type: Number, required: true },
  },
  { timestamps: true }
);

const Education = mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);

export default Education;
