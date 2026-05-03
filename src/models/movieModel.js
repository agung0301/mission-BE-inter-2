import db from '../config/db.js';

const Movie = {
    getAll: async ({ search, genre, sort }) => {
        let query = `
      SELECT 
        f.*, 
        g.nama_genre 
      FROM film_series f
      LEFT JOIN genre g ON f.genre_id = g.id
      WHERE 1=1
    `;
        let queryParams = [];

        if (search) {
            query += ` AND f.judul LIKE ?`;
            queryParams.push(`%${search}%`);
        }

        if (genre) {
            query += ` AND f.genre_id = ?`;
            queryParams.push(genre);
        }

        const validSortFields = ['tahun_rilis', 'rating_film', 'judul'];

        const direction = sort === 'terlama' ? 'ASC' : 'DESC';

        let finalSort;

        if (sort === 'terlama' || sort === 'terbaru') {
            finalSort = 'f.tahun_rilis'; 
        } else if (validSortFields.includes(sort)) {
            finalSort = `f.${sort}`;    
        } else {
            finalSort = 'f.id';         
        }

        query += ` ORDER BY ${finalSort} ${direction}`;
        const [rows] = await db.query(query, queryParams);
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