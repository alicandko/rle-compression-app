import express from 'express';
import { ItemService } from '../../business/ItemService';

const router = express.Router();

export const itemRouter = router.get(
	'/:index',
	async (req: any, res: any): Promise<any> => {
		const { cache, params } = req;
		const { index } = params;
		const item = ItemService.getItemsInIndex(cache.get('encodedItems'), index);
		res.json({ item });
	}
);
