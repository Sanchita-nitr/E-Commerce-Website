
import express from 'express';
import { forgotpasswordController, loginController, registerController, testController,  updateProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Register route
router.post('/register', registerController);

// Login route
router.post('/login', loginController);

//Forgot Password
router.post('/forgot-password', forgotpasswordController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController)

//protected User Route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
})

//protected Admin Route auth
router.get('/admin-auth', requireSignIn, isAdmin ,(req,res)=>{
    res.status(200).send({ok:true});
})


//update profile
router.put("/update-profile", requireSignIn, updateProfileController);


export default router;

