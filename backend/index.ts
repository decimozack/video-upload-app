import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import uploadRouter from './controllers/upload';
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/upload', uploadRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server starting at http://localhost:${port}`);
});
