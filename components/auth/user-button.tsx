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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignOutButton from './sign-out-button';

interface Props {
	size?: number;
	className?: string;
}

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
					<AvatarFallback>{user?.name}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			{/* content */}
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>
					<SignOutButton>Sign Out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
