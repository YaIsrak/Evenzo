'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
	ticketId: z
		.string()
		.min(6, 'Ticket ID must be at least 6 characters')
		.max(20, 'Ticket ID must not exceed 20 characters'),
});

export default function VerifyTicketPage() {
	const [showTicketInfo, setShowTicketInfo] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ticketId: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// TODO: Implement ticket verification
			console.log('Verifying ticket:', values.ticketId);
			setShowTicketInfo(true);
		} catch (error) {
			toast.error('Failed to verify ticket');
		}
	}

	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='space-y-2'>
				<h1 className='text-3xl font-bold'>Verify Ticket</h1>
				<p className='text-muted-foreground'>
					Enter your ticket ID to verify its validity
				</p>
			</div>

			<Card className='p-6'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'>
						<FormField
							control={form.control}
							name='ticketId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ticket ID</FormLabel>
									<FormControl>
										<div className='flex gap-2'>
											<Input
												placeholder='Enter your ticket ID'
												{...field}
											/>
											<Button type='submit'>
												<TicketIcon className='mr-2 h-4 w-4' />
												Verify
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</Card>

			{/* Ticket Information Card - This will be shown after verification */}
			{showTicketInfo && (
				<Card className='p-6'>
					<div className='space-y-6'>
						<div className='flex items-center justify-between'>
							<h2 className='text-xl font-semibold'>
								Ticket Information
							</h2>
							<span className='px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full'>
								Valid
							</span>
						</div>

						{/* Ticket Details */}
						<div className='space-y-4'>
							<h3 className='text-sm font-medium text-muted-foreground'>
								Ticket Details
							</h3>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div>
									<p className='text-sm font-medium'>Ticket ID</p>
									<p className='text-sm text-muted-foreground'>
										TICK-2024-123456
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Ticket Type</p>
									<p className='text-sm text-muted-foreground'>
										VIP Pass
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Purchase Date</p>
									<p className='text-sm text-muted-foreground'>
										February 15, 2024
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Price</p>
									<p className='text-sm text-muted-foreground'>
										$199.00
									</p>
								</div>
							</div>
						</div>

						{/* Event Details */}
						<div className='space-y-4'>
							<h3 className='text-sm font-medium text-muted-foreground'>
								Event Details
							</h3>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div>
									<p className='text-sm font-medium'>Event Name</p>
									<p className='text-sm text-muted-foreground'>
										Tech Conference 2024
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Category</p>
									<p className='text-sm text-muted-foreground'>
										Technology
									</p>
								</div>
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
							</div>
						</div>

						{/* Attendee Information */}
						<div className='space-y-4'>
							<h3 className='text-sm font-medium text-muted-foreground'>
								Attendee Information
							</h3>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div>
									<p className='text-sm font-medium'>Full Name</p>
									<p className='text-sm text-muted-foreground'>
										John Doe
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Email</p>
									<p className='text-sm text-muted-foreground'>
										john.doe@example.com
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Phone</p>
									<p className='text-sm text-muted-foreground'>
										+1 (555) 123-4567
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Company</p>
									<p className='text-sm text-muted-foreground'>
										Tech Solutions Inc.
									</p>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className='space-y-4'>
							<h3 className='text-sm font-medium text-muted-foreground'>
								Additional Information
							</h3>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div>
									<p className='text-sm font-medium'>Seat Number</p>
									<p className='text-sm text-muted-foreground'>
										VIP-42
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Access Level</p>
									<p className='text-sm text-muted-foreground'>
										All Areas
									</p>
								</div>
								<div>
									<p className='text-sm font-medium'>
										Special Requirements
									</p>
									<p className='text-sm text-muted-foreground'>None</p>
								</div>
								<div>
									<p className='text-sm font-medium'>Notes</p>
									<p className='text-sm text-muted-foreground'>
										Includes lunch and networking session
									</p>
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className='flex justify-end gap-4 pt-4 border-t'>
							<Button
								variant='outline'
								size='sm'>
								Download Ticket
							</Button>
							<Button
								variant='outline'
								size='sm'>
								Share Ticket
							</Button>
						</div>
					</div>
				</Card>
			)}
		</div>
	);
}
