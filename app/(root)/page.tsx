import SignedIn from '@/components/auth/signed-in';
import EventCard from '@/components/EventCard';
import EventPagination from '@/components/EventPagination';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getEvents } from '@/lib/query/event.query';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function MainPage() {
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
			<Suspense fallback={<EventListSkeleton />}>
				<EventList />
			</Suspense>

			<EventPagination
				currentPage={1}
				totalPages={10}
				paginationItemsToDisplay={5}
			/>
		</div>
	);
}

async function EventList() {
	const events = await getEvents();

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{events.map((event) => (
				<EventCard
					key={event.id}
					event={event}
				/>
			))}
		</div>
	);
}

function EventListSkeleton() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{Array.from({ length: 6 }).map((_, index) => (
				<div
					className='group border rounded-lg overflow-hidden hover:bg-accent/10 transition-colors'
					key={index}>
					<div>
						<div className='aspect-video relative bg-muted'>
							<Skeleton className='w-full h-full' />
						</div>
						<div className='p-4 space-y-3'>
							<div className='space-y-1'>
								<div className='flex items-center justify-between gap-2'>
									<Skeleton className='w-full h-4' />
									<Skeleton className='w-full h-4' />
								</div>
								<div className='text-sm text-muted-foreground line-clamp-2'>
									<Skeleton className='w-full h-4' />
								</div>
							</div>
							<div className='flex flex-col gap-2 text-sm text-muted-foreground'>
								<div className='flex items-center gap-2'>
									<Skeleton className='w-2/3 h-4' />
								</div>
								<div className='flex items-center gap-2'>
									<Skeleton className='w-1/2 h-4' />
								</div>
							</div>
						</div>
					</div>
					<div className='px-4 pb-4'>
						<Skeleton className='w-full h-10' />
					</div>
				</div>
			))}
		</div>
	);
}
