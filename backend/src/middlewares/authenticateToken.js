import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token is required'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Token Error'
    });
  }
};