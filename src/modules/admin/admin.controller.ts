import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { adminDeleteBlogService, blockUserService } from "./admin.service";

export const blockUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const blockedUser = await blockUserService(userId);
    sendResponse(res, 200, "User blocked successfully", blockedUser);
  }
);

export const admindeleteBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const blogId = req.params.id;
    await adminDeleteBlogService(blogId);
    sendResponse(res, 200, "Blog deleted successfully", null);
  }
);
