import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function SocialLogin({
	redirectLink,
}: {
	redirectLink?: string;
}) {
	const [loading, setLoading] = useState(false);
	return (
		<div
			className={cn(
				'w-full gap-2 flex items-center',
				'justify-between flex-col',
			)}>
			<Button
				variant='outline'
				className={cn('w-full gap-2')}
				disabled={loading}
				onClick={async () => {
					await signIn.social(
						{
							provider: 'google',
							callbackURL: redirectLink || '/',
						},
						{
							onRequest: (ctx) => {
								setLoading(true);
							},
							onResponse: (ctx) => {
								setLoading(false);
							},
						},
					);
				}}>
				{loading ? (
					<Loader2 className='animate-spin' />
				) : (
					<Image
						src='/google.svg'
						alt='google'
						width={15}
						height={15}
					/>
				)}
				Sign in with Google
			</Button>
		</div>
	);
}
