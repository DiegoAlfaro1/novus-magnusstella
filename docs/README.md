# MagnusStella Documentation

Welcome to the comprehensive documentation for the MagnusStella project. This documentation was created to support a complete refactoring initiative.

---

## 📚 Documentation Index

| #   | Document                                                           | Description                                         |
| --- | ------------------------------------------------------------------ | --------------------------------------------------- |
| 01  | [Project Overview](./01-PROJECT-OVERVIEW.md)                       | Executive summary, business purpose, key features   |
| 02  | [Technology Stack](./02-TECHNOLOGY-STACK.md)                       | Languages, frameworks, dependencies, environment    |
| 03  | [Architecture](./03-ARCHITECTURE.md)                               | MVC pattern, request flows, middleware chain        |
| 04  | [Database Schema](./04-DATABASE-SCHEMA.md)                         | Tables, relationships, triggers, data model         |
| 05  | [API Reference](./05-API-REFERENCE.md)                             | All endpoints, request/response formats             |
| 06  | [Controllers](./06-CONTROLLERS.md)                                 | Business logic layer documentation                  |
| 07  | [Models](./07-MODELS.md)                                           | Data access layer documentation                     |
| 08  | [Frontend](./08-FRONTEND.md)                                       | Views, templates, CSS, client-side JS               |
| 09  | [Security](./09-SECURITY.md)                                       | Security analysis, vulnerabilities, recommendations |
| 10  | [Refactoring Recommendations](./10-REFACTORING-RECOMMENDATIONS.md) | Prioritized improvement plan                        |
| 11  | [File Map](./11-FILE-MAP.md)                                       | Complete file reference and dependencies            |

---

## 🎯 Quick Reference

### Project Information

- **Name:** MagnusStella
- **Type:** Customer Review Management System
- **Client:** Zebrands
- **Brands:** Luuna (LU1), Nooz (NO1), Mappa (MA1)

### Technology Stack

- **Backend:** Node.js, Express.js 4.18
- **Database:** MySQL 8 with mysql2
- **Views:** EJS Templates
- **Auth:** Passport.js (Google OAuth), bcrypt
- **Email:** Nodemailer (Gmail)
- **Charts:** Chart.js

### Key Directories

```
MagnusStella/
├── app.js           # Entry point
├── controllers/     # Business logic (8 files)
├── models/          # Data access (7 files)
├── routes/          # Route definitions (8 files)
├── views/           # EJS templates (20+ files)
├── public/          # Static assets
├── util/            # Middleware (5 files)
├── CRON_job/        # Scheduled tasks
└── sql/             # Database schema
```

---

## ⚠️ Critical Issues Summary

### Security (Fix Immediately)

1. **SQL Injection** in `zecoreproducthelper.model.js` - dynamic column names
2. **Deprecated CSRF** package (`csurf`)
3. **No rate limiting** on login/API endpoints

### Code Quality (High Priority)

1. Mixed async patterns (callbacks, promises, async/await)
2. No input validation
3. Inconsistent error handling
4. No test coverage

### Architecture (Medium Priority)

1. No service layer
2. Controllers doing too much
3. Mixed naming conventions (English/Spanish)

---

## 🚀 Getting Started with Refactoring

### Phase 1: Security Fixes (Week 1-2)

1. Fix SQL injection vulnerabilities
2. Replace `csurf` with modern CSRF solution
3. Add rate limiting with `express-rate-limit`
4. Add security headers with `helmet`

### Phase 2: Code Quality (Week 3-4)

1. Standardize on async/await
2. Add input validation with `express-validator`
3. Implement centralized error handling
4. Add proper logging with `pino`

### Phase 3: Architecture (Week 5-8)

1. Extract service layer
2. Migrate to TypeScript
3. Set up testing infrastructure
4. Consider ORM migration

---

## 📖 How to Use This Documentation

### For Understanding the Current System

1. Start with [01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md)
2. Review [03-ARCHITECTURE.md](./03-ARCHITECTURE.md)
3. Check [11-FILE-MAP.md](./11-FILE-MAP.md) for specific files

### For Refactoring Specific Components

1. Use [11-FILE-MAP.md](./11-FILE-MAP.md) to locate files
2. Check component docs (Controllers, Models, Frontend)
3. Review [10-REFACTORING-RECOMMENDATIONS.md](./10-REFACTORING-RECOMMENDATIONS.md)

### For Security Audit

1. Read [09-SECURITY.md](./09-SECURITY.md)
2. Check vulnerability details and remediation

### For API Integration

1. Consult [05-API-REFERENCE.md](./05-API-REFERENCE.md)
2. Review authentication requirements

### For Database Changes

1. Study [04-DATABASE-SCHEMA.md](./04-DATABASE-SCHEMA.md)
2. Check current data model and relationships

---

## 📝 Documentation Maintenance

This documentation should be updated when:

- New features are added
- Code structure changes
- Dependencies are updated
- Security issues are found/fixed
- Refactoring is completed

---

## 🔗 External Resources

- [Express.js Documentation](https://expressjs.com/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [EJS Documentation](https://ejs.co/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [mysql2 Documentation](https://github.com/sidorares/node-mysql2)

---

_Documentation generated: January 2026_
_Version: 1.0_
