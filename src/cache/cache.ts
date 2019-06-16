import { ItemService } from '../item';

const TTL = 10000;

const itemService = new ItemService([]);
const cache = new Map();

export function initCache() {
	console.log({ itemService });
	fetchAndSetItems();
	setInterval(fetchAndSetItems, TTL);
	return cache;
}

function fetchAndSetItems() {
	itemService.fetchItems().subscribe(encodedItems => {
		cache.set('encodedItems', encodedItems);
	});
}
