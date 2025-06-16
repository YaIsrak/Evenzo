import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Toaster } from 'sonner';
import './globals.css';

const inter = DM_Sans({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		template: '%s | Evenzo',
		default: 'Evenzo',
	},
	description: 'A platform for creating and managing events',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className='dark'>
			<body
				className={`${inter.className} bg-background text-foreground min-h-screen relative`}
				suppressHydrationWarning>
				<NuqsAdapter>
					{children}
					<Toaster />
				</NuqsAdapter>
			</body>
		</html>
	);
}
