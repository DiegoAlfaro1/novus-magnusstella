# Controllers Documentation

## Overview

Controllers in MagnusStella handle the business logic layer, acting as intermediaries between routes and models. This document details each controller file, its responsibilities, methods, and issues identified for refactoring.

---

## 📁 Controller Files Summary

| File                      | Responsibility                    | Methods Count |
| ------------------------- | --------------------------------- | ------------- |
| `usuarios.controller.js`  | Authentication & user signup      | 5             |
| `resenas.controller.js`   | Review management & email sending | 7             |
| `correos.controller.js`   | Survey question management        | 7             |
| `grafica.controller.js`   | Dashboard analytics               | 2             |
| `zecore.controller.js`    | External API handlers             | 4             |
| `respuesta.controller.js` | Survey response handling          | 3             |
| `ayuda.controller.js`     | Help page rendering               | 7             |
| `renderHtml.js`           | User CRUD operations              | 5             |

---

## 📂 usuarios.controller.js

**Path:** `controllers/usuarios.controller.js`

**Dependencies:**

- `../models/usuarios.model`
- `bcryptjs`
- `passport`

### Methods

#### `get_login(request, response, next)`

Renders the login page.

**Renders:** `login.ejs`
**Variables Passed:**

- `username`, `registrar`, `error`, `csrfToken`, `permisos`

---

#### `post_login(request, response, next)`

Handles login form submission.

**Flow:**

1. Extract email and password from body
2. Find user by email
3. Compare password with bcrypt
4. Check user status (active/inactive)
5. Fetch user permissions
6. Set session and redirect

**Issues:**

- Nested promise chains (callback hell pattern)
- Inconsistent error handling
- `err` variable referenced in catch block but not defined

---

#### `get_logout(request, response, next)`

Destroys session and redirects to login.

---

#### `get_signup(request, response, next)`

Renders user creation form.

**Renders:** `signup.ejs`

---

#### `post_signup(request, response, next)`

Creates new user.

**Flow:**

1. Extract form data
2. Create Usuarios instance
3. Save to database (password hashed in model)

---

## 📂 resenas.controller.js

**Path:** `controllers/resenas.controller.js`

**Dependencies:**

- `../models/resenas.model`
- `../models/correos.model`
- `nodemailer`
- `ejs`

### Methods

#### `get_resenas_completas(request, response, next)`

Gets complete review with all survey responses.

**Flow:**

1. Fetch total questions for review
2. For each question, fetch responses
3. Fetch complete review data
4. Render detailed view

**Renders:** `resenas_completas.ejs`

---

#### `get_resenas(request, response, next)`

Lists all reviews for a brand.

**Renders:** `resenas.ejs`

---

#### `get_buscar(request, response, next)`

Searches reviews by product ID.

**Returns:** JSON array of matching reviews

---

#### `enviar_resenia(marcaS, nombreProducto, nombreCliente, idVenta, mail)`

Sends survey email to customer.

**Note:** This is called by CRON job, not directly by routes.

**Flow:**

1. Fetch email configuration for brand
2. For each question, fetch options
3. Render email template with EJS
4. Send via nodemailer

**Issues:**

- Mixed concerns (should be in a separate email service)
- Uses async function inside ejs.renderFile callback

---

#### `post_visibilidad(request, response, next)`

Toggles review visibility.

---

#### `get_resenas_f(request, response, next)`

Gets filtered reviews by date and order.

---

## 📂 correos.controller.js

**Path:** `controllers/correos.controller.js`

**Dependencies:**

- `../models/correos.model`

### Methods

#### `get_correos(request, response, next)`

Displays email/survey configuration.

**Flow:**

1. Get total questions for brand
2. For each question, fetch type and options
3. Get days configuration
4. Render configuration page

**Renders:** `correos.ejs`

---

#### `get_correos_editar(request, response, next)`

Edit form for a specific question.

**Renders:** `editar_correos.ejs`

---

#### `post_editar_correos(request, response, next)`

Saves question and option changes.

**Flow:**

1. Extract question text and options from body
2. Save question changes
3. Save each option change

---

#### `get_correos_crear(request, response, next)`

Renders question creation form.

**Renders:** `crear_correos.ejs`

---

#### `post_crear_correos(request, response, next)`

