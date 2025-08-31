import jwt from 'jsonwebtoken';
import { HttpError } from '../error/HttpError.js';

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const targetId = req.params.userId || req.body.userId;

  if (!token) {
    return next(new HttpError('No token provided', 401));
  }
  if (!targetId) {
    return next(new HttpError('User ID is required', 422));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    if (decoded.userId !== targetId) {
      return next(new HttpError('You are not authorized', 401));
    }
    next();
  } catch (error) {
    next(new HttpError('Invalid token', 401));
  }
};

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new HttpError("No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new HttpError("Invalid token", 401));
  }
};