import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			{/* Header Skeleton */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between gap-4'>
					<Skeleton className='h-10 w-[300px]' />
					<Skeleton className='h-6 w-24' />
				</div>
				<div className='flex flex-wrap gap-4'>
					<Skeleton className='h-5 w-32' />
					<Skeleton className='h-5 w-40' />
					<Skeleton className='h-5 w-28' />
				</div>
			</div>

			{/* Image Grid Skeleton */}
			<div className='grid grid-cols-3 gap-4 auto-rows-[200px]'>
				<Skeleton className='col-span-2 row-span-2 rounded-lg' />
				<Skeleton className='col-span-1 row-span-1 rounded-lg' />
				<Skeleton className='col-span-1 row-span-1 rounded-lg' />
			</div>

			{/* Event Details Skeleton */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-6'>
					<div>
						<Skeleton className='h-8 w-48 mb-4' />
						<Skeleton className='h-24 w-full' />
					</div>
					<div>
						<Skeleton className='h-8 w-48 mb-4' />
						<div className='space-y-2'>
							<Skeleton className='h-5 w-full' />
							<Skeleton className='h-5 w-full' />
							<Skeleton className='h-5 w-3/4' />
						</div>
					</div>
				</div>

				{/* Join Button Card Skeleton */}
				<div className='space-y-6'>
					<Card className='p-6'>
						<Skeleton className='h-8 w-32 mb-4' />
						<div className='space-y-4'>
							<div>
								<Skeleton className='h-5 w-24 mb-2' />
								<Skeleton className='h-5 w-40' />
							</div>
							<div>
								<Skeleton className='h-5 w-24 mb-2' />
								<Skeleton className='h-5 w-40' />
							</div>
							<div>
								<Skeleton className='h-5 w-24 mb-2' />
								<Skeleton className='h-5 w-32' />
							</div>
							<Skeleton className='h-10 w-full' />
						</div>
					</Card>
				</div>
			</div>

			{/* Reviews Section Skeleton */}
			<div className='space-y-6'>
				<Skeleton className='h-8 w-32' />
				<div className='space-y-4'>
					<Skeleton className='h-32 w-full' />
					<Skeleton className='h-32 w-full' />
				</div>
			</div>
		</div>
	);
}
