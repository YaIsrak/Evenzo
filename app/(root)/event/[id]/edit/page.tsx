import Header from '@/components/layout/Header';
import { IEvent } from '@/lib/model/event.model';
import { IUser } from '@/lib/model/user.model';
import { getEventById } from '@/lib/query/event.query';
import { getCurrentProfile } from '@/lib/query/user.query';
import { notFound, redirect } from 'next/navigation';
import EditEventForm from './EditEventForm';

export default async function EventEditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const event = await getEventById(id);
	if (!event) {
		return notFound();
	}

	const profile = await getCurrentProfile();
	if (!profile) {
		redirect(`/sign-in?redirect=${encodeURIComponent(`/event/${id}/edit`)}`);
	}

	const organizerId =
		(event.organizer as any)?._id?.toString() ||
		(event.organizer as any)?.id?.toString() ||
		event.organizer?.toString();
	const profileId =
		profile.id?.toString() || (profile as any)?._id?.toString();

	if (organizerId !== profileId) {
		redirect('/dashboard');
	}

	return (
		<div
			className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'
			suppressHydrationWarning>
			<Header title='Edit Event' />

			<EditEventForm
				event={event as IEvent}
				profile={profile as IUser}
			/>
		</div>
	);
}
