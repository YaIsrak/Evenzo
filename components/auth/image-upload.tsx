import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, UserIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
	setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ImageUpload({ setImage }: Props) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='flex items-center gap-4 w-full'>
			<Input
				id='image'
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className='w-full'
				hidden
			/>

			{imagePreview ? (
				<div className='relative size-12 rounded-lg'>
					<Image
						src={imagePreview}
						alt='Profile preview'
						layout='fill'
						objectFit='cover'
						className='rounded-lg'
					/>

					<X
						className='size-5 p-1 rounded-2xl bg-black text-white absolute bottom-2 right-2 translate-x-1/2 translate-y-1/2 cursor-pointer'
						onClick={() => {
							setImage(null);
							setImagePreview(null);
						}}
					/>
				</div>
			) : (
				<Label
					htmlFor='image'
					className='bg-muted rounded-lg flex items-center justify-center relative cursor-pointer'>
					<UserIcon className='size-10 p-2' />
					<PlusIcon className='size-5 p-1 rounded-2xl bg-black text-white absolute bottom-2 right-2 translate-x-1/2 translate-y-1/2' />
				</Label>
			)}

			<div>
				<p className='text-sm font-medium'>Profile Picture</p>
				<p className='text-xs text-muted-foreground'>(Optional)</p>
			</div>
		</div>
	);
}
