import SignUpForm from '@/components/auth/sign-up-form';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
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
				<h1 className='text-lg md:text-xl font-bold'>Sign Up</h1>
				<p className='text-xs md:text-sm text-muted-foreground'>
					Enter your email below to login to your account
				</p>
			</div>

			<SignUpForm />

			<div className='flex flex-col items-center justify-center mt-4'>
				<p className='text-xs md:text-sm text-muted-foreground text-center'>
					Already have an account?{' '}
					<Link
						href='/sign-in'
						className='text-primary hover:underline'>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
