import { Request, Response, NextFunction } from 'express';

/**
 * Custom Error Class for Application Errors
 * 
 * Provides structured error handling with status codes and error messages
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Centralized Error Handler Middleware
 * 
 * Handles all errors thrown in the application with consistent response format
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default to 500 if no status code is set
  const statusCode = (err as AppError).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error for debugging (in production, use proper logging service)
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    statusCode
  });

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Async Handler Wrapper
 * 
 * Wraps async route handlers to catch errors and pass them to error middleware
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 Not Found Handler
 * 
 * Catches requests to undefined routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
};
