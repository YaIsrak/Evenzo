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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cancelEvent } from '@/lib/actions/event.action';
import { IEvent } from '@/lib/model/event.model';
import { IUser } from '@/lib/model/user.model';
import { X } from 'lucide-react';
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
	const [reason, setReason] = useState('');

	const handleCancelEvent = async () => {
		setIsLoading(true);
		try {
			if (!reason) {
				toast.error('Please enter a reason for cancelling event');
				setIsLoading(false);
				return;
			}

			await cancelEvent(event.id.toString(), profile.id, reason);
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
					<X className='mr-2 h-4 w-4' />
					Cancle
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to cancel this event?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-2'>
					<Label>Reason</Label>
					<Textarea
						placeholder='Enter reason for cancelling event'
						value={reason}
						onChange={(e) => setReason(e.target.value)}
					/>
				</div>

				<DialogFooter>
					<Button
						variant='destructive'
						disabled={isLoading}
						className='cursor-pointer'
						onClick={handleCancelEvent}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
