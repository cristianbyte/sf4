import { z } from 'zod';
import { containsBadWords } from '../utils/badWords.js';

export const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(15, 'Name is too long, max: 15 characters')
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
});

export const uuidParam = z.object({
  id: z.string().uuid('Invalid UUID')
})

// LogIn
export const mailSchema = userSchema.pick({ email: true });
export const passSchema = z.object({
  password: z
  .string()
  .min(8, 'Wrong Password')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    'Wrong Password'
  )
})
export const loginSchema = mailSchema.merge(passSchema);
