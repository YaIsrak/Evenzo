'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/lib/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			rememberMe: false,
		},
	});

	const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				className='space-y-4'
				onSubmit={form.handleSubmit(onSubmit)}>
				{/* Username */}
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='username'
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

				<FormField
					control={form.control}
					name='rememberMe'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>Remember me</FormLabel>
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isLoading}>
					{form.formState.isLoading ? (
						<Loader2 className='animate-spin' />
					) : (
						'Sign Up'
					)}
				</Button>

				<SocialLogin />
			</form>
		</Form>
	);
}
