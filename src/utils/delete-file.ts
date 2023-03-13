import { rmSync } from 'fs';
import { join } from 'path';

export const deleteFile = (hash: string) => {
  try {
    const filePath = join(__dirname, '..', 'uploads', hash);
    rmSync(filePath);
  } catch (error) {}
};
