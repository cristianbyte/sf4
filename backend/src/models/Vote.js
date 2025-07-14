import pool from '../../config/database.js';

class Vote {
  static async getVotesByUserId(userId) {
    const query = `SELECT votes.fighter as voted_for
        FROM users
        JOIN votes ON users.id = votes.user_id
        WHERE users.id = $1;`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async createVote({ userId, fighterName, location, isForeign }) {
    const query = `
      INSERT INTO votes (user_id, fighter, location, is_foreign)
      VALUES ($1, $2, $3, $4)
       RETURNING user_id, fighter as "fighterName", location, is_foreign as "isForeign"
    `;
    const result = await pool.query(query, [userId, fighterName, location, isForeign]);
    return result.rows[0];
  }

  static async getAllVotes() {
    const query = `
      SELECT 
        fighter as "fighterName",
        location,
        is_foreign as "isForeign",
        COUNT(*) as "voteCount"
      FROM votes 
      GROUP BY fighter, location, is_foreign
      ORDER BY fighter, location, is_foreign
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

export default Vote;