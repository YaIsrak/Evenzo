'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createTicket } from '@/lib/actions/ticket.action';
import { IEvent } from '@/lib/model/event.model';
import { IUser } from '@/lib/model/user.model';
import { JoinFormValues, joinFormSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function EventJoinForm({
	profile,
	event,
}: {
	profile: IUser;
	event: IEvent;
}) {
	const router = useRouter();
	const form = useForm<JoinFormValues>({
		resolver: zodResolver(joinFormSchema),
		defaultValues: {
			fullName: profile.name,
			email: profile.email,
			phone: profile.phone,
			terms: false,
		},
	});

	async function onSubmit(values: JoinFormValues) {
		try {
			const ticket = await createTicket(event.id, profile.id);
			toast.success('Ticket created successfully');

			router.push(`/tickets/${ticket.ticketId}`);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className='p-6'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'>
					{/* Personal Information */}
					<div className='space-y-4'>
						<h2 className='text-xl font-semibold flex items-center gap-2'>
							<UserIcon className='size-5' />
							Personal Information
						</h2>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input
												placeholder='John Doe'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='john@example.com'
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input
												placeholder='+1 (555) 000-0000'
												type='tel'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* Terms and Conditions */}
					<FormField
						control={form.control}
						name='terms'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>
										I agree to the{' '}
										<Link
											href='/terms'
											className='text-primary hover:underline'>
											terms and conditions
										</Link>
									</FormLabel>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='w-full'
						disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting
							? 'Getting ticket...'
							: 'Complete Registration'}
					</Button>
				</form>
			</Form>
		</Card>
	);
}
