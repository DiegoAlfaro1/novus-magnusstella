# Database Schema Documentation

## 📊 Entity Relationship Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    marca    │────<│  producto   │────<│   venta     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                                       │
      │                                       │
      ▼                                       ▼
┌─────────────┐                         ┌─────────────┐
│  pregunta   │                         │   cliente   │
└─────────────┘                         └─────────────┘
      │
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  opciones   │     │   review    │<────│   venta     │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          │
                          ▼
                    ┌─────────────┐
                    │ respuestas  │────>┌─────────────┐
                    └─────────────┘     │  pregunta   │
                                        └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│     rol     │────<│   posee     │────<│   permiso   │
└─────────────┘     └─────────────┘     └─────────────┘
      │
      │
      ▼
┌─────────────┐     ┌───────────────────┐
│   usuario   │────<│historialusuarios  │
└─────────────┘     └───────────────────┘
```

---

## 📋 Tables Description

### `marca` - Brands

Stores information about the different brands managed in the system.

| Column    | Type         | Constraints | Description                            |
| --------- | ------------ | ----------- | -------------------------------------- |
| `idMarca` | VARCHAR(25)  | PRIMARY KEY | Brand identifier (e.g., LU1, NO1, MA1) |
| `Nombre`  | VARCHAR(45)  | NOT NULL    | Brand name                             |
| `Logo`    | VARCHAR(250) | NOT NULL    | URL to brand logo                      |
| `Dias`    | INT          | NOT NULL    | Days after purchase to send survey     |

**Sample Data:**

```sql
('LU1', 'LUUNAA', 'https://...luuna.svg', 0)
('NO1', 'NOOZ', 'https://...nooz.png', 0)
('MA1', 'MAPPA', 'https://...mappa.png', 0)
('NULL1', 'NONE', 'None', 0)  -- Special null marker
```

---

### `producto` - Products

Stores product catalog information.

| Column                | Type         | Constraints        | Description         |
| --------------------- | ------------ | ------------------ | ------------------- |
| `idProducto`          | VARCHAR(25)  | PRIMARY KEY        | Product SKU         |
| `FK_idMarca_Producto` | VARCHAR(25)  | FK → marca.idMarca | Associated brand    |
| `Nombre`              | VARCHAR(100) | NOT NULL           | Product name        |
| `Imagen`              | VARCHAR(400) | NULL               | Product image URL   |
| `Descripcion`         | VARCHAR(400) | NOT NULL           | Product description |
| `Categoria`           | VARCHAR(45)  | NOT NULL           | Product category    |

**Categories Found:**

- Colchón (Mattress)
- Cama (Bed)
- Almohadas (Pillows)
- Blancos (Linens)
- Sábanas (Sheets)
- Maletas (Luggage)
- Accesorios (Accessories)

---

### `cliente` - Customers

Stores customer information from external sales system.

| Column      | Type         | Constraints | Description          |
| ----------- | ------------ | ----------- | -------------------- |
| `idCliente` | VARCHAR(45)  | PRIMARY KEY | External customer ID |
| `nombre`    | VARCHAR(100) | NOT NULL    | Customer name        |
| `Correo`    | VARCHAR(100) | NOT NULL    | Customer email       |

---

### `venta` - Sales

Records of individual sales transactions.

| Column              | Type        | Constraints                 | Description           |
| ------------------- | ----------- | --------------------------- | --------------------- |
| `idVenta`           | INT         | PRIMARY KEY, AUTO_INCREMENT | Sale ID               |
| `Fk_Venta_Cliente`  | VARCHAR(45) | FK → cliente.idCliente      | Customer reference    |
| `Fk_Venta_Producto` | VARCHAR(25) | FK → producto.idProducto    | Product purchased     |
| `Fecha`             | DATETIME    | NOT NULL                    | Purchase date         |
| `SalesOrderNum`     | VARCHAR(45) | NULL                        | External order number |

---

### `review` - Customer Reviews

Stores customer review submissions.

| Column            | Type         | Constraints                 | Description       |
| ----------------- | ------------ | --------------------------- | ----------------- |
| `idReview`        | INT          | PRIMARY KEY, AUTO_INCREMENT | Review ID         |
| `Fk_Review_Venta` | INT          | UNIQUE, FK → venta.idVenta  | Associated sale   |
| `Descripcion`     | VARCHAR(150) | NOT NULL                    | Review text       |
| `Titulo`          | VARCHAR(45)  | NOT NULL                    | Review title      |
| `Fecha`           | DATETIME     | NOT NULL                    | Submission date   |
| `Puntaje`         | INT          | NOT NULL                    | Star rating (1-5) |
| `Visibilidad`     | TINYINT      | NOT NULL, DEFAULT 1         | Visibility flag   |

**Note:** The UNIQUE constraint on `Fk_Review_Venta` ensures one review per sale.

---

### `pregunta` - Survey Questions

Survey questions configured per brand.

| Column                | Type         | Constraints                 | Description               |
| --------------------- | ------------ | --------------------------- | ------------------------- |
| `idPregunta`          | INT          | PRIMARY KEY, AUTO_INCREMENT | Question ID               |
| `Descripcion`         | VARCHAR(150) | NOT NULL                    | Question text             |
| `Tipo`                | INT          | NOT NULL                    | Question type (see below) |
| `fk_pregunta_idmarca` | VARCHAR(45)  | FK → marca.idMarca          | Associated brand          |

**Question Types:**
| Type | Description |
|------|-------------|
| 1 | Single choice (radio buttons) |
| 2 | Text input (open-ended) |
| 3 | Multiple choice (checkboxes) |

---

### `opciones` - Question Options

Available options for choice-based questions.

| Column                 | Type         | Constraints                 | Description     |
| ---------------------- | ------------ | --------------------------- | --------------- |
| `idopciones`           | INT          | PRIMARY KEY, AUTO_INCREMENT | Option ID       |
| `descripcion`          | VARCHAR(100) | NOT NULL                    | Option text     |
| `fk_opciones_pregunta` | INT          | FK → pregunta.idPregunta    | Parent question |

---

### `respuestas` - Survey Responses

Customer answers to survey questions.

| Column                   | Type         | Constraints                 | Description       |
| ------------------------ | ------------ | --------------------------- | ----------------- |
| `idrespuestas`           | INT          | PRIMARY KEY, AUTO_INCREMENT | Response ID       |
| `fk_respuestas_review`   | INT          | FK → review.idReview        | Associated review |
| `Descripción`            | VARCHAR(400) | NULL                        | Answer text       |
| `fk_respuestas_pregunta` | INT          | FK → pregunta.idPregunta    | Question answered |

---

### `rol` - User Roles

Available user roles in the system.

| Column   | Type        | Constraints | Description |
| -------- | ----------- | ----------- | ----------- |
| `IDRol`  | INT         | PRIMARY KEY | Role ID     |
| `Nombre` | VARCHAR(30) | NOT NULL    | Role name   |

**Defined Roles:**

```sql
(0, 'Cliente')
(1, 'Admin')
(2, 'Analítica')
(3, 'CRM')
```

---

### `permiso` - Permissions

Available permissions in the system.

| Column      | Type        | Constraints | Description     |
| ----------- | ----------- | ----------- | --------------- |
| `idPermiso` | INT         | PRIMARY KEY | Permission ID   |
| `funcion`   | VARCHAR(45) | NOT NULL    | Permission name |

**Defined Permissions:**

```sql
(0, 'contestarReview')
(1, 'ver')
(2, 'editar')
(3, 'administracion')
```

---

### `posee` - Role-Permission Mapping

Junction table linking roles to their permissions.

| Column      | Type | Constraints                 | Description          |
| ----------- | ---- | --------------------------- | -------------------- |
| `pk`        | INT  | PRIMARY KEY, AUTO_INCREMENT | Record ID            |
| `idrol`     | INT  | FK → rol.IDRol              | Role reference       |
| `idpermiso` | INT  | FK → permiso.idPermiso      | Permission reference |

**Current Mappings:**
| Role | Permissions |
|------|-------------|
| Cliente (0) | contestarReview |
| Analítica (2) | ver |
| Admin (1) | ver, editar, administracion |
| CRM (3) | ver, editar |

---

### `usuario` - System Users

Registered users who can log into the system.

| Column      | Type         | Constraints                 | Description              |
| ----------- | ------------ | --------------------------- | ------------------------ |
| `idUsuario` | INT          | PRIMARY KEY, AUTO_INCREMENT | User ID                  |
| `IDRol`     | INT          | FK → rol.IDRol              | User role                |
| `Nombre`    | VARCHAR(150) | NOT NULL                    | Full name                |
| `Password`  | VARCHAR(400) | NOT NULL                    | Hashed password (bcrypt) |
| `Correo`    | VARCHAR(100) | NOT NULL                    | Email address            |
| `Imagen`    | VARCHAR(400) | NOT NULL                    | Profile image filename   |
| `Estado`    | TINYINT      | NOT NULL, DEFAULT 1         | Active status            |

---

### `historialusuarios` - User Audit Log

Audit trail for user-related changes.

| Column        | Type        | Constraints                 | Description      |
| ------------- | ----------- | --------------------------- | ---------------- |
| `idhistorial` | INT         | PRIMARY KEY, AUTO_INCREMENT | Log ID           |
| `Usuario`     | VARCHAR(45) | NULL                        | User name        |
| `Accion`      | VARCHAR(45) | NULL                        | Action performed |
| `Fecha`       | DATETIME    | NULL                        | Timestamp        |

**Actions Tracked:**

- Alta Usuario (User created)
- Modificó Usuario (User modified)
- Baja Usuario (User deleted)

---

## 🔄 Database Triggers

### User Audit Triggers

```sql
-- After INSERT on usuario
TRIGGER `regustraUsuario` AFTER INSERT ON `usuario`
FOR EACH ROW
BEGIN
    INSERT INTO historialusuarios VALUES (DEFAULT, New.Nombre, 'Alta Usuario', NOW());
