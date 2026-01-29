# Refactoring Recommendations

## 📋 Executive Summary

This document provides prioritized recommendations for refactoring the MagnusStella application. Recommendations are organized by priority, estimated effort, and impact.

---

## 🎯 Refactoring Goals

1. **Security** - Eliminate vulnerabilities
2. **Maintainability** - Improve code organization and clarity
3. **Scalability** - Enable horizontal scaling
4. **Developer Experience** - Improve development workflow
5. **Performance** - Optimize critical paths
6. **Testability** - Enable automated testing

---

## 🔴 Priority 1: Critical (Security & Breaking Issues)

### 1.1 Fix SQL Injection Vulnerabilities

**Current:**

```javascript
`UPDATE producto SET ${columna} = ? WHERE idProducto = ?`;
```

**Recommended:**

```javascript
const ALLOWED_COLUMNS = ['Nombre', 'Imagen', 'Descripcion', 'Categoria'];

async ModificarProducto(id, columna, nuevoValor) {
  if (!ALLOWED_COLUMNS.includes(columna)) {
    throw new ValidationError(`Invalid column: ${columna}`);
  }
  const result = await db.execute(
    `UPDATE producto SET ?? = ? WHERE idProducto = ?`,
    [columna, nuevoValor, id]
  );
}
```

**Effort:** Low (1-2 hours)
**Impact:** Critical

---

### 1.2 Replace Deprecated CSRF Package

**Current:** `csurf` (deprecated)

**Recommended:**

```javascript
// Option 1: csrf-sync
const { csrfSync } = require("csrf-sync");
const { csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => req.body._csrf || req.headers["x-csrf-token"],
});

// Option 2: Custom implementation with express-session
```

**Effort:** Medium (4-8 hours)
**Impact:** Critical

---

### 1.3 Implement Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

// Login rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many attempts, try again later" },
});

// API rate limiting
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

app.use("/users/login", loginLimiter);
app.use("/api", apiLimiter);
```

**Effort:** Low (2-4 hours)
**Impact:** High

---

### 1.4 Add Security Headers

```javascript
const helmet = require("helmet");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
);
```

**Effort:** Low (1-2 hours)
**Impact:** High

---

## 🟠 Priority 2: High (Stability & Maintainability)

### 2.1 Implement Proper Error Handling

**Create centralized error handler:**

```javascript
// errors/AppError.js
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal server error";

  console.error("Error:", err);

  if (req.accepts("json")) {
    res.status(statusCode).json({ error: message, code: err.code });
  } else {
    res.status(statusCode).render("error", { message });
  }
};

app.use(errorHandler);
```

**Effort:** Medium (8-16 hours)
**Impact:** High

---

### 2.2 Add Input Validation Layer

```javascript
const { body, param, validationResult } = require("express-validator");

