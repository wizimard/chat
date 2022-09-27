import { NextFunction, Request, Response } from "express";

import UserService from "../services/UserService";

import ApiError from "../exceptions/ApiError";

class UserController {
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
          throw ApiError.UnauthorizedError();
      }

      const data = await UserService.edit({
          id: user.id,
          ...req.body.data
      });

      return res.status(200).json(data);
    } catch(e) {
      return next(e);
    }
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) throw ApiError.UnauthorizedError();

      const id = req.params.id;

      const data = await UserService.get(user.id, id);

      return res.status(200).json(data);
    } catch(e) {
      return next(e);
    }
  }
  async getFriends(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) throw ApiError.UnauthorizedError();

      const data = await UserService.getFriends(user.id);

      return res.status(200).json(data);
    } catch(e) {
      return next(e);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
          throw ApiError.UnauthorizedError();
      }

      const { searchText, page } = req.body;

      const data = await UserService.find(user.id, searchText, page);

      return res.status(200).json(data);
    } catch(e) {
      return next(e);
    }
  }
  async addFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) throw ApiError.UnauthorizedError();

      const { id } = req.body;

      const data = await UserService.addFriend(user.id, id);

      return res.status(200).json(data);
    } catch(e) {
      return next(e);
    }
  }
  async removeFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) throw ApiError.UnauthorizedError();

      const { id } = req.body;

      const data = await UserService.removeFriend(user.id, id);

      return res.status(200).json(data);
    } catch(e) {
      return next(e);
    }
  }
}

export default new UserController();