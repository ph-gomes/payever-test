import { InternalServerErrorException } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

export const uploadFile = (file: Express.Multer.File) => {
  try {
    const fileName = uuid();
    const filePath = join(__dirname, '..', 'uploads', fileName);
    writeFileSync(filePath, file.buffer);
    return fileName;
  } catch (error) {
    throw new InternalServerErrorException('FILE_UPLOAD_ERROR');
  }
};
