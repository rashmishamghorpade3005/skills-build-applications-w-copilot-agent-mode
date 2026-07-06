import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  user: mongoose.Types.ObjectId;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }
});

const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;
