import { z } from 'zod';
import { eventCategories } from './constants';

export const eventFormSchema = z.object({
	name: z.string().min(2, 'Event name must be at least 2 characters'),
	category: z.enum(eventCategories, {
		required_error: 'Please select a category',
	}),
	date: z.date({
		required_error: 'Please select a date',
	}),
	time: z.string({
		required_error: 'Please select a time',
	}),
	location: z.string().min(2, 'Location must be at least 2 characters'),
	description: z
		.string()
		.min(10, 'Description must be at least 10 characters')
		.max(2000, 'Description must not exceed 2000 characters'),
	highlights: z.array(z.string()).min(1, 'Please add at least one highlight'),
	capacity: z.string().min(1, 'Please enter the maximum capacity'),
	organizer: z.string().min(2, 'Organizer name must be at least 2 characters'),
	organizerLink: z
		.string()
		.url('Please enter a valid URL')
		.optional()
		.or(z.literal('')),
});

export const profileFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	organizationName: z.string().optional(),
	organizationUrl: z.string().optional(),
	contact: z.string().min(10, {
		message: 'Please enter a valid phone number.',
	}),
});

export const joinFormSchema = z.object({
	fullName: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	phone: z.string().min(10, 'Please enter a valid phone number'),
	terms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions',
	}),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type JoinFormValues = z.infer<typeof joinFormSchema>;
