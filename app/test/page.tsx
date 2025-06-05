'use client';

import { Button } from '@/components/ui/button';
import { sendTicketInvoice } from '@/lib/actions/mail.action';
import { toast } from 'sonner';

export default function TestPage() {
	const handleSendEmail = async () => {
		try {
			await sendTicketInvoice(
				'randomboom42253@gmail.com',
				'683c343c5ffc730102ddd213',
				'TICKET-1749104932349-1',
			);
			toast.success('Email sent successfully');
		} catch (error) {
			toast.error('Failed to send email', {
				description:
					error instanceof Error ? error.message : 'Unknown error',
			});
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<Button onClick={handleSendEmail}>Send Email</Button>
		</div>
	);
}
