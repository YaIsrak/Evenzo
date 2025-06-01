import { useSession } from '@/lib/auth-client';
import { IUser } from '@/lib/model/user.model';
import { getUserById } from '@/lib/query/user.query';
import { useEffect, useState } from 'react';

export default function useCurrentUser() {
	const [isLoading, setisLoading] = useState(false);
	const { data: session } = useSession();
	const [profile, setProfile] = useState<IUser | null>(null);

	const user = session?.user;

	useEffect(() => {
		if (user) {
			setisLoading(true);
			getUserById(user?.id as string).then((data) => {
				setisLoading(false);
				setProfile(data);
			});
		}
	}, [user]);

	return { profile, isLoading };
}
