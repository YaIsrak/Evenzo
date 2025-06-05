'use server';

import { dbConnect } from '../db';
import { ITicket, Ticket } from '../model/ticket.model';
import { generateSeatNumber } from '../utils';
import { replaceMongoIdInObject } from '../utils/objectfix';
import { sendTicketInvoice } from './mail.action';

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

		await sendTicketInvoice(email, eventId, ticket.ticketId);

		return replaceMongoIdInObject(ticket);
	} catch (error) {
		throw error;
	}
};
