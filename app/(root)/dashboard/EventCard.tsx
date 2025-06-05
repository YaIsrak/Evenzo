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
import { IEvent } from '@/lib/model/event.model';
import { IUser } from '@/lib/model/user.model';
import { getTicketCountByEventId } from '@/lib/query/ticket.query';
import { getStatusColor } from '@/lib/utils/getStatusColor';
import {
	CalendarIcon,
	ChartBarIcon,
	EditIcon,
	EyeIcon,
	MapPinIcon,
	UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import CancelEvent from './CancelEvent';

export default async function EventCard({
	event,
	profile,
}: {
	event: IEvent;
	profile: IUser;
}) {
	return (
		<Card
			key={event.id}
			className='flex flex-col'>
			<CardHeader>
				<div className='flex items-start justify-between'>
					<div className='space-y-1'>
						<CardTitle className='line-clamp-1'>{event.title}</CardTitle>
						<CardDescription>{event.category}</CardDescription>
					</div>
					<Badge variant={getStatusColor(event.status)}>
						{event.status.charAt(0).toUpperCase() + event.status.slice(1)}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className='flex-1 space-y-4'>
				<div className='space-y-2'>
					<div className='flex items-center text-sm'>
						<CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
						<span>
							{new Date(event.date).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
							• {event.time}
						</span>
					</div>
					<div className='flex items-center text-sm'>
						<MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
						<span className='line-clamp-1'>{event.location}</span>
					</div>
					<TicketCount eventId={event.id} />
				</div>
			</CardContent>
			<CardFooter className='w-full flex flex-col gap-2'>
				<div className='flex gap-2 w-full'>
					<Button
						variant='outline'
						className='flex-1'
						asChild>
						<Link href={`/event/${event.id}`}>
							<EyeIcon className='h-4 w-4' />
							View
						</Link>
					</Button>
					<Button
						variant='outline'
						className='flex-1'
						asChild>
						<Link href={`/event/${event.id}/edit`}>
							<EditIcon className='h-4 w-4' />
							Edit
						</Link>
					</Button>

					<CancelEvent
						event={event}
						profile={profile}
					/>
				</div>
				<Button
					variant='outline'
					className='w-full cursor-pointer'
					asChild>
					<Link href={`/dashboard/${event.id}/insights`}>
						<ChartBarIcon className='h-4 w-4' />
						Insights
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

async function TicketCount({ eventId }: { eventId: string }) {
	const ticketCount = await getTicketCountByEventId(eventId);

	return (
		<div className='flex items-center text-sm'>
			<UsersIcon className='mr-2 h-4 w-4 text-muted-foreground' />
			<span>{ticketCount} attendees</span>
		</div>
	);
}
