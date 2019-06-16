import fetch, { FetchError } from 'node-fetch';
import { Observable } from 'rxjs';
import { ITEMS_URL } from '../../config';
import { IEncodedItem } from '../model';
import { encodeRle } from './encoding';

export class ItemService {
	public encodedItemsCache: IEncodedItem[];

	constructor(encodedItemsCache) {
		this.encodedItemsCache = encodedItemsCache;
	}

	public fetchItems(): Observable<IEncodedItem[]> {
		const observableOfItems = new Observable(subscriber => {
			fetch(ITEMS_URL).then(response => {
				const body = response.body;
				body.on('data', data => {
					const items = data
						.toString()
						.split('\n')
						.filter(item => item !== '');
					subscriber.next(items);
				});
				body.on('end', () => {
					subscriber.complete();
				});
			});
		});
		return encodeRle(observableOfItems);
	}

	public getItemsInIndex(searchIndex: number): string {
		let currIndex = -1;
		for (const encodedItem of this.encodedItemsCache) {
			const { count, item } = encodedItem;
			currIndex += count;
			if (searchIndex <= currIndex) {
				return item;
			}
		}
		return '';
	}
}
