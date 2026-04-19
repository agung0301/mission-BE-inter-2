import db from '../config/db.js';

const Movie = {
    getAll: async () => {
        const query = `
      SELECT 
        f.*, 
        g.nama_genre 
      FROM film_series f
      LEFT JOIN genre g ON f.genre_id = g.id
    `;
        const [rows] = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = `
      SELECT 
        f.*, 
        g.nama_genre 
      FROM film_series f
      LEFT JOIN genre g ON f.genre_id = g.id
      WHERE f.id = ?
    `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },
    create: async (data) => {
        const {
            judul,
            rating_usia,
            rating_film,
            durasi,
            sinopsis,
            tahun_rilis,
            poster_url,
            genre_id
        } = data;

        const query = `
      INSERT INTO film_series 
      (judul, rating_usia, rating_film, durasi, sinopsis, tahun_rilis, poster_url, genre_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

        return await db.query(query, [
            judul,
            rating_usia,
            rating_film,
            durasi,
            sinopsis,
            tahun_rilis,
            poster_url,
            genre_id
        ]);
    },

    update: async (id, data) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const queryUpdate = keys.map((key) => `${key} = ?`).join(", ");

        const query = `UPDATE film_series SET ${queryUpdate} WHERE id = ?`;

        return await db.query(query, [...values, id]);
    },

    delete: async (id) => {
        return await db.query("DELETE FROM film_series WHERE id = ?", [id]);
    }
};


export default Movie;