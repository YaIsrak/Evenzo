import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShareIcon } from 'lucide-react';

export default function ShareButton({ className }: { className?: string }) {
	return (
		<Button
			variant='outline'
			size='sm'
			className={cn(className)}
			// onClick={handleShare}
		>
			<ShareIcon className='mr-2 h-4 w-4' />
			Share Ticket
		</Button>
	);
}
