import { getEventById } from '@/lib/query/event.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { redirect } from 'next/navigation';
import EditEventForm from './EditEventForm';

export default async function EventEditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const event = await getEventById(id);

	const profile = await getCurrentProfile();

	if (event?.organizer.toString() !== profile?.id) {
		redirect('/dashboard');
	}

	return (
		<div
			className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'
			suppressHydrationWarning>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Edit Event</h1>
			</div>

			<EditEventForm
				event={event}
				profile={profile}
			/>
		</div>
	);
}
