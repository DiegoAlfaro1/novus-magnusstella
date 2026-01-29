# Models Documentation

## Overview

Models in MagnusStella handle data access and database operations. The project uses raw SQL queries with the `mysql2` library instead of an ORM.

---

## 📁 Model Files Summary

| File                           | Entity            | Pattern          |
| ------------------------------ | ----------------- | ---------------- |
| `usuarios.model.js`            | User              | Class-based      |
| `resenas.model.js`             | Reviews           | Class-based      |
| `correos.model.js`             | Questions/Options | Class-based      |
| `grafica.model.js`             | Analytics         | Export functions |
| `respuesta.model.js`           | Survey Responses  | Class-based      |
| `zecoresaleshelper.model.js`   | Sales             | Class-based      |
| `zecoreproducthelper.model.js` | Products          | Class-based      |

---

## 📂 usuarios.model.js

**Path:** `models/usuarios.model.js`

### Class: Usuarios

#### Constructor

```javascript
constructor(name, email, password, image, IdRol, idUser, estado);
```

#### Instance Methods

##### `save()`

Creates a new user with hashed password.

```javascript
// Flow:
// 1. Hash password with bcrypt (12 rounds)
// 2. INSERT INTO usuario (IdRol, Nombre, Password, Correo, Imagen, Estado)
```

#### Static Methods

##### `findByEmail(email)`

Finds user by email address.

**Returns:** `{ user: Usuarios | null, passwordMatch: boolean }`

---

##### `fetchAll()`

Gets all users except super admin.

```sql
SELECT * FROM usuario WHERE idUsuario != ${process.env.SUPER_ID}
```

**⚠️ Issue:** String interpolation with env variable

---

##### `fetchPag(pag)`

Paginated user list (5 per page).

**Returns:**

```javascript
{
  users: [...],
  pageSize: 5,
  totalUsers: number,
  totalPages: number
}
```

---

##### `usuarios_fetchPag(pag)`

Alternative pagination (returns only users array).

---

##### `resto_fetchPag(pag)`

Returns pagination metadata without users.

---

##### `fetchOne(id)`

Gets single user by ID.

---

##### `fetch(pag, id)`

Dispatcher method for fetchOne or fetchPag.

---

##### `saveUsernameChanges(IdRol, Contrasena, Correo, idUsuario, nombre, estado)`

Updates user. If password provided, hashes it first.

---

##### `delete(id)`

Deletes user by ID.

---

##### `getPermisos(email)`

Gets user permissions by email.

```sql
SELECT funcion FROM permiso p
INNER JOIN posee ON p.idPermiso = posee.idPermiso
INNER JOIN usuario u ON posee.idRol = u.IDRol
WHERE u.Correo = ?
```

---

##### `getRegistros()`

Gets user registration history.

```sql
SELECT * FROM historialusuarios
```

---

## 📂 resenas.model.js

**Path:** `models/resenas.model.js`

### Class: Reviews

#### Constructor

```javascript
constructor(id, idventa, description, title, date, punctuation, marc);
```

#### Static Methods

##### `fetchAll(marca, callback)`

Gets all reviews for a brand.

**Note:** Uses callback pattern (inconsistent with other methods)

**Query:** Joins review → venta → producto, filtered by marca

---

##### `fetchCompleto(idReview, callback)`

Gets complete review with all details.

**Query:** Joins cliente → venta → producto → review → respuestas → pregunta

---

##### `search(valor_busqueda, marca, callback)`

Searches reviews by product ID prefix.

```sql
WHERE p.idProducto LIKE ? AND p.FK_idMarca_Producto = ?
-- Using: valor_busqueda + "%"
```

---

##### `actualizarvisibilidad(idreview, visibilidad)`

Updates review visibility flag.

**Returns:** boolean (success/failure)

---

##### `fetch_f(marca, orden, startDate, endDate, callback)`

Fetches filtered reviews with optional date range and ordering.

---

##### `reviewtotalpreguntas(idReview)`

Counts distinct questions answered in a review.

---

##### `reviewpreguntaid(idReview)`

Gets question IDs answered in a review.

---

##### `reviewrespuestas(idReview, idPregunta)`

Gets responses for a specific question in a review.

---

##### `reviewtotalrespuestas(idReview, idPregunta)`

Counts responses for a specific question.

---

##### `pregunta_descrip(idPregunta)`

Gets question description by ID.

---

## 📂 correos.model.js

**Path:** `models/correos.model.js`

### Class: Correos

#### Constructor

```javascript
constructor(descripcion, tipo, opciones, marca);
```

#### Instance Methods

##### `async save()`

Creates new question with options.

**Flow:**

1. Insert question
2. Get insertId
3. Insert all options with foreign key

---

#### Static Methods

##### `emailConfiguration(id)`

Gets questions and IDs for a brand.

**Returns:** `{ preguntas: [...], idp: [...] }`

---

##### `emaildias(id)`

Gets days configuration for brand.

---

##### `emailtipo_pre(id_p)`

Gets question type by ID.

---

##### `emailpreguntas(marca)`

Counts questions for a brand.

---

