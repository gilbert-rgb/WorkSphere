# HR Platform API

A Spring Boot-based Human Resource Management Platform with WhatsApp Bot integration, JWT authentication, OTP verification, and role-based access control.

---

## Tech Stack

| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 3.3.5 |
| Spring Security | 6.3.4 |
| PostgreSQL | 16 |
| Hibernate / JPA | 6.5.3 |
| Twilio WhatsApp API | 10.1.5 |
| JWT (jjwt) | 0.11.5 |
| Lombok | 1.18.34 |
| Maven | - |

---

## Features

- JWT-based authentication and authorization
- Role-based access control (ADMIN, HR, EMPLOYEE)
- WhatsApp Bot via Twilio Sandbox
- OTP verification via WhatsApp
- Employee management
- Department management
- Automated check-in/check-out via WhatsApp
- Leave requests via WhatsApp
- Payroll queries via WhatsApp

---

## Project Structure

```
hr_platform/
├── src/main/java/com/gilbert/hr_platform/
│   ├── auth/
│   │   ├── AuthenticationController.java
│   │   ├── AuthenticationService.java
│   │   ├── AuthenticationRequest.java
│   │   ├── AuthenticationResponse.java
│   │   └── RegisterRequest.java
│   ├── config/
│   │   ├── ApplicationConfig.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── JwtService.java
│   │   └── SecurityConfig.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Employee.java
│   │   ├── Department.java
│   │   └── Role.java (enum)
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── EmployeeRepository.java
│   │   └── DepartmentRepository.java
│   ├── service/
│   │   └── DepartmentService.java
│   ├── whatsapp/
│   │   ├── WhatsappController.java
│   │   ├── WhatsappService.java
│   │   ├── WhatsAppCommandParser.java
│   │   ├── OtpCode.java
│   │   ├── OtpService.java
│   │   └── OtpRepository.java
│   └── HrPlatformApplication.java
└── src/main/resources/
    └── application.yml
```

---

## Prerequisites

- Java 21
- Maven
- PostgreSQL 16 (via WSL or native)
- Twilio Account with WhatsApp Sandbox enabled
- ngrok (for webhook testing locally)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hr_platform.git
cd hr_platform
```

### 2. Start PostgreSQL (WSL)

```bash
sudo pg_ctlcluster 16 main start
```

### 3. Create the database and user

```bash
sudo -u postgres psql
```

```sql
CREATE USER hr_admin WITH PASSWORD 'moya_hr123';
CREATE DATABASE hr_platform_db OWNER hr_admin;
GRANT ALL PRIVILEGES ON DATABASE hr_platform_db TO hr_admin;
\q
```

### 4. Configure environment variables

Set these in your IDE (IntelliJ → Run → Edit Configurations → Environment Variables) or export them in your terminal:

```bash
export TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxx
export TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

### 5. application.yml

```yaml
spring:
  application:
    name: hr_platform

  datasource:
    url: jdbc:postgresql://127.0.0.1:5432/hr_platform_db
    username: hr_admin
    password: moya_hr123
    driver-class-name: org.postgresql.Driver

  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: update
    show-sql: true

server:
  port: 8081

twilio:
  account-sid: ${TWILIO_ACCOUNT_SID}
  auth-token: ${TWILIO_AUTH_TOKEN}
  whatsapp-from: whatsapp:+14155238886
```

### 6. Run the application

```bash
mvn spring-boot:run
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register a new user | No |
| POST | `/api/v1/auth/authenticate` | Login and get JWT token | No |

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "username": "gilbert.cheboi",
    "password": "password123",
    "role": "ADMIN"
}
```

#### Response
```json
{
    "token": "eyJhbGciOiJIUzUxMiJ9..."
}
```

#### Login
```http
POST /api/v1/auth/authenticate
Content-Type: application/json

{
    "username": "gilbert.cheboi",
    "password": "password123"
}
```

---

### WhatsApp Bot

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/whatsapp/send` | Manually send a WhatsApp message | Yes |
| POST | `/api/v1/whatsapp/webhook` | Twilio webhook for incoming messages | No |

#### Send Message (Manual)
```http
POST /api/v1/whatsapp/send?to=+254XXXXXXXXX&message=Hello
Authorization: Bearer <token>
```

#### Webhook (Called by Twilio)
```http
POST /api/v1/whatsapp/webhook
Content-Type: application/x-www-form-urlencoded

