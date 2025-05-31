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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const profileFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	organizationName: z.string().min(2, {
		message: 'Organization name must be at least 2 characters.',
	}),
	organizationUrl: z.string().url({
		message: 'Please enter a valid URL.',
	}),
	contact: z.string().min(10, {
		message: 'Please enter a valid phone number.',
	}),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
	profile: {
		name: string;
		organization: {
			name: string;
			url: string;
		};
		contact: string;
	};
}

export default function ProfileForm({ profile }: ProfileFormProps) {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: profile.name,
			organizationName: profile.organization.name,
			organizationUrl: profile.organization.url,
			contact: profile.contact,
		},
	});

	async function onSubmit(data: ProfileFormValues) {
		try {
			// TODO: Implement profile update
			console.log(data);
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
						<Button type='submit'>Save Changes</Button>
					</div>
				</form>
			</Form>
		</Card>
	);
}
