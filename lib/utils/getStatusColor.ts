export const getStatusColor = (
	status: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
	switch (status) {
		case 'cancelled':
			return 'destructive';
		case 'past':
		case 'used':
			return 'secondary';
		case 'active':
		case 'upcoming':
			return 'default';
		default:
			return 'outline';
	}
};
