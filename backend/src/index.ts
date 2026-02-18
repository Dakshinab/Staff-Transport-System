import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import driversRouter from './routes/drivers';
import adminRouter from './routes/admin';
import adminsRouter from './routes/admins';
import staffRouter from './routes/staff';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/drivers', driversRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/staff', staffRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
