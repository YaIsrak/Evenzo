'use server';

import { dbConnect } from '../db';
import { Ticket } from '../model/ticket.model';
import { replaceMongoIdInObject } from '../utils/objectfix';

export const getTicketByTicketId = async (ticketId: string) => {
	dbConnect();
	const ticket = await Ticket.findOne({ ticketId });

	return replaceMongoIdInObject(ticket);
};
