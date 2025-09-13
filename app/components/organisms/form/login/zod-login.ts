import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const formSchema = toTypedSchema(
  z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
);
