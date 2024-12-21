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
exports.loginUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const createToken_1 = require("../../utils/createToken");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("../user/user.service");
exports.loginUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check the email and password
    const user = yield (0, user_service_1.findUserWithEmailService)(email);
    // if not valid, throw error
    if (!user) {
        throw new ApiError_1.default(401, "Invalid credentials");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(401, "Invalid credentials");
    }
    // else, create a token and send the token as response
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.jwt_secret, config_1.jwt_expires_in);
    // send the token as response
    (0, sendResponse_1.sendResponse)(res, 200, "Login successful", { token: accessToken });
}));
