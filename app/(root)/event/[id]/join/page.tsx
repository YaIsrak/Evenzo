import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { getEventById } from '@/lib/query/event.query';
import { getTicketsByEventId } from '@/lib/query/ticket.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import EventJoinForm from './EventJoinForm';

export default async function EventJoinPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const event = await getEventById(id);
	const profile = await getCurrentProfile();
	const tickets = await getTicketsByEventId(id);
	const myTicket = tickets?.find((ticket) => ticket.user._id === profile?.id);

	if (!profile) notFound();
	if (!event) notFound();

	if (event.status === 'past' || event.status === 'cancelled') {
		redirect(`/event/${id}`);
	}

	if (myTicket) {
		redirect(`/event/${id}`);
	}

	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<Header
				title={`Join ${event.title}`}
				description='Complete the form below to register for the event'
			/>

			{/* Event Details Summary */}
			<Card className='p-6'>
				<div className='space-y-4'>
					<div className='aspect-video relative rounded-lg overflow-hidden bg-muted'>
						<Image
							src={event.images?.[0] || ''}
							alt={event.title}
							className='object-cover'
							fill
							placeholder='blur'
							blurDataURL='/placeholder.png'
						/>
					</div>
					<h2 className='text-xl font-semibold'>Event Details</h2>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div className='flex items-center gap-2'>
							<CalendarIcon className='size-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Date & Time</p>
								<p className='text-sm text-muted-foreground'>
									{new Date(event.date).toLocaleDateString('en-US', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
									})}{' '}
									• {event.time}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<MapPinIcon className='size-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Location</p>
								<p className='text-sm text-muted-foreground'>
									{event.location}
								</p>
							</div>
						</div>
					</div>
					<p className='text-sm text-muted-foreground whitespace-pre-wrap'>
						{event.description}
					</p>
				</div>
			</Card>

			<EventJoinForm
				profile={profile}
				event={event}
			/>
		</div>
	);
}
