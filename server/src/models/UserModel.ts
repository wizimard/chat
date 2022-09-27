import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    username: string;
    avatar: string;
    birthday: Date;
    bio: string;
    links: string[];
    friends: string[];
    contacts: { type: 'channel' | 'person', id: string }[];
    isOnline: boolean;
    isConfirm: boolean;
    confirmLink: string;
}

const User = new mongoose.Schema<IUser>({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, default: '' },
    avatar: { type: String, required: true },
    birthday: { type: Date },
    bio: { type: String, default: '' },
    links: { type: [String], default: [] },
    friends: { type: [String], default: [] },
    contacts: { type: [{ type: String, id: String }], default: [] },
    isOnline: { type: Boolean, default: true },
    isConfirm: { type: Boolean, default: false },
    confirmLink: { type: String, required: true }
});

export default mongoose.model<IUser>('User', User);