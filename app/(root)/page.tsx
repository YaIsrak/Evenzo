import SignOutButton from '@/components/auth/sign-out-button';
import SignedIn, { SignedOut } from '@/components/auth/signed-in';
import UserButton from '@/components/auth/user-button';
import { Button, buttonVariants } from '@/components/ui/button';
import { signin_url } from '@/lib/auth/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ClientSession from './_section/ClientSession';
import ServerSession from './_section/ServerSession';

export default function MainPage() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen gap-4'>
			<SignedIn>
				<UserButton />

				<div className='flex items-center justify-center gap-4'>
					<ServerSession />
					<ClientSession />
				</div>

				<SignOutButton>
					<Button>Logout</Button>
				</SignOutButton>
			</SignedIn>

			<SignedOut>
				<Link
					href={signin_url}
					className={cn(buttonVariants({ variant: 'outline' }))}>
					Sign In
				</Link>
			</SignedOut>
		</div>
	);
}
