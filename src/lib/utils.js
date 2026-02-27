import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function toWebP(src) {
	return src.replace(/\.(jpe?g|png)$/i, '.webp');
}