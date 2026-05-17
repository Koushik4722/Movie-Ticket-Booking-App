import express from 'express';
import { getShows, getShowById, createShow } from '../controllers/showController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getShows)
  .post(protect, admin, createShow);

router.route('/:id')
  .get(getShowById);

export default router;
