import { z } from 'zod';
import { containsBadWords } from '../utils/badWords.js';
import { baseLocationSchema, baseUuidSchema } from './base.js';

export const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(15, 'Name is too long, max: 15 characters')
    .regex(/^[\p{L}\d]+$/u, { message: 'Only letters and numbers are allowed' })
    .refine((val) => !containsBadWords(val), {
      message: 'Name contains inappropriate language'
    }),
  email: z.string().email('Email is invalid'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must include at least one uppercase letter, one lowercase letter, and one number'
    )
}).strict();

export const uuidSchema = z.object({
  userId: baseUuidSchema
}).strict();

// LogIn
export const mailSchema = userSchema.pick({ email: true });
export const locationSchema = z.object({
  location: baseLocationSchema
});
export const locationWithUuidSchema = locationSchema.merge(uuidSchema).strict();

export const passSchema = z.object({
  password: z
    .string()
    .min(8, 'Invalid credentials')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Invalid credentials'
    )
})
export const loginSchema = mailSchema.merge(passSchema).strict();
