'use server';

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
		console.log(error);
		return null;
	}
};
