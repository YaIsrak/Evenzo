'use server';

import TicketTemplate from '@/components/email/Ticket-template';
import { Resend } from 'resend';
import { ITicket } from '../model/ticket.model';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTicketMail = async (email: string, ticket: ITicket) => {
	const { error } = await resend.emails.send({
		from: 'Evenzo team <contact@yisrak.work>',
		to: email,
		subject: 'Your ticket has been purchased',
		react: TicketTemplate({ ticket }),
	});

	if (error) throw new Error(error.message);
};
