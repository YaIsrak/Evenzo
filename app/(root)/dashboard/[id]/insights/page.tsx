import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/badge';
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
import { getTicketsByEventId } from '@/lib/query/ticket.query';
import { getStatusColor } from '@/lib/utils/getStatusColor';
import { notFound } from 'next/navigation';
import DownloadCSV from './downloadCSV';

interface InsightPageProps {
	params: Promise<{ id: string }>;
}

export default async function InsightPage({ params }: InsightPageProps) {
	const { id } = await params;
	const tickets = await getTicketsByEventId(id);

	if (!tickets) {
		return notFound();
	}

	const typedTickets = tickets as ITicket[];

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
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold'>Event Tickets</h1>
					<Badge
						variant='outline'
						className='text-sm'>
						{tickets.length} Total Tickets
					</Badge>
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
								<CardTitle>Ticket List</CardTitle>
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
										</TableRow>
									</TableHeader>
									<TableBody>
										{(tickets as ITicket[]).map((ticket) => (
											<TableRow key={ticket.ticketId}>
												<TableCell className='font-medium'>
													#{ticket.ticketId}
												</TableCell>
												<TableCell>{ticket.seatNumber}</TableCell>
												<TableCell>{ticket.user.name}</TableCell>
												<TableCell>{ticket.user.email}</TableCell>
												<TableCell>
													<Badge
														variant={getStatusColor(
															ticket.status,
														)}>
														{ticket.status
															.charAt(0)
															.toUpperCase() +
															ticket.status.slice(1)}
													</Badge>
												</TableCell>
												<TableCell>
													{new Date(
														ticket.purchaseDate,
													).toLocaleDateString('en-US', {
														month: 'long',
														day: 'numeric',
														year: 'numeric',
													})}
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
