import { Request, Response, NextFunction } from "express";
import { API_URL } from "../constants/env";
import ApiError from "../exceptions/ApiError";

class FileController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        throw ApiError.UnauthorizedError();
      }
      if (!req.files) {
        throw ApiError.BadRequest('No Files');
      }
      const data = (req.files as Express.Multer.File[]).map((file) => {
        const destination = file.destination.replace('public/', '/');
        return `${API_URL}${destination}${file.filename}`;
      });

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}

export default new FileController();