import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', userAuth, getUserProfile);

export default userRouter;