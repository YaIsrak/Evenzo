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
		.max(500, 'Description must not exceed 500 characters'),
	highlights: z.array(z.string()).min(1, 'Please add at least one highlight'),
	capacity: z.string().min(1, 'Please enter the maximum capacity'),
	organizer: z.string().min(2, 'Organizer name must be at least 2 characters'),
	organizerLink: z
		.string()
		.url('Please enter a valid URL')
		.optional()
		.or(z.literal('')),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
