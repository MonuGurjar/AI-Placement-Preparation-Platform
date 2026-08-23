import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IATSReport extends Document {
  userId?: string;
  role: string;
  score: number;
  strengths: string[];
  missingKeywords: string[];
  improvements: string[];
  resumeTextSnippet: string;
  createdAt: Date;
}

const ATSReportSchema: Schema = new Schema<IATSReport>({
  userId: { type: String, index: true },
  role: { type: String, required: true },
  score: { type: Number, required: true },
  strengths: { type: [String], default: [] },
  missingKeywords: { type: [String], default: [] },
  improvements: { type: [String], default: [] },
  resumeTextSnippet: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const ATSReportModel: Model<IATSReport> = mongoose.models.ATSReport || mongoose.model<IATSReport>('ATSReport', ATSReportSchema);

export default ATSReportModel;
