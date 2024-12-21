import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import validateRequest from "../../middleware/validateRequest";
import { createBlogController } from "./blog.controller";
import { blogValidationSchema } from "./blog.validation";

const blogRouter = Router();

blogRouter.get("/", (req, res) => {
  res.send("Blog route");
});

blogRouter.post(
  "/",
  auth,
  authorize(["user"]),
  validateRequest(blogValidationSchema),
  createBlogController
);

export default blogRouter;
