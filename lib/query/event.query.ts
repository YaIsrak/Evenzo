import { dbConnect } from '../db';
import { Event, IEvent } from '../model/event.model';
import { replaceMongoIdInObject } from '../utils/objectfix';

export const getEvents = async (): Promise<IEvent[]> => {
	try {
		dbConnect();
		const events = await Event.find().sort({ date: 1 });
		return events.map((event) => replaceMongoIdInObject(event));
	} catch (error) {
		throw error;
	}
};

export const getEventById = async (id: string): Promise<IEvent> => {
	try {
		dbConnect();
		const event = await Event.findById(id);
		return replaceMongoIdInObject(event);
	} catch (error) {
		throw error;
	}
};
