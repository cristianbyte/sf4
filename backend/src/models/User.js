import pool from '../../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(userData) {
    const saltRounds = 12;

    const data = { ...userData };
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    data.password = await bcrypt.hash(data.password, saltRounds);
    const placeholders = keys.map((_, i) => `$${i + 1}`);
    const query = `
      INSERT INTO users (${keys.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING id, ${keys.join(', ')}, created_at
    `;
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User