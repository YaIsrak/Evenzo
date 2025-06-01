'use server';

import { dbConnect } from '../db';
import { User } from '../model/user.model';
import { replaceMongoIdInObject } from '../utils/objectfix';
import { ProfileFormValues } from '../validator';

// update user profile
export const updateUserProfile = async (
	id: string,
	profile: ProfileFormValues,
) => {
	try {
		dbConnect();

		const updatedUser = await User.findByIdAndUpdate(id, {
			name: profile.name,
			organization: profile.organizationName,
			organizationLink: profile.organizationUrl,
			phone: profile.contact,
		});

		return replaceMongoIdInObject(updatedUser);
	} catch (error) {
		throw error;
	}
};
