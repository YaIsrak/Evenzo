'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

// this component is a wrapper for the signed in and signed out components
export default function SignedIn({
	children,
	redirect,
}: {
	children: React.ReactNode;
	redirect?: string;
}) {
	const { data } = useSession();
	const router = useRouter();

	if (!data?.user) {
		return null;
	}

	if (redirect) {
		if (!data?.user) {
			router.push(redirect);
		}
	}

	return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
	const { data } = useSession();

	if (data?.user) {
		return null;
	}

	return <>{children}</>;
}
