import pool from '../../config/database.js';
import { findOpponent } from '../utils/fights.js';

class Vote {
  static async vote({ userId, fighterName }) {
    // Get all votes by the user
    const query = `
      SELECT fighter
      FROM votes
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    const votes = result.rows.map(row => row.fighter);

    // Find opponent
    const opponent = await findOpponent(fighterName);

    // If vote already exists for same fighter, do nothing
    if (votes.includes(fighterName)) {
      return { updated: false, reason: 'Vote already exists' };
    }

    // If vote exists for opponent, update it
    if (votes.includes(opponent)) {
      const updateQuery = `
        UPDATE votes
        SET fighter = $1
        WHERE user_id = $2 AND fighter = $3
        RETURNING *
      `;
      const updated = await pool.query(updateQuery, [fighterName, userId, opponent]);
      return { updated: true, replaced: true, vote: updated.rows[0] };
    }

    // Otherwise, insert new vote
    const insertQuery = `
      INSERT INTO votes (user_id, fighter)
      VALUES ($1, $2)
      RETURNING *
    `;
    const inserted = await pool.query(insertQuery, [userId, fighterName]);
    return { updated: true, replaced: false, vote: inserted.rows[0] };
  }
}

export default Vote;