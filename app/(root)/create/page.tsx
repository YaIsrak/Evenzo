import Header from '@/components/layout/Header';
import CreateEventForm from './CreateEventForm';

export default function CreateEventPage() {
	return (
		<div
			className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'
			suppressHydrationWarning>
			<Header
				title='Create Event'
				description='Fill in the details below to create your event'
			/>
			<CreateEventForm />
		</div>
	);
}
