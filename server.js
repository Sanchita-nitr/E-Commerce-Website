import morgan from 'morgan';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routs/authRoute.js';
import categoryRoutes from './routs/categoryRoutes.js';
import productRoutes from './routs/productRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, './client/build')));

// Fallback route for SPA
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${port}!`.bgGreen.blue);
});
