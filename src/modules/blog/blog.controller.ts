import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { createBlogService, findBlogByIdService } from "./blog.service";
export const createBlogController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const author = req.user._id;
    if (!author) {
      throw new ApiError(401, "You are not authorized !");
    }
    const createdBlog = await createBlogService({ title, content, author });
    if (!createdBlog?._id) {
      throw new ApiError(500, "Failed to create blog");
    }
    //   get the created blog data with author
    const responseData = await findBlogByIdService(
      createdBlog._id.toString(),
      true
    );
    sendResponse(res, 201, "Blog created successfully!", responseData);
  }
);
