import { config } from '../config';
import { ItemService } from '../item';

const CACHE_TTL = config.app.cacheTtl;

const cache = new Map();
cache.set('encodedItems', []);

export function initCache(): Map<string, any> {
	fetchAndSetItems();
	setInterval(fetchAndSetItems, CACHE_TTL);
	return cache;
}

function fetchAndSetItems() {
	ItemService.fetchAndEncodeItems().subscribe(
		encodedItems => {
			cache.set('encodedItems', encodedItems);
		},
		error => console.error('Caching of items failed after 2 retries')
	);
}
