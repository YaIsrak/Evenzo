'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { cancelEvent } from '@/lib/actions/event.action';
import { IEvent } from '@/lib/model/event.model';
import { IUser } from '@/lib/model/user.model';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CancelEvent({
	event,
	profile,
}: {
	event: IEvent;
	profile: IUser;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleCancelEvent = async () => {
		setIsLoading(true);
		try {
			await cancelEvent(event.id.toString(), profile.id);
			toast.success('Event cancelled successfully');
			setIsOpen(false);
		} catch (error) {
			toast.error('Failed to cancel event', {
				description: (error as Error).message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant='destructive'
					className='flex-1 cursor-pointer'>
					<TrashIcon className='mr-2 h-4 w-4' />
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this event?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button
						variant='destructive'
						disabled={isLoading}
						className='cursor-pointer'
						onClick={handleCancelEvent}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
