import { doubleCsrf } from 'csrf-csrf';
import { Request, Response, NextFunction } from 'express';

/**
 * CSRF Protection Middleware
 * 
 * Replacement for deprecated csurf package using csrf-csrf
 * Provides token-based CSRF protection with modern implementation
 */

const {
  generateToken,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => process.env.SESSION_SECRET || 'default-csrf-secret',
  cookieName: '__Host-psifi.x-csrf-token',
  cookieOptions: {
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => req.body._csrf || req.headers['x-csrf-token'] as string,
});

/**
 * Middleware to generate and attach CSRF token to response locals
 * Makes token available to views via res.locals.csrfToken
 */
export const csrfTokenProvider = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = generateToken(req, res);
  res.locals.csrfToken = token;
  next();
};

/**
 * CSRF Protection Middleware
 * Validates CSRF tokens on protected routes
 */
export const csrfProtection = doubleCsrfProtection;

/**
 * Error handler for CSRF validation failures
 */
export const csrfErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.code === 'EBADCSRFTOKEN' || err.message?.includes('csrf')) {
    res.status(403).json({
      status: 'error',
      message: 'Invalid CSRF token',
    });
  } else {
    next(err);
  }
};
