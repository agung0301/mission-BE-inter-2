import express from 'express';
import upload from '../utils/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Gagal upload, file tidak ada." });
        }

        res.status(200).json({
            message: "Berhasil upload gambar!",
            fileInfo: {
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;