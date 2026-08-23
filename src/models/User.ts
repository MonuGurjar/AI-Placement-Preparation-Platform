import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  targetCompany: string;
  targetRole: string;
  streakDays: number;
  atsScore: number;
  placementProbability: number;
  solvedDsaIds: string[];
  bookmarks: string[];
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  targetCompany: { type: String, default: 'Google' },
  targetRole: { type: String, default: 'Software Engineer' },
  streakDays: { type: Number, default: 12 },
  atsScore: { type: Number, default: 85 },
  placementProbability: { type: Number, default: 92 },
  solvedDsaIds: { type: [String], default: ['1', '2', '5'] },
  bookmarks: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
