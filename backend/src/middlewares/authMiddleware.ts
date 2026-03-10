import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {

    let token = req.cookies.jwtCookie;
    if (!token) {
      res.status(401).json({ error: "Access denied. No token provided. Please log in." });
      return;
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };

    next();

  } catch (error) {
    console.error("Authentication Error:", error);
    // jwt.verify throws a specific error when the token's lifespan is up
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Your session has expired. Please log in again." });
    } else {
      res.status(403).json({ error: "Invalid token." });
    }
  }
};