# Chill Movie - Backend API

Proyek ini adalah API backend untuk aplikasi streaming film "Chill Movie". Dibangun menggunakan Node.js, Express, dan MySQL sebagai bagian dari tugas Bootcamp Full-Stack Web Development.

## Fitur Utama
- **Authentication**: Registrasi, login, verifikasi email dengan JWT.
- **Movie Management**: CRUD film dengan filter search, genre, dan sorting.
- **File Upload**: Upload gambar poster film.
- Relasi tabel antara Film dan Genre.
- Endpoint RESTful yang bersih dan terstruktur.

## Teknologi yang Digunakan
- **Node.js** & **Express.js** (Web Server)
- **MySQL** (Database)
- **JWT** (Authentication)
- **Bcrypt** (Password Hashing)
- **Multer** (File Upload)
- **Nodemailer** (Email Verification)
- **Nodemon** (Development Tool)
- **CORS** & **Dotenv** (Security & Config)

## Cara Menjalankan Project
1. Clone repository ini.
2. Jalankan `npm install` untuk menginstall library.
3. Buat file `.env` dan atur koneksi database kamu (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).
4. Import file database SQL (jika ada).
5. Jalankan `npm run dev`.

### Contoh File .env
Buat file `.env` di root project dengan isi seperti berikut:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=chill_movie_db
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

> **Catatan**: Ganti `your_password` dan `your_jwt_secret_key_here` dengan nilai yang sesuai. Pastikan database MySQL sudah dibuat dan tabel sudah di-import.

## Daftar Endpoint (API)

### Authentication
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Registrasi user baru |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/verify-email` | Verifikasi email user |

### Movies
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| GET | `/api/movies` | Menampilkan semua daftar film (dengan filter search, genre, sort) |
| GET | `/api/movie/:id` | Menampilkan detail satu film berdasarkan ID |
| POST | `/api/movie` | Menambahkan data film baru |
| PATCH | `/api/movie/:id` | Mengubah sebagian data film berdasarkan ID |
| DELETE | `/api/movie/:id` | Menghapus film berdasarkan ID |

#### Query Parameters untuk GET /api/movies
- `search`: Cari judul film (contoh: `?search=batman`)
- `genre`: Filter berdasarkan ID genre (contoh: `?genre=1`)
- `sort`: Urutkan berdasarkan field (contoh: `?sort=terbaru`, `?sort=terlama`, `?sort=rating_film`)

### Upload
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| POST | `/api/upload` | Upload file gambar (form-data, field: image) |

## Autentikasi
Endpoint Movies dan Upload memerlukan autentikasi JWT. Sertakan header `Authorization: Bearer <token>` di setiap request.

1. Register user baru via `/api/auth/register`.
2. Verifikasi email melalui link yang dikirim ke email.
3. Login via `/api/auth/login` untuk mendapatkan token JWT.
4. Gunakan token tersebut di header untuk akses endpoint terlindungi.

---
*Dibuat oleh Agung - Project Mission Inter BE 2*