"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const config_1 = require("../config");
const ApiError_1 = __importDefault(require("./ApiError"));
const globalErrorHandler = (err, req, res, next) => {
    // define default values
    let statusCode = 500;
    let message = "something went wrong!";
    let errorSources = [
        {
            path: "global",
            message: "something went wrong!",
        },
    ];
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Validation error occurred!";
        errorSources = err.issues.map((issue) => {
            return {
                path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue.message,
            };
        });
    }
    // Handle mongoose validation errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation error occurred!";
        errorSources = Object.values(err.errors).map((error) => {
            return {
                path: error.path,
                message: error.message,
            };
        });
    }
    // mongoose cast error
    if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 400;
        message = "Invalid data!";
        errorSources = [
            {
                path: err.path,
                message: err.message,
            },
        ];
    }
    //mongoose duplicate key error
    if (err.code === 11000) {
        // Extract value within double quotes using regex
        const match = err.message.match(/"([^"]*)"/);
        // The extracted value will be in the first capturing group
        const extractedMessage = match && match[1];
        statusCode = 400;
        message = "Duplicate field value entered";
        errorSources = [
            {
                path: "global",
                message: `${extractedMessage} is already exists`,
            },
        ];
    }
    //apiError handler
    if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "global",
                message: err.message,
            },
        ];
    }
    //   return response
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        errorSources,
        stack: config_1.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
