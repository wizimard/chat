import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid} from 'uuid';

import ApiError from '../exceptions/ApiError';
// import { API_URL, UPLOAD_PATH } from '../constants/env';
import { API_URL } from '../constants/env';
import FileModel from '../models/FileModel';
import FileDto, { FileShortDto } from '../dtos/FileDto';

export const deleteCandidates = new Map<string, Date>();

const multerStorage = multer.diskStorage({
    destination: function(_req, _file, callback) {
        callback(null, "public/uploads/");
    },
    filename: function(req, file, callback) {
        if (!req.user) throw ApiError.UnauthorizedError();

        const filename = `${uuid()}${path.extname(file.originalname)}`;

        const date = new Date();

        const dir = `${req.user.id}/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/`;

        fs.mkdirSync(`public/uploads/${dir}`, { recursive: true });

        callback(null, `${dir}${filename}`);

        const url = `${API_URL}/uploads/${dir}${filename}`;

        deleteCandidates.set(url, new Date());
    }
});

export const UploadFile = multer({ 
    storage: multerStorage
});

class FileService {
    async addFiles(userId:string, files: string[]) {
        const filesShortDto = [];

        for (const file of files) {
            const addedFile = await FileModel.create({
                author: userId,
                date: new Date(),
                url: file
            });
            filesShortDto.push(new FileShortDto(addedFile));
        }
        return filesShortDto;
    }
    async getFile(id: string) {
        const file = await FileModel.findById(id);
        if (!file) throw ApiError.NotFound();

        const fileDto = new FileShortDto(file);

        return fileDto;
    }
    async getFileFull(id: string) {
        const file = await FileModel.findById(id);
        if (!file) throw ApiError.NotFound();

        const fileDto = new FileDto(file);

        return fileDto;
    }
}

export default new FileService();