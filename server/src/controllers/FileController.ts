import { Request, Response, NextFunction } from "express";
import { API_URL } from "../constants/env";
import ApiError from "../exceptions/ApiError";
import FileService from '../services/FileService';

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
      const files = (req.files as Express.Multer.File[]).map((file) => {
        const destination = file.destination.replace('public/', '/');
        return `${API_URL}${destination}${file.filename}`;
      });

      const data = await FileService.addFiles(user.id, files);

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}

export default new FileController();