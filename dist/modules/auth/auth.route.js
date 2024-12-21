"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("../user/user.controller");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
//create a new user
authRouter.post("/register", (0, validateRequest_1.default)(user_validation_1.createUserSchema), user_controller_1.createUserController);
// login user
authRouter.post("/login", auth_controller_1.loginUserController);
exports.default = authRouter;
