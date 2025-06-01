import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error('Please add your Mongo URI to .env.local');
}

export async function dbConnect() {
	try {
		const connect = await mongoose.connect(MONGODB_URI);
		return connect;
	} catch (error) {
		console.error('🔴 Error connecting to MongoDB:', error);
	}
}
