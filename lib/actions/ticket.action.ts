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
		await dbConnect();
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

export interface CheckInResult {
	success: boolean;
	message: string;
	ticket?: ITicket;
	alreadyCheckedIn?: boolean;
}

// Mutate ticket status to 'used' (Check-in)
export const checkInTicket = async (
	ticketId: string,
): Promise<CheckInResult> => {
	try {
		await dbConnect();
		const ticket = await Ticket.findOne({ ticketId })
			.populate('event')
			.populate('user');

		if (!ticket) {
			return {
				success: false,
				message: `Ticket "${ticketId}" was not found.`,
			};
		}

		// Check if event is cancelled
		if ((ticket.event as any)?.status === 'cancelled') {
			return {
				success: false,
				message: 'Cannot check in: This event has been cancelled.',
				ticket: replaceMongoIdInObject(ticket),
			};
		}

		// Check if ticket is cancelled
		if (ticket.status === 'cancelled') {
			return {
				success: false,
				message: 'Cannot check in: This ticket has been cancelled.',
				ticket: replaceMongoIdInObject(ticket),
			};
		}

		// Check if ticket is already checked in
		if (ticket.status === 'used') {
			const checkedInTimeStr = ticket.checkedInAt
				? new Date(ticket.checkedInAt).toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})
				: 'earlier';

			return {
				success: false,
				alreadyCheckedIn: true,
				message: `Ticket already checked in (${checkedInTimeStr}).`,
				ticket: replaceMongoIdInObject(ticket),
			};
		}

		// Mutate ticket status to used
		ticket.status = 'used';
		ticket.checkedInAt = new Date();
		await ticket.save();

		revalidatePath('/verify-ticket');
		const eventId =
			(ticket.event as any)?._id?.toString() ||
			(ticket.event as any)?.id?.toString();
		if (eventId) {
			revalidatePath(`/dashboard/${eventId}/insights`);
		}

		return {
			success: true,
			message: `Check-in successful! Welcome, ${ticket.user?.name || 'Attendee'}!`,
			ticket: replaceMongoIdInObject(ticket),
		};
	} catch (error) {
		console.error('Check-in error:', error);
		return {
			success: false,
			message:
				(error as Error).message ||
				'An unexpected error occurred during check-in.',
		};
	}
};

// Revert check-in back to active (Undo check-in)
export const resetTicketCheckIn = async (
	ticketId: string,
): Promise<CheckInResult> => {
	try {
		await dbConnect();
		const ticket = await Ticket.findOne({ ticketId })
			.populate('event')
			.populate('user');

		if (!ticket) {
			return {
				success: false,
				message: `Ticket "${ticketId}" was not found.`,
			};
		}

		ticket.status = 'active';
		ticket.checkedInAt = undefined;
		await ticket.save();

		revalidatePath('/verify-ticket');
		const eventId =
			(ticket.event as any)?._id?.toString() ||
			(ticket.event as any)?.id?.toString();
		if (eventId) {
			revalidatePath(`/dashboard/${eventId}/insights`);
		}

		return {
			success: true,
			message: `Ticket status has been reset to Active.`,
			ticket: replaceMongoIdInObject(ticket),
		};
	} catch (error) {
		console.error('Reset check-in error:', error);
		return {
			success: false,
			message: (error as Error).message || 'Failed to reset ticket status.',
		};
	}
};
