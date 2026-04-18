# Chill Movie - Backend API

Proyek ini adalah API backend untuk aplikasi streaming film "Chill Movie". Dibangun menggunakan Node.js, Express, dan MySQL sebagai bagian dari tugas Bootcamp Full-Stack Web Development.

## Fitur Utama
- Kelola data film (CRUD: Create, Read, Update, Delete).
- Relasi tabel antara Film dan Genre.
- Endpoint RESTful yang bersih dan terstruktur.

## Teknologi yang Digunakan
- **Node.js** & **Express.js** (Web Server)
- **MySQL** (Database)
- **Nodemon** (Development Tool)
- **CORS** & **Dotenv** (Security & Config)

## Cara Menjalankan Project
1. Clone repository ini.
2. Jalankan `npm install` untuk menginstall library.
3. Buat file `.env` dan atur koneksi database kamu (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).
4. Import file database SQL (jika ada).
5. Jalankan `npm run dev`.

## Daftar Endpoint (API)
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| GET | `/movies` | Menampilkan semua daftar film |
| GET | `/movie/:id` | Menampilkan detail satu film berdasarkan ID |
| POST | `/movie` | Menambahkan data film baru |
| PATCH | `/movie/:id` | Mengubah sebagian data film berdasarkan ID |
| DELETE | `/movie/:id` | Menghapus film berdasarkan ID |

---
*Dibuat oleh Agung - Project Mission Inter BE 2*