// Validation middleware
const validateLogin = [
  body("name").isEmail().normalizeEmail(),
  body("password").isLength({ min: 10 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post("/login", validateLogin, controladores.post_login);
```

**Effort:** Medium (8-16 hours)
**Impact:** High

---

### 2.3 Standardize Async Patterns

**Convert all to async/await:**

```javascript
// Before (mixed patterns)
exports.post_login = (request, response, next) => {
  Usuarios.findByEmail(email).then((user) => {
    bcrypt.compare(password, user.user.contrasena).then((doMatch) => {
      // nested promises
    });
  });
};

// After (clean async/await)
exports.post_login = async (request, response, next) => {
  try {
    const { user } = await Usuarios.findByEmail(email);
    if (!user) {
      return response.render("login", { error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.contrasena);
    if (!passwordMatch) {
      return response.render("login", { error: "Invalid credentials" });
    }

    const permisos = await Usuarios.getPermisos(email);
    req.session.isLoggedIn = true;
    req.session.permisos = permisos;
    req.session.user = user;

    await new Promise((resolve) => req.session.save(resolve));
    response.redirect("/");
  } catch (error) {
    next(error);
  }
};
```

**Effort:** High (16-24 hours)
**Impact:** High

---

### 2.4 Implement Service Layer

**Create service layer between controllers and models:**

```
controllers/
  └── reviews.controller.js
services/
  ├── review.service.js
  ├── email.service.js
  └── analytics.service.js
models/
  └── review.model.js
```

**Example:**

```javascript
// services/review.service.js
class ReviewService {
  constructor(reviewModel, emailService) {
    this.reviewModel = reviewModel;
    this.emailService = emailService;
  }

  async getReviewsForBrand(brandId, options = {}) {
    const reviews = await this.reviewModel.fetchAll(brandId, options);
    return this.formatReviews(reviews);
  }

  async toggleVisibility(reviewId, visible) {
    return this.reviewModel.updateVisibility(reviewId, visible);
  }
}
```

**Effort:** High (24-40 hours)
**Impact:** High

---

## 🟡 Priority 3: Medium (Code Quality)

### 3.1 TypeScript Migration

**Benefits:**

- Type safety
- Better IDE support
- Self-documenting code
- Catch errors at compile time

**Migration Strategy:**

1. Add TypeScript to project
2. Convert files incrementally (start with models)
3. Add strict mode progressively

```typescript
// models/user.model.ts
interface User {
  idUsuario: number;
  nombre: string;
  email: string;
  idRol: number;
  estado: number;
}

export class UserModel {
  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.execute<User[]>(
      "SELECT * FROM usuario WHERE Correo = ?",
      [email],
    );
    return rows[0] || null;
  }
}
```

**Effort:** Very High (40-80 hours)
**Impact:** High (long-term)

---

### 3.2 Add Testing Infrastructure

```javascript
// package.json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "@types/jest": "^29.0.0"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}

// tests/controllers/login.test.js
describe('Login Controller', () => {
  it('should redirect to dashboard on valid login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ name: 'test@test.com', password: 'password123' });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/graphics/dashboard/LU1');
  });
});
```

**Effort:** Very High (40-60 hours)
**Impact:** High (long-term)

---

### 3.3 Database Migration to ORM

**Option 1: Prisma**

```prisma
// prisma/schema.prisma
model User {
  id       Int      @id @default(autoincrement()) @map("idUsuario")
  name     String   @map("Nombre")
  email    String   @unique @map("Correo")
  password String   @map("Password")
  role     Role     @relation(fields: [roleId], references: [id])
  roleId   Int      @map("IDRol")

  @@map("usuario")
}
```

**Option 2: TypeORM**

```typescript
@Entity("usuario")
export class User {
  @PrimaryGeneratedColumn({ name: "idUsuario" })
  id: number;

  @Column({ name: "Nombre" })
  name: string;

  @Column({ name: "Correo", unique: true })
  email: string;
}
```

**Effort:** Very High (60-100 hours)
**Impact:** High

---

### 3.4 Rename and Reorganize Files

**Current Issues:**

- `renderHtml.js` handles user CRUD
- `routes1.routes.js` is non-descriptive
- Mixed languages

**Proposed Renames:**
| Current | Proposed |
|---------|----------|
| `renderHtml.js` | `users-management.controller.js` |
| `routes1.routes.js` | `users-management.routes.js` |
| All Spanish → English | Consistent English naming |

**Effort:** Medium (8-16 hours)
**Impact:** Medium

---

## 🟢 Priority 4: Improvements (Nice to Have)

### 4.1 Implement Logging Service

```javascript
const pino = require("pino");

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

// Usage
logger.info({ userId: user.id }, "User logged in");
logger.error({ error: err }, "Database query failed");
```

**Effort:** Medium (8-16 hours)
**Impact:** Medium

---

### 4.2 Add API Documentation

```javascript
// Using swagger-jsdoc
/**
 * @openapi
 * /api/zecore/venta:
 *   post:
 *     summary: Register a new sale
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 */
```

**Effort:** Medium (16-24 hours)
**Impact:** Medium

---

### 4.3 Docker Containerization

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      - MYSQL_DATABASE=magnusstella
```

**Effort:** Medium (8-16 hours)
**Impact:** Medium

---

### 4.4 Modern Frontend Framework

**Option 1: Keep SSR, modernize with HTMX**

- Minimal changes
- Progressive enhancement
- No JavaScript framework needed

**Option 2: Separate SPA**

- React/Vue/Svelte frontend
- REST API backend
- Better user experience
- Higher effort

**Effort:** Very High (80-200 hours)
**Impact:** High

---

## 📅 Suggested Refactoring Phases

### Phase 1: Security (1-2 weeks)

- Fix SQL injection
- Add rate limiting
- Security headers
- Replace deprecated packages

### Phase 2: Stability (2-4 weeks)

- Error handling
- Input validation
- Async/await standardization
- Session store

### Phase 3: Architecture (4-8 weeks)

- Service layer
- TypeScript migration
- Testing infrastructure
- ORM migration

### Phase 4: Modern Features (ongoing)

- Docker
- API documentation
- Frontend modernization
- CI/CD pipeline

---

## 📊 Effort vs Impact Matrix

```
HIGH IMPACT
    │
    │  ┌─────────────────┐  ┌─────────────────┐
    │  │ SQL Injection   │  │ TypeScript      │
    │  │ Rate Limiting   │  │ Testing         │
    │  │ Error Handling  │  │ ORM Migration   │
    │  └─────────────────┘  └─────────────────┘
    │       LOW EFFORT          HIGH EFFORT
    │
    │  ┌─────────────────┐  ┌─────────────────┐
    │  │ Logging         │  │ Modern Frontend │
    │  │ File Renames    │  │ API Docs        │
    │  └─────────────────┘  └─────────────────┘
    │
LOW IMPACT
```

**Recommendation:** Start with high-impact, low-effort items in the top-left quadrant.
