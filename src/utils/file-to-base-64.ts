import { NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export const fileToBase64 = (hash: string) => {
  try {
    const filePath = join(__dirname, '..', 'uploads', hash);
    const file = readFileSync(filePath);
    return file.toString('base64');
  } catch (error) {
    throw new NotFoundException('FILE_NOT_FOUND');
  }
};
