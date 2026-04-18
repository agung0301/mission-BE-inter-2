import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./src/config/db.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT f.*, g.nama_genre 
      FROM Film_Series f 
      JOIN Genre g ON f.genre_id = g.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT f.*, g.nama_genre 
      FROM Film_Series f 
      JOIN Genre g ON f.genre_id = g.id 
      WHERE f.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/movie", async (req, res) => {
  const { judul, rating_usia, rating_film, durasi, sinopsis, tahun_rilis, poster_url, genre_id } = req.body;

  try {
    const query = `
      INSERT INTO Film_Series 
      (judul, rating_usia, rating_film, durasi, sinopsis, tahun_rilis, poster_url, genre_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [judul, rating_usia, rating_film, durasi, sinopsis, tahun_rilis, poster_url, genre_id]);

    res.status(201).json({
      message: "Film baru berhasil ditambahkan!",
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; 

  try {
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
    const values = Object.values(updates);

    if (fields.length === 0) return res.status(400).json({ message: "Tidak ada data yang dikirim" });

    const query = `UPDATE Film_Series SET ${fields} WHERE id = ?`;
    await db.query(query, [...values, id]);

    res.json({ message: "Data film berhasil diubah!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM Film_Series WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Gagal menghapus! ID film tidak ditemukan." });
    }

    res.json({ message: `Film dengan ID ${id} berhasil dihapus!` });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus karena data ini masih terhubung dengan tabel lain.",
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});