'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { ITicket } from '@/lib/model/ticket.model';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { DownloadIcon, Loader2 } from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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
	const [isDownloading, setIsDownloading] = useState(false);
	const [qrDataUrl, setQrDataUrl] = useState<string>('');

	// Generate QR code data URL once ticket is available
	useEffect(() => {
		if (ticket?.ticketId) {
			QRCode.toDataURL(ticket.ticketId, {
				width: 200,
				margin: 1,
				color: {
					dark: '#111827',
					light: '#ffffff',
				},
			})
				.then(setQrDataUrl)
				.catch((err) => {
					console.error('Failed to generate QR code data URL', err);
				});
		}
	}, [ticket?.ticketId]);

	const handleDownload = async () => {
		if (!ticket) {
			toast.error('Ticket data is not available');
			return;
		}

		setIsDownloading(true);

		try {
			// Ensure QR code is ready before rendering
			let qrUrl = qrDataUrl;
			if (!qrUrl && ticket.ticketId) {
				qrUrl = await QRCode.toDataURL(ticket.ticketId, {
					width: 200,
					margin: 1,
					color: {
						dark: '#111827',
						light: '#ffffff',
					},
				});
				setQrDataUrl(qrUrl);
			}

			// Allow DOM to update with visible opacity for capture
			await new Promise((resolve) => setTimeout(resolve, 150));

			if (!ticketRef.current) {
				throw new Error('Ticket container ref not found');
			}

			// Dynamic import react-to-pdf to avoid any SSR issues
			const reactToPdfModule = await import('react-to-pdf');
			const generatePDF =
				typeof reactToPdfModule.default === 'function'
					? reactToPdfModule.default
					: (reactToPdfModule as any).generatePDF ||
						(reactToPdfModule.default as any)?.default;

			if (typeof generatePDF !== 'function') {
				throw new Error('PDF generator function could not be loaded');
			}

			await generatePDF(() => ticketRef.current, {
				filename: `ticket-${ticket.ticketId || 'evenzo'}.pdf`,
				page: {
					margin: 5,
					format: 'A4',
					orientation: 'portrait',
				},
				resolution: 2,
				canvas: {
					mimeType: 'image/jpeg',
					qualityRatio: 0.95,
					useCORS: true,
				},
			});

			toast.success('Ticket PDF downloaded successfully');
		} catch (error) {
			console.error('react-to-pdf generation failed, attempting print fallback:', error);

			// Fallback: Open native browser print / save-as-pdf dialog
			try {
				if (ticketRef.current && typeof window !== 'undefined') {
					const printWindow = window.open('', '_blank');
					if (printWindow) {
						printWindow.document.write(`
							<!DOCTYPE html>
							<html>
								<head>
									<title>Ticket - ${ticket.ticketId}</title>
									<style>
										body {
											margin: 0;
											padding: 24px;
											font-family: Arial, sans-serif;
											display: flex;
											justify-content: center;
											background: #ffffff;
										}
										@media print {
											body { padding: 0; }
										}
									</style>
								</head>
								<body>
									${ticketRef.current.innerHTML}
									<script>
										window.onload = function() {
											window.focus();
											window.print();
										};
									</script>
								</body>
							</html>
						`);
						printWindow.document.close();
						toast.info('Print dialog opened. Select "Save as PDF" to download.');
						return;
					}
				}
			} catch (fallbackError) {
				console.error('Fallback print also failed:', fallbackError);
			}

			toast.error('Failed to generate ticket PDF', {
				description: (error as Error).message,
			});
		} finally {
			setIsDownloading(false);
		}
	};

	const eventDateStr = ticket?.event?.date
		? new Date(ticket.event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: '';

	const purchaseDateStr = ticket?.purchaseDate
		? new Date(ticket.purchaseDate).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: '';

	return (
		<>
			{/* Dedicated render container positioned at (0, 0) underneath page layers for accurate html2canvas bounds */}
			<div
				aria-hidden='true'
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					width: '740px',
					zIndex: -9999,
					pointerEvents: 'none',
					opacity: isDownloading ? 1 : 0,
				}}>
				<div
					ref={ticketRef}
					style={{
						width: '740px',
						padding: '36px',
						backgroundColor: '#ffffff',
						color: '#111827',
						fontFamily: 'Arial, Helvetica, sans-serif',
						borderRadius: '16px',
						border: '2px solid #e5e7eb',
						boxSizing: 'border-box',
					}}>
					{/* Brand & Pass Header */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							borderBottom: '2px dashed #d1d5db',
							paddingBottom: '20px',
							marginBottom: '24px',
						}}>
						<div>
							<h1
								style={{
									fontSize: '28px',
									fontWeight: '800',
									color: '#4f46e5',
									margin: '0 0 4px 0',
									letterSpacing: '-0.5px',
								}}>
								EVENZO
							</h1>
							<p
								style={{
									fontSize: '13px',
									color: '#6b7280',
									margin: 0,
									fontWeight: '500',
								}}>
								Official Event Admission Pass
							</p>
						</div>
						<div style={{ textAlign: 'right' }}>
							<span
								style={{
									display: 'inline-block',
									padding: '6px 14px',
									fontSize: '12px',
									fontWeight: '700',
									borderRadius: '9999px',
									backgroundColor: '#dcfce7',
									color: '#15803d',
									textTransform: 'uppercase',
									letterSpacing: '0.5px',
								}}>
								{ticket.status === 'used'
									? 'Used'
									: ticket.status === 'cancelled'
										? 'Cancelled'
										: 'Valid Pass'}
							</span>
							<p
								style={{
									fontSize: '11px',
									color: '#9ca3af',
									margin: '6px 0 0 0',
								}}>
								Issued: {purchaseDateStr}
							</p>
						</div>
					</div>

					{/* Event & QR Section */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 180px',
							gap: '24px',
							marginBottom: '24px',
							alignItems: 'center',
						}}>
						<div>
							<span
								style={{
									display: 'inline-block',
									fontSize: '12px',
									fontWeight: '600',
									color: '#6366f1',
									backgroundColor: '#eef2ff',
									padding: '4px 10px',
									borderRadius: '6px',
									marginBottom: '8px',
								}}>
								{ticket.event?.category || 'Event'}
							</span>
							<h2
								style={{
									fontSize: '24px',
									fontWeight: '700',
									margin: '0 0 12px 0',
									lineHeight: '1.25',
									color: '#111827',
								}}>
								{ticket.event?.title || 'Event Name'}
							</h2>

							<div style={{ display: 'grid', gap: '8px' }}>
								<div style={{ fontSize: '14px', color: '#4b5563' }}>
									<strong style={{ color: '#1f2937' }}>Date & Time: </strong>
									{eventDateStr}{' '}
									{ticket.event?.time ? `• ${ticket.event.time}` : ''}
								</div>
								<div style={{ fontSize: '14px', color: '#4b5563' }}>
									<strong style={{ color: '#1f2937' }}>Location: </strong>
									{ticket.event?.location || 'Venue details provided by organizer'}
								</div>
							</div>
						</div>

						{/* QR Code Container */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '12px',
								backgroundColor: '#f9fafb',
								borderRadius: '12px',
								border: '1px solid #e5e7eb',
							}}>
							{qrDataUrl ? (
								<img
									src={qrDataUrl}
									alt='Ticket QR Code'
									style={{
										width: '150px',
										height: '150px',
										display: 'block',
									}}
								/>
							) : (
								<div
									style={{
										width: '150px',
										height: '150px',
										backgroundColor: '#e5e7eb',
										borderRadius: '8px',
									}}
								/>
							)}
							<p
								style={{
									fontSize: '11px',
									fontWeight: '600',
									color: '#4b5563',
									marginTop: '8px',
									fontFamily: 'monospace',
									letterSpacing: '0.5px',
								}}>
								{ticket.ticketId}
							</p>
						</div>
					</div>

					{/* Details Grid */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, 1fr)',
							gap: '12px',
							padding: '16px',
							backgroundColor: '#f9fafb',
							borderRadius: '12px',
							marginBottom: '20px',
						}}>
						<div>
							<p
								style={{
									fontSize: '11px',
									color: '#6b7280',
									textTransform: 'uppercase',
									margin: '0 0 4px 0',
									fontWeight: '600',
								}}>
								Attendee Name
							</p>
							<p
								style={{
									fontSize: '14px',
									fontWeight: '700',
									color: '#111827',
									margin: 0,
								}}>
								{ticket.user?.name || 'Attendee'}
							</p>
						</div>

						<div>
							<p
								style={{
									fontSize: '11px',
									color: '#6b7280',
									textTransform: 'uppercase',
									margin: '0 0 4px 0',
									fontWeight: '600',
								}}>
								Seat Number
							</p>
							<p
								style={{
									fontSize: '14px',
									fontWeight: '700',
									color: '#111827',
									margin: 0,
								}}>
								{ticket.seatNumber || 'General Admission'}
							</p>
						</div>

						<div>
							<p
								style={{
									fontSize: '11px',
									color: '#6b7280',
									textTransform: 'uppercase',
									margin: '0 0 4px 0',
									fontWeight: '600',
								}}>
								Access Level
							</p>
							<p
								style={{
									fontSize: '14px',
									fontWeight: '700',
									color: '#111827',
									margin: 0,
									textTransform: 'capitalize',
								}}>
								{ticket.accessLevel || 'General'}
							</p>
						</div>

						<div>
							<p
								style={{
									fontSize: '11px',
									color: '#6b7280',
									textTransform: 'uppercase',
									margin: '0 0 4px 0',
									fontWeight: '600',
								}}>
								Email
							</p>
							<p
								style={{
									fontSize: '13px',
									fontWeight: '600',
									color: '#4b5563',
									margin: 0,
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}>
								{ticket.user?.email || 'N/A'}
							</p>
						</div>
					</div>

					{/* Special notes if any */}
					{(ticket.specialRequirements || ticket.notes) && (
						<div
							style={{
								padding: '12px 16px',
								backgroundColor: '#fffbeb',
								border: '1px solid #fef3c7',
								borderRadius: '8px',
								marginBottom: '20px',
								fontSize: '13px',
								color: '#92400e',
							}}>
							{ticket.specialRequirements && (
								<p style={{ margin: '0 0 4px 0' }}>
									<strong>Requirements: </strong>
									{ticket.specialRequirements}
								</p>
							)}
							{ticket.notes && (
								<p style={{ margin: 0 }}>
									<strong>Notes: </strong>
									{ticket.notes}
								</p>
							)}
						</div>
					)}

					{/* Instructions Footer */}
					<div
						style={{
							textAlign: 'center',
							paddingTop: '16px',
							borderTop: '1px solid #e5e7eb',
							fontSize: '12px',
							color: '#6b7280',
						}}>
						<p style={{ margin: '0 0 4px 0' }}>
							Please present this ticket and a valid photo ID upon arrival at
							the venue.
						</p>
						<p
							style={{
								margin: 0,
								fontSize: '11px',
								color: '#9ca3af',
							}}>
							Ticket ID: {ticket.ticketId} • Generated via Evenzo Platform
						</p>
					</div>
				</div>
			</div>

			<Button
				variant={variant}
				className={cn('w-full justify-start', className)}
				disabled={isDownloading}
				onClick={handleDownload}>
				{isDownloading ? (
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
				) : (
					icon && <DownloadIcon className='mr-2 h-4 w-4' />
				)}
				{isDownloading ? 'Generating PDF...' : label}
			</Button>
		</>
	);
}