From=whatsapp:+254XXXXXXXXX&Body=check in
```

---

### OTP Verification

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/otp/send` | Send OTP to WhatsApp number | Yes |
| POST | `/api/v1/otp/verify` | Verify OTP code | Yes |

#### Send OTP
```http
POST /api/v1/otp/send?phoneNumber=+254XXXXXXXXX
Authorization: Bearer <token>
```

#### Verify OTP
```http
POST /api/v1/otp/verify?phoneNumber=+254XXXXXXXXX&code=123456
Authorization: Bearer <token>
```

---

## WhatsApp Bot Commands

Employees can send these messages to the HR WhatsApp bot:

| Message | Intent | Response |
|---------|--------|----------|
| `hi` / `hello` / `help` | GREETING | Menu of available commands |
| `check in` | ATTENDANCE_CHECK_IN | Check-in recorded with timestamp |
| `check out` | ATTENDANCE_CHECK_OUT | Check-out recorded with timestamp |
| `I need leave for 3 days` | LEAVE_3_DAYS | Leave request confirmation |
| `leave balance` | LEAVE_BALANCE | Remaining leave days |
| `salary` / `payslip` | PAYROLL_QUERY | Payroll information |

---

## Roles & Permissions

| Role | Description |
|------|-------------|
| `ADMIN` | Full access to all endpoints |
| `HR` | Manage employees, departments, leave approvals |
| `EMPLOYEE` | View own profile, request leave, check in/out via WhatsApp |

---

## Employee Status Flow

```
PENDING → ACTIVE → INACTIVE
```

- **PENDING** — default on creation, waiting for HR activation
- **ACTIVE** — fully onboarded employee
- **INACTIVE** — deactivated/resigned employee

---

## WhatsApp Webhook Setup (Local Testing)

1. Install and run ngrok:
```bash
ngrok http 8081
```

2. Copy the ngrok HTTPS URL e.g:
```
https://xxxx.ngrok.io
```

3. Go to Twilio Console → Messaging → Try it out → Send a WhatsApp message

4. Set the webhook URL to:
```
https://xxxx.ngrok.io/api/v1/whatsapp/webhook
```

5. Send a message to the Twilio sandbox number from your WhatsApp

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
| first_name | VARCHAR | - |
| last_name | VARCHAR | - |
| whatsapp_number | VARCHAR | UNIQUE, NOT NULL |
| email | VARCHAR | UNIQUE |
| department_id | BIGINT | FK → department |
| position | VARCHAR | - |
| salary | DECIMAL | - |
| status | VARCHAR | ENUM(PENDING, ACTIVE, INACTIVE) |
| created_at | TIMESTAMP | Auto on create |
| updated_at | TIMESTAMP | Auto on update |

### department
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| name | VARCHAR | UNIQUE, NOT NULL |
| description | VARCHAR | - |

### otp_codes
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO |
| phone_number | VARCHAR | - |
| code | VARCHAR | - |
| used | BOOLEAN | - |
| expires_at | TIMESTAMP | 5 mins from creation |
| created_at | TIMESTAMP | - |

---

## Security

- All endpoints except `/api/v1/auth/**` require a valid JWT token
- JWT tokens expire after **10 hours**
- Passwords are encrypted using **BCrypt**
- OTP codes expire after **5 minutes** and are single-use

---

## Running Tests with Postman

1. Register a user → copy the JWT token from the response
2. Add the token to all subsequent requests:
   - Header: `Authorization: Bearer <token>`
3. Test WhatsApp webhook using `x-www-form-urlencoded` body

---

## Known Issues & Roadmap

- [ ] Wire leave balance to actual database
- [ ] Wire attendance check-in/out to database
- [ ] Add DepartmentController REST endpoints
- [ ] Add EmployeeController REST endpoints
- [ ] Add leave approval workflow
- [ ] Add payroll generation
- [ ] Add email notifications
- [ ] Add pagination to list endpoints

---

## Author

**Gilbert Cheboi**  
HR Platform — Built with Spring Boot & Twilio WhatsApp API
