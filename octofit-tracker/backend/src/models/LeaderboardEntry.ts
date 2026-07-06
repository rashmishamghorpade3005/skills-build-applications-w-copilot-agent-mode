import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  rank: number;
  points: number;
  weeklyGoalCompletion: number;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  weeklyGoalCompletion: { type: Number, required: true }
});

const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;
