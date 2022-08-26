import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    fullname: string;
    password: string;
    username?: string;
    avatar?: string;
    birthday: Date;
    isOnline: boolean;
    isConfirm: boolean;
    confirmLink: string;
}

const User = new mongoose.Schema<IUser>({
    email: {type: String, unique: true, required: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String},
    avatar: {type: String},
    birthday: {type: Date},
    isOnline: {type: Boolean, default: true},
    isConfirm: {type: Boolean, default: false},
    confirmLink: {type: String}
});

export default mongoose.model<IUser>('User', User);