"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./errors/globalErrorHandler");
const notFound_1 = __importDefault(require("./middleware/notFound"));
const routes_1 = __importDefault(require("./routes"));
// Create Express server
const app = (0, express_1.default)();
// Express configuration
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// all routes
app.use("/api", routes_1.default);
//test route
app.get("/", (req, res) => {
    res.send("hurray! server is up and running!! Majje Karo!!");
});
//global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// not found route
app.use(notFound_1.default);
// export app
exports.default = app;
