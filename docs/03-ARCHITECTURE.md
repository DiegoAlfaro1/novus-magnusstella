# Architecture Analysis

## 🏗️ Architectural Pattern

The project follows a **Model-View-Controller (MVC)** pattern with the following structure:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Caddy (Reverse Proxy)                     │
│                    - HTTPS termination                       │
│                    - Load balancing (if needed)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Express.js Server                        │
├─────────────────────────────────────────────────────────────┤
│  Middleware Chain:                                           │
│  ┌─────────────┬──────────────┬──────────────┬────────────┐ │
│  │   Session   │   Passport   │  Body Parser │   CSRF     │ │
│  └─────────────┴──────────────┴──────────────┴────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Routes Layer:                                               │
│  ┌──────────┬──────────┬──────────┬──────────┬───────────┐  │
│  │  /users  │ /reviews │ /emails  │/graphics │   /api    │  │
│  └──────────┴──────────┴──────────┴──────────┴───────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Controllers Layer (Business Logic)                          │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ usuarios │ resenas │ correos │ grafica │ zecore │ ayuda ││
│  └──────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Models Layer (Data Access)                                  │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ usuarios │ resenas │ correos │ grafica │ zecore-helpers ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     MySQL Database                           │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ usuario │ review │ venta │ producto │ cliente │ pregunta││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure Analysis

### `/controllers/` - Business Logic Layer

| File                      | Responsibility                         |
| ------------------------- | -------------------------------------- |
| `usuarios.controller.js`  | Authentication (login, logout, signup) |
| `resenas.controller.js`   | Review management and email sending    |
| `correos.controller.js`   | Survey question/option management      |
| `grafica.controller.js`   | Dashboard analytics                    |
| `zecore.controller.js`    | External API handlers                  |
| `respuesta.controller.js` | Customer survey response handling      |
| `ayuda.controller.js`     | Help page rendering                    |
| `renderHtml.js`           | User CRUD operations                   |

### `/models/` - Data Access Layer

| File                           | Responsibility                         |
| ------------------------------ | -------------------------------------- |
| `usuarios.model.js`            | User CRUD, authentication, permissions |
| `resenas.model.js`             | Review queries and updates             |
| `correos.model.js`             | Email configuration and questions      |
| `grafica.model.js`             | Analytics/statistics queries           |
| `respuesta.model.js`           | Survey response creation               |
| `zecoresaleshelper.model.js`   | Sales registration                     |
| `zecoreproducthelper.model.js` | Product management                     |

### `/routes/` - Route Definitions

| File                  | Base Path    | Purpose                |
| --------------------- | ------------ | ---------------------- |
| `login.routes.js`     | `/users`     | Authentication routes  |
| `resenas.routes.js`   | `/reviews`   | Review management      |
| `correos.routes.js`   | `/emails`    | Email configuration    |
| `grafica.routes.js`   | `/graphics`  | Dashboard/analytics    |
| `zecore.routes.js`    | `/api`       | External API endpoints |
| `respuesta.routes.js` | `/respuesta` | Survey responses       |
| `routes1.routes.js`   | `/`          | User management, home  |
| `ayuda.routes.js`     | `/ayuda`     | Help section           |

### `/util/` - Utilities & Middleware

| File           | Purpose                         |
| -------------- | ------------------------------- |
| `database.js`  | MySQL connection pool           |
| `is-auth.js`   | Authentication check middleware |
| `can-admin.js` | Admin permission middleware     |
| `can-edit.js`  | Edit permission middleware      |
| `can-view.js`  | View permission middleware      |

### `/views/` - EJS Templates

| Directory/File          | Purpose                    |
| ----------------------- | -------------------------- |
| `login.ejs`             | Login page                 |
| `dashboard.ejs`         | Analytics dashboard        |
| `resenas.ejs`           | Reviews list               |
| `resenas_completas.ejs` | Single review detail       |
| `correos.ejs`           | Email/survey configuration |
| `usuarios.ejs`          | User list                  |
| `includes/`             | Shared partials            |
| `ayudas/`               | Help pages                 |

### `/public/` - Static Assets

