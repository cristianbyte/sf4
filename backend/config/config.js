import pool from './database.js';
import fs from 'fs'; // read files
import path from 'path'; // get multiplartform path
import { fileURLToPath } from 'url'; // get file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDatabase = async () => {
  try {
    const schemaSQL = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('[OK]: Database initialized');
  } catch (error) {
    console.error('[X]: Error initializing database', error);
    process.exit(1);
  }
};

export default initDatabase;
export const { PORT = 3000 } = process.env