# Frontend Documentation

## 🎨 Overview

The frontend uses server-side rendering with EJS templates, enhanced with vanilla JavaScript for interactivity, and Chart.js for data visualization.

---

## 📁 View Files Structure

```
views/
├── login.ejs                 # Login page
├── signup.ejs                # User registration form
├── dashboard.ejs             # Analytics dashboard
├── resenas.ejs               # Reviews list
├── resenas_completas.ejs     # Single review detail
├── correos.ejs               # Email/survey configuration
├── crear_correos.ejs         # Create question form
├── editar_correos.ejs        # Edit question form
├── usuarios.ejs              # User management list
├── editar_usuarios.ejs       # Edit user form
├── registroUsuarios.ejs      # User registration history
├── analitica.ejs             # Additional analytics (unused?)
├── prueba_correo.ejs         # Email template for surveys
├── encuestaExitosa.ejs       # Survey success page
├── encuestaRepetida.ejs      # Survey duplicate page
├── 403.ejs                   # Forbidden error page
├── 404.ejs                   # Not found error page
├── includes/
│   ├── navigation.ejs        # Header and sidebar
│   ├── footer.ejs            # Page footer
│   └── categorias.ejs        # Category dropdown
└── ayudas/
    ├── ayuda.ejs             # Main help page
    ├── ayuda-login.ejs       # Login help
    ├── ayuda-dashboard.ejs   # Dashboard help
    ├── ayuda-resenas.ejs     # Reviews help
    ├── ayuda-correos.ejs     # Emails help
    ├── ayuda-usuarios.ejs    # Users help
    └── ayuda-general.ejs     # General help
```

---

## 📄 Partial Templates

### navigation.ejs

**Location:** `views/includes/navigation.ejs`

**Purpose:** Main layout template including:

- HTML head with meta tags and CSS links
- Top navigation bar
- Dark/light mode toggle
- Brand selector dropdown
- Sidebar navigation
- User menu

**Included CSS:**

- `/css/style.css` (main stylesheet)
- BoxIcons (CDN)
- Font Awesome (CDN)
- Google Fonts (Roboto, Varela Round)

**Variables Expected:**

- `titulo` - Page title
- `marca` - Current brand ID
- `ruta` - Current route (for brand switching)
- `permisos` - User permissions array

**Brand Switching Logic:**

```html
<a href="<%=ruta%>/LU1">Luuna</a>
<a href="<%=ruta%>/NO1">Nooz</a>
<a href="<%=ruta%>/MA1">Mappa</a>
```

**Sidebar Navigation:**

```html
<li class="nav-link">
  <a href="/graphics/dashboard/<%= marca %>">Dashboard</a>
</li>
<!-- Permission-based sections -->
<% if(permisos.some(p => p.funcion === 'ver')) { %>
<li><a href="/reviews/resenas/<%= marca %>">Reseñas</a></li>
<% } %>
```

---

### footer.ejs

**Location:** `views/includes/footer.ejs`

**Purpose:** Closes HTML document and includes:

- Copyright notice
- JavaScript for dark mode toggle
- Sidebar toggle functionality

---

### categorias.ejs

**Location:** `views/includes/categorias.ejs`

**Purpose:** Category dropdown for filtering reviews/dashboard

**Variables Expected:**

- `marca` - Current brand
- `ruta` - Base route

---

## 📊 Main Views

### dashboard.ejs

**Purpose:** Analytics dashboard with charts

**Key Elements:**

1. **Filter Modal** - Product search, date range
2. **Active Filters Modal** - Shows current filters
3. **Charts:**
   - Line chart: Average rating over time
   - Doughnut chart: Response rate
   - Line chart: Surveys sent per month
   - Star rating display

**Data Variables:**

```javascript
let promedioMes = JSON.parse("<%- JSON.stringify(promedioPuntajes) %>");
let tasaDeRespuesta = JSON.parse("<%- JSON.stringify(tasaDeRespuesta) %>");
let respuestasEnviadas = JSON.parse("<%- JSON.stringify(encuestasEnviadas) %>");
```

**External Scripts:**

- Chart.js (CDN)
- Bootstrap Bundle (CDN)
- `/js/dashboard.js`

---

### resenas.ejs

**Purpose:** Reviews list with search and filtering

**Features:**

- Search by product ID
- Filter by date range
- Order by rating/date
- Visibility toggle buttons
- Pagination

**AJAX Functionality:**

- Dynamic search without page reload
- Visibility toggle via fetch API

