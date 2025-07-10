import * as userService from '../services/user.js'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err)
  }
}

export const logIn = async (req, res, next) => {
  try {
    const { user, token } = await userService.login(req.body);
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 1000 * 60 * 60 * 12, // 12 horas
      path: '/'
    };
    
    res.cookie('access_token', token, cookieOptions);
    
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const logOut = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/'
  });

  res.redirect('/login');
};

export const destroyUser = async (req, res, next) => {
  try {
    const token = req.cookies['access_token'];
    const targetId = req.params.id;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    if (decoded.id === targetId) {
      await userService.destroy(targetId);
      res.status(204).send();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    next(err);
  }
};