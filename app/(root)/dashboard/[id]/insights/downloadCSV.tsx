'use client';

import { Button } from '@/components/ui/button';
import { ITicket } from '@/lib/model/ticket.model';
import exportTicketsToCsv from '@/lib/utils/exportTicketsToCsv';
import { Download } from 'lucide-react';

export default function DownloadCSV({
	typedTickets,
	eventId,
}: {
	typedTickets: ITicket[];
	eventId: string;
}) {
	const handleExport = () => {
		exportTicketsToCsv(typedTickets, `event-${eventId}-tickets`);
		console.log('sdhhjshdjsdh');
	};

	return (
		<Button
			onClick={handleExport}
			size='sm'>
			Export to CSV
			<Download />
		</Button>
	);
}
