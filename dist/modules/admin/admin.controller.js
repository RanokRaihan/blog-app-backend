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
Object.defineProperty(exports, "__esModule", { value: true });
exports.admindeleteBlogController = exports.blockUserController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const admin_service_1 = require("./admin.service");
exports.blockUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const blockedUser = yield (0, admin_service_1.blockUserService)(userId);
    (0, sendResponse_1.sendResponse)(res, 200, "User blocked successfully", blockedUser);
}));
exports.admindeleteBlogController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    yield (0, admin_service_1.adminDeleteBlogService)(blogId);
    (0, sendResponse_1.sendResponse)(res, 200, "Blog deleted successfully", null);
}));
