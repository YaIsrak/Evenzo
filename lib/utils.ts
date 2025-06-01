import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateSeatNumber() {
	const seatNumber = Math.floor(Math.random() * 1000000);
	return seatNumber;
}
