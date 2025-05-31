import { z } from 'zod';

export const signUpSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
	confirmPassword: z.string().min(8).max(50),
});

export const signInSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
});
