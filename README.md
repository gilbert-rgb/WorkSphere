# WorkSphere — HR Management Platform

A full-stack Human Resource Management Platform built with **Spring Boot** and **React**, featuring WhatsApp Bot integration, JWT authentication, OTP login, payroll management, attendance tracking, and role-based access control.

🌐 **Live Demo:** [https://hrplatformworksphere.netlify.app](https://hrplatformworksphere.netlify.app)  
🔗 **Backend API:** [https://worksphere-7l2w.onrender.com](https://worksphere-7l2w.onrender.com)  
📦 **GitHub:** [https://github.com/gilbert-rgb/WorkSphere](https://github.com/gilbert-rgb/WorkSphere)

---

## Tech Stack

### Backend
| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 3.3.5 |
| Spring Security | 6.3.4 |
| PostgreSQL | 17 (Neon) |
| Hibernate / JPA | 6.5.3 |
| Twilio WhatsApp API | 10.1.5 |
| JWT (jjwt) | 0.11.5 |
| Lombok | 1.18.34 |
| Maven | 3.9.6 |

### Frontend
| Technology | Version |
|------------|---------|
| React | 18 |
| Vite | 5 |
| Tailwind CSS | 3 |
| React Toastify | - |

### Infrastructure
| Service | Provider |
|---------|----------|
| Frontend Hosting | Netlify |
| Backend Hosting | Render |
| Database | Neon (PostgreSQL 17) |
| WhatsApp API | Twilio Sandbox |

---

## Features

- ✅ JWT-based authentication and authorization
- ✅ Role-based access control (ADMIN, HR, EMPLOYEE)
- ✅ WhatsApp OTP login
- ✅ WhatsApp Bot via Twilio Sandbox
- ✅ Employee management (CRUD)
- ✅ Department management
- ✅ Payroll generation and payslip viewing
- ✅ Leave request and approval workflow
- ✅ Attendance check-in/check-out (web + WhatsApp)
- ✅ Payroll queries via WhatsApp
- ✅ Docker support for local development
- ✅ Deployed on Render + Netlify + Neon

---

## Project Structure

```
WorkSphere/
├── backend/                          # Spring Boot API
│   ├── src/main/java/com/gilbert/hr_platform/
│   │   ├── auth/                     # Authentication (JWT)
│   │   │   ├── AuthenticationController.java
│   │   │   ├── AuthenticationService.java
│   │   │   ├── AuthenticationRequest.java
│   │   │   ├── AuthenticationResponse.java
│   │   │   └── RegisterRequest.java
│   │   ├── config/                   # Security & JWT config
│   │   │   ├── AppConfig.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── JwtService.java
│   │   │   └── SecurityConfiguration.java
│   │   ├── controller/               # REST Controllers
│   │   │   ├── AttendanceController.java
│   │   │   ├── DepartmentController.java
│   │   │   ├── EmployeeController.java
│   │   │   ├── LeaveController.java
│   │   │   └── PayrollController.java
│   │   ├── entity/                   # JPA Entities
│   │   │   ├── User.java
│   │   │   ├── Employee.java
│   │   │   ├── Department.java
│   │   │   ├── Attendance.java
│   │   │   ├── LeaveRequest.java
│   │   │   ├── Payroll.java
│   │   │   └── Role.java (enum)
│   │   ├── repository/               # Spring Data JPA
│   │   ├── service/                  # Business Logic
│   │   └── whatsapp/                 # WhatsApp Bot
│   │       ├── WhatsappController.java
│   │       ├── WhatsappService.java
│   │       ├── WhatsAppCommandParser.java
│   │       ├── OtpCode.java
│   │       ├── OtpController.java
│   │       ├── OtpService.java
│   │       └── OtpRepository.java
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                         # React App
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OtpLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── HRDashboard.jsx
│   │   │   └── EmployeeDashboard.jsx
│   │   ├── components/
│   │   │   └── Sidebar.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Getting Started (Local Development)

### Prerequisites
- Java 21
- Maven
- Node.js 20+
- PostgreSQL 16+ (or Docker)
- Twilio Account with WhatsApp Sandbox

---

### Option A — Run with Docker Compose

```bash
git clone https://github.com/gilbert-rgb/WorkSphere.git
cd WorkSphere

# Create .env file
cp .env.example .env
# Fill in your real values in .env

docker-compose up --build
```

App runs at:
- Frontend: `http://localhost`
- Backend: `http://localhost:8081`

---

### Option B — Run Manually

#### 1. Clone the repo
```bash
git clone https://github.com/gilbert-rgb/WorkSphere.git
cd WorkSphere
```

#### 2. Start PostgreSQL
```bash
sudo pg_ctlcluster 16 main start
sudo -u postgres psql
```
```sql
CREATE USER hr_admin WITH PASSWORD 'your_password';
CREATE DATABASE hr_platform_db OWNER hr_admin;
GRANT ALL PRIVILEGES ON DATABASE hr_platform_db TO hr_admin;
\q
```

#### 3. Configure backend

Create `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/hr_platform_db
    username: hr_admin
    password: your_password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

server:
  port: 8081

application:
  security:
    jwt:
      secret-key: your_base64_jwt_secret
      expiration: 86400000

twilio:
  account-sid: your_twilio_account_sid
  auth-token: your_twilio_auth_token
  whatsapp-from: whatsapp:+14155238886
```

#### 4. Run backend
```bash
cd backend
mvn spring-boot:run
```

#### 5. Run frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Environment Variables

### Backend (Render / local)
| Variable | Description |
|----------|-------------|
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | DB password |
| `APPLICATION_SECURITY_JWT_SECRET_KEY` | Base64 JWT secret (min 256 bits) |
| `APPLICATION_SECURITY_JWT_EXPIRATION` | Token expiry in ms (default: 86400000) |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token |
| `TWILIO_WHATSAPP_FROM` | WhatsApp sender number |
| `PORT` | Server port (default: 8081) |

### Frontend (Netlify / local)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register a new user | No |
| POST | `/api/v1/auth/authenticate` | Login with username/password | No |

### OTP (WhatsApp Login)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/otp/send?phoneNumber=` | Send OTP to WhatsApp | No |
| POST | `/api/v1/otp/verify?phoneNumber=&code=` | Verify OTP and get JWT | No |

### Employees
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/employees` | Get all employees | ADMIN, HR |
| POST | `/api/v1/employees` | Create employee | ADMIN, HR |
| PUT | `/api/v1/employees/{id}` | Update employee | ADMIN, HR |
| DELETE | `/api/v1/employees/{id}` | Delete employee | ADMIN, HR |

### Departments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/departments` | Get all departments | ADMIN, HR |
| POST | `/api/v1/departments` | Create department | ADMIN, HR |

### Attendance
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/attendance` | Get all attendance | Authenticated |
| POST | `/api/v1/attendance/checkin` | Check in | Authenticated |
| PUT | `/api/v1/attendance/checkout` | Check out | Authenticated |

### Leave
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/leave` | Get leave requests | Authenticated |
| POST | `/api/v1/leave` | Create leave request | Authenticated |
| PUT | `/api/v1/leave/approve/{id}` | Approve leave | ADMIN, HR |
| PUT | `/api/v1/leave/reject/{id}` | Reject leave | ADMIN, HR |

### Payroll
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/payroll` | Get all payroll | ADMIN, HR |
| GET | `/api/v1/payroll/me` | Get own payslips | ADMIN, HR, EMPLOYEE |
| POST | `/api/v1/payroll/generate/{employeeId}` | Generate payroll | ADMIN, HR |

### WhatsApp
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/whatsapp/webhook` | Twilio webhook | No |
| POST | `/api/v1/whatsapp/send` | Send message | No |

---

## Roles & Permissions

| Role | Permissions |
|------|-------------|
| `ADMIN` | Full access to all endpoints |
| `HR` | Manage employees, departments, leave approvals, payroll |
| `EMPLOYEE` | View own payslip, request leave, check in/out |

---

## WhatsApp Bot Commands

| Message | Action |
|---------|--------|
| `hi` / `hello` / `help` | Show command menu |
| `check in` | Record check-in |
| `check out` | Record check-out |
| `leave 2026-05-20 2026-05-25 reason` | Submit leave request |
| `leave balance` | View remaining leave days |
| `payslip` / `salary` | View latest payslip |

---

## Employee Status Flow

```
PENDING → ACTIVE → INACTIVE
```

- **PENDING** — default on creation
- **ACTIVE** — fully onboarded
- **INACTIVE** — deactivated/resigned

---

## WhatsApp Webhook Setup (Local Testing)

```bash
# Install and run ngrok
ngrok http 8081
```

Copy the HTTPS URL e.g. `https://xxxx.ngrok.io` and set it in:

**Twilio Console → Messaging → Try it out → Send a WhatsApp message → Sandbox settings**

Webhook URL:
```
https://xxxx.ngrok.io/api/v1/whatsapp/webhook
```

---

## Database Schema

### app_user
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| username | VARCHAR | UNIQUE, NOT NULL |
| password | VARCHAR | NOT NULL |
| role | VARCHAR | ENUM(ADMIN, HR, EMPLOYEE) |
| employee_id | BIGINT | FK → employee |

### employee
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| first_name | VARCHAR | NOT NULL |
| last_name | VARCHAR | NOT NULL |
| whatsapp_number | VARCHAR | UNIQUE, NOT NULL |
| email | VARCHAR | UNIQUE |
| department_id | BIGINT | FK → department |
| position | VARCHAR | NOT NULL |
| salary | DECIMAL | NOT NULL |
| status | VARCHAR | ENUM(PENDING, ACTIVE, INACTIVE) |
| created_at | TIMESTAMP | Auto on create |
| updated_at | TIMESTAMP | Auto on update |

### attendance
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| employee_id | BIGINT | FK → employee |
| check_in | TIMESTAMP | - |
| check_out | TIMESTAMP | - |
| status | VARCHAR | PRESENT, LATE, ABSENT |

### leave_request
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| employee_id | BIGINT | FK → employee |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |
| reason | VARCHAR | - |
| status | VARCHAR | PENDING, APPROVED, REJECTED |

### payroll
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| employee_id | BIGINT | FK → employee |
| basic_salary | DECIMAL | NOT NULL |
| bonus | DECIMAL | - |
| deductions | DECIMAL | - |
| net_salary | DECIMAL | NOT NULL |
| month | DATE | NOT NULL |

### otp_codes
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| phone_number | VARCHAR | - |
| code | VARCHAR | - |
| used | BOOLEAN | - |
| created_at | TIMESTAMP | - |
| expires_at | TIMESTAMP | 5 mins from creation |

---

## Security

- All endpoints except `/api/v1/auth/**`, `/api/v1/otp/**`, `/api/v1/whatsapp/**` require a valid JWT token
- JWT tokens expire after **24 hours**
- Passwords encrypted with **BCrypt**
- OTP codes expire after **5 minutes** and are single-use
- CORS restricted to allowed frontend origins

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Netlify | https://hrplatformworksphere.netlify.app |
| Backend | Render | https://worksphere-7l2w.onrender.com |
| Database | Neon | PostgreSQL 17 |

> ⚠️ The free Render instance spins down after 15 minutes of inactivity. First request may take 30-50 seconds to wake up.

---

## Author

**Gilbert Cheboi**  
📧 cheboigilbert7@gmail.com  
📍 Nairobi, Kenya  
🔗 [GitHub](https://github.com/gilbert-rgb) · [LinkedIn](https://www.linkedin.com/in/gilbert-cheboi-42b7ab351/) · [WhatsApp](https://wa.me/254743143013)
