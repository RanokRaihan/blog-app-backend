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
exports.deleteBlogService = exports.updateBlogService = exports.getAllBlogsService = exports.findBlogByIdService = exports.createBlogService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogService = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlog = yield blog_model_1.default.create(blog);
    return createdBlog;
});
exports.createBlogService = createBlogService;
const findBlogByIdService = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, limitedData = false) {
    if (limitedData) {
        const blog = yield blog_model_1.default.findById(id)
            .populate("author", "name email")
            .select("-__v -isPublished -createdAt -updatedAt");
        return blog;
    }
    else {
        const blog = yield blog_model_1.default.findById(id)
            .populate("author", "name email")
            .select("-__v");
        return blog;
    }
});
exports.findBlogByIdService = findBlogByIdService;
// get all blogs service
const getAllBlogsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new queryBuilder_1.default(blog_model_1.default.find()
        .populate("author", "name email")
        .select("-__v -isPublished -createdAt -updatedAt"), query);
    const blogs = yield blogQuery
        .search(["title", "content"])
        .sort()
        .filter(["author"])
        .build();
    return blogs;
});
exports.getAllBlogsService = getAllBlogsService;
// Update blog service
const updateBlogService = (id, blog) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(id, blog, {
        new: true,
    })
        .populate("author", "name email")
        .select("-__v -isPublished -createdAt -updatedAt");
    return updatedBlog;
});
exports.updateBlogService = updateBlogService;
// delete a blog
const deleteBlogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_model_1.default.findByIdAndDelete(id);
    return null;
});
exports.deleteBlogService = deleteBlogService;
