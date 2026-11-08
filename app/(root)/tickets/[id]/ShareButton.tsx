'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, ShareIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareButtonProps {
	className?: string;
	title?: string;
	text?: string;
}

export default function ShareButton({
	className,
	title = 'Evenzo Event Ticket',
	text = 'Check out my event ticket on Evenzo!',
}: ShareButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

		if (typeof navigator !== 'undefined' && navigator.share) {
			try {
				await navigator.share({
					title,
					text,
					url: currentUrl,
				});
				toast.success('Shared successfully!');
				return;
			} catch (error) {
				// User cancelled or share failed, fallback to copy
				if ((error as Error).name === 'AbortError') {
					return;
				}
			}
		}

		// Fallback: Copy to clipboard
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(currentUrl);
				setCopied(true);
				toast.success('Ticket link copied to clipboard!');
				setTimeout(() => setCopied(false), 2000);
			} catch (error) {
				toast.error('Failed to copy link');
			}
		}
	};

	return (
		<Button
			variant='outline'
			size='sm'
			className={cn(className)}
			onClick={handleShare}>
			{copied ? (
				<CheckIcon className='mr-2 h-4 w-4 text-green-600' />
			) : (
				<ShareIcon className='mr-2 h-4 w-4' />
			)}
			{copied ? 'Link Copied' : 'Share Ticket'}
		</Button>
	);
}
