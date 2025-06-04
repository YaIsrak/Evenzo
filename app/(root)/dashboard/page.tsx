import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IUser } from '@/lib/model/user.model';
import { getEventByUserId } from '@/lib/query/event.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import EventCard from './EventCard';

export default async function DashboardPage() {
	const profile = await getCurrentProfile();
	const events = await getEventByUserId(profile?.id);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='flex items-center justify-between'>
				<Header
					title='Dashboard'
					description='View and manage your events'
				/>
				<Button asChild>
					<Link href='/create'>
						<PlusIcon className='mr-2 h-4 w-4' />
						Create Event
					</Link>
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{events?.map((event) => (
					<EventCard
						key={event.id}
						event={event}
						profile={profile as IUser}
					/>
				))}
			</div>

			{events && events.length === 0 && (
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
