import { reviewsDemoList } from '@/lib/constants';
import { StarIcon, UserIcon } from 'lucide-react';
import { Card } from './ui/card';

export default function ReviewList() {
	return (
		<div className='grid gap-4'>
			{reviewsDemoList.map((review) => (
				<Card
					key={review.id}
					className='p-6'>
					<div className='flex items-start justify-between'>
						<div className='flex items-center gap-4'>
							<div className='size-10 rounded-full bg-muted flex items-center justify-center'>
								<UserIcon className='size-5' />
							</div>
							<div>
								<p className='font-medium'>{review.user}</p>
								<p className='text-sm text-muted-foreground'>
									{review.date}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-1'>
							{Array.from({ length: review.rating }).map((_, i) => (
								<StarIcon
									key={i}
									className='size-4 fill-yellow-400 text-yellow-400'
								/>
							))}
						</div>
					</div>
					<p className='text-muted-foreground'>{review.comment}</p>
				</Card>
			))}
		</div>
	);
}
