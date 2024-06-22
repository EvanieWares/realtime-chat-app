import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: String;
}

/**
 * Middleware function to authenticate a request using a JWT token.
 *
 * @param {AuthRequest} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {void} If the token is valid, calls the next function in the middleware chain.
 *                If the token is not provided or is invalid, sends a 401 status with an error message.
 */
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export { authenticateToken };
