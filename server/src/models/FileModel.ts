import mongoose from 'mongoose';

export interface IFile extends mongoose.Document {
  author: string;
  date: Date;
  url: string;
}

const File = new mongoose.Schema<IFile>({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  url: { type: String, required: true }
});

export default mongoose.model<IFile>('File', File);