END

-- After UPDATE on usuario
TRIGGER `modificaUsuario` AFTER UPDATE ON `usuario`
FOR EACH ROW
BEGIN
    INSERT INTO historialusuarios VALUES (DEFAULT, New.Nombre, 'Modificó Usuario', NOW());
END

-- After DELETE on usuario
TRIGGER `eliminaUsuario` AFTER DELETE ON `usuario`
FOR EACH ROW
BEGIN
    INSERT INTO historialusuarios VALUES (DEFAULT, OLD.Nombre, 'Baja Usuario', NOW());
END
```

---

## 🔗 Foreign Key Relationships

```sql
-- Producto → Marca
CONSTRAINT `fk_marca_producto` FOREIGN KEY (`FK_idMarca_Producto`)
    REFERENCES `marca` (`idMarca`)

-- Venta → Cliente
CONSTRAINT `fk_cliente_venta` FOREIGN KEY (`Fk_Venta_Cliente`)
    REFERENCES `cliente` (`idCliente`)

-- Venta → Producto
CONSTRAINT `fk_producto_venta` FOREIGN KEY (`Fk_Venta_Producto`)
    REFERENCES `producto` (`idProducto`)

-- Review → Venta
CONSTRAINT `fk_venta_review` FOREIGN KEY (`Fk_Review_Venta`)
    REFERENCES `venta` (`idVenta`)

