'use client';

import Image from 'next/image';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export default function QrCodeImage({ text }: { text: string }) {
	const [qr, setQr] = useState<string | null>(null);

	useEffect(() => {
		const generateQr = async () => {
			try {
				// Generate directly using client-side QRCode library for instantaneous rendering
				const dataUrl = await QRCode.toDataURL(text, {
					width: 300,
					margin: 2,
					color: {
						dark: '#000000',
						light: '#ffffff',
					},
				});
				setQr(dataUrl);
			} catch (error) {
				// Fallback to API route if client-side generation encounters an issue
				try {
					const res = await fetch(`/api/qr?text=${encodeURIComponent(text)}`);
					const data = await res.json();
					if (data.qr) {
						setQr(data.qr);
					}
				} catch (err) {
					console.error('Failed to generate QR code', err);
				}
			}
		};

		if (text) {
			generateQr();
		}
	}, [text]);

	return (
		<div className='relative h-full w-auto aspect-square flex items-center justify-center'>
			{qr && (
				<Image
					src={qr}
					alt={`QR Code for ${text}`}
					fill
					className='object-contain rounded-2xl'
					unoptimized
				/>
			)}
		</div>
	);
}
