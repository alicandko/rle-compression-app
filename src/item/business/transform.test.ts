import { from } from 'rxjs';
import { transformDataToItems } from './transform';

describe('item - business - transform', () => {
	describe('transformDataToItems', () => {
		describe('when given a non empty buffer', () => {
			it('should transform to an array of items', () => {
				const mockBuffer = Buffer.from('A\nB\nC\n', 'ascii');
				const expected = ['A', 'B', 'C'];
				expect(transformDataToItems(mockBuffer)).toEqual(expected);
			});
		});

		describe('when given an empty buffer', () => {
			it('should transform to an empty array', () => {
				const mockBuffer = Buffer.from('', 'ascii');
				expect(transformDataToItems(mockBuffer)).toEqual([]);
			});
		});
	});
});
