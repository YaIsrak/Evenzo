import { dbConnect } from '../db';
import { Event, IEvent } from '../model/event.model';
import { replaceMongoIdInObject } from '../utils/objectfix';

export const getEvents = async (): Promise<IEvent[]> => {
	try {
		dbConnect();
		const events = await Event.find();
		return events.map((event) => replaceMongoIdInObject(event));
	} catch (error) {
		throw error;
	}
};
