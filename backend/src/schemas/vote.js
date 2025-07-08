import { z } from 'zod';
import fs from 'fs/promises';

const data = JSON.parse(await fs.readFile('../../docs/fighters.json', 'utf8'));
const fighterList = data.fighters;

export const fighterSchema = z.object({
  name: z.enum([...fighterList])
});