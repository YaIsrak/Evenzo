'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { Event } from '../model/event.model';
import { replaceMongoIdInObject } from '../utils/objectfix';
import { EventFormValues } from '../validator';

export const createEvent = async ({
	event,
	images,
	userId,
}: {
	event: EventFormValues;
	images: string[];
	userId: string;
}) => {
	try {
		dbConnect();

		if (images.length === 0)
			throw new Error('Please upload at least one image');

		if (event.highlights.length === 0)
			throw new Error('Please add at least one highlight');

		if (event.date < new Date())
			throw new Error('Date cannot be in the past');

		const newEvent = await Event.create({
			title: event.name,
			description: event.description,
			highlights: event.highlights,
			date: event.date,
			time: event.time,
			location: event.location,
			organizer: userId,
			category: event.category,
			capacity: event.capacity,
			images: images,
		});

		return replaceMongoIdInObject(newEvent);
	} catch (error) {
		throw error;
	}
};

export const cancelEvent = async (
	id: string,
	userId: string,
	reason: string,
) => {
	try {
		dbConnect();
		const event = await Event.findById(id);
		if (!event) throw new Error('Event not found');

		if (event.organizer.toString() !== userId)
			throw new Error('You are not authorized to cancel this event');

		event.status = 'cancelled';
		event.cancelReason = reason;
		await event.save();

		// todo: send email to all attendees

		revalidatePath(`/event/${id}`);
	} catch (error) {
		throw error;
	}
};

export const updateEvent = async (
	id: string,
	images: string[],
	updateEvent: EventFormValues,
	userId: string,
) => {
	try {
		dbConnect();
		const event = await Event.findById(id);
		if (!event) throw new Error('Event not found');

		if (event.organizer.toString() !== userId)
			throw new Error('You are not authorized to update this event');

		event.title = updateEvent.name;
		event.description = updateEvent.description;
		event.highlights = updateEvent.highlights;
		event.date = updateEvent.date;
		event.time = updateEvent.time;
		event.location = updateEvent.location;
		event.capacity = updateEvent.capacity;
		event.category = updateEvent.category;
		event.images = images;

		await event.save();

		// todo: send email to all attendees

		revalidatePath(`/event/${id}`);

		return replaceMongoIdInObject(event);
	} catch (error) {
		throw error;
	}
};
