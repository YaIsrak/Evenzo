export const emailTemplates = {
	eventCreated: {
		subject: 'Your Event Has Been Created Successfully',
		body: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 5px 5px; }
        .details { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Event Created Successfully!</h1>
        </div>
        <div class="content">
            <p>Dear {organizerName},</p>
            <p>Your event "<strong>{eventName}</strong>" has been successfully created and is now live on our platform.</p>

            <div class="details">
                <h3>Event Details:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li>📅 Date: {eventDate}</li>
                    <li>⏰ Time: {eventTime}</li>
                    <li>📍 Location: {eventLocation}</li>
                    <li>🎯 Event Type: {eventType}</li>
                </ul>
            </div>

            <p>You can manage your event and view registrations through your dashboard.</p>
            <a href="#" class="button">View Dashboard</a>
        </div>
        <div class="footer">
            <p>Best regards,<br>The Evenzo Team</p>
        </div>
    </div>
</body>
</html>
    `.trim(),
	},

	eventJoined: {
		subject: 'Welcome to {eventName}!',
		body: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 5px 5px; }
        .details { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to {eventName}!</h1>
        </div>
        <div class="content">
            <p>Dear {attendeeName},</p>
            <p>Thank you for registering for <strong>{eventName}</strong>!</p>

            <div class="details">
                <h3>Event Details:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li>📅 Date: {eventDate}</li>
                    <li>⏰ Time: {eventTime}</li>
                    <li>📍 Location: {eventLocation}</li>
                </ul>
            </div>

            <p>Please keep this email for your records. Your ticket will be sent separately.</p>
            <p>We look forward to seeing you at the event!</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>The Evenzo Team</p>
        </div>
    </div>
</body>
</html>
    `.trim(),
	},

	ticketInvoice: {
		subject: '{eventName} Invoice',
		body: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #6366F1; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 5px 5px; }
        .details { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #6366F1; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Ticket Invoice</h1>
        </div>
        <div class="content">
            <p>Dear {attendeeName},</p>
            <p>Thank you for your purchase. Here's your ticket invoice for <strong>{eventName}</strong>.</p>

            <div class="details">
                <h3>Invoice Details:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li>🎫 Ticket Type: {ticketType}</li>
                    <li>🔑 Ticket ID: {ticketId}</li>
                </ul>
            </div>

            <p>Your ticket(s) have been attached to this email. Please present them at the event venue.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>The Evenzo Team</p>
        </div>
    </div>
</body>
</html>
    `.trim(),
	},

	eventCancelled: {
		subject: 'Important: {eventName} Has Been Cancelled',
		body: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 5px 5px; }
        .details { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #EF4444; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Event Cancellation Notice</h1>
        </div>
        <div class="content">
            <p>Dear {attendeeName},</p>
            <p>We regret to inform you that <strong>{eventName}</strong> has been cancelled.</p>

            <div class="details">
                <h3>Event Details:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li>📅 Original Date: {eventDate}</li>
                    <li>⏰ Original Time: {eventTime}</li>
                    <li>📍 Location: {eventLocation}</li>
                </ul>
            </div>

            <div class="details">
                <h3>Reason for Cancellation:</h3>
                <p>{cancellationReason}</p>
            </div>

            <div class="details">
                <h3>Refund Information:</h3>
                <p>{refundDetails}</p>
            </div>

            <p>We apologize for any inconvenience this may have caused. If you have any questions, please contact our support team.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>The Evenzo Team</p>
        </div>
    </div>
</body>
</html>
    `.trim(),
	},
};
