import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DownloadIcon } from 'lucide-react';

export default function DownloadButton({ className }: { className?: string }) {
	return (
		<Button
			variant='outline'
			size='sm'
			className={cn(className)}
			// onClick={handleDownload}
		>
			<DownloadIcon className='mr-2 h-4 w-4' />
			Download Ticket
		</Button>
	);
}
