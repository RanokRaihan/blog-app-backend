import jwt from "jsonwebtoken";
import { IjwtPayload } from "../modules/auth/auth.interface";

export const createToken = (
  jwtPayload: IjwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
