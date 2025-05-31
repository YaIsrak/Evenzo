import CreateEventForm from './CreateEventForm';

export default function CreateEventPage() {
	return (
		<div
			className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'
			suppressHydrationWarning>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Create Event</h1>
				<p className='text-muted-foreground mt-2'>
					Fill in the details below to create your event
				</p>
			</div>

			<CreateEventForm />
		</div>
	);
}
