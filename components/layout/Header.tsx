interface Props {
	title: string;
	description?: string;
}

export default function Header({ title, description }: Props) {
	return (
		<div className='space-y-2'>
			<h1 className='text-3xl font-bold'>{title}</h1>
			{description && <p className='text-muted-foreground'>{description}</p>}
		</div>
	);
}
