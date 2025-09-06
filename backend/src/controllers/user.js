import * as userService from '../services/user.js'

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.user.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}


export const createUser = async (req, res, next) => {
  try {
    const { newUser, token } = await userService.create(req.body);

    if (token) {
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      };

      console.log('Setting cookie with options:', cookieOptions);
      res.cookie('access_token', token, cookieOptions);
    }

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const setLocation = async (req, res, next) => {
  try {
    const updatedUser = await userService.setLocation(req.body.userId, req.body.location);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const logIn = async (req, res, next) => {
  try {
    const { user, token } = await userService.login(req.body);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
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
    secure: true,
    sameSite: 'none',
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