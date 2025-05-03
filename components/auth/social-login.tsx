import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function SocialLogin() {
	return (
		<div
			className={cn(
				'w-full gap-2 flex items-center',
				'justify-between flex-col',
			)}>
			<Button
				variant='outline'
				className={cn('w-full gap-2')}
				// disabled={loading}
				// onClick={async () => {
				// 	await signIn.social(
				// 		{
				// 			provider: 'google',
				// 			callbackURL: '/dashboard',
				// 		},
				// 		{
				// 			onRequest: (ctx) => {
				// 				setLoading(true);
				// 			},
				// 			onResponse: (ctx) => {
				// 				setLoading(false);
				// 			},
				// 		},
				// 	);
				// }}
			>
				<Image
					src='/google.svg'
					alt='google'
					width={15}
					height={15}
				/>
				Sign in with Google
			</Button>
		</div>
	);
}
