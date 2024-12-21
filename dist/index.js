"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const db_1 = require("./db");
(0, db_1.connectDB)()
    .then(() => {
    app_1.default.listen(config_1.port || 3000, () => {
        console.log(`Server running on port ${config_1.port}`);
    });
})
    .catch((err) => {
    console.log("Something went wrong. server start faild!", err);
});
