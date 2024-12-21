"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        validate: {
            validator: (value) => value.trim().length > 0,
            message: "Title cannot be empty",
        },
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        validate: {
            validator: (value) => value.trim().length > 0,
            message: "Content cannot be empty",
        },
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = BlogModel;
