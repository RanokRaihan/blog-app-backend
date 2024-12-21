"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Requested api not found",
        statusCode: 404,
        errorSources: [
            {
                path: "global",
                message: "Requested api not found",
            },
        ],
    });
};
exports.default = notFound;
