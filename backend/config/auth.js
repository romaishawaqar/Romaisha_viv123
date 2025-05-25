import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify token
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: ..., email: ... }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Simulated login route logic (you can place this in `userController.js`)
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Simulate user verification — replace with DB query
  if (email === 'test@example.com' && password === 'password123') {
    const token = jwt.sign({ id: 'abc123', email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
