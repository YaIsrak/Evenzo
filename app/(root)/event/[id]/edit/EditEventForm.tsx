'use client';

import { ImagesPreview } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateEvent } from '@/lib/actions/event.action';
import { eventCategories } from '@/lib/constants';
import { IEvent } from '@/lib/model/event.model';
import { IUser } from '@/lib/model/user.model';
import { cn } from '@/lib/utils';
import { eventFormSchema, EventFormValues } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
	const hour = Math.floor(i / 4);
	const minute = (i % 4) * 15;
	return format(new Date().setHours(hour, minute), 'HH:mm');
});

export default function EditEventForm({
	event,
	profile,
}: {
	event: IEvent;
	profile: IUser;
}) {
	const [images, setImages] = useState<string[]>(event.images || []);
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	const form = useForm<EventFormValues>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: {
			name: event.title,
			category: event.category as (typeof eventCategories)[number],
			date: new Date(event.date),
			time: event.time,
			location: event.location,
			description: event.description,
			highlights: event.highlights,
			capacity: event.capacity.toString(),
			organizer: profile.name,
			organizerLink: '',
		},
	});

	async function onSubmit(values: EventFormValues) {
		try {
			if (images.length === 0) {
				toast.error('Please upload at least one image');
				return;
			}

			await updateEvent(event.id.toString(), images, values, profile.id);
			toast.success('Event updated successfully');
			router.push(`/event/${event.id}`);
		} catch (error) {
			toast.error('Failed to update event', {
				description: (error as Error).message,
			});
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<div className='grid gap-6 md:grid-cols-2'>
					{/* Event Name */}
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='col-span-2 md:col-span-1'>
								<FormLabel>Event Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter event name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Category */}
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl className='w-full'>
										<SelectTrigger>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{eventCategories.map((category) => (
											<SelectItem
												key={category}
												value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Date */}
					<FormField
						control={form.control}
						name='date'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date <
												new Date(new Date().setHours(0, 0, 0, 0))
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Time */}
					<FormField
						control={form.control}
						name='time'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select time' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{timeSlots.map((time) => (
											<SelectItem
												key={time}
												value={time}>
												{time}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='col-span-2'>
						<ImagesPreview images={images} />
					</div>

					{/* Location */}
					<FormField
						control={form.control}
						name='location'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter event location'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Capacity */}
					<FormField
						control={form.control}
						name='capacity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Capacity</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Enter maximum capacity'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Organizer */}
					<FormField
						control={form.control}
						name='organizer'
						render={({ field }) => (
							<FormItem className='col-span-2 md:col-span-1'>
								<FormLabel>Organizer</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter organizer name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Organizer Link */}
					<FormField
						control={form.control}
						name='organizerLink'
						render={({ field }) => (
							<FormItem className='col-span-2 md:col-span-1'>
								<FormLabel>
									Organizer Website/Social Link (Optional)
								</FormLabel>
								<FormControl>
									<Input
										placeholder='https://example.com'
										type='url'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Description */}
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Enter event description'
									className='min-h-[120px]'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Provide a detailed description of your event
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* What to Expect */}
				<FormField
					control={form.control}
					name='highlights'
					render={({ field }) => (
						<FormItem>
							<FormLabel>What to Expect</FormLabel>
							<FormControl>
								<div className='space-y-4'>
									<div className='flex gap-2'>
										<Input
											placeholder='Add a highlight (e.g., Keynote speeches from industry leaders)'
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													const input =
														e.target as HTMLInputElement;
													if (input.value.trim()) {
														field.onChange([
															...field.value,
															input.value.trim(),
														]);
														input.value = '';
													}
												}
											}}
										/>
										<Button
											type='button'
											variant='outline'
											onClick={() => {
												const input = document.querySelector(
													'input[placeholder*="Add a highlight"]',
												) as HTMLInputElement;
												if (input?.value.trim()) {
													field.onChange([
														...field.value,
														input.value.trim(),
													]);
													input.value = '';
												}
											}}>
											Add
										</Button>
									</div>
									{field.value.length > 0 && (
										<ul className='space-y-2'>
											{field.value.map((highlight, index) => (
												<li
													key={index}
													className='flex items-center justify-between p-2 bg-muted rounded-md'>
													<span>{highlight}</span>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														onClick={() => {
															field.onChange(
																field.value.filter(
																	(_, i) => i !== index,
																),
															);
														}}>
														Remove
													</Button>
												</li>
											))}
										</ul>
									)}
								</div>
							</FormControl>
							<FormDescription>
								Add highlights of what attendees can expect at your
								event
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end gap-2'>
					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						size='sm'>
						Create Event
					</Button>
				</div>
			</form>
		</Form>
	);
}
