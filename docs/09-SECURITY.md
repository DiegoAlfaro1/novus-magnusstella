# Security Analysis

## 🔒 Overview

This document analyzes the security measures implemented in MagnusStella and identifies vulnerabilities that should be addressed during refactoring.

---

## ✅ Implemented Security Measures

### 1. Authentication

#### Password Hashing

```javascript
// bcrypt with 12 salt rounds
bcrypt.hash(userData.Contrasena, 12);
```

**Status:** ✅ Good - Industry standard algorithm with appropriate cost factor

#### Session Management

```javascript
session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
});
```

**Status:** ⚠️ Partial - Missing session store (defaults to memory)

#### Google OAuth 2.0

```javascript
passport.use(
  new GoogleStrategy({
    clientID: process.env.ClientIDGoogle,
    clientSecret: process.env.ClientSecretGoogle,
    callbackURL: "https://magnusstellacore.laing.mx/users/auth/google/callback",
  }),
);
```

**Status:** ✅ Good - Proper OAuth implementation

---

### 2. CSRF Protection

```javascript
const csrf = require("csurf");
const csrfProtection = csrf();
app.use(csrfProtection);
```

**Template Usage:**

```html
<input type="hidden" name="_csrf" value="<%= csrfToken %>" />
```

**Status:** ⚠️ Concern - Using deprecated `csurf` package

---

### 3. Authorization Middleware

```javascript
// is-auth.js - Authentication check
module.exports = (request, response, next) => {
  if (!request.session.isLoggedIn) {
    return response.redirect("/users/login");
  }
  next();
};

// can-admin.js - Permission check
module.exports = (request, response, next) => {
  let can_admin = false;
  for (let permiso of request.session.permisos) {
    if (permiso.funcion == "administracion") {
      can_admin = true;
    }
  }
  if (can_admin) { next(); }
  else { response.status(403).render("403", {...}); }
};
```

**Status:** ✅ Good - Role-based access control implemented

---

### 4. API Token Authentication

```javascript
exports.validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || token !== process.env.API_KEY) {
    return res.status(403).json({ message: "Acceso no autorizado." });
  }
  next();
};
```

**Status:** ⚠️ Basic - Simple string comparison, no token expiration

---

### 5. HTTPS

```
magnusstellacore.laing.mx {
    reverse_proxy localhost:3000
    tls {
        on_demand
    }
}
```

**Status:** ✅ Good - Automatic TLS via Caddy

---

### 6. Security Headers

```javascript
app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
```

**Status:** ⚠️ Minimal - Only one security header set

---

## 🚨 Critical Vulnerabilities

### 1. SQL Injection

#### HIGH RISK: Dynamic Column Names

**File:** `models/zecoreproducthelper.model.js`

```javascript
async ModificarProducto(id, columna, nuevoValor) {
  const result = await db.execute(
    `UPDATE producto SET ${columna} = ? WHERE idProducto = ?`,
    [nuevoValor, id]
  );
}
```

**Risk:** Attacker can inject arbitrary SQL through `columna` parameter
**Impact:** Database compromise, data theft, data manipulation
**Remediation:** Whitelist allowed column names

```javascript
const ALLOWED_COLUMNS = ["Nombre", "Imagen", "Descripcion", "Categoria"];
if (!ALLOWED_COLUMNS.includes(columna)) {
  throw new Error("Invalid column name");
}
```

---

#### MEDIUM RISK: String Interpolation in Queries

**File:** `models/usuarios.model.js`

```javascript
static fetchAll() {
  return db.execute(`SELECT * FROM usuario where idUsuario != ${process.env.SUPER_ID}`);
}
```

**Risk:** If SUPER_ID is manipulated, SQL injection possible
**Impact:** Data exposure
**Remediation:** Use parameterized queries

```javascript
static fetchAll() {
  return db.execute('SELECT * FROM usuario WHERE idUsuario != ?', [process.env.SUPER_ID]);
}
```

---

### 2. Insufficient Input Validation

**Examples:**

```javascript
// No validation on user input
exports.post_login = (request, response, next) => {
  const email = request.body.name;
  const password = request.body.password;
  // Direct use without sanitization
};

// No validation on file uploads
callback(null, file.originalname); // Original filename preserved
```

