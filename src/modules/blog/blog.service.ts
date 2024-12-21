import { IBlog } from "./blog.interface";
import BlogModel from "./blog.model";

export const createBlogService = async (blog: IBlog) => {
  const createdBlog = await BlogModel.create(blog);
  return createdBlog;
};

export const findBlogByIdService = async (id: string, limitedData = false) => {
  if (limitedData) {
    const blog = await BlogModel.findById(id)
      .populate("author", "name email")
      .select("-__v -isPublished -createdAt -updatedAt");
    return blog;
  } else {
    const blog = await BlogModel.findById(id)
      .populate("author", "name email")
      .select("-__v");
    return blog;
  }
};
