import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/model/event.model';
import { getTicketsByEventId } from '@/lib/query/ticket.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { getStatusColor } from '@/lib/utils/getStatusColor';
import {
	Aperture,
	CalendarIcon,
	CheckIcon,
	ClockIcon,
	EyeIcon,
	MapPinIcon,
	PlusIcon,
	TicketIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Skeleton } from './ui/skeleton';

export default function EventCard({ event }: { event: IEvent }) {
	return (
		<div className='group border rounded-lg overflow-hidden hover:bg-accent/10 transition-colors'>
			<Link
				href={`/event/${event.id}`}
				className='block'>
				<div className='aspect-video relative bg-muted'>
					<Image
						src={event.images?.[0] || ''}
						alt='Tech Conference'
						className='object-cover w-full h-full'
						fill
						placeholder='blur'
						blurDataURL='placeholder.png'
					/>
				</div>
				<div className='p-4 space-y-3'>
					<div className='space-y-1'>
						<div className='flex items-center justify-between gap-2'>
							<h3 className='text-lg font-medium group-hover:text-primary transition-colors'>
								{event.title}
							</h3>
							<Badge variant={getStatusColor(event.status)}>
								{event.status.charAt(0).toUpperCase() +
									event.status.slice(1)}
							</Badge>
						</div>
						<p className='text-sm text-muted-foreground line-clamp-2'>
							{event.description}
						</p>
					</div>
					<div className='flex flex-col gap-2 text-sm text-muted-foreground'>
						<div className='flex items-center gap-2'>
							<CalendarIcon className='size-4' />
							<span className='flex items-center gap-1'>
								{new Date(event.date).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
								<span className='mx-1'>•</span>
								<ClockIcon className='size-4' />
								{event.time}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<MapPinIcon className='size-4' />
							<span>{event.location}</span>
						</div>
						<div className='flex items-center gap-2'>
							<Aperture className='size-4' />
							<span>Organizered by {event.organizer.name}</span>
						</div>
					</div>
				</div>
			</Link>
			<div className='px-4 pb-4'>
				<Suspense fallback={<Skeleton className='w-full h-10' />}>
					<JoinButton event={event} />
				</Suspense>
			</div>
		</div>
	);
}

async function JoinButton({ event }: { event: IEvent }) {
	const profile = await getCurrentProfile();
	const tickets = await getTicketsByEventId(event.id);
	const myTicket =
		tickets?.find((ticket) => ticket.user._id === profile?.id) || null;

	return (
		<div className='gap-2 w-full cursor-pointer'>
			{!myTicket ? (
				<Button
					className='w-full'
					size='sm'
					variant='outline'
					disabled={event.status === 'past'}
					asChild>
					<Link
						href={
							event.status === 'past'
								? `/event/${event.id}`
								: `/event/${event.id}/join`
						}>
						{event.status === 'past' ? (
							<EyeIcon className='size-4' />
						) : (
							<PlusIcon className='size-4' />
						)}
						{event.status === 'past' ? 'View' : 'Join Event'}
					</Link>
				</Button>
			) : (
				<div className='flex gap-2'>
					<Button
						size='sm'
						variant='outline'
						className='flex-1 text-green-500'
						asChild>
						<Link href={`/tickets/${myTicket?.ticketId}`}>
							<TicketIcon className='size-4' />
							View Ticket
						</Link>
					</Button>
					<Button
						size='sm'
						variant='outline'
						className='flex-1'
						asChild>
						<Link href={`/event/${event.id}`}>
							<CheckIcon className='size-4' />
							View Event
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
