# API Reference

## 🔐 Authentication Routes

### Base Path: `/users`

#### Login Page

```
GET /users/login
```

**Response:** Renders login page with CSRF token

---

#### Submit Login

```
POST /users/login
```

**Body:**

```json
{
  "name": "user@email.com",
  "password": "password123",
  "_csrf": "csrf_token"
}
```

**Success:** Redirect to `/`
**Failure:** Re-render login with error message

---

#### Logout

```
GET /users/logout
```

**Response:** Destroys session and redirects to `/users/login`

---

#### Google OAuth

```
GET /users/auth/google
```

**Response:** Redirects to Google OAuth consent page

---

#### Google OAuth Callback

```
GET /users/auth/google/callback
```

**Response:** On success, redirects to `/`. On failure, redirects to `/users/login`

---

#### Signup Page

```
GET /users/signup/:marca
```

**Protected:** Requires `isAuth` + `canAdmin`
**Response:** Renders user creation form

---

#### Create User

```
POST /users/signup
```

**Protected:** Requires `isAuth` + `canAdmin`
**Body:**

```json
{
  "name": "User Name",
  "email": "user@email.com",
  "password": "password123",
  "rol": 1,
  "_csrf": "csrf_token"
}
```

**File:** Optional `image` (multipart/form-data)
**Success:** Redirect to `/usuarios/1/LU1`

---

#### Validate Password

```
POST /users/validate-password
```

**Body:**

```json
{
  "password": "TestPassword123!"
}
```

**Response:**

```json
{
  "valid": true
}
```

or

```json
{
  "valid": false,
  "message": "Password requirements not met..."
}
```

---

## 📊 Dashboard/Analytics Routes

### Base Path: `/graphics`

#### Dashboard

```
GET /graphics/dashboard/:marca
POST /graphics/dashboard/:marca
```

**Protected:** Requires `isAuth`
**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `marca` | string | Brand ID (LU1, NO1, MA1) |

**POST Body (for filtering):**

```json
{
  "producto": "LU1001B2",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "_csrf": "csrf_token"
}
```

**Response:** Renders dashboard with charts data

---

## ⭐ Reviews Routes

### Base Path: `/reviews`

#### List Reviews

```
GET /reviews/resenas/:marca
```

**Protected:** Requires `isAuth` + `canView`
**Response:** Renders reviews list for specified brand

---

#### Filter Reviews (POST)

```
POST /reviews/resenas/:marca
```

**Protected:** Requires `isAuth` + `canView`
**Body:**

```json
{
  "orden": "puntaje_asc",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "_csrf": "csrf_token"
}
```

**Response:** Renders filtered reviews

---

#### Search Reviews

```
GET /reviews/resenas/:marca/buscar/:valor_busqueda
```

**Protected:** Requires `isAuth` + `canView`
**Response (JSON):**

```json
{
  "resenas": [...],
  "permisos": [...]
}
```

---

#### Review Details

```
GET /reviews/resenas_completas/:marca/:id
```

**Protected:** Requires `isAuth` + `canView`
**Response:** Renders complete review with all survey responses

---

#### Toggle Visibility

```
POST /reviews/resenas/visibilidad/:id
```

**Protected:** Requires `isAuth` + `canView`
**Body:**

```json
{
  "visibilidad": 0,
  "_csrf": "csrf_token"
}
```

**Response (JSON):**

```json
{
  "success": true
}
```

---

## 📧 Email Configuration Routes

### Base Path: `/emails`

#### List Email Configuration

```
GET /emails/correos/:marca
```

**Protected:** Requires `isAuth` + `canEdit`
**Response:** Renders email/survey configuration page

---

#### Edit Question Page

```
GET /emails/correos/:marca/editar/:pregunta_id
```

**Protected:** Requires `isAuth` + `canEdit`
**Response:** Renders question edit form

---

#### Save Question Changes

```
POST /emails/correos/editar
```

**Protected:** Requires `isAuth` + `canEdit`
**Body:**

```json
{
  "pregunta": "Updated question text",
  "idp": "1",
  "marca": "LU1",
  "opcion_1": "Option 1 text",
  "opcion_2": "Option 2 text",
  "_csrf": "csrf_token"
}
```

**Response:** Redirect to email configuration page

---

#### Create Question Page

```
GET /emails/correos/:marca/crear
```

**Protected:** Requires `isAuth` + `canEdit`
**Response:** Renders question creation form

---

#### Create Question

```
POST /emails/correos/crear/:marca
```

**Protected:** Requires `isAuth` + `canEdit`
**Body:**

```json
{
  "question": "New question text",
  "tipo": 1,
  "op_1": "Option 1",
  "op_2": "Option 2",
  "_csrf": "csrf_token"
}
```

**Response:** Redirect to email configuration page

---

#### Delete Question

```
POST /emails/correos/borrar/:pregunta_id
```

**Protected:** Requires `isAuth` + `canEdit`
**Response (JSON):**

```json
{
  "success": true
}
```

**Note:** Soft delete - moves question to NULL1 brand

---

#### Update Days Configuration

```
POST /emails/correos/dias/:marca
```

**Protected:** Requires `isAuth` + `canEdit`
**Body:**

```json
{
  "dias": 7,
  "_csrf": "csrf_token"
}
```

**Response:** Redirect to email configuration page

