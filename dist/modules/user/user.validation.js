"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(6, { message: "passqord must be at least 6 character!" })
            .max(20, { message: "password must be at most 20 character!" }),
        name: zod_1.z
            .string()
            .min(1, { message: "Name is required" })
            .max(100, { message: "Name must be at most 100 character!" }),
    })
        .strict(),
});
