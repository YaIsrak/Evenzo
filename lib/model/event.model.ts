import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
	title: string;
	description: string;
	highlights: string[];
	date: Date;
	time: string;
	location: string;
	organizer: mongoose.Types.ObjectId;
	category: string;
	capacity: number;
	images?: string[];
	status: 'cancelled' | 'upcoming' | 'past';
	cancelReason?: string;
	createdAt: Date;
	updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		highlights: {
			type: [String],
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		organizer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
			min: 1,
		},
		images: {
			type: [String],
			required: false,
		},
		status: {
			type: String,
			enum: ['cancelled', 'upcoming', 'past'],
			default: 'upcoming',
		},
		cancelReason: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);

// event status will be past when event is over
eventSchema.pre('updateOne', async function (next) {
	const update = this.getUpdate() as any;
	if (update?.status === 'past') {
		update.pastAt = new Date();
	}
	next();
});

export const Event =
	mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
