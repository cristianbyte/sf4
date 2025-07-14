import jwt from 'jsonwebtoken';
import { HttpError } from '../error/HttpError.js';

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const targetId = req.params.id || req.body.userId;

  if (!token) {
    return next(new HttpError('No token provided', 400));
  }
  if (!targetId) {
    return next(new HttpError('User ID is required', 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    if (decoded.id !== targetId) {
      return next(new HttpError('You are not authorized', 403));
    }
    next();
  } catch (error) {
    next(new HttpError('Invalid token', 403));
  }
};