# File Map Reference

This document provides a quick reference for all files in the MagnusStella project with their purpose and key dependencies.

---

## 📁 Root Files

| File               | Purpose                                                | Dependencies                              |
| ------------------ | ------------------------------------------------------ | ----------------------------------------- |
| `app.js`           | Main entry point, middleware setup, route registration | express, passport, session, multer, csurf |
| `package.json`     | Project configuration, dependencies                    | -                                         |
| `passportSetup.js` | Google OAuth strategy configuration                    | passport, passport-google-oauth20         |
| `Caddyfile`        | Reverse proxy and TLS configuration                    | Caddy server                              |
| `index.html`       | Static HTML file (purpose unclear)                     | -                                         |

---

## 📁 Controllers (`/controllers/`)

| File                      | Purpose                     | Models Used                            | Routes         |
| ------------------------- | --------------------------- | -------------------------------------- | -------------- |
| `usuarios.controller.js`  | Login, logout, signup       | usuarios.model                         | /users/\*      |
| `resenas.controller.js`   | Reviews CRUD, email sending | resenas.model, correos.model           | /reviews/\*    |
| `correos.controller.js`   | Survey question management  | correos.model                          | /emails/\*     |
| `grafica.controller.js`   | Dashboard analytics         | grafica.model                          | /graphics/\*   |
| `zecore.controller.js`    | External API handlers       | zecoresaleshelper, zecoreproducthelper | /api/zecore/\* |
| `respuesta.controller.js` | Survey response handling    | respuesta.model                        | /respuesta/\*  |
| `ayuda.controller.js`     | Help page rendering         | None                                   | /ayuda/\*      |
| `renderHtml.js`           | User CRUD (misnamed)        | usuarios.model                         | /usuarios/\*   |

---

## 📁 Models (`/models/`)

| File                           | Entity          | Pattern        | Key Methods                                            |
| ------------------------------ | --------------- | -------------- | ------------------------------------------------------ |
| `usuarios.model.js`            | User            | Class + static | findByEmail, save, fetchPag, getPermisos               |
| `resenas.model.js`             | Review          | Class + static | fetchAll, fetchCompleto, search, actualizarvisibilidad |
| `correos.model.js`             | Question/Option | Class + static | emailConfiguration, save, delete                       |
| `grafica.model.js`             | Analytics       | Exports        | StarAvgLine, tasaDeRespuesta, ReviewsSentxMonth        |
| `respuesta.model.js`           | Response        | Class          | CreateReview, AddResponse                              |
| `zecoresaleshelper.model.js`   | Sale            | Class          | FindCliente, AddCliente, RegistrarVenta                |
| `zecoreproducthelper.model.js` | Product         | Class          | RegistrarProducto, ModificarProducto                   |

---

## 📁 Routes (`/routes/`)

| File                  | Base Path  | Protected | Middleware                 |
| --------------------- | ---------- | --------- | -------------------------- |
| `login.routes.js`     | /users     | Partial   | CSRF, isAuth (some routes) |
| `resenas.routes.js`   | /reviews   | Yes       | isAuth, canView            |
| `correos.routes.js`   | /emails    | Yes       | isAuth, canEdit            |
| `grafica.routes.js`   | /graphics  | Yes       | isAuth                     |
| `zecore.routes.js`    | /api       | Yes       | validateToken              |
| `respuesta.routes.js` | /respuesta | No        | None                       |
| `routes1.routes.js`   | /          | Yes       | isAuth, canAdmin           |
| `ayuda.routes.js`     | /ayuda     | Yes       | isAuth                     |

---

## 📁 Middleware (`/util/`)

| File           | Purpose                    | Used In                |
| -------------- | -------------------------- | ---------------------- |
| `database.js`  | MySQL connection pool      | All models             |
| `is-auth.js`   | Check if user is logged in | Protected routes       |
| `can-admin.js` | Check admin permission     | User management routes |
| `can-edit.js`  | Check edit permission      | Email config routes    |
| `can-view.js`  | Check view permission      | Review routes          |

---

## 📁 CRON Job (`/CRON_job/`)

| File                    | Purpose                  | Schedule      |
| ----------------------- | ------------------------ | ------------- |
| `cronJob.controller.js` | Email sending scheduler  | Daily at 3 PM |
| `cronJob.model.js`      | Query for pending emails | -             |

---

## 📁 Views (`/views/`)

### Main Views

