'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CameraIcon, CameraOffIcon, RefreshCwIcon, SwitchCameraIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface QrScannerProps {
	onScan: (ticketId: string) => void;
	isScanningActive?: boolean;
}

export function extractTicketId(scannedText: string): string {
	const trimmed = scannedText.trim();
	// Handles full URLs e.g. https://domain.com/tickets/TICKET-123-4
	if (trimmed.includes('/tickets/')) {
		const parts = trimmed.split('/tickets/');
		return parts[parts.length - 1].split('?')[0].split('#')[0].trim();
	}
	return trimmed;
}

export default function QrScanner({ onScan, isScanningActive = true }: QrScannerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
	const [selectedCameraId, setSelectedCameraId] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [isInitializing, setIsInitializing] = useState(false);
	const qrCodeScannerRef = useRef<any>(null);
	const scannerContainerId = 'qr-code-camera-stream';

	// Stop scanner cleanup helper
	const stopScanner = async () => {
		if (qrCodeScannerRef.current) {
			try {
				if (qrCodeScannerRef.current.isScanning) {
					await qrCodeScannerRef.current.stop();
				}
				qrCodeScannerRef.current.clear();
			} catch (err) {
				console.error('Error stopping QR scanner:', err);
			} finally {
				qrCodeScannerRef.current = null;
			}
		}
	};

	// Start scanner with selected camera or facingMode
	const startScanner = async (cameraId?: string) => {
		setErrorMsg(null);
		setIsInitializing(true);

		try {
			// Stop previous instance if running
			await stopScanner();

			const { Html5Qrcode } = await import('html5-qrcode');

			// Check available cameras
			const devices = await Html5Qrcode.getCameras();
			if (!devices || devices.length === 0) {
				throw new Error('No camera found on this device.');
			}

			setCameras(devices);
			const activeCameraId = cameraId || selectedCameraId || devices[0].id;
			setSelectedCameraId(activeCameraId);

			const html5QrCode = new Html5Qrcode(scannerContainerId);
			qrCodeScannerRef.current = html5QrCode;

			const config = {
				fps: 15,
				qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
					const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
					const qrboxSize = Math.floor(minEdge * 0.7);
					return {
						width: Math.max(qrboxSize, 220),
						height: Math.max(qrboxSize, 220),
					};
				},
				aspectRatio: 1.0,
			};

			const cameraTarget = cameraId
				? { deviceId: { exact: cameraId } }
				: { facingMode: 'environment' };

			await html5QrCode.start(
				cameraTarget,
				config,
				(decodedText) => {
					const ticketId = extractTicketId(decodedText);
					if (ticketId) {
						toast.success(`Scanned: ${ticketId}`);
						onScan(ticketId);
					}
				},
				() => {
					// frame scan error (normal while searching for QR)
				},
			);
		} catch (err: any) {
			console.error('Failed to start camera QR scanner:', err);
			let userFriendlyError = err.message || 'Unable to access camera';
			if (err.name === 'NotAllowedError') {
				userFriendlyError =
					'Camera permission denied. Please allow camera access in your browser settings.';
			} else if (err.name === 'NotFoundError') {
				userFriendlyError = 'No camera found on your device.';
			}
			setErrorMsg(userFriendlyError);
			toast.error(userFriendlyError);
		} finally {
			setIsInitializing(false);
		}
	};

	const toggleScanner = async () => {
		if (isOpen) {
			await stopScanner();
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	// Start or stop when isOpen changes
	useEffect(() => {
		if (isOpen && isScanningActive) {
			startScanner();
		} else {
			stopScanner();
		}

		return () => {
			stopScanner();
		};
	}, [isOpen]);

	// Handle switching cameras (e.g. mobile front vs back camera)
	const handleSwitchCamera = () => {
		if (cameras.length <= 1) return;
		const currentIndex = cameras.findIndex((c) => c.id === selectedCameraId);
		const nextIndex = (currentIndex + 1) % cameras.length;
		const nextCamera = cameras[nextIndex];
		setSelectedCameraId(nextCamera.id);
		startScanner(nextCamera.id);
	};

	return (
		<div className='w-full space-y-4'>
			<div className='flex items-center justify-between gap-4'>
				<Button
					type='button'
					variant={isOpen ? 'destructive' : 'default'}
					className='w-full sm:w-auto flex items-center gap-2 cursor-pointer shadow-sm'
					onClick={toggleScanner}>
					{isOpen ? (
						<>
							<CameraOffIcon className='size-4' />
							Close Camera Scanner
						</>
					) : (
						<>
							<CameraIcon className='size-4' />
							Open Live QR Scanner
						</>
					)}
				</Button>

				{isOpen && cameras.length > 1 && (
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={handleSwitchCamera}
						className='flex items-center gap-2'>
						<SwitchCameraIcon className='size-4' />
						Switch Camera
					</Button>
				)}
			</div>

			{isOpen && (
				<Card className='p-4 border-2 border-primary/20 bg-muted/20 relative overflow-hidden transition-all'>
					<div className='relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-xl bg-black flex items-center justify-center shadow-inner'>
						{/* html5-qrcode attaches video stream here */}
						<div
							id={scannerContainerId}
							className='w-full h-full object-cover'
						/>

						{isInitializing && (
							<div className='absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-sm z-20'>
								<RefreshCwIcon className='size-6 animate-spin text-primary' />
								<p>Initializing camera...</p>
							</div>
						)}

						{/* Overlay styling for target viewfinder */}
						{!isInitializing && !errorMsg && (
							<div className='pointer-events-none absolute inset-0 flex items-center justify-center z-10'>
								<div className='relative size-60 border-2 border-primary/80 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]'>
									{/* Corner Accents */}
									<div className='absolute -top-1 -left-1 size-5 border-t-4 border-l-4 border-primary rounded-tl-lg' />
									<div className='absolute -top-1 -right-1 size-5 border-t-4 border-r-4 border-primary rounded-tr-lg' />
									<div className='absolute -bottom-1 -left-1 size-5 border-b-4 border-l-4 border-primary rounded-bl-lg' />
									<div className='absolute -bottom-1 -right-1 size-5 border-b-4 border-r-4 border-primary rounded-br-lg' />

									{/* Scanning beam animation */}
									<div className='absolute inset-x-2 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[pulse_2s_ease-in-out_infinite]' />
								</div>
							</div>
						)}
					</div>

					{errorMsg ? (
						<div className='mt-3 p-3 text-center text-sm text-destructive bg-destructive/10 rounded-lg'>
							<p>{errorMsg}</p>
							<Button
								variant='outline'
								size='sm'
								className='mt-2'
								onClick={() => startScanner()}>
								Retry Camera
							</Button>
						</div>
					) : (
						<p className='text-xs text-muted-foreground text-center mt-3'>
							Point your camera at an attendee&apos;s Evenzo ticket QR code to verify and check in.
						</p>
					)}
				</Card>
			)}
		</div>
	);
}
