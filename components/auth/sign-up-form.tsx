'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/auth-client';
import { callback_url } from '@/lib/auth/constants';
import { signUpSchema } from '@/lib/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import SocialLogin from './social-login';

export default function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
		await signUp.email({
			email: values.email,
			password: values.password,
			name: values.name,
			callbackURL: callback_url,
			fetchOptions: {
				onResponse: () => {
					setLoading(false);
				},
				onRequest: () => {
					setLoading(true);
				},
				onError: (ctx) => {
					toast.error('Error signing up', {
						description: ctx.error.message,
					});
				},
				onSuccess: () => {
					toast.success('Signed up successfully');
					router.push(callback_url);
				},
			},
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-4'
				onSubmit={form.handleSubmit(onSubmit)}>
				{/* Username */}
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
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

				{/* Email */}
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='email@mail.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<div className='relative'>
								<FormControl>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder={
											showPassword ? 'password' : '********'
										}
										{...field}
									/>
								</FormControl>
								<div className='text-muted-foreground hover:cursor-pointer hover:text-primary absolute right-2 top-1/2 translate-y-[-50%]'>
									{showPassword ? (
										<EyeOffIcon
											className='size-4'
											onClick={() => {
												setShowPassword(!showPassword);
											}}
										/>
									) : (
										<EyeIcon
											className='size-4'
											onClick={() => {
												setShowPassword(!showPassword);
											}}
										/>
									)}
								</div>
							</div>
							<FormDescription className='text-xs'>
								Minimum 8 characters
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Confirm Password */}
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<div className='relative'>
								<FormControl>
									<Input
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder={
											showConfirmPassword ? 'password' : '********'
										}
										{...field}
									/>
								</FormControl>
								<div className='text-muted-foreground hover:cursor-pointer hover:text-primary absolute right-2 top-1/2 translate-y-[-50%]'>
									{showConfirmPassword ? (
										<EyeOffIcon
											className='size-4'
											onClick={() => {
												setShowConfirmPassword((prev) => !prev);
											}}
										/>
									) : (
										<EyeIcon
											className='size-4'
											onClick={() => {
												setShowConfirmPassword((prev) => !prev);
											}}
										/>
									)}
								</div>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full'
					disabled={loading}>
					{loading ? <Loader2 className='animate-spin' /> : 'Sign Up'}
				</Button>

				<div className='text-center text-muted-foreground flex items-center gap-2'>
					<div className='inline-block w-1/2 h-[1px] bg-muted-foreground/50'></div>
					or
					<div className='inline-block w-1/2 h-[1px] bg-muted-foreground/50'></div>
				</div>

				<SocialLogin />
			</form>
		</Form>
	);
}
