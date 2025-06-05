'use client';
// fix: Nedd to fix this shit

import { ITicket } from '@/lib/model/ticket.model';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { DownloadIcon } from 'lucide-react';
import { useRef } from 'react';
import { Button, buttonVariants } from './ui/button';

interface DownloadTicketProps {
	ticket: ITicket;
	className?: string;
	variant?: VariantProps<typeof buttonVariants>['variant'];
	icon?: boolean;
	label?: string;
}

export default function DownloadTicket({
	ticket,
	className,
	variant = 'outline',
	icon = true,
	label = 'Download Ticket',
}: DownloadTicketProps) {
	const ticketRef = useRef<HTMLDivElement>(null);

	const handleDownload = () => {};

	return (
		<>
			<div className='hidden'>
				<div
					ref={ticketRef}
					className='p-8 max-w-[800px] mx-auto'
					style={{
						backgroundColor: '#ffffff',
						color: '#000000',
						fontFamily: 'Arial, sans-serif',
					}}>
					{/* Header */}
					<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
						<h1
							style={{
								fontSize: '1.5rem',
								fontWeight: 'bold',
								marginBottom: '0.5rem',
							}}>
							Event Ticket
						</h1>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '0.5rem',
							}}>
							<span
								style={{
									padding: '0.25rem 0.75rem',
									fontSize: '0.875rem',
									fontWeight: '600',
									borderRadius: '9999px',
									backgroundColor: '#dcfce7',
									color: '#166534',
								}}>
								Valid
							</span>
						</div>
					</div>

					{/* Ticket Details */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '1rem',
							marginBottom: '1.5rem',
						}}>
						<div>
							<p
								style={{
									fontSize: '0.875rem',
									fontWeight: '500',
									color: '#374151',
								}}>
								Ticket ID
							</p>
							<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
								{ticket.ticketId}
							</p>
						</div>
						<div>
							<p
								style={{
									fontSize: '0.875rem',
									fontWeight: '500',
									color: '#374151',
								}}>
								Ticket Type
							</p>
							<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
								{ticket.accessLevel}
							</p>
						</div>
					</div>

					{/* Event Details */}
					<div style={{ marginBottom: '1.5rem' }}>
						<h2
							style={{
								fontSize: '1.125rem',
								fontWeight: '600',
								marginBottom: '0.5rem',
								color: '#111827',
							}}>
							Event Details
						</h2>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '1rem',
							}}>
							<div>
								<p
									style={{
										fontSize: '0.875rem',
										fontWeight: '500',
										color: '#374151',
									}}>
									Event Name
								</p>
								<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
									{ticket.event.title}
								</p>
							</div>
							<div>
								<p
									style={{
										fontSize: '0.875rem',
										fontWeight: '500',
										color: '#374151',
									}}>
									Category
								</p>
								<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
									{ticket.event.category}
								</p>
							</div>
							<div>
								<p
									style={{
										fontSize: '0.875rem',
										fontWeight: '500',
										color: '#374151',
									}}>
									Date & Time
								</p>
								<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
									{new Date(ticket.event.date).toLocaleString(
										'en-US',
										{
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										},
									)}
								</p>
							</div>
							<div>
								<p
									style={{
										fontSize: '0.875rem',
										fontWeight: '500',
										color: '#374151',
									}}>
									Location
								</p>
								<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
									{ticket.event.location}
								</p>
							</div>
						</div>
					</div>

					{/* Attendee Information */}
					<div style={{ marginBottom: '1.5rem' }}>
						<h2
							style={{
								fontSize: '1.125rem',
								fontWeight: '600',
								marginBottom: '0.5rem',
								color: '#111827',
							}}>
							Attendee Information
						</h2>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '1rem',
							}}>
							<div>
								<p
									style={{
										fontSize: '0.875rem',
										fontWeight: '500',
										color: '#374151',
									}}>
									Full Name
								</p>
								<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
									{ticket.user.name}
								</p>
							</div>
							<div>
								<p
									style={{
										fontSize: '0.875rem',
										fontWeight: '500',
										color: '#374151',
									}}>
									Email
								</p>
								<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
									{ticket.user.email}
								</p>
							</div>
							{ticket.user.phone && (
								<div>
									<p
										style={{
											fontSize: '0.875rem',
											fontWeight: '500',
											color: '#374151',
										}}>
										Phone
									</p>
									<p
										style={{
											fontSize: '0.875rem',
											color: '#6b7280',
										}}>
										{ticket.user.phone}
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Additional Information */}
					{(ticket.seatNumber ||
						ticket.specialRequirements ||
						ticket.notes) && (
						<div>
							<h2
								style={{
									fontSize: '1.125rem',
									fontWeight: '600',
									marginBottom: '0.5rem',
									color: '#111827',
								}}>
								Additional Information
							</h2>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									gap: '1rem',
								}}>
								{ticket.seatNumber && (
									<div>
										<p
											style={{
												fontSize: '0.875rem',
												fontWeight: '500',
												color: '#374151',
											}}>
											Seat Number
										</p>
										<p
											style={{
												fontSize: '0.875rem',
												color: '#6b7280',
											}}>
											{ticket.seatNumber}
										</p>
									</div>
								)}
								{ticket.specialRequirements && (
									<div>
										<p
											style={{
												fontSize: '0.875rem',
												fontWeight: '500',
												color: '#374151',
											}}>
											Special Requirements
										</p>
										<p
											style={{
												fontSize: '0.875rem',
												color: '#6b7280',
											}}>
											{ticket.specialRequirements}
										</p>
									</div>
								)}
								{ticket.notes && (
									<div>
										<p
											style={{
												fontSize: '0.875rem',
												fontWeight: '500',
												color: '#374151',
											}}>
											Notes
										</p>
										<p
											style={{
												fontSize: '0.875rem',
												color: '#6b7280',
											}}>
											{ticket.notes}
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Footer */}
					<div
						style={{
							marginTop: '2rem',
							textAlign: 'center',
							fontSize: '0.875rem',
							color: '#6b7280',
						}}>
						<p>This ticket is valid for entry to the event.</p>
						<p>Please present this ticket at the venue.</p>
					</div>
				</div>
			</div>

			<Button
				variant={variant}
				className={cn('w-full justify-start', className)}
				onClick={handleDownload}>
				{icon && <DownloadIcon className='h-4 w-4' />}
				{label}
			</Button>
		</>
	);
}
