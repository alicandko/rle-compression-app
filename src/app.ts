import express, { NextFunction, Response } from 'express';
import { initCache } from './cache';
import { config } from './config';
import { itemRouter } from './item';

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
app.use((err: Error, req: IRequest, res: Response, next: NextFunction) => {
	// tslint:disable-next-line:no-console
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

app.listen(config.app.port, () =>
	// tslint:disable-next-line:no-console
	console.log(`App listening on port ${config.app.port}`)
);
