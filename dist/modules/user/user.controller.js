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
exports.createUserController = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
exports.createUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user data from the request body
    const { name, email, password } = req.body;
    //check the user already exists
    const existingUser = yield (0, user_service_1.findUserWithEmailService)(email);
    // if exists, send error response
    if (existingUser) {
        throw new ApiError_1.default(400, "User already exists with this email");
    }
    // else, create the user with authService
    const user = yield (0, user_service_1.createUserService)({ name, email, password });
    //throw error if user is not created
    if (!(user === null || user === void 0 ? void 0 : user._id)) {
        throw new ApiError_1.default(500, "Failed to create user");
    }
    //create a response data without password
    const responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    // send success response
    (0, sendResponse_1.sendResponse)(res, 201, "User registered successfully!", responseData);
}));
