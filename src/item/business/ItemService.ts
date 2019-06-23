import fetch from 'node-fetch';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { config } from '../../config';
import { IEncodedItem } from '../model';
import { encodeRle } from './encoding';
import { transformDataToItems } from './transform';

const ITEMS_API_URL = config.itemsApi.url;

export class ItemService {
	public static fetchAndEncodeItems(): Observable<IEncodedItem[]> {
		const observableOfItems: Observable<string[]> = new Observable(
			subscriber => {
				fetch(ITEMS_API_URL)
					.then(response => {
						const body = response.body;
						body.on('data', data => {
							const items = transformDataToItems(data);
							subscriber.next(items);
						});
						body.on('end', () => {
							subscriber.complete();
						});
						body.on('error', error => {
							console.error('An error occurred while streaming from Items API');
							subscriber.error(error);
						});
					})
					.catch(error => {
						console.error('Items API can not be reached');
						subscriber.error(error);
					});
			}
		).pipe(retry<string[]>(2));

		return encodeRle(observableOfItems);
	}

	public static getItemInIndex(
		encodedItemsCache: IEncodedItem[],
		searchIndex: number
	): string {
		if (searchIndex < 0) {
			return '';
		}

		let currIndex = -1;
		for (const encodedItem of encodedItemsCache) {
			const { count, item } = encodedItem;
			currIndex += count;
			if (searchIndex <= currIndex) {
				return item;
			}
		}

		return '';
	}
}
