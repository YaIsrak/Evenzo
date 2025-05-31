/* eslint-disable @next/next/no-img-element */
'use client';

import {
	AlertCircleIcon,
	ImageIcon,
	Loader,
	PlusIcon,
	UploadIcon,
	XIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useFileUpload } from '@/hooks/use-file-upload';
import axios from 'axios';
import { toast } from 'sonner';

interface ImageUploadProps {
	setImages: React.Dispatch<React.SetStateAction<string[]>>;
	isUploading: boolean;
	setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageUpload({
	setImages,
	isUploading,
	setIsUploading,
}: ImageUploadProps) {
	const maxSizeMB = 5;
	const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
	const maxFiles = 6;

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload({
		accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif',
		maxSize,
		multiple: true,
		maxFiles,
	});

	const handleUploadOnCloud = async () => {
		try {
			setIsUploading(true);
			const formData = new FormData();

			// Append each file to the form data
			files.forEach((fileObj) => {
				if (fileObj.file instanceof File) {
					formData.append('file', fileObj.file);
				}
			});

			const { data } = await axios.post('/api/image-upload', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			setImages(data.urls);
			setIsUploading(false);
		} catch (error) {
			toast.error('Failed to upload images', {
				description: (error as Error).message,
			});
		}
	};

	return (
		<div className='flex flex-col gap-2 py-4'>
			{/* Drop area */}
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				data-files={files.length > 0 || undefined}
				className='border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] bg-accent/20'>
				<input
					{...getInputProps()}
					className='sr-only'
					aria-label='Upload image file'
				/>
				{files.length > 0 ? (
					<div className='flex w-full flex-col gap-3'>
						<div className='flex items-center justify-between gap-2'>
							<h3 className='truncate text-sm font-medium'>
								Uploaded Files ({files.length})
							</h3>

							<div className='flex items-center gap-2'>
								{files.length !== maxFiles && (
									<Button
										onClick={openFileDialog}
										disabled={files.length >= maxFiles}
										variant={
											files.length === maxFiles
												? 'default'
												: 'outline'
										}>
										<PlusIcon />
										Add more
									</Button>
								)}

								{files.length !== 0 && (
									<Button
										onClick={handleUploadOnCloud}
										disabled={isUploading}>
										{isUploading ? (
											<Loader className='size-5 animate-spin' />
										) : (
											<UploadIcon className='-ms-0.5 size-3.5 opacity-60' />
										)}
										Upload
									</Button>
								)}
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
							{files.map((file) => (
								<div
									key={file.id}
									className='bg-accent relative aspect-square rounded-md'>
									<img
										src={file.preview}
										alt={file.file.name}
										className='size-full rounded-2xl object-cover'
									/>
									<Button
										onClick={() => removeFile(file.id)}
										size='icon'
										className='bg-black border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none'
										aria-label='Remove image'>
										<XIcon className='size-6' />
									</Button>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className='flex flex-col items-center justify-center px-4 py-3 text-center'>
						<div
							className='bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border'
							aria-hidden='true'>
							<ImageIcon className='size-4 opacity-60' />
						</div>
						<p className='mb-1.5 text-sm font-medium'>
							Drop your images here
						</p>
						<p className='text-muted-foreground text-xs'>
							PNG, JPG or GIF (max. {maxSizeMB}MB)
						</p>
						<p className='text-muted-foreground text-xs'>
							{maxFiles} images only
						</p>
						<Button
							// variant='outline'
							className='mt-4'
							size={'sm'}
							onClick={openFileDialog}>
							<UploadIcon
								className='-ms-1 opacity-60'
								aria-hidden='true'
							/>
							Select images
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className='text-destructive flex items-center gap-1 text-xs'
					role='alert'>
					<AlertCircleIcon className='size-3 shrink-0' />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	);
}

export function ImagesPreview({
	images,
	edit,
}: {
	images: string[];
	edit?: boolean;
}) {
	return (
		<div className='py-4'>
			<h3 className='truncate text-lg font-medium'>Images</h3>
			{edit && (
				<p className='text-muted-foreground text-xs mb-2'>
					Images cant be edited
				</p>
			)}
			<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 border p-4 rounded-2xl'>
				{images.map((image, i) => (
					<div
						key={i}
						className='aspect-square rounded-md'>
						<img
							src={image}
							alt={image}
							className='size-full rounded-2xl object-cover'
						/>
					</div>
				))}
			</div>
		</div>
	);
}