---

### correos.ejs

**Purpose:** Survey configuration management

**Features:**

- List of survey questions
- Question type indicators
- Edit/delete buttons
- Days configuration input
- Create new question button

---

### usuarios.ejs

**Purpose:** User management with pagination

**Features:**

- Paginated user table
- Edit/delete actions
- Role indicators
- Status badges
- Create new user button

**Pagination Logic:**

```html
<% for(let i = 1; i <= totalPages; i++) { %>
<a
  href="/usuarios/<%= i %>/<%= marca %>"
  class="<%= i === currentPage ? 'active' : '' %>"
>
  <%= i %>
</a>
<% } %>
```

---

### login.ejs

**Purpose:** Authentication page

**Features:**

- Email/password form
- Show/hide password toggle
- Google OAuth button
- Error message display
- CSRF token hidden field

**Password Toggle:**

```javascript
function togglePassword() {
  var passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
```

---

### prueba_correo.ejs

**Purpose:** Email template for survey emails

**Features:**

- Brand logo
- Customer/product personalization
- Star rating selector
- Dynamic questions based on brand
- Form submission to public endpoint

**Important:** This is rendered by EJS on the server and sent as email HTML.

---

## 📁 Static Assets

### CSS Files

| File                    | Purpose                         |
| ----------------------- | ------------------------------- |
| `style.css`             | Main styles, navigation, layout |
| `login_syles.css`       | Login page specific             |
| `signup.css`            | User registration form          |
| `correos.css`           | Email configuration page        |
| `resenas.css`           | Reviews list page               |
| `resenas_completas.css` | Review detail page              |
| `usuarios.css`          | User management page            |
| `forms.css`             | Form styling                    |
| `ayuda.css`             | Help pages                      |

### JavaScript Files

| File           | Purpose                         |
| -------------- | ------------------------------- |
| `dashboard.js` | Chart initialization and modals |
| `script.js`    | General utilities               |

---

## 📊 Chart.js Implementation

### dashboard.js

**Charts Created:**

1. **Average Rating Line Chart**

```javascript
const creaGraficaLinea = (grapN, x, y, titulo) => {
  new Chart(grapN, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: titulo,
          data: y,
          borderWidth: 1,
          borderColor: lineColor1,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
};
```

2. **Response Rate Doughnut**

```javascript
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Tasa de Respuesta", "Restante"],
    datasets: [
      {
        data: [tasaDeRespuesta, 100 - tasaDeRespuesta],
        backgroundColor: ["#2e3d50", "#D9D9D9"],
      },
    ],
  },
});
```

---

## 🌓 Dark Mode Implementation

**Toggle Button:**

```html
<div class="dark-light">
  <i class="bx bx-moon moon"></i>
  <i class="bx bx-sun sun"></i>
</div>
```

**JavaScript (in footer.ejs):**

```javascript
const body = document.querySelector("body");
const darkLight = document.querySelector(".dark-light");

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
});
```

**CSS Variables:**

```css
:root {
  --line-color-1: #2e3d50;
  --line-value-2: #d9d9d9;
}

body.dark {
  --line-color-1: #ffffff;
  /* ... other dark mode variables */
}
```

---

## 🔐 CSRF Token Handling

Every form includes:

```html
<input type="hidden" name="_csrf" value="<%= csrfToken %>" />
```

For AJAX requests:

```javascript
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "CSRF-Token": csrfToken,
  },
  body: JSON.stringify(data),
});
```

---

## ⚠️ Frontend Issues for Refactoring

### 1. Template Organization

- Large templates with mixed concerns
- Inline JavaScript in many templates
- CSS and HTML tightly coupled

### 2. JavaScript

- Vanilla JS with jQuery-like patterns
- No module bundling
- Global variables
- Duplicate code across pages

### 3. Styling

- Multiple CSS files with overlapping rules
- No CSS preprocessor (Sass/Less)
- Inline styles in some templates
- No utility framework (Tailwind)

### 4. Accessibility

- Limited ARIA labels
- No skip links
- Color contrast issues in dark mode
- No keyboard navigation support

### 5. Responsiveness

- Limited mobile optimization
- Fixed pixel values
- No responsive images

### 6. Performance

- Multiple CDN requests
- No asset minification
- No lazy loading
- Large embedded data in templates

### 7. Modernization Opportunities

- Component-based frontend (React, Vue, Svelte)
- CSS-in-JS or Tailwind CSS
- TypeScript for type safety
- State management
- Progressive Web App features
