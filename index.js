import express from 'express';
import cors from 'cors'; 
import movieRoutes from './src/routes/movieRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`Coba akses: http://localhost:${PORT}/api/movies`);
});