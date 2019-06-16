import express from 'express';
import { getItem } from '../controllers/item';

const router = express.Router();

export const itemRouter = router.get('/:index', getItem);
