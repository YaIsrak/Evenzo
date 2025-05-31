'use client';

import { Input } from '@/components/ui/input';
import { UserIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
	image: string;
}

export default function AvatarUpload({ image }: Props) {
	const [imagePreview, setImagePreview] = useState<string | null>(image);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='relative h-24 w-24 rounded-full bg-muted'>
			<Input
				id='image'
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className='w-full'
				hidden
			/>

			{imagePreview ? (
				<div className=''>
					<Image
						src={imagePreview}
						alt='Profile preview'
						layout='fill'
						objectFit='cover'
						className='h-full w-full object-cover rounded-full'
					/>

					<X
						className='size-6 p-1 rounded-2xl bg-[#0e0e0e] text-white absolute bottom-2 right-2 translate-x-1/2 translate-y-1/2 cursor-pointer'
						onClick={() => {
							// setImage(null);
							setImagePreview(null);
						}}
					/>
				</div>
			) : (
				<UserIcon className='h-12 w-12 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
			)}
		</div>
	);
}