-- Pregunta → Marca
CONSTRAINT `fk_idmarca_pregunta` FOREIGN KEY (`fk_pregunta_idmarca`)
    REFERENCES `marca` (`idMarca`)

-- Opciones → Pregunta
CONSTRAINT `Fk_Pregunta_Opciones` FOREIGN KEY (`fk_opciones_pregunta`)
    REFERENCES `pregunta` (`idPregunta`)

-- Respuestas → Review
CONSTRAINT `fk_review_respuestas` FOREIGN KEY (`fk_respuestas_review`)
    REFERENCES `review` (`idReview`)

-- Respuestas → Pregunta
CONSTRAINT `fk_pregunta_respuestas` FOREIGN KEY (`fk_respuestas_pregunta`)
    REFERENCES `pregunta` (`idPregunta`)

-- Usuario → Rol
CONSTRAINT `IDRol` FOREIGN KEY (`IDRol`)
    REFERENCES `rol` (`IDRol`)

-- Posee → Rol
CONSTRAINT `fk_idrol_posee` FOREIGN KEY (`idrol`)
    REFERENCES `rol` (`IDRol`)

-- Posee → Permiso
CONSTRAINT `fk_idpermiso_posee` FOREIGN KEY (`idpermiso`)
    REFERENCES `permiso` (`idPermiso`)
```

---

## ⚠️ Database Issues for Refactoring

### 1. Naming Inconsistencies

- Mixed case: `idMarca` vs `IDRol` vs `idUsuario`
- Mixed languages: `Fk_Review_Venta` vs `fk_respuestas_pregunta`
- Inconsistent FK naming: `FK_idMarca_Producto` vs `Fk_Venta_Cliente`

### 2. Design Issues

- `marca` table has a "NULL1" record as a soft-delete marker (anti-pattern)
- No proper soft-delete mechanism (just `Estado` on users)
- `cliente.idCliente` is VARCHAR but should ideally be a proper ID
- No created_at/updated_at timestamps on most tables

### 3. Missing Indexes

- No index on `review.Fecha` (used in date filtering)
- No index on `venta.Fecha` (used in CRON queries)
- No composite indexes for common query patterns

### 4. Security Considerations

- Passwords stored as VARCHAR(400) - adequate for bcrypt hashes
- No encryption at rest for sensitive data
- Audit log only tracks user table, not reviews or sales

### 5. Normalization Issues

- `Categoria` on `producto` should be a separate table
- Brand days configuration stored in `marca` table (mixing configuration with data)
