import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import {
  createBlogService,
  deleteBlogService,
  findBlogByIdService,
  getAllBlogsService,
  updateBlogService,
} from "./blog.service";

// Create blog controller
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

// get all blogs controller
export const getAllBlogsController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.query);

    const blogs = await getAllBlogsService(req.query);
    sendResponse(res, 200, "Blogs fetched successfully", blogs);
  }
);

// Update blog controller
export const updateBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const blogId = req.params.id;

    //   check if the blog exist
    const blog = await findBlogByIdService(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    //   check if the user is the author of the blog
    console.log(blog.author._id.toString(), req.user._id.toString());

    if (blog.author._id.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "You are not authorized to update this blog");
    }

    //   update the blog
    const updatedBlog = await updateBlogService(req.params.id, req.body);

    if (!updatedBlog) {
      throw new ApiError(500, "Failed to update blog");
    }

    sendResponse(res, 200, "Blog updated successfully!", updatedBlog);
  }
);

// delete blog controller
export const deleteBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const blogId = req.params.id;

    //   check if the blog exist
    const blog = await findBlogByIdService(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    //   check if the user is the author of the blog
    if (blog.author._id.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "You are not authorized to delete this blog");
    }

    //   delete the blog
    await deleteBlogService(req.params.id);

    sendResponse(res, 200, "Blog deleted successfully!", null);
  }
);
