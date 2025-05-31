import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { tickets } from '@/lib/constants';
import {
	CalendarIcon,
	DownloadIcon,
	ExternalLinkIcon,
	MapPinIcon,
	TicketIcon,
} from 'lucide-react';
import Link from 'next/link';

// This would typically come from your database
const getUserTickets = async () => {
	// Simulated API call
	return tickets;
};

export default async function TicketsPage() {
	const tickets = await getUserTickets();

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>My Tickets</h1>
					<p className='text-muted-foreground mt-2'>
						View and manage your event tickets
					</p>
				</div>
				<Button
					asChild
					size='sm'>
					<Link href='/'>
						<TicketIcon className='mr-2 h-4 w-4' />
						Browse Events
					</Link>
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{tickets.map((ticket) => (
					<Card
						key={ticket.id}
						className='flex flex-col'>
						<CardHeader>
							<CardTitle className='line-clamp-1'>
								{ticket.eventName}
							</CardTitle>
							<CardDescription>{ticket.ticketType}</CardDescription>
						</CardHeader>
						<CardContent className='flex-1 space-y-4'>
							<div className='space-y-2'>
								<div className='flex items-center text-sm'>
									<CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
									<span>
										{ticket.date} • {ticket.time}
									</span>
								</div>
								<div className='flex items-center text-sm'>
									<MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
									<span className='line-clamp-1'>
										{ticket.location}
									</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className='flex gap-2'>
							<Button
								variant='outline'
								className='flex-1'
								asChild>
								<Link href={`/event/${ticket.eventId}`}>
									<ExternalLinkIcon className='mr-2 h-4 w-4' />
									View Event
								</Link>
							</Button>
							<Button className='flex-1'>
								<DownloadIcon className='mr-2 h-4 w-4' />
								Download
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{tickets.length === 0 && (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-12 text-center'>
						<TicketIcon className='h-12 w-12 text-muted-foreground mb-4' />
						<h3 className='text-lg font-semibold'>No tickets found</h3>
						<p className='text-muted-foreground mt-2'>
							You haven't purchased any tickets yet.
						</p>
						<Button
							className='mt-4'
							asChild>
							<Link href='/'>Browse Events</Link>
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
