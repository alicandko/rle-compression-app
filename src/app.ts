import express, { NextFunction, Response } from 'express';
import { initCache } from './cache';
import { itemRouter } from './item/presentation';

export interface IRequest extends express.Request {
	cache: Map<string, any>;
}

const app = express();
const port = 1337;
const cache = initCache();

const cacheMiddleware = function(
	req: IRequest,
	res: Response,
	next: NextFunction
) {
	req.cache = cache;
	next();
};

const router = express.Router();

app.use(cacheMiddleware);
app.use('/', itemRouter);
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`App listening on port ${port}!`));
