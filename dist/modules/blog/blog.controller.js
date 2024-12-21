"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogController = exports.updateBlogController = exports.getAllBlogsController = exports.createBlogController = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
// Create blog controller
exports.createBlogController = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const author = req.user._id;
    if (!author) {
        throw new ApiError_1.default(401, "You are not authorized !");
    }
    const createdBlog = yield (0, blog_service_1.createBlogService)({ title, content, author });
    if (!(createdBlog === null || createdBlog === void 0 ? void 0 : createdBlog._id)) {
        throw new ApiError_1.default(500, "Failed to create blog");
    }
    //   get the created blog data with author
    const responseData = yield (0, blog_service_1.findBlogByIdService)(createdBlog._id.toString(), true);
    (0, sendResponse_1.sendResponse)(res, 201, "Blog created successfully!", responseData);
}));
// get all blogs controller
exports.getAllBlogsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const blogs = yield (0, blog_service_1.getAllBlogsService)(req.query);
    (0, sendResponse_1.sendResponse)(res, 200, "Blogs fetched successfully", blogs);
}));
// Update blog controller
exports.updateBlogController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    //   check if the blog exist
    const blog = yield (0, blog_service_1.findBlogByIdService)(blogId);
    if (!blog) {
        throw new ApiError_1.default(404, "Blog not found");
    }
    //   check if the user is the author of the blog
    console.log(blog.author._id.toString(), req.user._id.toString());
    if (blog.author._id.toString() !== req.user._id.toString()) {
        throw new ApiError_1.default(401, "You are not authorized to update this blog");
    }
    //   update the blog
    const updatedBlog = yield (0, blog_service_1.updateBlogService)(req.params.id, req.body);
    if (!updatedBlog) {
        throw new ApiError_1.default(500, "Failed to update blog");
    }
    (0, sendResponse_1.sendResponse)(res, 200, "Blog updated successfully!", updatedBlog);
}));
// delete blog controller
exports.deleteBlogController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    //   check if the blog exist
    const blog = yield (0, blog_service_1.findBlogByIdService)(blogId);
    if (!blog) {
        throw new ApiError_1.default(404, "Blog not found");
    }
    //   check if the user is the author of the blog
    if (blog.author._id.toString() !== req.user._id.toString()) {
        throw new ApiError_1.default(401, "You are not authorized to delete this blog");
    }
    //   delete the blog
    yield (0, blog_service_1.deleteBlogService)(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, "Blog deleted successfully!", null);
}));
