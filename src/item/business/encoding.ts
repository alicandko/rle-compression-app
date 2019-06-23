import { Observable } from 'rxjs';
import { concatAll, reduce } from 'rxjs/operators';
import { IEncodedItem } from '../model';

export function encodeRle(
	observableItems: Observable<string[]>
): Observable<IEncodedItem[]> {
	return observableItems.pipe(
		concatAll(),
		reduce((acc: IEncodedItem[], currItem: string): IEncodedItem[] => {
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
