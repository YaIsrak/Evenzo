'use client';

import { signOut } from '@/lib/auth-client';
import { signin_url } from '@/lib/auth/constants';
import { useRouter } from 'next/navigation';

export default function SignOutButton({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push(signin_url);
				},
			},
		});
	};

	return (
		<span
			onClick={handleSignOut}
			className={className}>
			{children}
		</span>
	);
}
