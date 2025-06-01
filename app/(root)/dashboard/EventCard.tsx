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
import { getStatusColor } from '@/lib/utils/getStatusColor';
import {
	CalendarIcon,
	EditIcon,
	EyeIcon,
	MapPinIcon,
	UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import CancelEvent from './CancelEvent';

const EventCard = ({ event, profile }: { event: IEvent; profile: IUser }) => {
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
					<div className='flex items-center text-sm'>
						<UsersIcon className='mr-2 h-4 w-4 text-muted-foreground' />
						{/* todo: get attendees count */}
						<span>{event.capacity} attendees</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex gap-2'>
				<Button
					variant='outline'
					className='flex-1'
					asChild>
					<Link href={`/event/${event.id}`}>
						<EyeIcon className='mr-2 h-4 w-4' />
						View
					</Link>
				</Button>
				<Button
					variant='outline'
					className='flex-1'
					asChild>
					<Link href={`/event/${event.id}/edit`}>
						<EditIcon className='mr-2 h-4 w-4' />
						Edit
					</Link>
				</Button>
				<CancelEvent
					event={event}
					profile={profile}
				/>
			</CardFooter>
		</Card>
	);
};

export default EventCard;
