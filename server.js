import morgan from 'morgan';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouts from './routs/authRoute.js';
import categoryRoutes from './routs/categoryRoutes.js'; // Correct import
import productRoutes from './routs/productRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRouts);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/products', productRoutes);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${port}!`.bgGreen.blue));
