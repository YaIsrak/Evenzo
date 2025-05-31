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
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCardIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
	fullName: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	phone: z.string().min(10, 'Please enter a valid phone number'),
	terms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions',
	}),
});

export default function EventJoinForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			phone: '',
			terms: false,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Handle form submission
		console.log(values);
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

					{/* Payment Options */}
					<div className='space-y-4'>
						<h2 className='text-xl font-semibold flex items-center gap-2'>
							<CreditCardIcon className='size-5' />
							Payment Options
						</h2>
						<div className='grid gap-4 sm:grid-cols-2'>
							<Button
								type='button'
								variant='outline'
								className='w-full h-12 flex items-center justify-center gap-2'>
								<svg
									className='size-6'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
										fill='#E2136E'
									/>
									<path
										d='M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z'
										fill='#E2136E'
									/>
								</svg>
								Pay with bKash
							</Button>
							<Button
								type='button'
								variant='outline'
								className='w-full h-12 flex items-center justify-center gap-2'>
								<svg
									className='size-6'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585 1.02 3.445 1.664 3.445 2.775 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z'
										fill='#6772E5'
									/>
								</svg>
								Pay with Stripe
							</Button>
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
						className='w-full'>
						Complete Registration - $199
					</Button>
				</form>
			</Form>
		</Card>
	);
}
