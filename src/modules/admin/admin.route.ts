import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import {
  admindeleteBlogController,
  blockUserController,
} from "./admin.controller";

const adminRouter = Router();

adminRouter.patch(
  "/users/:userId/block",
  auth,
  authorize(["admin"]),
  blockUserController
);

adminRouter.delete(
  "/blogs/:id",
  auth,
  authorize(["admin"]),
  admindeleteBlogController
);

export default adminRouter;
