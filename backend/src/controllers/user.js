import * as userService from '../services/user.js'

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

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

  res.status(200).json({ 
    message: 'Successfully logged out' 
  });
};

export const destroyUser = async (req, res, next) => {
  try {
    await userService.destroy(req.params.userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};