import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  title: string;
  description: string;
  technologies?: string[]; // Optional: List of technologies/tools used
  collaborators?: string[]; // Optional: Names/emails of collaborators
  startDate: Date;
  endDate?: Date; // Optional: If ongoing, this field can be omitted
  link?: string; // Optional: Project website, research paper, or GitHub link
  imageUrl?: string; // Optional: Thumbnail or image for the project
  category?: string; // Optional: Research, Industry, Personal, etc.
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    collaborators: { type: [String], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    link: { type: String },
    imageUrl: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
