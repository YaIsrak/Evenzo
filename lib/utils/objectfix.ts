export const replaceMongoIdInArray = (array: any[]) => {
	const mappedArray = array.map((item) => {
		const plainObject = JSON.parse(JSON.stringify(item));
		const { _id, ...rest } = plainObject;
		return { id: _id.toString(), ...rest };
	});

	return mappedArray;
};

export const replaceMongoIdInObject = (obj: any) => {
	const plainObject = JSON.parse(JSON.stringify(obj));
	const { _id, ...updatedObj } = plainObject;
	return { id: _id.toString(), ...updatedObj };
};
