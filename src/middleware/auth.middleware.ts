import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config";
import ApiError from "../errors/ApiError";
import { IjwtPayload } from "../modules/auth/auth.interface";
import { findUserWithEmailService } from "../modules/user/user.service";
import { asyncHandler } from "../utils/asyncHandler";
export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "you are not authorized");
    }
    // verify token
    const decoded = jwt.verify(token, jwt_secret as string) as IjwtPayload;
    if (!decoded) {
      throw new ApiError(401, "you are not authorized");
    }

    const user = await findUserWithEmailService(decoded.email);
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    if (user.isBlocked) {
      throw new ApiError(401, "User is blocked");
    }
    req.user = decoded as IjwtPayload;
    next();
  }
);
