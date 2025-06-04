'use server';

import { dbConnect } from '../db';
import { ITicket, Ticket } from '../model/ticket.model';
import {
	replaceMongoIdInArray,
	replaceMongoIdInObject,
} from '../utils/objectfix';

export const getTicketByTicketId = async (
	ticketId: string,
): Promise<ITicket | null> => {
	try {
		dbConnect();
		const ticket = await Ticket.findOne({ ticketId })
			.populate('event')
			.populate('user');
		return replaceMongoIdInObject(ticket);
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTicketsByUserId = async (
	userId: string,
): Promise<ITicket[] | null> => {
	try {
		dbConnect();
		const tickets = await Ticket.find({ user: userId }).populate(
			'event',
			'title location date',
		);
		return replaceMongoIdInArray(tickets);
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTicketsByEventId = async (
	eventId: string,
): Promise<ITicket[] | null> => {
	try {
		dbConnect();
		const tickets = await Ticket.find({ event: eventId }).populate(
			'user',
			'_id',
		);
		return replaceMongoIdInArray(tickets);
	} catch (error) {
		console.error(error);
		return null;
	}
};