| File                    | Route                                 | Purpose             |
| ----------------------- | ------------------------------------- | ------------------- |
| `login.ejs`             | /users/login                          | Login form          |
| `signup.ejs`            | /users/signup/:marca                  | User registration   |
| `dashboard.ejs`         | /graphics/dashboard/:marca            | Analytics dashboard |
| `resenas.ejs`           | /reviews/resenas/:marca               | Reviews list        |
| `resenas_completas.ejs` | /reviews/resenas_completas/:marca/:id | Review detail       |
| `correos.ejs`           | /emails/correos/:marca                | Survey config       |
| `crear_correos.ejs`     | /emails/correos/:marca/crear          | Create question     |
| `editar_correos.ejs`    | /emails/correos/:marca/editar/:id     | Edit question       |
| `usuarios.ejs`          | /usuarios/:pag/:marca                 | User list           |
| `editar_usuarios.ejs`   | /usuarios/editar/:id/:marca           | Edit user           |
| `registroUsuarios.ejs`  | /usuarios/registro/:marca             | User history        |
| `prueba_correo.ejs`     | Email template                        | Survey email        |
| `encuestaExitosa.ejs`   | /respuesta/RespuestExitosa            | Success page        |
| `encuestaRepetida.ejs`  | /respuesta/RespuestaDuplicada         | Duplicate page      |
| `403.ejs`               | Error                                 | Forbidden           |
| `404.ejs`               | Error                                 | Not found           |

### Partials (`/views/includes/`)

| File             | Purpose                 | Used In            |
| ---------------- | ----------------------- | ------------------ |
| `navigation.ejs` | Header, sidebar, layout | All main views     |
| `footer.ejs`     | Footer, scripts         | All main views     |
| `categorias.ejs` | Category dropdown       | Dashboard, reviews |

### Help Pages (`/views/ayudas/`)

| File                  | Purpose        |
| --------------------- | -------------- |
| `ayuda.ejs`           | Main help      |
| `ayuda-login.ejs`     | Login help     |
| `ayuda-dashboard.ejs` | Dashboard help |
| `ayuda-resenas.ejs`   | Reviews help   |
| `ayuda-correos.ejs`   | Emails help    |
| `ayuda-usuarios.ejs`  | Users help     |
| `ayuda-general.ejs`   | General help   |

---

## 📁 Static Assets (`/public/`)

### CSS (`/public/css/`)

| File                    | Purpose             |
| ----------------------- | ------------------- |
| `style.css`             | Main styles, layout |
| `login_syles.css`       | Login page          |
| `signup.css`            | Registration form   |
| `correos.css`           | Email config        |
| `resenas.css`           | Reviews list        |
| `resenas_completas.css` | Review detail       |
| `usuarios.css`          | User management     |
| `forms.css`             | Form elements       |
| `ayuda.css`             | Help pages          |

### JavaScript (`/public/js/`)

| File           | Purpose                         |
| -------------- | ------------------------------- |
| `dashboard.js` | Chart.js initialization, modals |
| `script.js`    | General utilities               |

### Images (`/public/images/`)

| Directory              | Contents              |
| ---------------------- | --------------------- |
| `ayuda/`               | Help page images      |
| `login/`               | Login page images     |
| `LU1/`, `MA1/`, `NO1/` | Brand-specific images |

### Logos (`/public/logos/`)

Brand logos for navigation and branding.

### Uploads (`/public/uploads/`)

| Directory   | Contents            |
| ----------- | ------------------- |
| `Usuarios/` | User profile images |

---

## 📁 Database (`/sql/`)

| File             | Purpose                            |
| ---------------- | ---------------------------------- |
| `estructura.sql` | Full database schema + sample data |

---

## 🔗 File Dependencies Graph

```
app.js
├── passportSetup.js
│   └── models/usuarios.model.js
│       └── util/database.js
├── util/is-auth.js
├── routes/*.routes.js
│   ├── controllers/*.controller.js
│   │   └── models/*.model.js
│   │       └── util/database.js
│   └── util/can-*.js
└── CRON_job/cronJob.controller.js
    ├── CRON_job/cronJob.model.js
    └── controllers/resenas.controller.js
```

---

## 🏷️ Naming Conventions (Current)

| Type        | Convention               | Example                |
| ----------- | ------------------------ | ---------------------- |
| Controllers | kebab-case.controller.js | usuarios.controller.js |
| Models      | kebab-case.model.js      | usuarios.model.js      |
| Routes      | kebab-case.routes.js     | login.routes.js        |
| Views       | kebab-case.ejs           | editar_usuarios.ejs    |
| CSS         | snake_case.css           | login_syles.css        |
| Middleware  | kebab-case.js            | is-auth.js             |

**Issues:** Inconsistent - mix of kebab-case, snake_case, camelCase
