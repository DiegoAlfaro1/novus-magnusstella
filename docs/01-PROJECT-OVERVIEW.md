# MagnusStella - Project Overview

## 📋 Executive Summary

**MagnusStella** is a web-based Customer Review Management System developed for **Zebrands**, a company that manages multiple brands (Luuna, Nooz, and Mappa) selling consumer products. The system enables the collection, management, and analysis of customer reviews through automated email surveys, with analytics dashboards and a comprehensive admin panel.

---

## 🎯 Business Purpose

The application serves as a centralized platform to:

1. **Collect Customer Feedback** - Automated email surveys sent to customers after purchases
2. **Manage Reviews** - View, filter, and control visibility of customer reviews
3. **Analytics Dashboard** - Visualize review trends, response rates, and average ratings
4. **Multi-brand Support** - Manage reviews for three distinct brands (Luuna, Nooz, Mappa)
5. **User Administration** - Role-based access control for different user types
6. **External API Integration** - Receive sales and product data from external systems (Zecore)

---

## 🏢 Project Information

| Attribute            | Value                                        |
| -------------------- | -------------------------------------------- |
| **Project Name**     | MagnusStella                                 |
| **Version**          | 1.0.0                                        |
| **License**          | MIT                                          |
| **Repository**       | https://github.com/DiegolHacker/MagnusStella |
| **Production URL**   | https://magnusstellacore.laing.mx            |
| **Development Team** | Equipo-MagnusStella                          |
| **Client**           | Zebrands                                     |

---

## 🏷️ Supported Brands

| Brand ID | Brand Name | Domain            |
| -------- | ---------- | ----------------- |
| LU1      | Luuna      | Mattresses & Beds |
| NO1      | Nooz       | Sleep Accessories |
| MA1      | Mappa      | Travel & Luggage  |

---

## 👥 User Roles

| Role ID | Role Name | Permissions                             |
| ------- | --------- | --------------------------------------- |
| 0       | Cliente   | Answer reviews (external customers)     |
| 1       | Admin     | Full access: view, edit, administration |
| 2       | Analítica | View permissions only                   |
| 3       | CRM       | View and edit permissions               |

---

## 🔑 Key Features

### 1. Authentication System

- Traditional email/password login
- Google OAuth 2.0 integration
- Session-based authentication
- CSRF protection

### 2. Review Management

- List all reviews per brand
- View complete review details
- Toggle review visibility
- Search reviews by product
- Filter by date range

### 3. Analytics Dashboard

- Average rating line chart (by month)
- Response rate doughnut chart
- Surveys sent per month
- Product/category filtering
- Date range filtering

### 4. Email Survey System

- Customizable survey questions per brand
- Multiple question types (single choice, multiple choice, text)
- Automated email sending via CRON job
- Configurable delay (days after purchase)

### 5. User Management

- Create/edit/delete users
- Assign roles and permissions
- Paginated user listing
- Profile image support

### 6. External API (Zecore)

- Register new products
- Modify existing products
- Register sales/purchases
- Token-based authentication

---

## 📁 Project Structure Overview

```
MagnusStella/
├── app.js                    # Main application entry point
├── package.json              # Dependencies and scripts
├── passportSetup.js          # Google OAuth configuration
├── Caddyfile                 # Reverse proxy configuration
├── controllers/              # Business logic handlers
├── models/                   # Database models
├── routes/                   # Route definitions
├── views/                    # EJS templates
├── public/                   # Static assets (CSS, JS, images)
├── util/                     # Utilities and middleware
├── CRON_job/                 # Scheduled task handlers
└── sql/                      # Database schema
```

---

## 🔗 External Dependencies

The system integrates with:

1. **Gmail SMTP** - Sending survey emails
2. **Google OAuth 2.0** - Social authentication
3. **MySQL Database** - Data persistence
4. **Caddy Server** - Reverse proxy with automatic HTTPS

---

## 📝 Notes for Refactoring

This documentation is structured to support a complete refactoring initiative. Key areas identified for improvement:

1. **Code Organization** - Mixed patterns, inconsistent naming
2. **Error Handling** - Incomplete error handling in many places
3. **Security** - Some potential SQL injection vulnerabilities
4. **Testing** - No test coverage exists
5. **TypeScript Migration** - Strongly typed codebase would improve maintainability
6. **API Design** - Could benefit from RESTful design principles
7. **Frontend** - EJS could be replaced with a modern framework

Detailed analysis of each area is provided in subsequent documentation files.
