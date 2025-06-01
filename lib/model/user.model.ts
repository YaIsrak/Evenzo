import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	name: string;
	phone?: string;
	image?: string;
	organization?: string;
	organizationLink?: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: false,
			trim: true,
		},
		image: {
			type: String,
			required: false,
			trim: true,
		},
		organization: {
			type: String,
			required: false,
			trim: true,
		},
		organizationLink: {
			type: String,
			required: false,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

// Prevent model redefinition in Next.js
export const User =
	mongoose.models.User || mongoose.model<IUser>('User', userSchema, 'user');
