import { IUser } from "../models/UserModel";

export class UserShortDto {
    id;
    name;
    avatar;

    constructor(model: IUser) {
        this.id = model._id;
        this.name = model.name;
        this.avatar = model.avatar;
    }
}

export class UserDto extends UserShortDto {
    email;
    username;
    birthday;
    bio;
    links;

    constructor(model: IUser) {
        super(model);
        this.email = model.email;
        this.username = model.username;
        this.birthday = model.birthday;
        this.bio = model.bio;
        this.links = model.links;
    }
}