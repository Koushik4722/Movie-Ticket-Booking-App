import express from 'express';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getMovies)
  .post(protect, admin, createMovie);

router.route('/:id')
  .get(getMovieById)
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);

export default router;
