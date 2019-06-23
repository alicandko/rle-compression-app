export function transformDataToItems(data: Buffer): string[] {
	return data
		.toString()
		.split('\n')
		.filter(item => item !== '');
}
