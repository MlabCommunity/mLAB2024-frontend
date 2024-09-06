import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
  rememberMe: z.boolean(),
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["Repeate password"],
  });
export const PromptSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: "Prompt field cannot be empty" })
    .max(1200, { message: "Prompt should have a maximum of 1200 characters" }),
});
