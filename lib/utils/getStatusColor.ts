export const getStatusColor = (status: string) => {
	switch (status) {
		case 'cancelled':
			return 'bg-rose-500 text-white';
		case 'past':
			return 'bg-gray-500 text-white';
		default:
			return 'default';
	}
};
