import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '../utils/mailer.js';

export const register = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        const verificationToken = uuidv4();

        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ message: "Semua data harus diisi!" });
        }

        const userExist = await User.findByEmail(email);
        if (userExist) {
            return res.status(400).json({ message: "Email sudah digunakan, silakan gunakan email lain." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            verification_token: verificationToken,
            is_verified: 0
        });
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({
            message: "Registrasi berhasil! Silakan cek email kamu untuk verifikasi.",
            debugToken: verificationToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan!" });
        }
        if (user.is_verified === 0) {
            return res.status(403).json({ message: "Akun belum diverifikasi. Silakan verifikasi email kamu terlebih dahulu!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah!" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login berhasil!",
            token: token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const verifyEmail = async (req, res) => {
    try {
        const token = req.query.token || req.body.token;

        if (!token) {
            return res.status(400).json({ message: "Token tidak valid!" });
        }

        const user = await User.findByToken(token);

        if (!user) {
            return res.status(404).json({ message: "Token tidak ditemukan atau kadaluarsa." });
        }

        await User.verifyUser(user.id);

        res.status(200).send(`
            <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
                <h1 style="color: #2ecc71;">Verifikasi Berhasil!</h1>
                <p>Akun kamu sudah aktif. Silakan login di aplikasi.</p>
                <a href="http://localhost:5000/login" style="color: blue;">Ke Halaman Login</a>
            </div>
        `);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};