import { ITicket } from '../model/ticket.model';

const exportTicketsToCsv = (data: ITicket[], filename: string) => {
	if (data.length === 0) return;

	// Define the headers and corresponding data keys
	const headers = [
		'Ticket ID',
		'Seat',
		'Attendee Name',
		'Email',
		'Phone',
		'Price',
		'Status',
		'Purchase Date',
		'Check-In Date',
	];
	const keys: (keyof ITicket | string)[] = [
		'ticketId',
		'seatNumber',
		'user.name',
		'user.email',
		'user.phone',
		'price',
		'status',
		'purchaseDate',
		'checkedInAt',
	];

	// Create the CSV header row
	let csv = headers.join(',') + '\n';

	// Map data to CSV rows
	data.forEach((ticket) => {
		const row = keys
			.map((key) => {
				let value: any;

				// 1. Handle value retrieval (nested vs. top-level)
				if (key.includes('.')) {
					const [parentKey, childKey] = key.split('.');
					value = (ticket as any)[parentKey]?.[childKey] || '';
				} else {
					value = (ticket as any)[key];
				}

				if (value === null || value === undefined) {
					value = '';
				}

				// 2. Special formatting for specific keys
				switch (key) {
					case 'purchaseDate':
					case 'checkedInAt':
						if (!value) {
							value = '';
						} else {
							value = new Date(value).toLocaleString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							});
						}
						break;
					case 'status':
						value = value
							? value.charAt(0).toUpperCase() + value.slice(1)
							: '';
						break;
					case 'price':
						value = value ? `$${value}` : 'Free';
						break;
					default:
						value = `"${String(value).replace(/"/g, '""')}"`;
						break;
				}
				return value;
			})
			.join(',');
		csv += row + '\n';
	});

	// Trigger the download
	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('download', `${filename}.csv`);
	link.style.visibility = 'hidden';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

export default exportTicketsToCsv;
