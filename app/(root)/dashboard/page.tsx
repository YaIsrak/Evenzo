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
import { Event, events } from '@/lib/constants';
import {
	CalendarIcon,
	EditIcon,
	EyeIcon,
	MapPinIcon,
	PlusIcon,
	TrashIcon,
	UsersIcon,
} from 'lucide-react';
import Link from 'next/link';

// This would typically come from your database
const getUserEvents = async (): Promise<Event[]> => {
	// Simulated API call
	return events;
};

function getEventStatus(date: string): 'upcoming' | 'ongoing' | 'past' {
	const eventDate = new Date(date);
	const today = new Date();

	if (eventDate < today) return 'past';
	if (eventDate.toDateString() === today.toDateString()) return 'ongoing';
	return 'upcoming';
}

function getStatusColor(status: 'upcoming' | 'ongoing' | 'past') {
	switch (status) {
		case 'upcoming':
			return 'bg-blue-500';
		case 'ongoing':
			return 'bg-green-500';
		case 'past':
			return 'bg-gray-500';
	}
}

export default async function DashboardPage() {
	const events = await getUserEvents();

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>My Events</h1>
					<p className='text-muted-foreground mt-2'>
						Manage your created events and track their performance
					</p>
				</div>
				<Button asChild>
					<Link href='/create'>
						<PlusIcon className='mr-2 h-4 w-4' />
						Create Event
					</Link>
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{events.map((event) => {
					const status = getEventStatus(event.date);
					return (
						<Card
							key={event.id}
							className='flex flex-col'>
							<CardHeader>
								<div className='flex items-start justify-between'>
									<div className='space-y-1'>
										<CardTitle className='line-clamp-1'>
											{event.name}
										</CardTitle>
										<CardDescription>
											{event.category}
										</CardDescription>
									</div>
									<Badge className={getStatusColor(status)}>
										{status.charAt(0).toUpperCase() + status.slice(1)}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className='flex-1 space-y-4'>
								<div className='space-y-2'>
									<div className='flex items-center text-sm'>
										<CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
										<span>
											{event.date} • {event.time}
										</span>
									</div>
									<div className='flex items-center text-sm'>
										<MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
										<span className='line-clamp-1'>
											{event.location}
										</span>
									</div>
									<div className='flex items-center text-sm'>
										<UsersIcon className='mr-2 h-4 w-4 text-muted-foreground' />
										<span>{event.attendees} attendees</span>
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
								<Button
									variant='destructive'
									className='flex-1'>
									<TrashIcon className='mr-2 h-4 w-4' />
									Delete
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>

			{events.length === 0 && (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-12 text-center'>
						<PlusIcon className='h-12 w-12 text-muted-foreground mb-4' />
						<h3 className='text-lg font-semibold'>
							No events created yet
						</h3>
						<p className='text-muted-foreground mt-2'>
							Start by creating your first event
						</p>
						<Button
							className='mt-4'
							asChild>
							<Link href='/create'>Create Event</Link>
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
