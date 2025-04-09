import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productsRoute from './routers/products.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Allows us to accept JSON data in the req.body.
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();
