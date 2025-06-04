import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getTicketsByUserId } from '@/lib/query/ticket.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { TicketIcon } from 'lucide-react';
import Link from 'next/link';
import TicketCard from './ticket-card';

export default async function TicketsPage() {
	const profile = await getCurrentProfile();
	const tickets = await getTicketsByUserId(profile?.id);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='flex items-center justify-between'>
				<Header
					title='My Tickets'
					description='View and manage your event tickets'
				/>
				<Button
					asChild
					size='sm'>
					<Link href='/'>
						<TicketIcon className='mr-2 h-4 w-4' />
						Browse Events
					</Link>
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{tickets?.map((ticket) => (
					<TicketCard
						key={ticket.id}
						ticket={ticket}
					/>
				))}
			</div>

			{tickets && tickets.length === 0 && (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-12 text-center'>
						<TicketIcon className='h-12 w-12 text-muted-foreground mb-4' />
						<h3 className='text-lg font-semibold'>No tickets found</h3>
						<p className='text-muted-foreground mt-2'>
							You haven't purchased any tickets yet.
						</p>
						<Button
							className='mt-4'
							asChild>
							<Link href='/'>Browse Events</Link>
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
