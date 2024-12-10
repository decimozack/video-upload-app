import * as fs from 'fs';
import { finished } from 'stream/promises';
import { Readable } from 'stream';
import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/webm' ||
      file.mimetype === 'video/quicktime'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

uploadRouter.post(
  '/',
  upload.single('video'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, startDateTime, postalCode } = req.body;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded.' });
      return;
    }

    if (!title || !startDateTime) {
      res.status(400).json({ error: 'Missing required fields.' });
      return;
    }

    try {
      const filename = `tmp/uploads/${
        Date.now() + '-' + req?.file?.originalname
      }`;

      const dest = fs.createWriteStream(filename);
      const readable = Readable.from(req?.file?.buffer);
      readable.pipe(dest);

      await finished(dest);
      //TODO: Save metadata and file info to the database here...
      console.log('upload done');
      res.status(200).json({ message: 'Upload successful!' });
    } catch (err) {
      console.error('Error streaming file:', err);
      res.status(500).json({ error: 'Error streaming file' });
    }
  }
);

export default uploadRouter;
