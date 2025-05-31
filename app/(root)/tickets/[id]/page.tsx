'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CalendarIcon,
	DownloadIcon,
	ExternalLinkIcon,
	MapPinIcon,
	ShareIcon,
	TicketIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// This would typically come from your database
const getTicketDetails = async (id: string) => {
	// Simulated API call
	return {
		id,
		ticketId: 'TICK-2024-123456',
		ticketType: 'VIP Pass',
		purchaseDate: 'February 15, 2024',
		price: 199.0,
		status: 'Valid',
		eventId: 'event-123',
		event: {
			name: 'Tech Conference 2024',
			category: 'Technology',
			date: 'March 15, 2024',
			time: '9:00 AM - 5:00 PM',
			location: 'Convention Center, New York',
			description:
				'Join us for a day of innovation and networking with industry leaders. Learn about the latest trends in technology and connect with like-minded professionals.',
		},
		attendee: {
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '+1 (555) 123-4567',
			company: 'Tech Solutions Inc.',
		},
		additional: {
			seatNumber: 'VIP-42',
			accessLevel: 'All Areas',
			specialRequirements: 'None',
			notes: 'Includes lunch and networking session',
		},
	};
};

export default function TicketDetailsPage() {
	const params = useParams();
	const [ticket, setTicket] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTicket = async () => {
			try {
				const data = await getTicketDetails(params?.id as string);
				setTicket(data);
			} catch (error) {
				toast.error('Failed to load ticket details');
			} finally {
				setLoading(false);
			}
		};

		fetchTicket();
	}, [params.id]);

	const handleDownload = () => {
		// TODO: Implement ticket download
		toast.success('Ticket downloaded successfully!');
	};

	const handleShare = () => {
		if (!ticket) return;
		// TODO: Implement ticket sharing
		if (navigator.share) {
			navigator
				.share({
					title: 'My Event Ticket',
					text: `Check out my ticket for ${ticket.event.name}!`,
					url: window.location.href,
				})
				.catch(() => {
					toast.error('Failed to share ticket');
				});
		} else {
			navigator.clipboard.writeText(window.location.href);
			toast.success('Ticket link copied to clipboard!');
		}
	};

	const handleViewVenue = () => {
		if (!ticket) return;
		// TODO: Implement venue view
		window.open(
			'https://maps.google.com/?q=' +
				encodeURIComponent(ticket.event.location),
			'_blank',
		);
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
					<p className='mt-4 text-muted-foreground'>
						Loading ticket details...
					</p>
				</div>
			</div>
		);
	}

	if (!ticket) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<h2 className='text-2xl font-semibold mb-2'>Ticket Not Found</h2>
					<p className='text-muted-foreground mb-4'>
						The ticket you're looking for doesn't exist or has been
						removed.
					</p>
					<Button asChild>
						<Link href='/tickets'>View All Tickets</Link>
					</Button>
				</div>
			</div>
		);
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
					<Button
						variant='outline'
						size='sm'
						onClick={handleDownload}>
						<DownloadIcon className='mr-2 h-4 w-4' />
						Download
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={handleShare}>
						<ShareIcon className='mr-2 h-4 w-4' />
						Share
					</Button>
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
						<Separator className='my-4' />
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
									{ticket.ticketType}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Purchase Date</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.purchaseDate}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Price</p>
								<p className='text-sm text-muted-foreground'>
									${ticket.price.toFixed(2)}
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
								<Link href={`/event/${ticket.eventId}`}>
									<ExternalLinkIcon className='mr-2 h-4 w-4' />
									View Event
								</Link>
							</Button>
						</div>
						<div className='space-y-4'>
							<div>
								<h3 className='text-lg font-medium'>
									{ticket.event.name}
								</h3>
								<p className='text-sm text-muted-foreground'>
									{ticket.event.category}
								</p>
							</div>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div>
									<p className='text-sm font-medium'>Date & Time</p>
									<p className='text-sm text-muted-foreground'>
										{ticket.event.date} • {ticket.event.time}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Location</p>
									<p className='text-sm text-muted-foreground'>
										{ticket.event.location}
									</p>
								</div>
							</div>
							<p className='text-sm text-muted-foreground'>
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
									{ticket.attendee.name}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Email</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.attendee.email}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Phone</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.attendee.phone}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Company</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.attendee.company}
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
						<div className='space-y-2'>
							<Button
								className='w-full justify-start'
								variant='outline'
								onClick={handleDownload}>
								<DownloadIcon className='mr-2 h-4 w-4' />
								Download Ticket
							</Button>
							<Button
								className='w-full justify-start'
								variant='outline'
								onClick={handleShare}>
								<ShareIcon className='mr-2 h-4 w-4' />
								Share Ticket
							</Button>
							<Button
								className='w-full justify-start'
								variant='outline'
								onClick={handleViewVenue}>
								<MapPinIcon className='mr-2 h-4 w-4' />
								View Venue
							</Button>
						</div>
					</Card>

					{/* Additional Information */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>
							Additional Information
						</h2>
						<div className='space-y-4'>
							<div>
								<p className='text-sm font-medium'>Seat Number</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.additional.seatNumber}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Access Level</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.additional.accessLevel}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>
									Special Requirements
								</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.additional.specialRequirements}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Notes</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.additional.notes}
								</p>
							</div>
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
