import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
	event: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	ticketId: string;
	status: 'active' | 'used' | 'cancelled';
	purchaseDate: Date;
	seatNumber: string;
	accessLevel?: string;
	specialRequirements?: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}

const ticketSchema = new Schema<ITicket>(
	{
		event: {
			type: Schema.Types.ObjectId,
			ref: 'Event',
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		ticketId: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: String,
			enum: ['active', 'used', 'cancelled'],
			default: 'active',
		},
		purchaseDate: {
			type: Date,
			default: Date.now,
		},
		seatNumber: {
			type: String,
			required: true,
		},
		accessLevel: {
			type: String,
			required: false,
		},
		specialRequirements: {
			type: String,
			required: false,
		},
		notes: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);

// Generate unique ticket number before saving
ticketSchema.pre('save', async function (next) {
	if (!this.isNew) return next();
	try {
		const count = await (this.constructor as any).countDocuments();
		this.ticketId = `TICKET-${Date.now()}-${count + 1}`;
		next();
	} catch (error: any) {
		next(error);
	}
});

// Prevent model redefinition in Next.js
export const Ticket =
	mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', ticketSchema);
