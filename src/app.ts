import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from 'dotenv';

// Import database connection
import db from './util/database';

// Import middleware
import { csrfTokenProvider, csrfProtection, csrfErrorHandler } from './middleware/csrf';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
config();

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 3000;

// MySQL session store
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 minutes
  expiration: 86400000, // 24 hours
}, db as any);

/**
 * MIDDLEWARE CONFIGURATION
 * Order is critical for proper security and functionality
 */

// 1. Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://unpkg.com'],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      imgSrc: ["'self'", 'data:', 'https:'],
      fontSrc: ["'self'", 'https://cdn.jsdelivr.net'],
    },
  },
  crossOriginOpenerPolicy: { policy: 'same-origin' },
}));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// 3. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-change-in-production',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
}));

// 5. View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// 6. Static Files
app.use(express.static(path.join(__dirname, '../public')));

// 7. CSRF Token Provider (makes token available to all views)
app.use(csrfTokenProvider);

/**
 * ROUTES
 * Routes will be added here as they are migrated
 */

// Health check endpoint (no CSRF needed)
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root route placeholder
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'MagnusStella API - Modern Refactor',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

/**
 * ERROR HANDLING
 * Must be last in the middleware chain
 */

// CSRF Error Handler (must be before general error handler)
app.use(csrfErrorHandler);

// 404 Handler
app.use(notFoundHandler);

// General Error Handler
app.use(errorHandler);

/**
 * SERVER STARTUP
 */
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   MagnusStella - Customer Review Management System       ║
║                                                           ║
║   Server running on: http://localhost:${PORT}               ║
║   Environment: ${process.env.NODE_ENV || 'development'}                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Closing server gracefully...`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
