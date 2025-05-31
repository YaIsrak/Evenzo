import EditEventForm from './EditEventForm';

export default function EventEditPage() {
	return (
		<div
			className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'
			suppressHydrationWarning>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Edit Event</h1>
			</div>

			<EditEventForm />
		</div>
	);
}
