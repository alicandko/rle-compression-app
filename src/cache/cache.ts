import { ItemService } from '../item';

const TTL = 10000;

const cache = new Map();

export function initCache() {
	fetchAndSetItems();
	setInterval(fetchAndSetItems, TTL);
	return cache;
}

function fetchAndSetItems() {
	ItemService.fetchItems().subscribe(encodedItems => {
		cache.set('encodedItems', encodedItems);
	});
}
