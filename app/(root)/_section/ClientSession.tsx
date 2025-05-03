'use client';

import { useSession } from '@/lib/auth-client';

export default function ClientSession() {
	const { data: session, isPending } = useSession();

	const user = session?.user;

	if (isPending) {
		return (
			<div className='border p-4 rounded-2xl'>
				<h1 className='text-2xl font-medium'>Loading...</h1>
			</div>
		);
	}

	return (
		<div className='border p-4 rounded-2xl'>
			<h1 className='text-2xl font-medium'>Client Component</h1>

			<div>
				<div className='flex gap-2'>
					<p className='text-muted-foreground'>Id:</p>
					<p>{user?.id}</p>
				</div>
				<div className='flex gap-2'>
					<p className='text-muted-foreground'>Name:</p>
					<p>{user?.name}</p>
				</div>
				<div className='flex gap-2'>
					<p className='text-muted-foreground'>Email:</p>
					<p>{user?.email}</p>
				</div>
			</div>
		</div>
	);
}
