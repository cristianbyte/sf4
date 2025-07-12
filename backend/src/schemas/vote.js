import { z } from 'zod';
import fs from 'fs/promises';

const file = await fs.readFile(new URL('../docs/fighters.json', import.meta.url), 'utf8');
const fighterList = JSON.parse(file);

export const fighterSchema = z.object({
  name: z
    .string()
    .refine((val) => fighterList.includes(val), {
      message: 'Fighter not recognized',
    })
}).strict();

export const uuidSchema = z.object({
  id: z.string().uuid('Invalid UUID')
});

export const locationSchema = z.object({
  codeLocation: z.string()
}).strict();

export const voteSchema = uuidSchema.merge(fighterSchema).strict();