'use client';

import ShareButton from '@/app/(root)/tickets/[id]/ShareButton';
import DownloadTicket from '@/components/download-ticket';
import QrCodeImage from '@/components/QrCodeImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { checkInTicket, resetTicketCheckIn } from '@/lib/actions/ticket.action';
import { ITicket } from '@/lib/model/ticket.model';
import { cn } from '@/lib/utils';
import {
	AlertCircleIcon,
	CheckCircle2Icon,
	ClockIcon,
	Loader2,
	RotateCcwIcon,
	UserCheckIcon,
} from 'lucide-react';
import { Suspense, useState } from 'react';
import { toast } from 'sonner';

interface TicketDetailsCardProps {
	ticket: ITicket;
	onTicketUpdated?: (updatedTicket: ITicket) => void;
}

export default function TicketDetailsCard({
	ticket: initialTicket,
	onTicketUpdated,
}: TicketDetailsCardProps) {
	const [ticket, setTicket] = useState<ITicket>(initialTicket);
	const [isCheckingIn, setIsCheckingIn] = useState(false);
	const [isResetting, setIsResetting] = useState(false);

	// Sync if parent updates
	if (ticket.ticketId !== initialTicket.ticketId) {
		setTicket(initialTicket);
	}

	const handleCheckIn = async () => {
		setIsCheckingIn(true);
		try {
			const result = await checkInTicket(ticket.ticketId);

			if (result.success && result.ticket) {
				setTicket(result.ticket);
				onTicketUpdated?.(result.ticket);
				toast.success(result.message);
			} else if (result.alreadyCheckedIn && result.ticket) {
				setTicket(result.ticket);
				onTicketUpdated?.(result.ticket);
				toast.warning(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error('Failed to perform check-in');
		} finally {
			setIsCheckingIn(false);
		}
	};

	const handleReset = async () => {
		setIsResetting(true);
		try {
			const result = await resetTicketCheckIn(ticket.ticketId);
			if (result.success && result.ticket) {
				setTicket(result.ticket);
				onTicketUpdated?.(result.ticket);
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error('Failed to reset ticket status');
		} finally {
			setIsResetting(false);
		}
	};

	const checkedInDateFormatted = ticket.checkedInAt
		? new Date(ticket.checkedInAt).toLocaleString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			})
		: null;

	return (
		<Card className='p-6 mx-auto shadow-lg space-y-6'>
			{/* Status Banner */}
			{ticket.status === 'used' ? (
				<div className='p-4 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex items-start gap-3'>
					<CheckCircle2Icon className='size-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0' />
					<div className='flex-1'>
						<h4 className='font-semibold'>Ticket Checked In</h4>
						<p className='text-sm opacity-90'>
							This ticket has been marked as used.
							{checkedInDateFormatted && ` (Checked in on ${checkedInDateFormatted})`}
						</p>
					</div>
					<Button
						variant='ghost'
						size='sm'
						disabled={isResetting}
						onClick={handleReset}
						className='text-xs text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900'>
						{isResetting ? (
							<Loader2 className='size-3.5 animate-spin mr-1' />
						) : (
							<RotateCcwIcon className='size-3.5 mr-1' />
						)}
						Undo Check-in
					</Button>
				</div>
			) : ticket.status === 'cancelled' ? (
				<div className='p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-950/40 dark:border-red-800 text-red-900 dark:text-red-200 flex items-center gap-3'>
					<AlertCircleIcon className='size-5 text-red-600 dark:text-red-400 shrink-0' />
					<div>
						<h4 className='font-semibold'>Ticket Cancelled</h4>
						<p className='text-sm opacity-90'>
							This ticket is cancelled and cannot be used for entry.
						</p>
					</div>
				</div>
			) : (
				<div className='p-4 rounded-xl bg-green-50 border border-green-200 dark:bg-green-950/40 dark:border-green-800 text-green-900 dark:text-green-200 flex items-center justify-between gap-3'>
					<div className='flex items-center gap-3'>
						<CheckCircle2Icon className='size-5 text-green-600 dark:text-green-400 shrink-0' />
						<div>
							<h4 className='font-semibold'>Ticket Active & Valid</h4>
							<p className='text-sm opacity-90'>
								Ready for check-in admission.
							</p>
						</div>
					</div>

					<Button
						variant='default'
						size='sm'
						disabled={isCheckingIn}
						onClick={handleCheckIn}
						className='bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-sm'>
						{isCheckingIn ? (
							<Loader2 className='size-4 animate-spin mr-2' />
						) : (
							<UserCheckIcon className='size-4 mr-2' />
						)}
						Check In Attendee
					</Button>
				</div>
			)}

			<div className='space-y-4'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-bold'>Ticket Information</h2>
					<span
						className={cn(
							'px-3 py-1 text-sm font-semibold rounded-full capitalize',
							ticket.status === 'active' &&
								'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
							ticket.status === 'used' &&
								'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
							ticket.status === 'cancelled' &&
								'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
						)}>
						{ticket.status === 'used' ? 'Checked In' : ticket.status}
					</span>
				</div>

				<Separator />

				{/* QR Code */}
				<div className='h-52'>
					<Suspense fallback={<Skeleton className='w-full h-full' />}>
						<QrCodeImage text={`${ticket.ticketId}`} />
					</Suspense>
				</div>

				<Separator />

				{/* Ticket Details */}
				<div>
					<h3 className='text-lg font-semibold mb-2'>Ticket Details</h3>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<p className='text-sm font-medium'>Ticket ID</p>
							<p className='text-sm text-muted-foreground font-mono'>
								{ticket.ticketId}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Ticket Type</p>
							<p className='text-sm text-muted-foreground capitalize'>
								{ticket.accessLevel || 'General Admission'}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Purchase Date</p>
							<p className='text-sm text-muted-foreground'>
								{new Date(ticket.purchaseDate).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Check-In Time</p>
							<p className='text-sm text-muted-foreground flex items-center gap-1.5'>
								<ClockIcon className='size-3.5' />
								{checkedInDateFormatted || 'Not checked in yet'}
							</p>
						</div>
					</div>
				</div>

				<Separator />

				{/* Event Details */}
				<div>
					<h3 className='text-lg font-semibold mb-2'>Event Details</h3>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<p className='text-sm font-medium'>Event Name</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.event?.title}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Category</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.event?.category}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Date & Time</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.event?.date &&
									new Date(ticket.event.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}{' '}
								{ticket.event?.time ? `• ${ticket.event.time}` : ''}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Location</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.event?.location}
							</p>
						</div>
					</div>
				</div>

				<Separator />

				{/* Attendee Information */}
				<div>
					<h3 className='text-lg font-semibold mb-2'>Attendee Information</h3>
					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<p className='text-sm font-medium'>Full Name</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.user?.name}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium'>Email</p>
							<p className='text-sm text-muted-foreground'>
								{ticket.user?.email}
							</p>
						</div>
						{ticket.user?.phone && (
							<div>
								<p className='text-sm font-medium'>Phone</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.user.phone}
								</p>
							</div>
						)}
						{ticket.seatNumber && (
							<div>
								<p className='text-sm font-medium'>Seat Number</p>
								<p className='text-sm text-muted-foreground'>
									{ticket.seatNumber}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Actions */}
				<div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t'>
					{ticket.status === 'active' && (
						<Button
							variant='default'
							size='sm'
							disabled={isCheckingIn}
							onClick={handleCheckIn}
							className='bg-green-600 hover:bg-green-700 text-white cursor-pointer'>
							{isCheckingIn ? (
								<Loader2 className='size-4 animate-spin mr-2' />
							) : (
								<UserCheckIcon className='size-4 mr-2' />
							)}
							Check In Attendee
						</Button>
					)}
					<DownloadTicket
						ticket={ticket}
						className='w-auto'
					/>
					<ShareButton />
				</div>
			</div>
		</Card>
	);
}
