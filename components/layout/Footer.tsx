export default function Footer() {
	return (
		<div className='bg-background text-foreground'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8'>
				<p className='text-center text-sm text-muted-foreground'>
					&copy; {new Date().getFullYear()} Evenzo \ Israk. All rights
					reserved.
				</p>
			</div>
		</div>
	);
}
