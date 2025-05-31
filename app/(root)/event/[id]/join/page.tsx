import { Card } from '@/components/ui/card';
import { CalendarIcon, DollarSignIcon, MapPinIcon } from 'lucide-react';
import EventJoinForm from './EventJoinForm';

// This would typically come from your database
const getEventDetails = async (id: string) => {
	// Simulated API call
	return {
		id,
		name: 'Tech Conference 2024',
		date: 'March 15, 2024',
		time: '9:00 AM - 5:00 PM',
		location: 'Convention Center, New York',
		price: 199,
		description:
			'Join us for a day of innovation and networking with industry leaders. Learn about the latest trends in technology and connect with like-minded professionals.',
	};
};

export default async function EventJoinPage({
	params,
}: {
	params: { id: string };
}) {
	const event = await getEventDetails(params.id);

	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='space-y-2'>
				<h1 className='text-3xl font-bold'>Join {event.name}</h1>
				<p className='text-muted-foreground'>
					Complete the form below to register for the event
				</p>
			</div>

			{/* Event Details Summary */}
			<Card className='p-6'>
				<div className='space-y-4'>
					<h2 className='text-xl font-semibold'>Event Details</h2>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div className='flex items-center gap-2'>
							<CalendarIcon className='size-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Date & Time</p>
								<p className='text-sm text-muted-foreground'>
									{event.date} • {event.time}
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
						<div className='flex items-center gap-2'>
							<DollarSignIcon className='size-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Price</p>
								<p className='text-sm text-muted-foreground'>
									${event.price}
								</p>
							</div>
						</div>
					</div>
					<p className='text-sm text-muted-foreground'>
						{event.description}
					</p>
				</div>
			</Card>

			<EventJoinForm />
		</div>
	);
}
