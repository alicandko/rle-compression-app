import { Observable } from 'rxjs';
import { reduce, mergeAll } from 'rxjs/operators';

export interface EncodedItem {
	item: string;
	count: number;
}

export function encode(
	observableItems: Observable<any>
): Observable<Array<EncodedItem>> {
	return observableItems.pipe(
		mergeAll(),
		reduce((acc: Array<EncodedItem>, currItem: string): Array<EncodedItem> => {
			const lastEncodedItem = acc[acc.length - 1];
			if (lastEncodedItem === undefined) {
				return [...acc, { item: currItem, count: 1 }];
			}
			const { item, count } = lastEncodedItem;
			if (item === currItem) {
				const restAcc = acc.slice(0, -1);
				return [...restAcc, { item, count: count + 1 }];
			}

			return [...acc, { item: currItem, count: 1 }];
		}, [])
	);
}
