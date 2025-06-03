import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ITicket } from '@/lib/model/ticket.model';
import { getStatusColor } from '@/lib/utils/getStatusColor';
import {
	CalendarIcon,
	DownloadIcon,
	ExternalLinkIcon,
	MapPinIcon,
	TicketIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function TicketCard({ ticket }: { ticket: ITicket }) {
	return (
		<Card
			key={ticket.id}
			className='flex flex-col'>
			<CardHeader>
				<CardTitle className='line-clamp-1'>{ticket.event.title}</CardTitle>
				<CardDescription>
					<Badge variant={getStatusColor(ticket.status)}>
						{ticket.status.charAt(0).toUpperCase() +
							ticket.status.slice(1)}
					</Badge>
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 space-y-4'>
				<div className='space-y-2'>
					<div className='flex items-center text-sm'>
						<CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
						<span>
							{new Date(ticket.event.date).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}{' '}
							{new Date(ticket.event.date).toLocaleTimeString('en-US', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
					</div>
					<div className='flex items-center text-sm'>
						<MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
						<span className='line-clamp-1'>{ticket.event.location}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex gap-2 items-center justify-between'>
				<Button
					variant='outline'
					className='flex-1'
					asChild>
					<Link href={`/tickets/${ticket.ticketId}`}>
						<TicketIcon />
						Ticket
					</Link>
				</Button>
				<Button
					variant='outline'
					className='flex-1'
					asChild>
					<Link href={`/event/${ticket.event._id}`}>
						<ExternalLinkIcon />
						Event
					</Link>
				</Button>
				<Button className='flex-1'>
					<DownloadIcon />
					Download
				</Button>
			</CardFooter>
		</Card>
	);
}
