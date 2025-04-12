# [**Topic 4. REST API**](./hw02_express.md)

# [**Topic 6. Contacts Management REST API with PostgreSQL & Sequelize**](./hw04_postgres.md)

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

3. Run the server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

4. The API will be available at

```bash
http://localhost:3000/api/contacts
```

## Testing the API

For testing the API, it's recommended to use Postman or another HTTP client.

### Data Validation

The API validates all input data:

- The `name` field must be a non-empty string
- The `email` field must be a valid email address
- The `phone` field must match the format (XXX) XXX-XXXX

### Error Handling

The API returns clear error messages with appropriate HTTP statuses:

- `400`: Data validation errors
- `404`: Resource not found
- `500`: Internal server errors
