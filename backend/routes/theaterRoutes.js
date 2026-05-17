import express from 'express';
import { getTheaters, createTheater } from '../controllers/theaterController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTheaters)
  .post(protect, admin, createTheater);

export default router;
