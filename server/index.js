import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; // Importing auth routes
import cors from 'cors';



const app = express(); 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Use authentication and event management routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Server started at http://localhost:5000');
      });
  })
  .catch((err) => console.log(err));
