import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/constant.js';

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    
    if (!decoded.state || !decoded.city) {
      return res.status(401).json({ message: 'Invalid token: missing user data' });
    }

    req.user = {
      email: decoded.email,
      name: decoded.name,
      state: decoded.state,
      city: decoded.city
    };

    next();
  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}; 