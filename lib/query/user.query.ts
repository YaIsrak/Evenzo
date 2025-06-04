'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';
import { dbConnect } from '../db';
import { IUser, User } from '../model/user.model';
import { replaceMongoIdInObject } from '../utils/objectfix';
// get user by id
export const getUserById = async (id: string): Promise<IUser | null> => {
	try {
		dbConnect();
		const user = await User.findById(id);
		return replaceMongoIdInObject(user);
	} catch (error) {
		throw error;
	}
};

export const getCurrentProfile = async (): Promise<IUser | null> => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(), // you need to pass the headers object.
		});
		const user = session?.user;

		if (!user?.id) return null;
		const profile = await getUserById(user?.id as string);

		return profile;
	} catch (error) {
		throw error;
	}
};
