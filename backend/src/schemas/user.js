import z from 'zod'

export const userSchema = z.object({
  name: z.string().min(3, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Email is invalid'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})