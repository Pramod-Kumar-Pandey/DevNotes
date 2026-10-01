import express from "express";
import {signupController,loginController,logoutController,getCurrentUser} from "../controllers/authController.js";
import isAuth from "../middlewares/authMiddleware.js";

const authRouter=express.Router();

authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);
authRouter.post("/logout",logoutController);
authRouter.get("/me",isAuth,getCurrentUser);

export default authRouter;