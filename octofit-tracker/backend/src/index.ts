import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API is running.' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});

export default app;
