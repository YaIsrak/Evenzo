export const getStatusColor = (status: string) => {
	switch (status) {
		case 'cancelled':
			return 'destructive';
		case 'past':
			return 'secondary';
		default:
			return 'default';
	}
};
