import { navItems } from '@/lib/constants';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
export default function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger className='cursor-pointer md:hidden'>
				<MenuIcon />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className='flex items-center gap-2'>
						<Image
							src='/logo.png'
							alt='Evenzo'
							width={32}
							height={32}
						/>
						<span className='text-2xl font-bold text-primary'>
							Evenzo
						</span>
					</SheetTitle>
				</SheetHeader>
				<div className='flex flex-col gap-4 px-4'>
					{navItems.map((item) => (
						<SheetClose
							asChild
							key={item.href}>
							<Link href={item.href}>{item.label}</Link>
						</SheetClose>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
