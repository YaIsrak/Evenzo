import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const files = formData.getAll('file') as File[];

		if (!files.length) throw new Error('No files uploaded');

		const urls: string[] = [];

		for (const file of files) {
			// Read file as buffer
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Upload to Cloudinary
			const uploadResult = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: 'evenzo' }, (error, result) => {
						if (error) return reject(error);
						resolve(result);
					})
					.end(buffer);
			});

			urls.push((uploadResult as any).secure_url);
		}

		return NextResponse.json({ urls });
		// return NextResponse.json({ buffer });
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		);
	}
}
