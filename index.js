import express from 'express';
import cors from 'cors'; 
import movieRoutes from './src/routes/movieRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', movieRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`Coba akses: http://localhost:${PORT}/api/movies`);
});