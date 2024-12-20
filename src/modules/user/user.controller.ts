import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./user.interface";

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    // get the user data from the request body
    const { name, email, password } = req.body;
    sendResponse<IUser>(res, 200, "User registered successfully", {
      name,
      email,
      password,
    });
  }
);
