import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import profileRouter from './routes/profile.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.use("/api/profile", profileRouter);

export default app;