"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_expires_in = exports.jwt_secret = exports.node_env = exports.db_name = exports.port = exports.mongodb_uri = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// congigure dotenv
dotenv_1.default.config();
// export environment variables
_a = process.env, exports.mongodb_uri = _a.MONGODB_URI, exports.port = _a.PORT, exports.db_name = _a.DB_NAME, exports.node_env = _a.NODE_ENV, exports.jwt_secret = _a.JWT_SECRET, exports.jwt_expires_in = _a.JWT_EXPIRES_IN;
