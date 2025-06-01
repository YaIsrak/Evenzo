'use client';

import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/model/event.model';
import {
	CalendarIcon,
	DollarSignIcon,
	MapPinIcon,
	PlusIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EventCard({ event }: { event: IEvent }) {
	return (
		<div className='group border rounded-lg overflow-hidden hover:bg-accent/50 transition-colors'>
			<Link
				href={`/event/${event.id}`}
				className='block'>
				<div className='aspect-video relative bg-muted'>
					<Image
						src={event.images?.[0] || ''}
						alt='Tech Conference'
						className='object-cover w-full h-full'
						fill
						placeholder='blur'
						blurDataURL='placeholder.png'
					/>
				</div>
				<div className='p-4 space-y-3'>
					<div className='space-y-1'>
						<h3 className='text-lg font-medium group-hover:text-primary transition-colors'>
							{event.title}
						</h3>
						<p className='text-sm text-muted-foreground line-clamp-2'>
							{event.description}
						</p>
					</div>
					<div className='flex flex-col gap-2 text-sm text-muted-foreground'>
						<div className='flex items-center gap-2'>
							<CalendarIcon className='size-4' />
							<span>
								{new Date(event.date).toLocaleDateString()} •{' '}
								{event.time}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<MapPinIcon className='size-4' />
							<span>{event.location}</span>
						</div>
						<div className='flex items-center gap-2'>
							<DollarSignIcon className='size-4' />
							<span>{event.capacity}</span>
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
					<Link href={`/event/${event.id}/join`}>
						<PlusIcon className='size-4' />
						Join Event
					</Link>
				</Button>
			</div>
		</div>
	);
}
