import SignedIn from '@/components/auth/signed-in';
import EventCard from '@/components/EventCard';
import EventPagination from '@/components/EventPagination';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function MainPage() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8'>
			<SignedIn>
				<div className='flex justify-end'>
					<Button
						size='sm'
						asChild>
						<Link href='/create'>
							<PlusIcon className='size-4' />
							Create Event
						</Link>
					</Button>
				</div>
			</SignedIn>

			{/* Event grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<EventCard />
				<EventCard />
				<EventCard />
				<EventCard />
				<EventCard />
				<EventCard />
			</div>

			<EventPagination
				currentPage={1}
				totalPages={10}
				paginationItemsToDisplay={5}
			/>
		</div>
	);
}
