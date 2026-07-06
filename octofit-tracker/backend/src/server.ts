import app from './index.js';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API is running.', apiUrl });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
  console.log(`API URL configured as ${apiUrl}`);
});
