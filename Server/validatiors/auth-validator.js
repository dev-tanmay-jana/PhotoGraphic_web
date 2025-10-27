const { z } = require('zod');

// Creating object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must be at most 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(12, { message: "Phone must be at most 12 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 8 characters" })
    .max(16, { message: "Password must be at most 16 characters" }),
});

module.exports = signupSchema;