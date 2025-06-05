import nodemailer from 'nodemailer';

// Email configuration types
interface EmailConfig {
	host: string;
	port: number;
	secure: boolean;
	auth: {
		user: string;
		pass: string;
	};
}

// Email message type
interface EmailMessage {
	to: string | string[];
	subject: string;
	text?: string;
	html?: string;
}

// Create transporter
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: process.env.SMTP_SECURE === 'true',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
} as EmailConfig);

// Function to send email
export async function sendEmail(message: EmailMessage) {
	try {
		const info = await transporter.sendMail({
			from: 'Evenzo',
			to: message.to,
			subject: message.subject,
			text: message.text,
			html: message.html,
		});

		console.log('Message sent: %s', info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error('Error sending email:', error);
		return { success: false, error };
	}
}

// Verify transporter connection
export async function verifyConnection() {
	try {
		await transporter.verify();
		console.log('SMTP connection verified successfully');
		return true;
	} catch (error) {
		console.error('SMTP connection verification failed:', error);
		return false;
	}
}