**Risks:**

- XSS through stored data
- Path traversal through filenames
- Invalid data in database

---

### 3. Insecure Direct Object References (IDOR)

```javascript
router.get(
  "/usuarios/editar/:usuario_id/:marca",
  isAuth,
  canAdmin,
  controladores.get_editar,
);
```

**Concern:** While admin check exists, no verification that user can edit specific `usuario_id`

---

### 4. Information Disclosure

```javascript
// Detailed error messages exposed
console.error("Error during login", err);
response.render("login", {
  error: "Usuario o contrasena no son validas",
});
```

**Concerns:**

- Console logs may contain sensitive data
- Error messages could reveal system details

---

## ⚠️ Medium-Risk Issues

### 1. Session Storage

**Current:** In-memory storage (default)
**Risk:** Sessions lost on restart, not scalable
**Remediation:** Use Redis or database session store

```javascript
const RedisStore = require("connect-redis").default;
const redisClient = require("./redis-client");

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
```

---

### 2. Missing Rate Limiting

**No rate limiting on:**

- Login attempts (brute force risk)
- API endpoints (DDoS risk)
- Password reset (enumeration risk)
- Survey submission (spam risk)

**Remediation:**

```javascript
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: "Too many login attempts",
});

app.use("/users/login", loginLimiter);
```

---

### 3. Missing Security Headers

**Recommended headers not set:**

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy`
- `Strict-Transport-Security`

**Remediation:**

```javascript
const helmet = require("helmet");
app.use(helmet());
```

---

### 4. Deprecated CSRF Package

**Current:** `csurf` package (deprecated)
**Risk:** No longer maintained, potential vulnerabilities
**Remediation:** Implement custom CSRF or use alternative

```javascript
// Alternative: csrf-sync or lusca
const { csrfSync } = require("csrf-sync");
const { csrfSynchronisedProtection } = csrfSync();
app.use(csrfSynchronisedProtection);
```

---

### 5. File Upload Security

```javascript
const fileStorage = multer.diskStorage({
  destination: "public/uploads/usuarios",
  filename: (request, file, callback) => {
    callback(null, file.originalname); // ⚠️ Original filename
  },
});
```

**Risks:**

- File overwrite (same name)
- Path traversal (`../../../etc/passwd`)
- Unrestricted file types

**Remediation:**

```javascript
const fileStorage = multer.diskStorage({
  destination: "public/uploads/usuarios",
  filename: (request, file, callback) => {
    const uniqueName = `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

const upload = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
```

---

## 📋 Security Checklist for Refactoring

### Critical (Must Fix)

- [ ] Fix SQL injection in `ModificarProducto`
- [ ] Parameterize all SQL queries
- [ ] Implement input validation

### High Priority

- [ ] Add rate limiting
- [ ] Implement security headers (Helmet)
- [ ] Replace deprecated CSRF package
- [ ] Secure file uploads

### Medium Priority

- [ ] Implement session store (Redis)
- [ ] Add request logging/auditing
- [ ] Implement API key rotation
- [ ] Add password policy enforcement

### Low Priority

- [ ] Implement 2FA
- [ ] Add security monitoring
- [ ] Implement CSP
- [ ] Security testing automation

---

## 🔐 Environment Variables Security

| Variable             | Sensitivity | Recommendation                            |
| -------------------- | ----------- | ----------------------------------------- |
| `SECRET`             | HIGH        | Rotate regularly, use strong random value |
| `DB_PASSWORD`        | HIGH        | Use secrets manager                       |
| `ClientSecretGoogle` | HIGH        | Rotate if compromised                     |
| `GMAIL_KEY`          | HIGH        | Use app-specific password                 |
| `API_KEY`            | MEDIUM      | Implement key rotation                    |
| `SUPER_ID`           | LOW         | Validate as integer                       |

---

## 🛡️ Recommended Security Dependencies

```json
{
  "dependencies": {
    "helmet": "^7.0.0",
    "express-rate-limit": "^7.0.0",
    "express-validator": "^7.0.0",
    "csrf-sync": "^4.0.0",
    "connect-redis": "^7.0.0"
  }
}
```
