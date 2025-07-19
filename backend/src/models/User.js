import pool from '../../config/database.js';
import bcrypt from 'bcryptjs';
import { sanitizeRes } from '../utils/sanitazeRes.js';

class User {
  static async create(userData) {
    const saltRounds = 12;
    const data = { ...userData };
    const keys = Object.keys(data);
    data.password = await bcrypt.hash(data.password, saltRounds);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);

    const query = `
      INSERT INTO users (${keys.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING id as "userId", ${keys.join(', ')}, created_at`;

    const result = await pool.query(query, values);
    return sanitizeRes(result.rows[0]);
  }

  static async getById(userId) {
    const query = `SELECT id as "userId", name, email, created_at FROM users WHERE id = $1`;
    const result = await pool.query(query, [userId]);
    return sanitizeRes(result.rows[0]);
  }

  static async updateLocation(userId, location) {
    const query = `UPDATE users SET location = $1 WHERE id = $2 RETURNING id as "userId", name, email, location`;
    const result = await pool.query(query, [location, userId]);
    return sanitizeRes(result.rows[0]);
  }

  static async login({ email, password }) {
    const query = `SELECT id as "userId", name, email, password FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    const user = result.rows[0];
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;


    return sanitizeRes(user);
  }

  static async destroy(userId) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING id as "userId"`;
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }
}

export default User