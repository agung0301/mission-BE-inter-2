import express from 'express';
import {
    getMovies,
    getMovieDetail,
    createMovie,
    updateMovie,
    deleteMovie
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movie/:id', getMovieDetail);
router.post('/movie', createMovie);
router.patch('/movie/:id', updateMovie);
router.delete('/movie/:id', deleteMovie);

export default router;