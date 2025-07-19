import { z } from 'zod';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const foreignLocation = JSON.parse(readFileSync(join(__dirname, '../docs/ISO3166-1.json'), 'utf8'));
const colLocation = JSON.parse(readFileSync(join(__dirname, '../docs/departments-col.json'), 'utf8'));

const countryCodes = Object.keys(foreignLocation);
const colDepartments = Object.keys(colLocation);

export const baseUuidSchema = z.string().uuid('Invalid UUID format');

export const baseLocationSchema = z
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
    })