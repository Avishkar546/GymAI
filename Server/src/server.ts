import app from './app.js';
import { configDotenv } from 'dotenv';

configDotenv();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});