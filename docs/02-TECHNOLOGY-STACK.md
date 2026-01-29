# Technology Stack Analysis

## 📦 Runtime & Language

| Component       | Technology | Version       | Notes                              |
| --------------- | ---------- | ------------- | ---------------------------------- |
| Runtime         | Node.js    | Not specified | No .nvmrc or engines field         |
| Language        | JavaScript | ES6+          | CommonJS modules (require/exports) |
| Package Manager | npm        | -             | package-lock.json based            |

---

## 🛠️ Backend Framework

### Express.js (v4.18.3)

**Role:** Core web application framework

**Configuration in `app.js`:**

```javascript
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
```

**Middleware Stack (in order):**

1. COOP Headers (`Cross-Origin-Opener-Policy: same-origin`)
2. Session middleware (`express-session`)
3. Passport initialization
4. Static file serving
5. Body parser (urlencoded + JSON)
6. Multer (file uploads)
7. Route handlers (without CSRF)
8. CSRF protection middleware
9. Protected route handlers
10. 404 error handler

---

## 🗄️ Database

### MySQL (via mysql2 v3.9.3)

**Connection Configuration:**

```javascript
const mysql = require("mysql2");
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
module.exports = connection.promise();
```

**Key Characteristics:**

- Connection pooling enabled
- Promise-based API
- Raw SQL queries (no ORM)
- Prepared statements used inconsistently

---

## 🔐 Authentication & Security

### Passport.js (v0.7.0)

**Strategy:** Google OAuth 2.0 (`passport-google-oauth20 v2.0.0`)

**Features:**

- Session-based authentication
- User serialization by `idUsuario`
- Custom user lookup in database

### bcryptjs (v2.4.3)

**Usage:** Password hashing with 12 salt rounds

### csurf (v1.11.0)

**Note:** This package is deprecated. CSRF tokens are passed to views.

### express-session (v1.18.0)

**Configuration:**

```javascript
session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
});
```

---

## 📧 Email Service

### Nodemailer (v6.9.13)

**Configuration:**

```javascript
nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_KEY,
  },
});
```

**Usage:** Sending HTML email surveys with embedded images

---

## 📅 Scheduled Tasks

### node-cron (v3.0.3)

**Schedule:** `0 15 * * *` (Daily at 3:00 PM)

**Purpose:** Automatically send review request emails based on purchase date

---

## 📤 File Uploads

### Multer (v1.4.5-lts.1)

**Configuration:**

```javascript
multer.diskStorage({
  destination: "public/uploads/usuarios",
  filename: (req, file, cb) => cb(null, file.originalname),
});
```

**Note:** Files saved with original name (potential overwrite risk)

---

## 🎨 View Engine

### EJS (v3.1.9)

**Structure:**

- Main views in `/views/`
- Partial templates in `/views/includes/`
- Help section in `/views/ayudas/`

**Partials Used:**

- `navigation.ejs` - Header and sidebar navigation
- `footer.ejs` - Page footer
- `categorias.ejs` - Category dropdown

---

## 📊 Frontend Libraries

### Chart.js (v4.4.2)

**Usage:** Dashboard visualizations

- Line charts (average rating, surveys sent)
- Doughnut chart (response rate)

### Bootstrap (v5.3.3)

**Loading:** Via CDN (not locally bundled)

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
```

### BoxIcons

**Usage:** Icon library for navigation and UI elements

### Font Awesome (v5.15.4 / v4.7.0)

**Usage:** Additional icons (login page)

---

## 🌐 Server Configuration

### Caddy (Web Server / Reverse Proxy)

**Configuration (`Caddyfile`):**

```
:80 {
    reverse_proxy localhost:3000
}

magnusstellacore.laing.mx {
    reverse_proxy localhost:3000
    tls {
        on_demand
    }
}
```

**Features:**

- Automatic HTTPS with on-demand TLS
- Reverse proxy to Node.js app on port 3000

---

## 🔧 Development Dependencies

### nodemon (v3.1.0)

**Usage:** Auto-restart server during development

```json
"scripts": {
  "start": "nodemon app.js"
}
```

---

## 📝 Environment Variables Required

| Variable             | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `SECRET`             | Session secret key                          |
| `DB_HOST`            | MySQL host                                  |
| `DB_USER`            | MySQL username                              |
| `DB_DATABASE`        | MySQL database name                         |
| `DB_PASSWORD`        | MySQL password                              |
| `ClientIDGoogle`     | Google OAuth Client ID                      |
| `ClientSecretGoogle` | Google OAuth Client Secret                  |
| `GMAIL_USER`         | Gmail address for sending emails            |
| `GMAIL_KEY`          | Gmail app password                          |
| `API_KEY`            | Token for Zecore API authentication         |
| `SUPER_ID`           | Super admin user ID to exclude from queries |
| `PORT`               | Server port (default: 3000)                 |

---

## ⚠️ Technology Concerns for Refactoring

### Deprecated Packages

1. **csurf** - Deprecated, needs alternative CSRF solution

### Security Concerns

1. **Raw SQL queries** - Risk of SQL injection in some places
2. **File upload naming** - Original filename preserved (collision risk)
3. **Session storage** - In-memory by default (not production-ready)

### Modernization Opportunities

1. **TypeScript** - Add type safety
2. **ORM** - Consider Prisma, TypeORM, or Drizzle
3. **Modern frontend** - React, Vue, or Svelte
4. **API-first architecture** - Separate frontend and backend
5. **Docker** - Containerization for consistent deployments
6. **Proper logging** - Winston or Pino instead of console.log
