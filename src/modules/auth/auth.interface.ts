export type TUserRole = "user" | "admin";
export interface IjwtPayload {
  _id: string;
  email: string;
  role?: TUserRole;
}
