import SignInForm from '@/components/auth/sign-in-form';
import { signup_url } from '@/lib/auth/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
	return (
		<div className='w-[400px] shadow-none border p-6 rounded-2xl'>
			<div className='pb-4'>
				<Image
					src='/logo-placeholder.png'
					alt='logo'
					width={50}
					height={50}
					className='pb-4'
				/>
				<h1 className='text-lg md:text-xl font-bold'>Sign In</h1>
				<p className='text-xs md:text-sm text-muted-foreground'>
					Enter your email below to login to your account
				</p>
			</div>

			<SignInForm />

			<div className='flex flex-col items-center justify-center mt-4'>
				<p className='text-xs md:text-sm text-muted-foreground text-center'>
					Don&apos;t have an account?{' '}
					<Link
						href={signup_url}
						className='text-primary hover:underline'>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
