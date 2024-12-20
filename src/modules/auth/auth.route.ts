import { Router } from "express";
import { createUserController } from "../user/user.controller";

const authRouter = Router();
authRouter.post("/register", createUserController);

export default authRouter;
