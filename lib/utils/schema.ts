import { z } from 'zod';

export const signUpSchema = z.object({
	username: z.string().min(2).max(50),
	email: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
	confirmPassword: z.string().min(8).max(50),
	rememberMe: z.boolean().optional(),
});

export const signInSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
	rememberMe: z.boolean().optional(),
});
