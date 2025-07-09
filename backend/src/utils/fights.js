import fs from 'fs/promises';

export const findOpponent = async (name) => {
  const file = await fs.readFile('../docs/fighters.json', 'utf8');
  const fights = JSON.parse(file);

  const fight = fights.find(f => f.fighters.includes(name));
  return fight ? fight.fighters.find(n => n !== name) : null;
};