'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function QrCodeImage({ text }: { text: string }) {
	const [qr, setQr] = useState<string | null>(null);

	useEffect(() => {
		const fetchQr = async () => {
			const res = await fetch(
				`http://localhost:3000/api/qr?text=${encodeURIComponent(text)}`,
			);
			const data = await res.json();
			setQr(data.qr);
		};
		fetchQr();
	}, []);

	return (
		<div className='relative h-full w-auto aspect-square'>
			{qr && (
				<Image
					src={qr}
					alt='Generated QR Code'
					fill
					className='object-contain rounded-2xl'
					placeholder='blur'
					blurDataURL='/placeholder.png'
				/>
			)}
		</div>
	);
}
