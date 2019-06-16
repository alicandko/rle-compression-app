import { from } from 'rxjs';
import { encodeRle } from './encoding';

describe('item - business - encoding', () => {
	describe('encodeRle', () => {
		describe('when given observable is not flat', () => {
			it('should return encoded items', () => {
				const mockObservable = from([
					['A', 'A', 'A', 'B', 'B', 'C', 'C'],
					['C', 'C', 'C', 'A'],
					['A', 'A', 'A', 'B', 'B', 'E']
				]);

				const expected = [
					{ item: 'A', count: 3 },
					{ item: 'B', count: 2 },
					{ item: 'C', count: 5 },
					{ item: 'A', count: 4 },
					{ item: 'B', count: 2 },
					{ item: 'E', count: 1 }
				];

				encodeRle(mockObservable).subscribe(actual =>
					expect(actual).toEqual(expected)
				);
			});

			describe('and is empty', () => {
				it('should return empty array', () => {
					const mockObservable = from([[], [], []]);

					const expected = [];

					encodeRle(mockObservable).subscribe(actual =>
						expect(actual).toEqual(expected)
					);
				});
			});
		});

		describe('when given observable is flat', () => {
			it('should return encoded items', () => {
				const mockObservable = from([['A', 'A', 'A', 'B', 'B', 'C', 'C']]);

				const expected = [
					{ item: 'A', count: 3 },
					{ item: 'B', count: 2 },
					{ item: 'C', count: 2 }
				];

				encodeRle(mockObservable).subscribe(actual =>
					expect(actual).toEqual(expected)
				);
			});

			describe('and is empty', () => {
				it('should return empty array', () => {
					const mockObservable = from([]);

					const expected = [];

					encodeRle(mockObservable).subscribe(actual =>
						expect(actual).toEqual(expected)
					);
				});
			});
		});
	});
});
