'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
	LayoutDashboardIcon,
	LogOutIcon,
	PlusIcon,
	TicketIcon,
	UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignOutButton from './sign-out-button';

interface Props {
	size?: number;
	className?: string;
}

const navItems = [
	{
		icon: UserIcon,
		label: 'Profile',
		href: '/profile',
	},
	{
		icon: TicketIcon,
		label: 'Tickets',
		href: '/tickets',
	},
	{
		icon: PlusIcon,
		label: 'Create Event',
		href: '/create',
	},
	{
		icon: LayoutDashboardIcon,
		label: 'Dashboard',
		href: '/dashboard',
	},
];

export default function UserButton({ size = 10, className }: Props) {
	const { data: session } = useSession();
	const user = session?.user;

	if (!user) {
		return null;
	}

	return (
		<DropdownMenu>
			{/* main trigger */}
			<DropdownMenuTrigger className='rounded-full'>
				<Avatar className={cn(`size-8 md:size-${size}`, className)}>
					<AvatarImage src={user.image as string} />
					<AvatarFallback>{user?.name[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			{/* content */}
			<DropdownMenuContent>
				<DropdownMenuLabel>{user.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{navItems.map((item) => (
					<DropdownMenuItem
						key={item.href}
						className='cursor-pointer'
						asChild>
						<Link href={item.href}>
							<item.icon className='size-4' />
							{item.label}
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem className='cursor-pointer text-destructive'>
					<SignOutButton className='w-full flex items-center gap-2'>
						<LogOutIcon className='size-4 text-destructive' />
						Sign Out
					</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
