# CotiZen Healthcare Backend API

This is the secure backend for the CotiZen Healthcare Portal, built with Spring Boot, Spring Security, and PostgreSQL.

## Prerequisites

1.  **Java 21** (Required)
2.  **Maven** (Required)
3.  **PostgreSQL 16** (Required)
4.  **Redis** (Optional, for caching)

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database named `healthcare_db`:

```sql
CREATE DATABASE healthcare_db;
```

### 2. Configuration

Open `src/main/resources/application.properties` and update the database credentials if necessary:

```properties
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### 3. Run the Application

Navigate to the backend directory and run:

```bash
mvn spring-boot:run
```

This will automatically:
1.  Connect to the database.
2.  Run Flyway migrations to create all tables (Users, Doctors, Appointments, etc.).
3.  Seed initial data (Specialties, Admin user).
4.  Start the API server at `http://localhost:8080`.

## API Documentation

Once running, access the Swagger UI at:
`http://localhost:8080/swagger-ui.html`

## Security Notes

-   **JWT Secret**: The `jwt.secret` in `application.properties` is a placeholder. Rgenerate a strong key for production.
-   **Passwords**: All passwords must be hashed using Argon2id.
