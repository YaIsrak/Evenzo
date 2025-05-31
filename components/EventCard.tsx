'use client';

import { Button } from '@/components/ui/button';
import {
	CalendarIcon,
	DollarSignIcon,
	MapPinIcon,
	PlusIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EventCard() {
	return (
		<div className='group border rounded-lg overflow-hidden hover:bg-accent/50 transition-colors'>
			<Link
				href='/event/1'
				className='block'>
				<div className='aspect-video relative bg-muted'>
					<Image
						src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070'
						alt='Tech Conference'
						className='object-cover w-full h-full'
						fill
						placeholder='blur'
						blurDataURL='https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070'
					/>
				</div>
				<div className='p-4 space-y-3'>
					<div className='space-y-1'>
						<h3 className='text-lg font-medium group-hover:text-primary transition-colors'>
							Tech Conference 2024
						</h3>
						<p className='text-sm text-muted-foreground line-clamp-2'>
							Join us for a day of innovation and networking with
							industry leaders. Learn about the latest trends in
							technology.
						</p>
					</div>
					<div className='flex flex-col gap-2 text-sm text-muted-foreground'>
						<div className='flex items-center gap-2'>
							<CalendarIcon className='size-4' />
							<span>March 15, 2024 • 9:00 AM</span>
						</div>
						<div className='flex items-center gap-2'>
							<MapPinIcon className='size-4' />
							<span>Convention Center, New York</span>
						</div>
						<div className='flex items-center gap-2'>
							<DollarSignIcon className='size-4' />
							<span>$199</span>
						</div>
					</div>
				</div>
			</Link>
			<div className='px-4 pb-4'>
				<Button
					size='sm'
					variant='outline'
					className='gap-2 w-full'
					asChild>
					<Link href='/event/1/join'>
						<PlusIcon className='size-4' />
						Join Event
					</Link>
				</Button>
			</div>
		</div>
	);
}
