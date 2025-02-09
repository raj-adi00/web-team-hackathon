import mongoose, { Schema, Document } from "mongoose";

export interface IAward extends Document {
  title: string;
  organization: string;
  year: number;
  description?: string;
}

const AwardSchema = new Schema<IAward>({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String },
});

export const Award = mongoose.models.Award || mongoose.model<IAward>("Award", AwardSchema);
