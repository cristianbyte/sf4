import { z } from 'zod';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

  location: z
    .string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string'
    })
    .min(2, 'Location code must be at least 2 characters')
    .max(6, 'Location code cannot exceed 6 characters')
    .refine((val) => {
      return countryCodes.includes(val) || colDepartments.includes(val);
    }, {
      message: 'Invalid location code'
    }),

  userId: z
    .string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string'
    })
    .uuid('Invalid UUID format')
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
  id: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string'
    })
    .uuid('Invalid UUID format')
});