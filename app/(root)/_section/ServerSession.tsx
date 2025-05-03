import { getSession } from '@/lib/auth/getSession';

export default async function ServerSession() {
	const user = await getSession();

	return (
		<div className='border p-4 rounded-2xl'>
			<h1 className='text-2xl font-medium'>Server Component</h1>

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
