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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const user_service_1 = require("../modules/user/user.service");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.auth = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (!token) {
        throw new ApiError_1.default(401, "you are not authorized");
    }
    // verify token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.jwt_secret);
    if (!decoded) {
        throw new ApiError_1.default(401, "you are not authorized");
    }
    const user = yield (0, user_service_1.findUserWithEmailService)(decoded.email);
    if (!user) {
        throw new ApiError_1.default(404, "user not found");
    }
    if (user.isBlocked) {
        throw new ApiError_1.default(401, "User is blocked");
    }
    req.user = decoded;
    next();
}));