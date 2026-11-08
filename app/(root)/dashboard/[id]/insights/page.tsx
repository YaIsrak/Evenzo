import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ITicket } from '@/lib/model/ticket.model';
import { getEventById } from '@/lib/query/event.query';
import { getTicketsByEventId } from '@/lib/query/ticket.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { getStatusColor } from '@/lib/utils/getStatusColor';
import { ArrowLeftIcon, QrCodeIcon, UserCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import DownloadCSV from './downloadCSV';

interface InsightPageProps {
	params: Promise<{ id: string }>;
}

export default async function InsightPage({ params }: InsightPageProps) {
	const { id } = await params;

	const profile = await getCurrentProfile();
	if (!profile) {
		redirect(
			`/sign-in?redirect=${encodeURIComponent(`/dashboard/${id}/insights`)}`,
		);
	}

	const event = await getEventById(id);
	if (!event) {
		return notFound();
	}

	// Verify ownership: only the event organizer can view insights
	const organizerId =
		(event.organizer as any)?._id?.toString() ||
		(event.organizer as any)?.id?.toString() ||
		event.organizer?.toString();
	const profileId =
		profile.id?.toString() || (profile as any)?._id?.toString();

	if (organizerId !== profileId) {
		redirect('/dashboard');
	}

	const tickets = (await getTicketsByEventId(id)) || [];
	const typedTickets = tickets as ITicket[];
	const checkedInCount = typedTickets.filter((t) => t.status === 'used').length;

	// Group tickets by purchase date
	const ticketsByDate = typedTickets.reduce((acc, ticket) => {
		const date = new Date(ticket.purchaseDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
		acc[date] = (acc[date] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	// Sort dates chronologically
	const sortedDates = Object.keys(ticketsByDate).sort((a, b) => {
		const dateA = new Date(a);
		const dateB = new Date(b);
		return dateA.getTime() - dateB.getTime();
	});

	const chartData = {
		labels: sortedDates,
		datasets: [
			{
				label: 'Tickets Purchased',
				data: sortedDates.map((date) => ticketsByDate[date]),
				backgroundColor: sortedDates.map(() => 'rgb(59, 130, 246)'), // blue-500
			},
		],
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='space-y-6'>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
					<div className='space-y-1'>
						<div className='flex items-center gap-2'>
							<Button
								variant='ghost'
								size='icon'
								className='size-8'
								asChild>
								<Link href='/dashboard'>
									<ArrowLeftIcon className='size-4' />
								</Link>
							</Button>
							<h1 className='text-2xl font-bold'>{event.title} - Insights</h1>
						</div>
						<p className='text-sm text-muted-foreground ml-10'>
							Manage attendee registrations and ticket analytics
						</p>
					</div>

					<div className='flex flex-wrap items-center gap-2 self-start sm:self-auto'>
						<Badge
							variant='outline'
							className='text-sm'>
							{tickets.length} / {event.capacity} Registered
						</Badge>
						<Badge
							variant='secondary'
							className='text-sm bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'>
							<UserCheckIcon className='size-3 mr-1' />
							{checkedInCount} / {tickets.length} Checked In
						</Badge>
						<Button
							size='sm'
							className='gap-1.5'
							asChild>
							<Link href='/verify-ticket'>
								<QrCodeIcon className='size-4' />
								Live Check-In Scanner
							</Link>
						</Button>
					</div>
				</div>

				{tickets.length > 0 && (
					<>
						{/* Ticket Statistics Chart */}
						<Card>
							<CardHeader>
								<CardTitle>Ticket Purchases Over Time</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='h-[300px]'>
									<BarChart data={chartData} />
								</div>
							</CardContent>
						</Card>

						{/* Tickets Table */}
						<Card>
							<CardHeader>
								<CardTitle>Attendee List & Check-In Status</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='flex justify-end mb-4'>
									<DownloadCSV
										typedTickets={typedTickets}
										eventId={id}
									/>
								</div>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Ticket ID</TableHead>
											<TableHead>Seat</TableHead>
											<TableHead>Attendee</TableHead>
											<TableHead>Email</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Purchase Date</TableHead>
											<TableHead>Check-In Time</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{typedTickets.map((ticket) => (
											<TableRow key={ticket.ticketId}>
												<TableCell className='font-medium font-mono text-xs'>
													#{ticket.ticketId}
												</TableCell>
												<TableCell>{ticket.seatNumber}</TableCell>
												<TableCell>{ticket.user?.name || 'N/A'}</TableCell>
												<TableCell>{ticket.user?.email || 'N/A'}</TableCell>
												<TableCell>
													<Badge
														variant={getStatusColor(
															ticket.status,
														)}>
														{ticket.status === 'used'
															? 'Checked In'
															: ticket.status
																	.charAt(0)
																	.toUpperCase() +
																ticket.status.slice(1)}
													</Badge>
												</TableCell>
												<TableCell>
													{new Date(
														ticket.purchaseDate,
													).toLocaleDateString('en-US', {
														month: 'short',
														day: 'numeric',
														year: 'numeric',
													})}
												</TableCell>
												<TableCell className='text-xs text-muted-foreground'>
													{ticket.checkedInAt
														? new Date(
																ticket.checkedInAt,
															).toLocaleTimeString(
																'en-US',
																{
																	hour: '2-digit',
																	minute: '2-digit',
																},
															)
														: '—'}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</>
				)}

				{tickets.length === 0 && (
					<Card>
						<CardContent className='flex flex-col items-center justify-center py-12 text-center'>
							<h3 className='text-lg font-semibold'>No tickets found</h3>
							<p className='text-muted-foreground mt-2'>
								There are no tickets for this event yet.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
