import { dbConnect } from '../db';
import { Event, IEvent } from '../model/event.model';
import {
	replaceMongoIdInArray,
	replaceMongoIdInObject,
} from '../utils/objectfix';

export const getEvents = async (): Promise<IEvent[]> => {
	try {
		dbConnect();
		const events = await Event.find().sort({ date: 1 }).populate('organizer');

		// update status to past if event is past
		const now = new Date();
		await Event.updateMany(
			{ date: { $lte: now } },
			{ $set: { status: 'past' } },
		);

		return replaceMongoIdInArray(events);
	} catch (error) {
		throw error;
	}
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
	try {
		dbConnect();
		const event = await Event.findById(id).populate('organizer');
		return replaceMongoIdInObject(event);
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getEventByUserId = async (
	userId: string,
): Promise<IEvent[] | null> => {
	try {
		dbConnect();
		const events = await Event.find({
			organizer: userId,
		});
		return events.map((event) => replaceMongoIdInObject(event));
	} catch (error) {
		console.error(error);
		return null;
	}
};
