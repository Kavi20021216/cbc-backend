import express from 'express';
import { createUser, deleteUser, getUser, getUsers, googleLogin, loginUser, resetPassword, sendOTP, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",createUser)
userRouter.get("/",getUser)
userRouter.get("/getusers/:page/:limit",getUsers)
userRouter.post("/login",loginUser)
userRouter.post("/google-login", googleLogin)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password",resetPassword)
userRouter.put("/:email",updateUser)
userRouter.delete("/:email",deleteUser)



export default userRouter;