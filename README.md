# 🚨 IssuePulse

**IssuePulse** is a full-stack civic issue reporting platform that empowers citizens to raise local problems and enables authorities to track, manage, and resolve them efficiently - bringing transparency and accountability to public issue management.

---

## 🌟 Key Highlights

- Citizen-friendly issue reporting
- Authority dashboard for issue resolution
- Role-based authentication system
- Area-wise issue tracking
- Secure and scalable backend architecture

---

## 👥 User Roles

### 👤 Citizen
- Register and log in securely
- Report local civic issues
- Track status of reported issues
- View issues by area

### 🏛️ Authority
- Login to authority dashboard
- View assigned area issues
- Update issue status (Pending / In Progress / Resolved)
- Monitor issue flow in real time

### 🔑 Admin (Optional)
- Manage users and authorities
- Monitor platform activity

---

## 🔐 Authentication & Security

- JWT-based authentication
- Role-based access control
- Password hashing using bcrypt
- Protected routes with middleware

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- MVC Architecture

### Frontend
- React.js
- REST API Integration
- Dashboard-based UI

---


## 📂 Project Structure
```
IssuePulse/
├── backend/
│   ├── controllers/      # Request handling logic
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & role protection
│   ├── config/           # DB & app configuration
│   ├── server.js         # Backend entry point
│   └── .env              # Environment variables
│
├── frontend/
│   ├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   └── services/         # API service layer
│
└── README.md
```



---

## 🔗 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### 🚧 Issues
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/issues` | Report a new issue |
| GET | `/api/issues` | Get all issues |
| GET | `/api/issues/:id` | Get issue by ID |
| PUT | `/api/issues/:id/status` | Update issue status |

---



