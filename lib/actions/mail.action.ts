'use server';

import { emailTemplates } from '../email-templates';
import { sendEmail } from '../mail';
import { getEventById } from '../query/event.query';
import { getTicketByTicketId } from '../query/ticket.query';

export const sendTicketInvoice = async (
	email: string,
	eventId: string,
	ticketId: string,
) => {
	const event = await getEventById(eventId);
	const ticket = await getTicketByTicketId(ticketId);

	if (event && ticket) {
		// send to attendee
		await sendEmail({
			to: email,
			subject: emailTemplates.ticketInvoice.subject.replace(
				'{eventName}',
				event.title,
			),
			html: emailTemplates.ticketInvoice.body
				.replace('{eventName}', event?.title)
				.replace('{attendeeName}', ticket.user.name)
				.replace('{ticketType}', ticket?.accessLevel || 'General')
				.replace('{ticketId}', ticket.ticketId),
		});
	}
};
