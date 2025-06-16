import DownloadTicket from '@/components/download-ticket';
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
	ExternalLinkIcon,
	MapPinIcon,
	TicketIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TicketCard({ ticket }: { ticket: ITicket }) {
	return (
		<Card
			key={ticket.id}
			className='flex flex-col'>
			<CardHeader>
				<CardTitle className='line-clamp-1'>{ticket.event.title}</CardTitle>
				<CardDescription className='flex flex-col gap-2'>
					<Badge variant={getStatusColor(ticket.status)}>
						{ticket.status.charAt(0).toUpperCase() +
							ticket.status.slice(1)}
					</Badge>
					<div>
						<Image
							src={
								ticket?.event.images?.[0] ||
								'/images/event-placeholder.png'
							}
							alt={ticket.event.title}
							width={300}
							height={300}
							className='w-full h-full object-cover rounded-md'
						/>
					</div>
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
				<DownloadTicket
					ticket={ticket}
					className='flex-1 justify-center'
					variant={'default'}
					label='Download'
				/>
			</CardFooter>
		</Card>
	);
}
