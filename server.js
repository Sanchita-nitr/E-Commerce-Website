import morgan from 'morgan';

//  const express = require('express')
//  const colors = require('colors')
import express  from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouts from './routs/authRoute.js'
import cors from 'cors'

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouts )
const port = process.env.port || 8080

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app ${process.env.DEV_MODE} listening on port ${port}!`.bgGreen.blue))