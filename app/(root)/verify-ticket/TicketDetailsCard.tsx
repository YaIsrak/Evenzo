'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ITicket } from '@/lib/model/ticket.model';

export default function TicketDetailsCard({ ticket }: { ticket: ITicket }) {
	return (
		<Card className='p-6'>
			<div className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h2 className='text-xl font-semibold'>Ticket Information</h2>
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
								{ticket.ticketId}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Ticket Type</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.accessLevel}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Purchase Date</p>
							<p className='text-sm text-muted-foreground'>
								{new Date(ticket.purchaseDate).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									},
								)}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Price</p>
							<p className='text-sm text-muted-foreground'>Free</p>
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
								{ticket.event.title}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Category</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.event.category}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Date & Time</p>
							<p className='text-sm text-muted-foreground'>
								{new Date(ticket.event.date).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									},
								)}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Location</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.event.location}
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
								{ticket.user.name}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Email</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.user.email}
							</p>
						</div>
						{ticket.user.phone && (
							<div>
								<p className='text-sm font-medium'>Phone</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.user.phone}
								</p>
							</div>
						)}
					</div>
				</div>

				<Separator className='my-4' />

				{/* Additional Information */}
				<div className='space-y-4'>
					<h3 className='text-sm font-medium text-muted-foreground'>
						Additional Information
					</h3>
					<div className='grid gap-4 sm:grid-cols-2'>
						{ticket.seatNumber && (
							<div>
								<p className='text-sm font-medium'>Seat Number</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.seatNumber}
								</p>
							</div>
						)}
						{ticket.accessLevel && (
							<div>
								<p className='text-sm font-medium'>Access Level</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.accessLevel}
								</p>
							</div>
						)}
						{ticket.specialRequirements && (
							<div>
								<p className='text-sm font-medium'>
									Special Requirements
								</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.specialRequirements}
								</p>
							</div>
						)}
						{ticket.notes && (
							<div>
								<p className='text-sm font-medium'>Notes</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.notes}
								</p>
							</div>
						)}
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
	);
}
