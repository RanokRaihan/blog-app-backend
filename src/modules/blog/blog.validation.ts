import { z } from "zod";

export const blogValidationSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          invalid_type_error: "title must be a string",
          required_error: "title is required",
        })
        .min(1)
        .max(255, { message: "title can not be more than 255 character" })
        .nonempty(),
      content: z
        .string({
          invalid_type_error: "title must be a string",
          required_error: "title is required",
        })
        .min(1)
        .nonempty(),
    })
    .strict(),
});

export const blogUpdatevalidationSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          invalid_type_error: "title must be a string",
        })
        .min(1)
        .max(255, { message: "title can not be more than 255 character" })
        .nonempty()
        .optional(),
      content: z
        .string({
          invalid_type_error: "title must be a string",
        })
        .min(1)
        .nonempty()
        .optional(),
    })
    .strict(),
});
