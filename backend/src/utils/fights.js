import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const findOpponent = async (name) => {
  const file = await fs.readFile(path.join(__dirname, '../docs/fighters.json'), 'utf8');
  const data = JSON.parse(file);

  const fight = data.fights.find(f => f.fighters.includes(name));
  return fight ? fight.fighters.find(n => n !== name) : null;
};