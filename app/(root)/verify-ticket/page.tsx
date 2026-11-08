'use client';

import Header from '@/components/layout/Header';
import QrScanner from '@/components/QrScanner';
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
import { Switch } from '@/components/ui/switch';
import { checkInTicket } from '@/lib/actions/ticket.action';
import { ITicket } from '@/lib/model/ticket.model';
import { getTicketByTicketId } from '@/lib/query/ticket.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, Loader2, SearchIcon, SparklesIcon, TicketIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import TicketDetailsCard from './TicketDetailsCard';

const formSchema = z.object({
	ticketId: z.string().min(4, 'Ticket ID must be at least 4 characters'),
});

export default function VerifyTicketPage() {
	const [ticket, setTicket] = useState<ITicket | null>(null);
	const [autoCheckIn, setAutoCheckIn] = useState(false);
	const [isProcessingScan, setIsProcessingScan] = useState(false);

	const handleScanResult = async (scannedTicketId: string) => {
		if (isProcessingScan) return;
		setIsProcessingScan(true);

		try {
			if (autoCheckIn) {
				// Immediate check-in mode
				const checkInResult = await checkInTicket(scannedTicketId);
				if (checkInResult.success && checkInResult.ticket) {
					setTicket(checkInResult.ticket);
					toast.success(checkInResult.message);
				} else if (checkInResult.alreadyCheckedIn && checkInResult.ticket) {
					setTicket(checkInResult.ticket);
					toast.warning(checkInResult.message);
				} else {
					// Fallback to fetch info so organizer can see why it failed
					const fetched = await getTicketByTicketId(scannedTicketId);
					if (fetched) setTicket(fetched);
					toast.error(checkInResult.message);
				}
			} else {
				// Inspection mode: fetch ticket and show card with check-in button
				const fetched = await getTicketByTicketId(scannedTicketId);
				if (!fetched) {
					toast.error(`Ticket "${scannedTicketId}" was not found.`);
					return;
				}
				setTicket(fetched);
				toast.info(`Ticket loaded: ${fetched.ticketId}`);
			}
		} catch (error) {
			console.error('Error handling scanned ticket:', error);
			toast.error('Failed to process scanned ticket');
		} finally {
			setIsProcessingScan(false);
		}
	};

	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<Header
					title='Verify & Check-In'
					description='Scan ticket QR codes with your camera or enter a ticket ID manually'
				/>

				<Button
					variant='outline'
					size='sm'
					className='self-start sm:self-auto'
					asChild>
					<Link href='/dashboard'>
						<ArrowLeftIcon className='mr-2 size-4' />
						Dashboard
					</Link>
				</Button>
			</div>

			{/* Camera Scanner Section */}
			<Card className='p-6 space-y-4'>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b'>
					<div>
						<h3 className='font-semibold text-lg flex items-center gap-2'>
							<SparklesIcon className='size-5 text-primary' />
							Live Camera Scanner
						</h3>
						<p className='text-sm text-muted-foreground'>
							Use your device camera to scan tickets in real-time
						</p>
					</div>

					<div className='flex items-center gap-3 bg-muted/60 p-2 rounded-lg border'>
						<Switch
							id='auto-check-in-toggle'
							checked={autoCheckIn}
							onCheckedChange={setAutoCheckIn}
						/>
						<label
							htmlFor='auto-check-in-toggle'
							className='text-xs font-medium cursor-pointer select-none'>
							Auto Check-In on Scan
						</label>
					</div>
				</div>

				<QrScanner onScan={handleScanResult} />
			</Card>

			{/* Manual Search Section */}
			<VerifyForm
				setTicket={setTicket}
				onDirectCheckIn={autoCheckIn ? handleScanResult : undefined}
			/>

			{/* Ticket Details & Action Card */}
			{ticket && (
				<TicketDetailsCard
					ticket={ticket}
					onTicketUpdated={setTicket}
				/>
			)}
		</div>
	);
}

function VerifyForm({
	setTicket,
	onDirectCheckIn,
}: {
	setTicket: (ticket: ITicket) => void;
	onDirectCheckIn?: (ticketId: string) => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ticketId: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (onDirectCheckIn) {
			onDirectCheckIn(values.ticketId.trim());
			return;
		}

		try {
			const ticket = await getTicketByTicketId(values.ticketId.trim());
			if (!ticket) {
				toast.error(`Ticket "${values.ticketId}" was not found.`);
				return;
			}
			setTicket(ticket);
			toast.success('Ticket found');
		} catch (error) {
			toast.error('Failed to lookup ticket');
		}
	}

	return (
		<Card className='p-6'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'>
					<FormField
						control={form.control}
						name='ticketId'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-semibold'>
									Manual Ticket ID Lookup
								</FormLabel>
								<FormControl>
									<div className='flex gap-2'>
										<Input
											placeholder='e.g. TICKET-1741234567-1'
											{...field}
										/>
										<Button
											type='submit'
											disabled={form.formState.isSubmitting}>
											{form.formState.isSubmitting ? (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											) : (
												<SearchIcon className='mr-2 h-4 w-4' />
											)}
											Find Ticket
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
	);
}
