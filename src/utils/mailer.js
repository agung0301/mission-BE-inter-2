import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (userEmail, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'muhammadmaulanaagung67@gmail.com',
                pass: 'uqcb tkal pspz sjhg'
            }
        });

        const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;

        const mailOptions = {
            from: '"Movie App Support" <muhammadmaulanaagung67@gmail.com>',
            to: userEmail,
            subject: 'Verifikasi Akun Movie App',
            html: `
                    <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h3>Halo!</h3>
            <p>Terima kasih telah mendaftar di <strong>Movie App</strong>.</p>
            
            <!-- Bagian untuk menampilkan Token agar siap di-SS -->
            <div style="background-color: #f4f4f4; border: 1px dashed #ccc; padding: 15px; margin: 20px 0; text-align: center;">
                <p style="margin-bottom: 5px; font-weight: bold;">Token Verifikasi Kamu:</p>
                <code style="font-size: 18px; color: #e91e63; word-break: break-all;">${token}</code>
            </div>

            <p>Silakan klik tombol di bawah ini untuk verifikasi otomatis:</p>
            <a href="${verificationLink}" 
               style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
               Verifikasi Sekarang
            </a>
            
            <p style="margin-top: 20px;">Atau copy-paste token di atas ke aplikasi Postman kamu.</p>
            <hr>
            <p style="font-size: 12px; color: #888;">Jika kamu tidak merasa mendaftar, abaikan email ini.</p>
        </div>
                `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email terkirim: " + info.response);
        return info;

    } catch (error) {
        console.error("Gagal kirim email:", error);
        throw error;
    }
};