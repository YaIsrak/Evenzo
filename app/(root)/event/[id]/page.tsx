import ReviewList from '@/components/ReviewList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { IEvent } from '@/lib/model/event.model';
import { getEventById } from '@/lib/query/event.query';
import { getTicketsByEventId } from '@/lib/query/ticket.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { getStatusColor } from '@/lib/utils/getStatusColor';
import { Aperture, CalendarIcon, MapPinIcon } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { id } = await params;

	const event = await getEventById(id);

	return {
		title: event?.title || 'Event Details',
		description: event?.description || 'Event Details',
		openGraph: {
			images: event?.images || [],
		},
	};
}
export default async function EventPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const event = await getEventById(id);

	if (!event) notFound();

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between gap-4'>
					<h1 className='text-3xl font-bold'>{event.title}</h1>
					<Badge variant={getStatusColor(event.status)}>
						{event.status.charAt(0).toUpperCase() + event.status.slice(1)}
					</Badge>
				</div>
				<div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
					<div className='flex items-center gap-2'>
						<CalendarIcon className='size-4' />
						<span>
							{new Date(event.date).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
						</span>
					</div>
					<Link
						href={`https://maps.google.com/?q=${event.location}`}
						target='_blank'
						className='flex items-center gap-2 hover:underline'>
						<MapPinIcon className='size-4' />
						<span>{event.location}</span>
					</Link>
					<div className='flex items-center gap-2'>
						<Aperture className='size-4' />
						<span>Organizered by {event.organizer.name}</span>
					</div>
				</div>
			</div>

			{/* Image Grid */}
			<div className='grid grid-cols-3 gap-4 auto-rows-[200px]'>
				{event.images?.map((image, index) => {
					// Determine grid layout based on index
					const getGridClass = (index: number) => {
						if (index === 0) return 'col-span-2 row-span-2'; // First image is larger
						return 'col-span-1 row-span-1'; // Other images are smaller
					};

					return (
						<div
							key={index}
							className={`relative overflow-hidden rounded-lg ${getGridClass(
								index,
							)}`}>
							<Image
								src={image}
								alt={image}
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='/placeholder.png'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
						</div>
					);
				})}
			</div>

			{/* Event Details */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-6'>
					<div>
						<h2 className='text-2xl font-semibold mb-4'>
							About the Event
						</h2>
						<p className='text-muted-foreground whitespace-pre-wrap'>
							{event.description}
						</p>
					</div>

					<div>
						<h2 className='text-2xl font-semibold mb-4'>
							What to Expect
						</h2>
						<ul className='list-disc list-inside space-y-2 text-muted-foreground'>
							{event.highlights?.map((highlight, i) => (
								<li key={i}>{highlight}</li>
							))}
						</ul>
					</div>
				</div>

				<Suspense fallback={<EventDetailsSkeleton />}>
					<JoinButtonCard event={event} />
				</Suspense>
			</div>

			{/* Reviews Section */}
			<div className='space-y-6'>
				<h2 className='text-2xl font-semibold'>Reviews</h2>
				<ReviewList />
			</div>
		</div>
	);
}

async function JoinButtonCard({ event }: { event: IEvent }) {
	const profile = await getCurrentProfile();
	const tickets = await getTicketsByEventId(event.id);
	const myTicket = tickets?.find((ticket) => ticket.user._id === profile?.id);

	return (
		<div className='space-y-6'>
			<Card className='p-6'>
				<h3 className='text-xl font-semibold mb-4'>Join Event</h3>
				<div className='space-y-4'>
					<div>
						<p className='text-sm font-medium'>Date & Time</p>
						<p className='text-sm text-muted-foreground'>
							{new Date(event.date).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
							{event.time}
						</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Location</p>
						<p className='text-sm text-muted-foreground'>
							{event.location}
						</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Price</p>
						<p className='text-sm text-muted-foreground'>Free for All</p>
					</div>

					{myTicket ? (
						<Button
							className='w-full'
							variant='success'
							asChild>
							<Link href={`/tickets/${myTicket.ticketId}`}>
								View Ticket
							</Link>
						</Button>
					) : (
						<Button
							className='w-full'
							asChild>
							<Link href={`/event/${event.id}/join`}>Join Event</Link>
						</Button>
					)}
				</div>
			</Card>
		</div>
	);
}

function EventDetailsSkeleton() {
	return (
		<div className='space-y-6'>
			<Card className='p-6'>
				<Skeleton className='w-full h-10' />
				<div className='space-y-4'>
					<div>
						<Skeleton className='w-full h-10' />
					</div>
					<div>
						<Skeleton className='w-full h-10' />
					</div>
					<div>
						<Skeleton className='w-full h-10' />
					</div>

					<Skeleton className='w-full h-10' />
				</div>
			</Card>
		</div>
	);
}
