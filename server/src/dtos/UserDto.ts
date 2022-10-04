import { IUser } from "../models/UserModel";
import { FileShortDto } from './FileDto';

export class UserShortDto {
    id;
    name;
    avatar;
    isOnline;

    constructor(model: IUser, avatar?: FileShortDto | undefined) {
        this.id = String(model._id);
        this.name = model.name;
        this.avatar = avatar;
        this.isOnline = model.isOnline;
    }
}

export class UserDto extends UserShortDto {
    email;
    username;
    birthday;
    bio;
    links;

    constructor(model: IUser, avatar?: FileShortDto | undefined) {
        super(model, avatar);
        this.email = model.email;
        this.username = model.username ?? this.id;
        this.birthday = model.birthday;
        this.bio = model.bio;
        this.links = model.links;
    }
}