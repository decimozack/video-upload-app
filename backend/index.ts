import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import uploadRouter from './controllers/upload';
import cors from 'cors';
import sequelize from './db';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const initialiseDb = async () => {
  try {
    await sequelize.authenticate(); // Test connection
    console.log('Database connected!');

    await sequelize.sync({ force: true }); // Sync models with database
    console.log('Database synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initialiseDb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/upload', uploadRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server starting at http://localhost:${port}`);
});
