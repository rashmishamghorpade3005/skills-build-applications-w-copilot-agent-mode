import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  focusArea: string;
  durationMinutes: number;
  exercises: string[];
  difficulty: string;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  focusArea: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
  difficulty: { type: String, required: true }
});

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
