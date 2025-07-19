import { z } from 'zod';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { baseLocationSchema, baseUuidSchema } from './base.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fightersData = JSON.parse(readFileSync(join(__dirname, '../docs/fighters.json'), 'utf8'));
const foreignLocation = JSON.parse(readFileSync(join(__dirname, '../docs/ISO3166-1.json'), 'utf8'));
const colLocation = JSON.parse(readFileSync(join(__dirname, '../docs/departments-col.json'), 'utf8'));

const { fighters } = fightersData;
const countryCodes = Object.keys(foreignLocation);
const colDepartments = Object.keys(colLocation);

export const voteSchema = z.object({
  fighterName: z
    .string({
      required_error: 'Fighter name is required',
      invalid_type_error: 'Fighter name must be a string'
    })
    .min(3, 'Fighter name cannot be empty')
    .max(10, 'Fighter name cannot exceed 10 characters')
    .refine((val) => fighters.includes(val), {
      message: 'Fighter not recognized in our database'
    }),

  isForeign: z.boolean({
    required_error: 'Foreign status is required',
    invalid_type_error: 'Foreign status must be a boolean'
  }),

  location: baseLocationSchema,
  userId: baseUuidSchema,
})
.strict()
.refine((data) => {
  if (data.isForeign) {
    return countryCodes.includes(data.location);
  } else {
    return colDepartments.includes(data.location);
  }
}, {
  message: 'Invalid location for the specified foreign status',
  path: ['location']
});

export const uuidSchema = z.object({
  userId: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string'
    })
    .uuid('Invalid UUID format')
});