'use client';

import Header from '@/components/layout/Header';
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
import { ITicket } from '@/lib/model/ticket.model';
import { getTicketByTicketId } from '@/lib/query/ticket.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, TicketIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import TicketDetailsCard from './TicketDetailsCard';

const formSchema = z.object({
	ticketId: z.string().min(6, 'Ticket ID must be at least 6 characters'),
});

export default function VerifyTicketPage() {
	const [ticket, setTicket] = useState<ITicket | null>(null);

	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<Header
				title='Verify Ticket'
				description='Enter your ticket ID to verify its validity'
			/>

			<VerifyForm setTicket={setTicket} />

			{ticket && <TicketDetailsCard ticket={ticket} />}

			<div className='flex justify-center'>
				<Button
					variant='outline'
					size='sm'>
					Back
				</Button>
			</div>
		</div>
	);
}

function VerifyForm({ setTicket }: { setTicket: (ticket: ITicket) => void }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ticketId: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const ticket = await getTicketByTicketId(values.ticketId);
			if (!ticket) {
				toast.error('Ticket not found');
				return;
			}
			console.log('Verifying ticket:', ticket);
			setTicket(ticket);
		} catch (error) {
			toast.error('Failed to verify ticket');
		}
	}

	return (
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
										<Button
											type='submit'
											disabled={form.formState.isSubmitting}>
											{form.formState.isSubmitting ? (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											) : (
												<TicketIcon className='mr-2 h-4 w-4' />
											)}
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
	);
}
