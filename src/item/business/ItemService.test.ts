import { ItemService } from './ItemService';

const mockCache = [
	{ item: 'A', count: 3 },
	{ item: 'B', count: 2 },
	{ item: 'C', count: 5 },
	{ item: 'A', count: 4 },
	{ item: 'B', count: 2 },
	{ item: 'E', count: 1 }
];

describe('item - business - ItemService', () => {
	describe('getItemInIndex', () => {
		it('should return the item at a given search index', () => {
			expect(ItemService.getItemInIndex(mockCache, 0)).toEqual('A');
			expect(ItemService.getItemInIndex(mockCache, 4)).toEqual('B');
			expect(ItemService.getItemInIndex(mockCache, 16)).toEqual('E');
		});

		describe('when the given search index is greater than count - 1', () => {
			it('should return an empty string', () => {
				expect(ItemService.getItemInIndex(mockCache, 17)).toEqual('');
			});
		});

		describe('when the given search index is not found', () => {
			it('should return an empty string', () => {
				expect(ItemService.getItemInIndex(mockCache, 100)).toEqual('');
			});
		});

		describe('when the given search index is negative', () => {
			it('should return an empty string', () => {
				expect(ItemService.getItemInIndex(mockCache, -1)).toEqual('');
			});
		});
	});
});
