import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import validateRequest from "../../middleware/validateRequest";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  updateBlogController,
} from "./blog.controller";
import {
  blogUpdatevalidationSchema,
  blogValidationSchema,
} from "./blog.validation";

const blogRouter = Router();

blogRouter.get("/", getAllBlogsController);

blogRouter.post(
  "/",
  auth,
  authorize(["user"]),
  validateRequest(blogValidationSchema),
  createBlogController
);

blogRouter.patch(
  "/:id",
  auth,
  authorize(["user"]),
  validateRequest(blogUpdatevalidationSchema),
  updateBlogController
);
blogRouter.delete("/:id", auth, authorize(["user"]), deleteBlogController);

export default blogRouter;
