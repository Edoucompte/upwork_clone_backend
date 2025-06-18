import { extname } from 'path';

export class FileUtils {
  static filenameCreate = (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname); // Get the original extension
    const filename = `${file.originalname.split('.')[0]}_${uniqueSuffix}${ext}`; // Create a unique filename
    callback(null, filename);
  };

  static fileFilterMaker = (
    req,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // Optional: Implement a file filter for type validation
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx)$/)) {
      return callback(
        new Error('Only image and document files are allowed!'),
        false,
      );
    }
    callback(null, true);
  };
}
