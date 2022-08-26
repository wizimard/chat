import { IUser } from "../models/UserModel";

export default class UserDto {
    id;
    email;
    fullname;
    username;
    avatar;
    birthday;

    constructor(model: IUser) {
        this.id = model._id;
        this.email = model.email;
        this.fullname = model.fullname;
        this.username = model.username;
        this.avatar = model.avatar;
        this.birthday = model.birthday;
    }
}