import { IFile } from "../models/FileModel";

export class FileShortDto {
  id: string;
  url: string;

  constructor(model: IFile) {
    this.id = model._id;
    this.url = model.url;
  }
}

class FileDto extends FileShortDto {
  author: string;
  date: Date;

  constructor(model: IFile) {
    super(model);
    this.author = model.author;
    this.date = model.date;
  }
}

export default FileDto;