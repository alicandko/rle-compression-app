import express from 'express';
import { initCache } from './cache';
import { ItemService } from './ItemService';

const app = express();
const port = 1337;

const cache = initCache();

app.get(
	'/:index',
	async (req: any, res: any): Promise<any> => {
		const {
			params: { index }
		} = req;
		const itemService = new ItemService(cache.get('encodedItems'));
		res.send(itemService.getItemsInIndex(index));
	}
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
