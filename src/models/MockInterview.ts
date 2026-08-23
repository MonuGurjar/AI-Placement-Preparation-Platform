import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMockInterview extends Document {
  userId?: string;
  company: string;
  role: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  feedback: string;
  createdAt: Date;
}

const MockInterviewSchema: Schema = new Schema<IMockInterview>({
  userId: { type: String, index: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  overallScore: { type: Number, required: true },
  technicalScore: { type: Number, required: true },
  communicationScore: { type: Number, required: true },
  feedback: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const MockInterviewModel: Model<IMockInterview> = mongoose.models.MockInterview || mongoose.model<IMockInterview>('MockInterview', MockInterviewSchema);

export default MockInterviewModel;
