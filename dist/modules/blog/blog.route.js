"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorize_middleware_1 = require("../../middleware/authorize.middleware");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const blogRouter = (0, express_1.Router)();
blogRouter.get("/", blog_controller_1.getAllBlogsController);
blogRouter.post("/", auth_middleware_1.auth, (0, authorize_middleware_1.authorize)(["user"]), (0, validateRequest_1.default)(blog_validation_1.blogValidationSchema), blog_controller_1.createBlogController);
blogRouter.patch("/:id", auth_middleware_1.auth, (0, authorize_middleware_1.authorize)(["user"]), (0, validateRequest_1.default)(blog_validation_1.blogUpdatevalidationSchema), blog_controller_1.updateBlogController);
blogRouter.delete("/:id", auth_middleware_1.auth, (0, authorize_middleware_1.authorize)(["user"]), blog_controller_1.deleteBlogController);
exports.default = blogRouter;
