import { ITicket } from '../model/ticket.model';

const exportTicketsToCsv = (data: ITicket[], filename: string) => {
	if (data.length === 0) return;

	// Define the headers and corresponding data keys
	const headers = [
		'Ticket ID',
		'Seat',
		'Attendee Name', // Updated header
		'Email',
		'Phone', // New header
		'Price', // New header
		'Status',
		'Purchase Date',
	];
	const keys: (keyof ITicket | string)[] = [
		'ticketId',
		'seatNumber',
		'user.name', // Accesses nested field
		'user.email', // Accesses nested field
		'user.phone', // New key for nested phone number
		'price', // New key for ticket price (assuming this field exists)
		'status',
		'purchaseDate',
	];

	// Create the CSV header row
	let csv = headers.join(',') + '\n';

	// Map data to CSV rows
	data.forEach((ticket) => {
		const row = keys
			.map((key) => {
				let value: any; // Use 'any' for value initially

				// 1. Handle value retrieval (nested vs. top-level)
				if (key.includes('.')) {
					// Handle nested properties like 'user.name'
					const [parentKey, childKey] = key.split('.');
					value = (ticket as any)[parentKey]?.[childKey] || '';
				} else {
					// Handle top-level properties
					value = (ticket as any)[key];
				}

				// Convert null/undefined to empty string for cleaner CSV
				if (value === null || value === undefined) {
					value = '';
				}

				// 2. Special formatting for specific keys
				switch (key) {
					case 'purchaseDate':
						// Format the date for readability
						value = new Date(value).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						});
						// Do not quote dates after formatting
						break;
					case 'status':
						// Capitalize first letter of status
						value = value.charAt(0).toUpperCase() + value.slice(1);
						// Do not quote status
						break;
					case 'price':
						// Format price as a currency string (e.g., "$100.00")
						value = new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'USD',
						}).format(value);
						// Quote price since it contains a currency symbol
						value = `"${String(value).replace(/"/g, '""')}"`;
						break;
					default:
						// Ensure all other values are strings and properly quoted
						// if they contain commas or newlines (CSV separator)
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
	URL.revokeObjectURL(url); // Clean up the object URL
};

export default exportTicketsToCsv;
