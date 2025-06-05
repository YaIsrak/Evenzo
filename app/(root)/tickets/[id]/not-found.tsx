import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFoundPage() {
	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			<Header
				title='Ticket Not Found'
				description='The ticket you are looking for does not exist'
			/>
			<Card>
				<CardContent>
					<p>The ticket you are looking for does not exist</p>
				</CardContent>
			</Card>
		</div>
	);
}
