import fetch, { FetchError } from 'node-fetch';
import { Observable } from 'rxjs';
import { encode } from './encoding';
import { EncodedItem } from './encoding';

const ITEMS_URL = 'http://localhost:8080/';

export class ItemService {
	encodedItemsCache: Array<EncodedItem>;

	constructor(encodedItemsCache) {
		this.encodedItemsCache = encodedItemsCache;
	}

	public fetchItems(): Observable<Array<EncodedItem>> {
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
		return encode(observableOfItems);
	}

	public getItems(): Array<EncodedItem> {
		return this.encodedItemsCache;
	}

	public getItemsInIndex(searchIndex: number): string {
		let currIndex = -1;
		console.log(JSON.stringify(this.encodedItemsCache));
		for (let encodedItem of this.encodedItemsCache) {
			const { count, item } = encodedItem;
			currIndex += count;
			if (searchIndex <= currIndex) {
				return item;
			}
		}
		return '';
	}
}
