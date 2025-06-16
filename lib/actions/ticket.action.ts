'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { ITicket, Ticket } from '../model/ticket.model';
import { generateSeatNumber } from '../utils';
import { replaceMongoIdInObject } from '../utils/objectfix';

// create ticket
export const createTicket = async (
	eventId: string,
	userId: string,
	email: string,
): Promise<ITicket> => {
	try {
		dbConnect();
		const ticket = await Ticket.create({
			event: eventId,
			user: userId,
			seatNumber: generateSeatNumber(),
			accessLevel: 'general',
		});

		revalidatePath('/');

		return replaceMongoIdInObject(ticket);
	} catch (error) {
		throw error;
	}
};
