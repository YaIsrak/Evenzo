import QrCodeImage from '@/components/QrCodeImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getTicketByTicketId } from '@/lib/query/ticket.query';
import {
	CalendarIcon,
	ExternalLinkIcon,
	MapPinIcon,
	TicketIcon,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import DownloadButton from './DownloadButton';
import ShareButton from './ShareButton';

export default async function TicketDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const ticket = await getTicketByTicketId(id);

	if (!ticket) {
		return notFound();
	}

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div className='space-y-1'>
					<h1 className='text-3xl font-bold'>Ticket Details</h1>
					<p className='text-muted-foreground'>
						View and manage your ticket information
					</p>
				</div>
				<div className='flex gap-2'>
					<DownloadButton />
					<ShareButton />
				</div>
			</div>

			{/* Main Content */}
			<div className='grid gap-6 md:grid-cols-3'>
				{/* Left Column - Ticket Info */}
				<div className='md:col-span-2 space-y-6'>
					{/* Ticket Status */}
					<Card className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<TicketIcon className='h-5 w-5 text-primary' />
								<h2 className='text-xl font-semibold'>Ticket Status</h2>
							</div>
							<span className='px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full'>
								{ticket.status}
							</span>
						</div>
						<Separator className='' />
						<div className='grid gap-4 sm:grid-cols-2'>
							<div>
								<p className='text-sm font-medium'>Ticket ID</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.ticketId}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Ticket Type</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.accessLevel}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Purchase Date</p>
								<p className='text-sm text-muted-foreground'>
									{new Date(ticket.purchaseDate).toLocaleDateString(
										'en-US',
										{
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										},
									)}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Price</p>
								<p className='text-sm text-muted-foreground'>
									Free for all
								</p>
							</div>
						</div>
					</Card>

					{/* Event Details */}
					<Card className='p-6'>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center gap-2'>
								<CalendarIcon className='h-5 w-5 text-primary' />
								<h2 className='text-xl font-semibold'>Event Details</h2>
							</div>
							<Button
								variant='outline'
								size='sm'
								asChild>
								<Link href={`/event/${ticket.event._id}`}>
									<ExternalLinkIcon className='mr-2 h-4 w-4' />
									View Event
								</Link>
							</Button>
						</div>
						<div className='space-y-4'>
							<div>
								<h3 className='text-lg font-medium'>
									{ticket.event.title}
								</h3>
								<p className='text-sm text-muted-foreground'>
									{ticket.event.category}
								</p>
							</div>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div>
									<p className='text-sm font-medium'>Date & Time</p>
									<p className='text-sm text-muted-foreground'>
										{new Date(ticket.event.date).toLocaleDateString()}{' '}
										•{' '}
										{new Date(ticket.event.time).toLocaleTimeString()}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Location</p>
									<p className='text-sm text-muted-foreground'>
										{ticket.event.location}
									</p>
								</div>
							</div>
							<p className='text-sm text-muted-foreground whitespace-pre-wrap'>
								{ticket.event.description}
							</p>
						</div>
					</Card>

					{/* Attendee Information */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>
							Attendee Information
						</h2>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div>
								<p className='text-sm font-medium'>Full Name</p>
								<p className='text-sm text-muted-foreground'>
									{ticket?.user.name}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Email</p>
								<p className='text-sm text-muted-foreground'>
									{ticket?.user.email}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Phone</p>
								<p className='text-sm text-muted-foreground'>
									{ticket?.user?.phone}
								</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Right Column - Additional Info */}
				<div className='space-y-6'>
					{/* Quick Actions */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>

						<Suspense
							fallback={<Skeleton className='w-full aspect-square' />}>
							<QrCodeImage text={`${ticket.ticketId}`} />
						</Suspense>

						<div className='space-y-2'>
							<DownloadButton className='w-full justify-start' />
							<ShareButton className='w-full justify-start' />

							<Button
								className='w-full justify-start'
								variant='outline'
								asChild>
								<Link
									href={`https://maps.google.com/?q=${ticket.event.location}`}
									target='_blank'>
									<MapPinIcon className='mr-2 h-4 w-4' />
									View Venue
								</Link>
							</Button>
						</div>
					</Card>

					{/* Additional Information */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold'>
							Additional Information
						</h2>
						<div className='space-y-4'>
							<div>
								<p className='text-sm font-medium'>Seat Number</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.seatNumber}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Access Level</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.accessLevel}
								</p>
							</div>
							{ticket.specialRequirements && (
								<div>
									<p className='text-sm font-medium'>
										Special Requirements
									</p>
									<p className='text-sm text-muted-foreground'>
										{ticket.specialRequirements}
									</p>
								</div>
							)}
							{ticket.notes && (
								<div>
									<p className='text-sm font-medium'>Notes</p>
									<p className='text-sm text-muted-foreground'>
										{ticket.notes}
									</p>
								</div>
							)}
						</div>
					</Card>

					{/* Need Help? */}
					<Card className='p-6 bg-muted/50'>
						<h2 className='text-xl font-semibold mb-2'>Need Help?</h2>
						<p className='text-sm text-muted-foreground mb-4'>
							Having trouble with your ticket? Contact our support team.
						</p>
						<Button className='w-full'>Contact Support</Button>
					</Card>
				</div>
			</div>
		</div>
	);
}
