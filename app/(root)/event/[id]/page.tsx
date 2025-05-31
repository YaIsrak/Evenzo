'use client';

import ReviewList from '@/components/ReviewList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { eventImages } from '@/lib/constants';
import { CalendarIcon, DollarSignIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EventPage() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			{/* Header */}
			<div className='space-y-4'>
				<h1 className='text-3xl font-bold'>Tech Conference 2024</h1>
				<div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
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

			{/* Image Grid */}
			<div className='grid grid-cols-3 gap-4 auto-rows-[200px]'>
				{eventImages.map((image, index) => {
					// Determine grid layout based on index
					const getGridClass = (index: number) => {
						if (index === 0) return 'col-span-2 row-span-2'; // First image is larger
						return 'col-span-1 row-span-1'; // Other images are smaller
					};

					return (
						<div
							key={index}
							className={`relative overflow-hidden rounded-lg ${getGridClass(
								index,
							)}`}>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='/placeholder.png'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
						</div>
					);
				})}
			</div>

			{/* Event Details */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-6'>
					<div>
						<h2 className='text-2xl font-semibold mb-4'>
							About the Event
						</h2>
						<p className='text-muted-foreground'>
							Join us for a day of innovation and networking with
							industry leaders. Learn about the latest trends in
							technology and connect with like-minded professionals. This
							conference brings together experts from various fields to
							share their insights and experiences.
						</p>
					</div>

					<div>
						<h2 className='text-2xl font-semibold mb-4'>
							What to Expect
						</h2>
						<ul className='list-disc list-inside space-y-2 text-muted-foreground'>
							<li>Keynote speeches from industry leaders</li>
							<li>Interactive workshops and sessions</li>
							<li>Networking opportunities</li>
							<li>Latest technology demonstrations</li>
							<li>Q&A sessions with experts</li>
						</ul>
					</div>
				</div>

				<div className='space-y-6'>
					<Card className='p-6'>
						<h3 className='text-xl font-semibold mb-4'>Event Details</h3>
						<div className='space-y-4'>
							<div>
								<p className='text-sm font-medium'>Date & Time</p>
								<p className='text-sm text-muted-foreground'>
									March 15, 2024 • 9:00 AM - 5:00 PM
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Location</p>
								<p className='text-sm text-muted-foreground'>
									Convention Center, New York
								</p>
							</div>
							<div>
								<p className='text-sm font-medium'>Price</p>
								<p className='text-sm text-muted-foreground'>$199</p>
							</div>
							<Button
								className='w-full'
								asChild>
								<Link href='/event/1/join'>Join Event</Link>
							</Button>
						</div>
					</Card>
				</div>
			</div>

			{/* Reviews Section */}
			<div className='space-y-6'>
				<h2 className='text-2xl font-semibold'>Reviews</h2>
				<ReviewList />
			</div>
		</div>
	);
}
