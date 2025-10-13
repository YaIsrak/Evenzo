'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { ITicket, Ticket } from '../model/ticket.model';
import { getTicketByTicketId } from '../query/ticket.query';
import { generateSeatNumber } from '../utils';
import { replaceMongoIdInObject } from '../utils/objectfix';
import { sendTicketMail } from './mail.action';

// create ticket
export const createTicket = async (
	eventId: string,
	userId: string,
	email: string,
): Promise<ITicket> => {
	try {
		dbConnect();
		const ticket: ITicket = await Ticket.create({
			event: eventId,
			user: userId,
			seatNumber: generateSeatNumber(),
			accessLevel: 'general',
		});

		const fetchTicket = await getTicketByTicketId(ticket.ticketId);
		if (!fetchTicket) throw new Error('Ticket not found');

		await sendTicketMail(email, fetchTicket);
		revalidatePath('/');

		return replaceMongoIdInObject(ticket);
	} catch (error) {
		throw error;
	}
};
