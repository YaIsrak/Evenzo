import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventJoinLoading() {
	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<Header
				title='Loading Event'
				description='Please wait while we load the event details'
			/>

			{/* Event Details Summary */}
			<Card className='p-6'>
				<div className='space-y-4'>
					<div className='aspect-video relative rounded-lg overflow-hidden bg-muted'>
						<Skeleton className='w-full h-full' />
					</div>
					<h2 className='text-xl font-semibold'>Event Details</h2>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div className='flex items-center gap-2'>
							<Skeleton className='size-5' />
							<div className='space-y-2'>
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-4 w-32' />
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<Skeleton className='size-5' />
							<div className='space-y-2'>
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-4 w-32' />
							</div>
						</div>
					</div>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-3/4' />
					</div>
				</div>
			</Card>

			{/* Form Loading State */}
			<Card className='p-6'>
				<div className='space-y-6'>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-32' />
						<Skeleton className='h-10 w-full' />
					</div>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-32' />
						<Skeleton className='h-10 w-full' />
					</div>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-32' />
						<Skeleton className='h-10 w-full' />
					</div>
					<Skeleton className='h-10 w-full' />
				</div>
			</Card>
		</div>
	);
}