##### `emailcountopcion(preg)`

Counts options for a question.

---

##### `emailopciones(id_p)`

Gets options for a question.

---

##### `emailpregunta(id_p)`

Gets question description.

---

##### `saveQuestionChanges(pregunta, idPregunta)`

Updates question text.

---

##### `saveEmailChanges(opcion, idOpcion)`

Updates option text.

---

##### `savedias(marca, dias)`

Updates days configuration.

---

##### `delete(idPregunta)`

Soft deletes question (moves to NULL1 brand).

```sql
UPDATE pregunta SET fk_pregunta_idmarca = "NULL1" WHERE idPregunta = ?
```

---

## 📂 grafica.model.js

**Path:** `models/grafica.model.js`

### Exported Functions

**Note:** This model uses exported functions, not a class.

##### `StarAvgLine(marca, categoriaS, productoS, startDate, endDate)`

Gets average rating per month for line chart.

**Returns:**

```javascript
[{ mes: "2024-01", promedio: 4.5 }, ...]
```

---

##### `tasaDeRespuesta(marca, categoriaS, productoS, startDate, endDate)`

Calculates response rate percentage.

**Formula:** `(reviews / sales) * 100`

---

##### `ReviewsSentxMonth(marca, categoriaS, productoS, startDate, endDate)`

Gets surveys sent per month.

**Returns:**

```javascript
[{ mes: "2024-01", enviadas: 50 }, ...]
```

---

##### `StarAvgNumber(marca, categoriaS, productoS, startDate, endDate)`

Gets overall average rating.

---

##### `search(idProducto, marca)`

Validates product exists.

**Returns:**

```javascript
{ idProducto: "...", error: undefined }
// or
{ error: "El producto no existe" }
```

---

## 📂 respuesta.model.js

**Path:** `models/respuesta.model.js`

### Class: Respuesta

#### Constructor

```javascript
constructor(idReview, Descripcion, idpregunta);
```

#### Instance Methods

##### `async save()`

**Note:** This method seems unused/incomplete

---

##### `async CreateReview(idv, desc, tit, rat)`

Creates a new review record.

**Returns:** insertId or "error" string

---

##### `async AddResponse(idReview, desc, idpregunta)`

Adds a survey response.

---

## 📂 zecoresaleshelper.model.js

**Path:** `models/zecoresaleshelper.model.js`

### Class: ZecoreSalesHelper

#### Constructor

```javascript
constructor(Clienteid, nom, correo, Producto_id, Fecha, SalesOrdernum);
```

#### Instance Methods

##### `async FindCliente()`

Checks if client exists.

**Returns:** boolean

---

##### `async AddCliente()`

Creates new client record.

---

##### `async RegistrarVenta()`

Registers a sale.

---

## 📂 zecoreproducthelper.model.js

**Path:** `models/zecoreproducthelper.model.js`

### Class: ZecoreProductHelper

#### Constructor

```javascript
constructor(idProducto, marcaProducto, Nombre, Imagen, Descripcion, categoria);
```

#### Instance Methods

##### `async RegistrarProducto()`

Creates new product record.

---

##### `async ModificarProducto(id, columna, nuevoValor)`

Modifies product column.

**⚠️ SQL INJECTION RISK:**

```javascript
`UPDATE producto SET ${columna} = ? WHERE idProducto = ?`;
```

---

## 📂 CRON_job/cronJob.model.js

**Path:** `CRON_job/cronJob.model.js`

### Exported Functions

##### `getVentasTime()`

Gets sales ready for survey emails.

```sql
SELECT c.nombre, c.Correo AS mail, p.nombre AS nombreProducto,
       m.idMarca, v.idVenta
FROM venta v
JOIN cliente c ON v.FK_Venta_Cliente = c.idCliente
JOIN producto p ON v.FK_Venta_Producto = p.idProducto
JOIN marca m ON p.FK_idMarca_Producto = m.idMarca
WHERE DATEDIFF(CURRENT_TIMESTAMP(), v.Fecha) = m.Dias
```

---

## ⚠️ Issues Summary for Refactoring

### 1. Inconsistent Patterns

- Mix of class-based and function exports
- Some methods use callbacks, others use Promises
- Inconsistent async/await usage

### 2. SQL Concerns

- String interpolation in some queries (SQL injection risk)
- `ModificarProducto` has critical SQL injection vulnerability
- No query builder or prepared statement consistency

### 3. Error Handling

- Some methods catch and log, others throw
- `CreateReview` returns "error" string instead of throwing
- No standardized error types

### 4. Code Organization

- CRON model in separate folder (inconsistent)
- `grafica.model.js` uses different export pattern
- Models have too many responsibilities

### 5. Naming Issues

- Mix of Spanish and English
- Inconsistent casing (camelCase, snake_case)
- `zecoresaleshelper` vs `zecoreproducthelper` redundant naming

### 6. Missing Features

- No model validation
- No relationship definitions
- No transaction support
- No pagination helpers

### 7. Performance

- Many N+1 query patterns in controllers calling models in loops
- No query result caching
- Complex queries could benefit from views/stored procedures
