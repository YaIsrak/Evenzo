import { ITicket } from '@/lib/model/ticket.model';

export default function TicketTemplate({ ticket }: { ticket: ITicket }) {
	const {
		event,
		user,
		ticketId,
		seatNumber,
		accessLevel,
		status,
		purchaseDate,
	} = ticket;

	return (
		<div
			style={{
				backgroundColor: '#f9fafb',
				padding: '32px 16px',
				display: 'flex',
				justifyContent: 'center',
			}}>
			<div
				style={{
					maxWidth: '600px',
					width: '100%',
					border: '1px solid #e5e7eb',
					boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
					borderRadius: '16px',
					overflow: 'hidden',
					backgroundColor: '#ffffff',
					fontFamily: 'Arial, sans-serif',
				}}>
				{/* Event Header Image */}
				{event.images && event.images.length > 0 && (
					<img
						src={event.images[0]}
						alt={event.title}
						style={{
							width: '100%',
							height: '200px',
							objectFit: 'cover',
							display: 'block',
						}}
					/>
				)}

				{/* Content */}
				<div style={{ padding: '24px' }}>
					<h1
						style={{
							fontSize: '22px',
							fontWeight: 'bold',
							color: '#1f2937',
							marginBottom: '8px',
						}}>
						Event: {event.title}
					</h1>

					<p
						style={{
							fontSize: '14px',
							color: '#374151',
							margin: '4px 0',
						}}>
						Date: {new Date(event.date).toLocaleDateString()} at{' '}
						{event.time}
					</p>

					<p
						style={{
							fontSize: '14px',
							color: '#374151',
							margin: '4px 0',
						}}>
						Location: {event.location}
					</p>

					{/* User Info */}
					<div style={{ marginTop: '16px' }}>
						<p
							style={{
								fontSize: '14px',
								color: '#374151',
								margin: '4px 0',
							}}>
							User: <span style={{ fontWeight: 600 }}>{user.name}</span>
						</p>
						<p
							style={{
								fontSize: '14px',
								color: '#374151',
								margin: '4px 0',
							}}>
							Email: {user.email}
						</p>
						<p
							style={{
								fontSize: '13px',
								color: '#6b7280',
								margin: '4px 0',
							}}>
							Phone: {user.phone}
						</p>
					</div>

					{/* Ticket Details */}
					<div
						style={{
							backgroundColor: '#f3f4f6',
							padding: '12px 16px',
							borderRadius: '8px',
							marginTop: '20px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<p
							style={{
								fontSize: '14px',
								color: '#6b7280',
								margin: 0,
							}}>
							Ticket ID:{' '}
							<span style={{ fontWeight: 600 }}>{ticketId}</span>
						</p>
						<span
							style={{
								padding: '4px 10px',
								borderRadius: '12px',
								fontSize: '12px',
								textTransform: 'capitalize',
								fontWeight: 500,
								color: status === 'active' ? '#065f46' : '#4b5563',
								backgroundColor:
									status === 'active' ? '#d1fae5' : '#e5e7eb',
							}}>
							{status}
						</span>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: '12px',
						}}>
						<p
							style={{
								fontSize: '14px',
								color: '#6b7280',
								margin: 0,
							}}>
							Seat: <span style={{ fontWeight: 600 }}>{seatNumber}</span>
						</p>
						<p
							style={{
								fontSize: '14px',
								color: '#6b7280',
								margin: 0,
							}}>
							Access:{' '}
							<span style={{ fontWeight: 600 }}>{accessLevel}</span>
						</p>
					</div>

					{/* Purchase Date */}
					<p
						style={{
							fontSize: '13px',
							color: '#6b7280',
							marginTop: '12px',
						}}>
						Purchased on {new Date(purchaseDate).toLocaleDateString()}
					</p>

					{/* View Ticket Button */}
					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						<a
							href={`https://evenzo-israk.vercel.app/tickets/${ticketId}`}
							style={{
								display: 'inline-block',
								backgroundColor: '#2563eb',
								color: '#ffffff',
								fontSize: '14px',
								fontWeight: 600,
								padding: '10px 20px',
								borderRadius: '8px',
								textDecoration: 'none',
							}}>
							View This Ticket
						</a>
					</div>

					{/* Footer */}
					<p
						style={{
							fontSize: '12px',
							color: '#6b7280',
							textAlign: 'center',
							marginTop: '16px',
							lineHeight: '1.4',
						}}>
						Please present this ticket (digital or printed) at the event
						gate. For support, contact{' '}
						<a
							href='mailto:contact@yisrak.com'
							style={{ color: '#2563eb', textDecoration: 'none' }}>
							contact@yisrak.com
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
