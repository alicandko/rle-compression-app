import express, { NextFunction, Response } from 'express';
import { initCache } from './cache';
import { config } from './config';
import { itemRouter } from './item/presentation';

export interface IRequest extends express.Request {
	cache: Map<string, any>;
}

const app = express();
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

app.listen(config.app.port, () =>
	// tslint:disable-next-line:no-console
	console.log(`App listening on port ${config.app.port}`)
);
