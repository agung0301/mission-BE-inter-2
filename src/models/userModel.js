import db from '../config/db.js';

const user = {
  findByEmail: async (email) => {
    try {
      const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  create: async (userData) => {
    try {
      const { fullname, username, email, password, verification_token, is_verified } = userData;
      const query = `
                INSERT INTO user (fullname, username, email, password, status_berlangganan, verification_token, is_verified) 
                VALUES (?, ?, ?, ?, 'free', ?, ?)
            `;
      const [result] = await db.query(query, [fullname, username, email, password, verification_token, is_verified]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  findByToken: async (token) => {
    try {
      const [rows] = await db.query("SELECT * FROM user WHERE verification_token = ?", [token]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  verifyUser: async (id) => {
    try {
      const query = "UPDATE user SET is_verified = 1, verification_token = NULL WHERE id = ?";
      return await db.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }
};

export default user;