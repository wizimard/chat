import multer from 'multer';
// import path from 'path';
import fs from 'fs';
import { v4 as uuid} from 'uuid';

import ApiError from '../exceptions/ApiError';
// import { API_URL, UPLOAD_PATH } from '../constants/env';

const storage = multer.diskStorage({
    destination: function(_req, _file, callback) {
        if (!_req.user) throw ApiError.UnauthorizedError();

        const path = `./public/uploads/${_req.user.id}/${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}/`;

        fs.mkdirSync(path, { recursive: true });

        callback(null, path);
    },
    filename: function(_req, file, callback) {
        if (!_req.user) throw ApiError.UnauthorizedError();

        const filename = `${uuid()}.${file.mimetype.split('/')[1]}`;

        callback(null, filename);

        // const dir = `/uploads/${_req.user.id}/${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}/`;

        // const url = `${API_URL}${dir}${filename}`;
    }
});

export const upload = multer({ 
    storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
});
