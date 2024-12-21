import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Title cannot be empty",
      },
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Content cannot be empty",
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BlogModel = model<IBlog>("Blog", blogSchema);

export default BlogModel;