| Directory  | Contents               |
| ---------- | ---------------------- |
| `css/`     | Stylesheets (8 files)  |
| `js/`      | Client-side JavaScript |
| `images/`  | Brand and UI images    |
| `logos/`   | Brand logos            |
| `uploads/` | User uploaded files    |

### `/CRON_job/` - Scheduled Tasks

| File                    | Purpose                  |
| ----------------------- | ------------------------ |
| `cronJob.controller.js` | CRON scheduler setup     |
| `cronJob.model.js`      | Query for pending emails |

---

## 🔄 Request Flow Examples

### 1. User Login Flow

```
POST /users/login
    │
    ▼
[CSRF Check]
    │
    ▼
usuarios.controller.post_login()
    │
    ├── Usuarios.findByEmail()
    │       │
    │       └── SELECT * FROM usuario WHERE Correo = ?
    │
    ├── bcrypt.compare()
    │
    ├── Usuarios.getPermisos()
    │       │
    │       └── Get user permissions from DB
    │
    └── req.session.save() → Redirect to /
```

### 2. Dashboard Analytics Flow

```
GET /graphics/dashboard/:marca
    │
    ▼
[isAuth Middleware] → Check session.isLoggedIn
    │
    ▼
grafica.controller.get_dashboard()
    │
    ├── Promise.all([
    │       Model.StarAvgLine(),      → Line chart data
    │       Model.tasaDeRespuesta(),  → Response rate
    │       Model.ReviewsSentxMonth(),→ Surveys sent
    │       Model.StarAvgNumber()     → Average stars
    │   ])
    │
    └── response.render("dashboard", { ... })
```

### 3. External API (Zecore) Flow

```
POST /api/zecore/venta
    │
    ▼
[zecoreC.validateToken] → Check Authorization header
    │
    ▼
zecore.controller.post_venta()
    │
    ├── venta.FindCliente() → Check if client exists
    │
    ├── venta.AddCliente()  → Add if not exists
    │
    └── venta.RegistrarVenta() → Insert sale record
```

### 4. CRON Email Flow

```
CRON: 0 15 * * * (Daily at 3 PM)
    │
    ▼
cronJob.model.getVentasTime()
    │
    └── Get sales where DATEDIFF(NOW, Fecha) = marca.Dias
    │
    ▼
For each sale:
    │
    └── resenas.controller.enviar_resenia()
            │
            ├── Correos.emailConfiguration() → Get questions
            │
            ├── ejs.renderFile() → Create email HTML
            │
            └── transporter.sendMail() → Send via Gmail
```

---

## 🔐 Authorization Architecture

### Permission Matrix

| Permission        | Description             | Roles                             |
| ----------------- | ----------------------- | --------------------------------- |
| `contestarReview` | Submit survey responses | Cliente (0)                       |
| `ver`             | View reviews, dashboard | Analítica (2), CRM (3), Admin (1) |
| `editar`          | Modify reviews, emails  | CRM (3), Admin (1)                |
| `administracion`  | User management         | Admin (1)                         |

### Middleware Chain for Protected Routes

```javascript
router.get(
  "/usuarios/:pag/:marca",
  isAuth, // 1. Check if logged in
  canAdmin, // 2. Check if has 'administracion' permission
  controladores.get_usuarios,
);
```

---

## ⚠️ Architecture Issues for Refactoring

### 1. Inconsistent Patterns

- Some controllers use classes, others use exported functions
- Mixed async/await and Promise.then() patterns
- Callback-based and Promise-based database queries

### 2. Naming Inconsistencies

- `renderHtml.js` handles user CRUD (misleading name)
- `routes1.routes.js` is a non-descriptive name
- Mix of English and Spanish in code

### 3. Separation of Concerns

- `resenas.controller.js` handles both review management AND email sending
- Email template (`prueba_correo.ejs`) contains business logic

### 4. Missing Layers

- No service layer between controllers and models
- No validation layer
- No centralized error handling
- No logging service

### 5. Security Gaps

- Some SQL queries use string interpolation (SQL injection risk)
- No rate limiting on API endpoints
- Session stored in memory (not Redis/database)

### 6. Scalability Concerns

- Single file per domain (large controllers)
- No API versioning for Zecore endpoints
- No caching layer
