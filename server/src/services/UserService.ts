import ApiError from "../exceptions/ApiError";
import UserModel from "../models/UserModel";

import { UserShortDto, UserDto } from '../dtos/UserDto';
import FileService from "./FileService";

class UserService {
  async edit(data: {
    id: string;
    name: string;
    email: string;
    username?: string;
    avatar?: string;
    bio: string;
    links: string[];
  }) {
    const user = await UserModel.findById(data.id);

    if (!user) {
        throw ApiError.BadRequest('User not found');
    }

    if (data.username) {
        const candidate = await UserModel.findOne({username: data.username});

        if (candidate && String(candidate._id) !== String(user._id)) {
            throw ApiError.BadRequest('Username is busy!');
        }
    }

    const isChangedEmail = data.email === user.email ? false : true;

    user.name = data.name;
    user.email = data.email;
    user.username = data.username;
    user.avatar = data.avatar;
    user.bio = data.bio;
    user.links = data.links;

    await user.save();

    return isChangedEmail ? 'You changed your email.' : true;;
  }
  async getAvatar(fileId: string | undefined) {
    if (!fileId) return undefined;

    return await FileService.getFile(fileId);
  }
  async get(myId: string, userId: string) {
    const user = await UserModel.findById(myId);
    const getUser = await UserModel.findById(userId);

    if (!user || !getUser) throw ApiError.NotFound();

    const avatar = await this.getAvatar(getUser.avatar);

    const userDto = new UserDto(getUser, avatar);

    return {
      ...userDto,
      isFriend: user.friends.includes(getUser._id),
      isOnline: getUser.isOnline
    }
  }
  async getFriends(id: string) {
    const user = await UserModel.findById(id);

    if (!user) throw ApiError.BadRequest('User not found');

    const friends = await Promise.all(user.friends.map(async(id) => {
      const friend = await UserModel.findById(id);
      if (!friend) return;

      const avatar = await this.getAvatar(friend.avatar);

      return new UserShortDto(friend, avatar);
    }));

    return friends;
  }
  async find(id: string, findText: string, page: number) {
    if (!findText) throw ApiError.BadRequest('Search text must not be empty');
    
    const user = await UserModel.findById(id);

    if (!user) throw ApiError.BadRequest("User not found");

    const findParam: {
      username?: { $regex: string, $options: string };
      name?: { $regex: string, $options: string };
    } = {}

    const sortParam: {
      name?: number,
      username?: number
    } = {};

    if (findText.startsWith('@')) {
      findParam.username = { $regex: findText, $options: 'i' };
      sortParam.username = 1;
    } else {
      findParam.name = { $regex: findText, $options: 'i' };
      sortParam.name = 1;
    }

    const users = await UserModel.find({
      _id: { $ne: user._id, $nin: user.friends },
      ...findParam
    }, null, {
      sort: { ...sortParam },
      limit: 10,
      skip: 10 * page
    });

    const usersDto: UserShortDto[] = []

    for (const user of users) {
      const avatar = await this.getAvatar(user.avatar);

      usersDto.push(new UserShortDto(user, avatar));
    }

    return usersDto;
  }
  async addFriend(userId: string, friendId: string) {
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!user || !friend) throw ApiError.BadRequest("User not found");

    if (user.friends.includes(friendId)) {
      throw ApiError.BadRequest('User is already your friend');
    }

    user.friends.push(friend._id);

    await user.save();

    return true;
  }
  async removeFriend(userId: string, friendId: string) {
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!user || !friend) throw ApiError.BadRequest("User not found");

    if (!user.friends.includes(friendId)) {
      throw ApiError.BadRequest('User is not your friend');
    }

    user.friends = user.friends.filter(id => id !== friendId);

    await user.save();

    return true;
  }
}

export default new UserService();