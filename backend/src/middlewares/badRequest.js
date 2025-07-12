const validPaths = [
  '/api/user',
  '/api/user/login',
  '/api/user/:id',
  '/api/vote/:id',
];

const isValidPath = (reqPath) => {
  return validPaths.some(validPath => {
    const regex = validPath.replace(/:[\w]+/g, '[^/]+');
    return new RegExp(`^${regex}$`).test(reqPath);
  });
};

// 405 Method Not Allowed
export const methodNotAllowedHandler = (req, res, next) => {
  if (isValidPath(req.path)) {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: `The ${req.method} method is not allowed for ${req.path}`
    });
  }
  next();
};

// 404 Not Found
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested resource ${req.path} was not found`
  });
};