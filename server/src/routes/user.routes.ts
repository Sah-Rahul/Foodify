import express from "express"
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controllers/user.controller"
import { isAuthenticated } from "../middleware/auth.middleware"
 

const userRouter = express.Router()

userRouter.post('/signup', signup)

userRouter.post('/login', login)

userRouter.post('/logout', logout)

userRouter.post('/verify-email', verifyEmail)

userRouter.post('/check-auth', isAuthenticated, checkAuth)

userRouter.post('/forgot-password', forgotPassword)

userRouter.post('/reset-password/:token', resetPassword)

userRouter.put('/update-profile', isAuthenticated, updateProfile)


export default userRouter