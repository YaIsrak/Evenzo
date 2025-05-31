import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const inter = DM_Sans({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Better Auth Boilerplater',
	description: 'A better auth boilerplate with mongodb adapter',
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
				{children}
			</body>
		</html>
	);
}
