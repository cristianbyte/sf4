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
      RETURNING id, ${keys.join(', ')}, created_at
    `;
    try {
      const result = await pool.query(query, values);
      const user = result.rows[0];
      return sanitizeRes(user);
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING id`;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    }
    catch (error) {
      throw error;
    }
  }
}

export default User