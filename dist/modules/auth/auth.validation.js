"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = void 0;
const zod_1 = require("zod");
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(6, { message: "password must be at least 6 character!" })
            .max(20, { message: "password must be at most 20 character!" }),
    })
        .strict(),
});
