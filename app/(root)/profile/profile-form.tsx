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
import { updateUserProfile } from '@/lib/actions/user.action';
import { IUser } from '@/lib/model/user.model';
import { profileFormSchema, ProfileFormValues } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ProfileForm({ profile }: { profile: IUser }) {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: profile.name,
			organizationName: profile.organization || '',
			organizationUrl: profile.organizationLink || '',
			contact: profile.phone || '',
		},
	});

	async function onSubmit(data: ProfileFormValues) {
		try {
			await updateUserProfile(profile.id, data);
			toast.success('Profile updated successfully');
		} catch (error) {
			toast.error('Failed to update profile');
		}
	}

	return (
		<Card className='p-6'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your full name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='organizationName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your organization name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='organizationUrl'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Website</FormLabel>
									<FormControl>
										<Input
											placeholder='https://example.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='contact'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Number</FormLabel>
									<FormControl>
										<Input
											placeholder='+1 (555) 123-4567'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex justify-end'>
						{/* button will be disabled if form does not have any changes */}
						<Button
							type='submit'
							disabled={!form.formState.isDirty}>
							{form.formState.isSubmitting
								? 'Saving...'
								: 'Save Changes'}
						</Button>
					</div>
				</form>
			</Form>
		</Card>
	);
}
