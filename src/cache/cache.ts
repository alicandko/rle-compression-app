import { config } from '../config';
import { ItemService } from '../item';

const CACHE_TTL = config.app.cacheTtl;

const cache = new Map();

export function initCache() {
	fetchAndSetItems();
	setInterval(fetchAndSetItems, CACHE_TTL);
	return cache;
}

function fetchAndSetItems() {
	ItemService.fetchItems().subscribe(encodedItems => {
		cache.set('encodedItems', encodedItems);
	});
}
