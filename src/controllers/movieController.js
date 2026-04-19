import Movie from '../models/movieModel.js';

export const getMovies = async (req, res) => {
  try {
    const data = await Movie.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal ambil data", error: error.message });
  }
};

export const getMovieDetail = async (req, res) => {
  try {
    const data = await Movie.getById(req.params.id);
    if (!data) return res.status(404).json({ message: "Film tidak ditemukan" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    await Movie.create(req.body);
    res.status(201).json({ message: "Film berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    await Movie.update(req.params.id, req.body);
    res.status(200).json({ message: "Film berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.delete(req.params.id);
    res.status(200).json({ message: "Film berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};