export const navItems = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Events',
		href: '/events',
	},
	{
		label: 'Verify ticket',
		href: '/verify-ticket',
	},
];

export const reviewsDemoList = [
	{
		id: 1,
		user: 'John Doe',
		rating: 5,
		comment:
			'Amazing event! The speakers were knowledgeable and the networking opportunities were great.',
		date: '2024-02-15',
	},
	{
		id: 2,
		user: 'Jane Smith',
		rating: 4,
		comment:
			'Well organized event with valuable insights. Would definitely attend again.',
		date: '2024-02-14',
	},
	{
		id: 3,
		user: 'Mike Johnson',
		rating: 5,
		comment:
			"The best tech conference I've attended this year. Great content and networking.",
		date: '2024-02-13',
	},
];

export const eventImages = [
	{
		src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
		alt: 'Main event image',
	},
	{
		src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
		alt: 'Event venue',
	},
	{
		src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012',
		alt: 'Event activities',
	},
	{
		src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
		alt: 'Event venue',
	},
	{
		src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
		alt: 'Event speakers',
	},
];

export const tickets = [
	{
		id: '1',
		eventName: 'Tech Conference 2024',
		eventId: '123',
		date: 'March 15, 2024',
		time: '9:00 AM - 5:00 PM',
		location: 'Convention Center, New York',
		ticketType: 'VIP Pass',
		status: 'active',
		qrCode: 'ticket-qr-1.png',
	},
	{
		id: '2',
		eventName: 'Music Festival 2024',
		eventId: '456',
		date: 'April 20, 2024',
		time: '2:00 PM - 11:00 PM',
		location: 'Central Park, New York',
		ticketType: 'General Admission',
		status: 'active',
		qrCode: 'ticket-qr-2.png',
	},
];

export interface Event {
	id: string;
	name: string;
	category: string;
	date: string;
	time: string;
	location: string;
	attendees: number;
}

export const events: Event[] = [
	{
		id: '1',
		name: 'Tech Conference 2024',
		category: 'Technology',
		date: 'March 15, 2024',
		time: '9:00 AM - 5:00 PM',
		location: 'Convention Center, New York',
		attendees: 150,
	},
	{
		id: '2',
		name: 'Music Festival 2024',
		category: 'Music',
		date: 'April 20, 2024',
		time: '2:00 PM - 11:00 PM',
		location: 'Central Park, New York',
		attendees: 500,
	},
];
