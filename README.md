# novus-magnusstella

Modern refactor of [magnusstella](https://github.com/DiegolHacker/MagnusStella) Customer Review Management System using TypeScript and modern best practices.

## Features

- **TypeScript** - Type-safe codebase with modern ES2022+ features
- **Express.js** - Modern web application framework
- **Security** - Helmet, CSRF protection (csrf-csrf), rate limiting
- **Session Management** - Production-ready MySQL session store
- **Database** - MySQL with connection pooling (TypeORM ready)
- **Modern Dev Tools** - ESLint, Prettier, Nodemon

## Prerequisites

- Node.js v20.11.0 (LTS) - Use nvm to install: `nvm use`
- MySQL 8.0+
- npm

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secrets
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
novus-magnusstella/
├── src/
│   ├── app.ts                    # Application entry point
│   ├── middleware/
│   │   ├── csrf.ts               # CSRF protection (csrf-csrf)
│   │   └── errorHandler.ts      # Centralized error handling
│   └── util/
│       └── database.ts           # MySQL connection pool
├── dist/                         # Compiled JavaScript (generated)
├── docs/                         # Legacy project documentation
├── .env.example                  # Environment variables template
├── .nvmrc                        # Node.js version
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Environment Variables

See `.env.example` for all required environment variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - MySQL credentials
- `SESSION_SECRET` - Session encryption key
- Google OAuth, Gmail SMTP, and API keys as needed

## Technology Stack

### Core
- **TypeScript 5.3+** - Type-safe JavaScript
- **Node.js 20 LTS** - Runtime environment
- **Express 4.18** - Web framework

### Security
- **Helmet** - Security headers
- **csrf-csrf** - CSRF protection (replaces deprecated csurf)
- **express-rate-limit** - API rate limiting
- **bcryptjs** - Password hashing

### Database
- **MySQL2** - MySQL client with promises
- **express-mysql-session** - Production-ready session store
- **TypeORM** - ORM (ready for future migration)

### File & Email
- **Multer 2.x** - File upload handling (upgraded for security)
- **Nodemailer 7.x** - Email sending (upgraded for security)

### Development
- **Nodemon** - Auto-restart on changes
- **ts-node** - TypeScript execution
- **ESLint 9** - Code linting with flat config
- **Prettier** - Code formatting

## Migration from Legacy

This project is a ground-up refactor of the original MagnusStella application. Key improvements:

1. **TypeScript** - Added type safety
2. **Modern Middleware** - Replaced deprecated csurf with csrf-csrf
3. **Proper Error Handling** - Centralized error middleware
4. **Session Store** - MySQL-backed sessions for production
5. **Security** - Helmet, rate limiting, secure session configuration
6. **Code Organization** - src/ folder structure, clear separation of concerns
7. **Updated Dependencies** - Upgraded to Multer 2.x, Nodemailer 7.x, ESLint 9 for security and compatibility

See `docs/` folder for legacy project documentation and architecture.

## License

MIT
