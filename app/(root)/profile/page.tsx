import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getCurrentProfile } from '@/lib/query/user.query';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import ProfileForm from './profile-form';

export default async function ProfilePage() {
	const profile = await getCurrentProfile();

	if (!profile) {
		return <div>No profile found</div>;
	}

	return (
		<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			{/* Header */}
			<div className='space-y-1'>
				<h1 className='text-3xl font-bold'>Profile Settings</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and organization details
				</p>
			</div>

			{/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
			{/* Main Content */}
			<div className='grid gap-6 md:grid-cols-3'>
				{/* Left Column - Profile Info */}
				<div className='md:col-span-2 space-y-6'>
					{/* Profile Image */}
					<Card className='p-6'>
						<div className='flex items-center gap-6'>
							<div className='relative h-24 w-24 rounded-full bg-muted'>
								{profile?.image ? (
									<div className=''>
										<Image
											src={profile.image}
											alt='Profile preview'
											layout='fill'
											objectFit='cover'
											className='h-full w-full object-cover rounded-full'
										/>
									</div>
								) : (
									<UserIcon className='h-12 w-12 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
								)}
							</div>
							<div className='space-y-1'>
								<h2 className='text-xl font-semibold'>
									{profile?.name}
								</h2>
								<p className='text-sm text-muted-foreground'>
									{profile?.email}
								</p>
							</div>
						</div>
					</Card>

					{/* Profile Form */}
					<ProfileForm profile={profile} />
				</div>

				{/* Right Column - Additional Info */}
				<div className='space-y-6'>
					{/* Account Security */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>
							Account Security
						</h2>
						<div className='space-y-4'>
							<div>
								<p className='text-sm font-medium'>Email Address</p>
								<p className='text-sm text-muted-foreground'>
									{profile?.email}
								</p>
								<p className='text-xs text-muted-foreground mt-1'>
									Email address cannot be changed
								</p>
							</div>
							<Separator />
							<div>
								<p className='text-sm font-medium'>Password</p>
								<p className='text-sm text-muted-foreground'>
									••••••••••••••••
								</p>
								<p className='text-xs text-muted-foreground mt-1'>
									Password cannot be changed from this page
								</p>
							</div>
						</div>
					</Card>

					{/* Need Help? */}
					<Card className='p-6 bg-muted/50'>
						<h2 className='text-xl font-semibold mb-2'>Need Help?</h2>
						<p className='text-sm text-muted-foreground mb-4'>
							Having trouble with your profile? Contact our support team.
						</p>
						<Button className='w-full'>Contact Support</Button>
					</Card>
				</div>
			</div>
		</main>
	);
}
