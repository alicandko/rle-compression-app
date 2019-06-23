import { Response } from 'express';
import { IRequest } from '../../../app';
import { ItemService } from '../../business';

export function getItem(req: IRequest, res: Response) {
	const { cache, params } = req;
	const { index } = params;

	const item = ItemService.getItemInIndex(cache.get('encodedItems'), index);
	res.json({ item });
}
