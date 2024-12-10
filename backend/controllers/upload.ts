import * as fs from 'fs';
import { finished } from 'stream/promises';
import { Readable } from 'stream';
import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import Metadata from '../models/Metadata';

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

    const filepath = `tmp/uploads/${
      Date.now() + '-' + req?.file?.originalname
    }`;
    try {
      const dest = fs.createWriteStream(filepath);
      const readable = Readable.from(req?.file?.buffer);
      readable.pipe(dest);

      await finished(dest);

      console.log(`upload of file ${req.file.originalname} completed`);
    } catch (err) {
      console.error('Error streaming file:', err);
      res.status(500).json({ error: 'Error streaming file' });
    }

    const startDateTimeObj = new Date(Number(startDateTime));
    try {
      // Save metadata to database
      await Metadata.create({
        title,
        postalCode,
        startDateTime: startDateTimeObj,
        filePath: filepath,
      });

      res.status(200).json({
        message: 'Upload successful!',
      });
    } catch (err) {
      console.error('Error saving metadata:', err);
      res.status(500).json({ error: 'Failed to save metadata.' });
    }
  }
);

export default uploadRouter;