---

## 👥 User Management Routes

### Base Path: `/usuarios` (via routes1.routes.js)

#### List Users (Paginated)

```
GET /usuarios/:pag/:marca
```

**Protected:** Requires `isAuth` + `canAdmin`
**Response:** Renders paginated user list

---

#### Edit User Page

```
GET /usuarios/editar/:usuario_id/:marca
```

**Protected:** Requires `isAuth` + `canAdmin`
**Response:** Renders user edit form

---

#### Save User Changes

```
POST /usuarios/editar/:usuario_id
```

**Protected:** Requires `isAuth` + `canAdmin`
**Body:**

```json
{
  "nombre": "Updated Name",
  "correo": "new@email.com",
  "password": "newPassword123",
  "idrol": 2,
  "estado": 1,
  "uIdusuario": 123,
  "_csrf": "csrf_token"
}
```

**Response:** Redirect to user list

---

#### Delete User

```
POST /usuarios/delete
```

**Protected:** Requires `isAuth` + `canAdmin`
**Body:**

```json
{
  "id": 123,
  "currentPage": 1,
  "marca": "LU1",
  "_csrf": "csrf_token"
}
```

**Response (JSON):**

```json
{
  "usuarios": [...],
  "marca": "LU1",
  "currentPage": 1,
  "pageSize": 5,
  "totalUsers": 20,
  "totalPages": 4
}
```

---

#### User Registration History

```
GET /usuarios/registro/:marca
```

**Protected:** Requires `isAuth` + `canAdmin`
**Response:** Renders registration history page

---

## 🤖 External API (Zecore) Routes

### Base Path: `/api/zecore`

**Authentication:** All routes require `Authorization` header with API key

```
Authorization: your_api_key_here
```

---

#### Register New Product

```
POST /api/zecore/NewProduct
```

**Body:**

```json
{
  "idProducto": "LU2002B2",
  "marcaProducto": "LU1",
  "nombre": "Colchón Luuna Hotel Collection",
  "imagen": "imagen.png",
  "descripcion": "El mejor colchón para descansar",
  "categoria": "Colchón"
}
```

**Response:**

```json
{
  "message": "Hemos recibido la información"
}
```

---

#### Modify Product

```
POST /api/zecore/ModifyProduct
```

**Body:**

```json
{
  "idProducto": "LU2002B2",
  "Columna": "Nombre",
  "NuevoValor": "Updated Product Name"
}
```

**Response:**

```json
{
  "message": "Hemos recibido la información"
}
```

**Warning:** Column name is used directly in SQL (potential injection risk)

---

#### Register Sale

```
POST /api/zecore/venta
```

**Body:**

```json
{
  "Cliente": "123456",
  "Nombre": "John Doe",
  "Correo": "john@example.com",
  "Producto_id": "LU1001B2",
  "Fecha": "2024-01-15",
  "SalesON": "ORD-12345"
}
```

**Response:**

```json
{
  "message": "Hemos recibido la información"
}
```

**Note:** Automatically creates client if not exists

---

## 📝 Survey Response Routes

### Base Path: `/respuesta`

#### Submit Survey Response

```
POST /respuesta/MailResponse
```

**No Authentication Required** (public endpoint for customers)

**Body:**

```json
{
  "rate": 5,
  "titulo_review": "Great product!",
  "descripcion_review": "I love this mattress...",
  "idVenta": 123,
  "answer_1": "Solo",
  "answer_2": "The quality is amazing",
  "answer_3": ["Precio", "Calidad"]
}
```

**Success:** Redirect to `/respuesta/RespuestExitosa`
**Duplicate:** Redirect to `/respuesta/RespuestaDuplicada`

---

#### Success Page

```
GET /respuesta/RespuestExitosa
```

**Response:** Renders success confirmation page

---

#### Duplicate Page

```
GET /respuesta/RespuestaDuplicada
```

**Response:** Renders duplicate submission error page

---

## ❓ Help Routes

### Base Path: `/ayuda`

| Route                         | Description    |
| ----------------------------- | -------------- |
| `GET /ayuda/:marca`           | Main help page |
| `GET /ayuda/login/:marca`     | Login help     |
| `GET /ayuda/dashboard/:marca` | Dashboard help |
| `GET /ayuda/resenas/:marca`   | Reviews help   |
| `GET /ayuda/correos/:marca`   | Emails help    |
| `GET /ayuda/usuarios/:marca`  | Users help     |
| `GET /ayuda/general/:marca`   | General help   |

All routes protected by `isAuth` middleware.

---

## 🏠 Root Route

```
GET /
```

**Protected:** Requires `isAuth`
**Response:** Redirects to `/graphics/dashboard/LU1`

---

## ⚠️ API Issues for Refactoring

### 1. Inconsistent Response Formats

- Some routes return JSON, others redirect
- No standardized error response format
- No API versioning

### 2. Security Concerns

- Survey submission endpoint has no rate limiting
- Zecore API uses raw column names in SQL
- No request validation middleware

### 3. RESTful Design Issues

- `POST /usuarios/delete` should be `DELETE /usuarios/:id`
- Search should use query parameters, not path params
- Toggle visibility should use `PATCH`

### 4. Missing Features

- No pagination info in JSON responses
- No HATEOAS links
- No API documentation (Swagger/OpenAPI)
