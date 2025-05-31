'use client';

import { navItems } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import SignedIn, { SignedOut } from '../auth/signed-in';
import UserButton from '../auth/user-button';
import { Button } from '../ui/button';
import MobileNav from './MobileNav';
export default function Navbar() {
	return (
		<nav className='sticky top-0 z-50 bg-background/60 backdrop-blur-lg border-b border-muted'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16 items-center'>
					{/* Logo and brand */}
					<div className='flex items-center'>
						<Link
							href='/'
							className='flex-shrink-0 flex items-center gap-2'>
							<Image
								src='/logo.png'
								alt='Evenzo'
								width={32}
								height={32}
							/>
							<span className='text-2xl font-bold text-primary hidden md:block'>
								Evenzo
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-6'>
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='text-muted-foreground hover:text-primary font-medium text-sm'>
								{item.label}
							</Link>
						))}
					</div>

					<div className='flex items-center gap-4'>
						<SignedOut>
							<Button
								size='sm'
								asChild>
								<Link href='/sign-in'>Sign in</Link>
							</Button>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
						<MobileNav />
					</div>
				</div>
			</div>
		</nav>
	);
}
