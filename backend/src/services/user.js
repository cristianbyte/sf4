import User from '../models/User.js'
import { HttpError } from '../error/HttpError.js'
import { sanitizeLogin } from '../utils/sanitazeRes.js'

export const create = async (userData) => {
  try {
    const newUser = await User.create(userData)
    return newUser
  } catch (error) {
    if (error.code === '23505' && error.constraint === 'users_email_key') {
      throw new HttpError('Email already exists', 409);
    }
  }
}

export const login = async (userData) => {
  const filter = sanitizeLogin(userData);

  const user = await User.login(filter);
  if (!user) {
    throw new HttpError('Invalid credentials', 400);
  }

  return user;
};

export const destroy = async (id) => {
  try {
    const order = await User.destroy(id);
    return order;
  }catch{
    throw new HttpError('User not found', 404)
  }
}