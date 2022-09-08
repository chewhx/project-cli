import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();
const port: number = Number(process.env.PORT) || 8081;

// Pre Middlewares
app.use(cors()); /** Reminder: Set cors to only whitelisted domains */
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', (req: Request, res: Response) => {
	res.send('Hello');
});

// Post Middlewares
app.use(errorHandler);

// Server
app.listen(port, () => {
	console.log(`🚀 Server running on port ${port}`);
});
