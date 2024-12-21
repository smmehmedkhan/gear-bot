import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productsRoute from './routers/products.router.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // Allows us to accept JSON data in the req.body.
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
