import express from 'express';
import {
    getMovies,
    getMovieDetail,
    createMovie,
    updateMovie,
    deleteMovie
} from '../controllers/movieController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/movies', authenticateToken, getMovies);
router.get('/movie/:id', authenticateToken, getMovieDetail);
router.post('/movie', authenticateToken, createMovie);
router.patch('/movie/:id', authenticateToken, updateMovie);
router.delete('/movie/:id', authenticateToken, deleteMovie);

export default router;