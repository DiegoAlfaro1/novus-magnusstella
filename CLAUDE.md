### Code Style

- Never use emojis in code output
- Never use emojis in code

### Commit Style

- Always use conventional commits

### Reference

- _Documentation_: use the documentation included in the folder `docs` to have a better understanding of the old project
- _Legacy code_: if needed, reference legacy code in the folder called `MagnusStella`
- _Legacy code_: legacy code from `MagnusStella` is now in the repository for future referenece **Dont edit this code**
- _Legacy code_: legacy code has no asset images, so this may cause errors at compilation time

### Commands

#### Development

- `npm run dev` - Start development server with hot reload (nodemon + ts-node)
- `npm run build` - Compile TypeScript to JavaScript (outputs to dist/)
- `npm start` - Run production build (node dist/app.js)

#### Code Quality

- `npm run lint` - Run ESLint on TypeScript files (ESLint 9 with flat config)
- `npm run format` - Format code with Prettier

### Architecture

#### Technology Stack

- **TypeScript 5.3+** - Type-safe JavaScript with ES2022+ features
- **Express 4.18** - Web application framework
- **MySQL2 3.9** - Database client with promise support
- **TypeORM 0.3** - ORM ready for future database migrations
- **Multer 2.x** - File upload handling (upgraded from 1.x for security)
- **Nodemailer 7.x** - Email sending (upgraded from 6.x for security)

#### Security Layers

- **Helmet** - Security headers (CSP, COOP, etc.)
- **csrf-csrf** - Modern CSRF protection (replaces deprecated csurf)
- **express-rate-limit** - API rate limiting (100 req/15min per IP)
- **express-mysql-session** - Production-ready session store
- **bcryptjs** - Password hashing with salt rounds
- **ESLint 9** - Modern flat config format with TypeScript support

#### Project Structure

```
src/
├── app.ts                    # Application entry point
├── middleware/
│   ├── csrf.ts               # CSRF token generation & validation
│   └── errorHandler.ts       # Centralized error handling + AppError class
└── util/
    └── database.ts           # MySQL connection pool with graceful shutdown
```

#### Middleware Order (Critical)

1. Helmet (security headers)
2. Rate limiting
3. Body parsers (JSON + urlencoded)
4. Session (MySQL-backed)
5. Static files
6. CSRF token provider
7. Routes (to be migrated)
8. CSRF error handler
9. 404 handler
10. General error handler

### Patterns and Conventions

#### Error Handling

- Use `AppError` class for operational errors with status codes
- Use `asyncHandler` wrapper for async route handlers
- All errors flow through centralized `errorHandler` middleware

#### Database

- Promise-based MySQL pool via `database.ts`
- Connection validation on startup
- Graceful shutdown handling
- TypeORM decorators ready for entity migration

#### TypeScript

- Strict mode enabled
- ES2022 target
- CommonJS modules for Node.js compatibility
- Source maps for debugging

### Documentation updates

**Update this CLAUDE.md** when the user confirms changes are good:

- New commands or scripts
- Architecture changes
- New conventions or patterns
