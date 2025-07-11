import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const targetId = req.params.id || req.body.id;
  console.log(targetId);
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    if (decoded.id !== targetId) {
      return res.status(403).json({ message: 'You are not authorized.'})
    }
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Token Error'
    });
  }
};