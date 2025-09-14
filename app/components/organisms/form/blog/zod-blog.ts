import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const blogFormSchema = toTypedSchema(
  z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content is required"),
    author: z.string().min(2, "Author is required"),
    category_id: z.number().int("Category is required"),
  }),
);