Creates new question with options.

---

#### `borrar_pregunta(request, response, next)`

Soft deletes a question.

**Note:** Does not send response - needs fixing!

---

#### `post_dias(request, response, next)`

Updates days configuration for brand.

---

## 📂 grafica.controller.js

**Path:** `controllers/grafica.controller.js`

**Dependencies:**

- `../models/grafica.model`

### Methods

#### `get_dashboard(request, response, next)`

Main dashboard with analytics.

**Flow:**

1. Extract filters from params/body
2. If product filter, validate product exists
3. Fetch all analytics in parallel:
   - Average rating over time
   - Response rate
   - Surveys sent per month
   - Overall average rating
4. Render dashboard

**Renders:** `dashboard.ejs`

---

#### `post_buscar(request, response, next)`

Product search endpoint.

**Returns:** JSON search results

---

## 📂 zecore.controller.js

**Path:** `controllers/zecore.controller.js`

**Dependencies:**

- `../models/zecoresaleshelper.model`
- `../models/zecoreproducthelper.model`

### Methods

#### `validateToken(req, res, next)`

Middleware to validate API key.

**Checks:** `Authorization` header against `process.env.API_KEY`

---

#### `post_ModifyProduct(request, response, next)`

Modifies existing product.

**⚠️ Security Issue:** Column name passed directly to SQL query

```javascript
`UPDATE producto SET ${columna} = ? WHERE idProducto = ?`;
```

---

#### `post_NewProduct(request, response, next)`

Creates new product.

---

#### `post_venta(request, response, next)`

Registers a sale.

**Flow:**

1. Check if client exists
2. If not, create client
3. Register sale

---

## 📂 respuesta.controller.js

**Path:** `controllers/respuesta.controller.js`

**Dependencies:**

- `../models/respuesta.model`

### Methods

#### `post_MailResponse(request, response, next)`

Handles survey form submission from customers.

**Flow:**

1. Extract review data
2. Create review record
3. For each answer, save response
4. Redirect to success/duplicate page

**Note:** Handles both single answers and arrays (multiple choice)

---

#### `getEncuestExitosa(request, response, next)`

Renders success page.

---

#### `getEncuestaRepetida(request, response, next)`

Renders duplicate submission page.

---

## 📂 ayuda.controller.js

**Path:** `controllers/ayuda.controller.js`

Contains 7 nearly identical methods for rendering help pages:

- `get_ayuda`
- `get_ayuda_login`
- `get_ayuda_dashboard`
- `get_ayuda_resenas`
- `get_ayuda_correos`
- `get_ayuda_usuarios`
- `get_ayuda_general`

**Issue:** High code duplication - should use a single parameterized method.

---

## 📂 renderHtml.js

**Path:** `controllers/renderHtml.js`

**Note:** Misleading filename - handles user CRUD operations

**Dependencies:**

- `../models/usuarios.model`

### Methods

#### `post_marca(request, response, next)`

Sets session marca (seems unused).

---

#### `get_usuarios(request, response, next)`

Paginated user list.

---

#### `get_editar(request, response, next)`

User edit form.

---

#### `post_editar(request, response, next)`

Saves user changes.

---

#### `post_delete(request, response, next)`

Deletes user and returns updated list.

**Returns:** JSON with updated pagination data

---

#### `get_registroUsuarios(request, response, next)`

User registration history.

---

## ⚠️ Issues Summary for Refactoring

### 1. Code Organization

- `renderHtml.js` should be renamed to `usuarios-crud.controller.js`
- Email sending logic should be extracted to a service
- `ayuda.controller.js` methods should be consolidated

### 2. Error Handling

- Inconsistent error handling patterns
- Some methods don't send responses (e.g., `borrar_pregunta`)
- Mix of try/catch and .catch()

### 3. Async Patterns

- Mix of async/await, Promises, and callbacks
- Nested promise chains in `post_login`
- Should standardize on async/await

### 4. Security

- SQL injection vulnerability in `post_ModifyProduct`
- No input validation
- Missing rate limiting

### 5. Code Duplication

- Help controller has 7 near-identical methods
- Similar patterns repeated across controllers

### 6. Separation of Concerns

- Controllers doing too much (e.g., resenas handles reviews AND email)
- No service layer
- Business logic mixed with request handling
