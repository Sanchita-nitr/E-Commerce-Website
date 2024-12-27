
import express from 'express';
import { loginController, registerController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/register', registerController);

// Login route
router.post('/login', loginController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController)
export default router;
