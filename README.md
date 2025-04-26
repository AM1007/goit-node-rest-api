# Contacts Management REST API

## Project Components

# [**Topic 4. REST API Basics**](./hw02_express.md)

# [**Topic 6. PostgreSQL & Sequelize Integration**](./hw04_postgres.md)

# [**Topic 7. Authentication & Authorization**](./hw07_authentication.md)

# [**Topic 10. Email Verification**](./hw06_email.md)

## Features

- Complete CRUD operations for contacts management
- PostgreSQL database with Sequelize ORM
- User authentication and authorization with JWT
- Data validation with Joi
- Secure password handling with bcrypt
- User-specific contacts (data isolation)

## Installation and Running

1. Clone the repository

```bash
git clone https://github.com/your-username/goit-node-rest-api.git
cd goit-node-rest-api
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_DIALECT=postgres
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_HOST=your_host
DATABASE_NAME=your_database
DATABASE_PORT=5432

# JWT Secret
JWT_SECRET=your_jwt_secret

# Server Configuration
PORT=3000
```

4. Run the server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

5. The API will be available at

```bash
http://localhost:3000/api
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/current` - Get current user info
- `POST /api/auth/logout` - Logout (invalidate token)

### Contacts (Protected Routes)

- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact
- `PATCH /api/contacts/:id/favorite` - Update contact favorite status

## Testing the API

For testing the API, it's recommended to use Postman or another HTTP client.

### Authentication Flow

1. Register a new user (`POST /api/auth/register`)
2. Login to receive JWT token (`POST /api/auth/login`)
3. Add the token to the Authorization header (`Authorization: Bearer your_token`)
4. Access protected contacts routes

### Data Validation

The API validates all input data:

- User registration and login data
- Contact fields (name, email, phone)
- Data format and requirements

### Error Handling

The API returns clear error messages with appropriate HTTP statuses:

- `400`: Data validation errors
- `401`: Authentication errors
- `404`: Resource not found
- `409`: Conflict (e.g., email already in use)
- `500`: Internal server errors

## Technical Architecture

The application follows a clean architecture pattern:

- **Models:** Sequelize models defining the database schema (User, Contact)
- **Controllers:** Handle HTTP requests and responses
- **Services:** Business logic layer
- **Routes:** Define API endpoints
- **Schemas:** Joi validation schemas
- **Middleware:** Request processing (authentication, validation, error handling)
- **Helpers:** Utility functions (JWT, error handling)
