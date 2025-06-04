import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const text = searchParams.get('text');

	if (!text) {
		return NextResponse.json({ error: 'Text is required' }, { status: 400 });
	}

	try {
		const qrDataUrl = await QRCode.toDataURL(text);
		return NextResponse.json({ qr: qrDataUrl });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Failed to generate QR code' },
			{ status: 500 },
		);
	}
}
