import BlogModel from "../blog/blog.model";
import User from "../user/user.model";

export const blockUserService = async (userId: string) => {
  const blockedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  ).select("-password -__v -updatedAt -createdAt -role");
  return blockedUser;
};

export const adminDeleteBlogService = async (blogId: string) => {
  await BlogModel.findByIdAndDelete(blogId);
  return null;
};
