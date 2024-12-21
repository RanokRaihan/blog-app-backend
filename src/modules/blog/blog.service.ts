import QueryBuilder from "../../builder/queryBuilder";
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

// get all blogs service
export const getAllBlogsService = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    BlogModel.find()
      .populate("author", "name email")
      .select("-__v -isPublished -createdAt -updatedAt"),
    query
  );

  const blogs = await blogQuery
    .search(["title", "content"])
    .sort()
    .filter(["author"])
    .build();
  return blogs;
};

// Update blog service
export const updateBlogService = async (id: string, blog: Partial<IBlog>) => {
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog, {
    new: true,
  })
    .populate("author", "name email")
    .select("-__v -isPublished -createdAt -updatedAt");
  return updatedBlog;
};

// delete a blog
export const deleteBlogService = async (id: string) => {
  await BlogModel.findByIdAndDelete(id);
  return null;
};
