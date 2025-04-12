# Contacts Management REST API

[back](./README.md)

A full-featured REST API for managing a collection of contacts using Express.js.

## Functionality

The API provides the ability to perform a complete set of CRUD operations with contacts:

- Get a list of all contacts
- Get a contact by identifier
- Add a new contact
- Update an existing contact
- Delete a contact

## Technology Stack

- **Node.js**: JavaScript runtime environment on the server
- **Express.js**: Web application framework
- **Joi**: Data validation
- **nanoid**: Unique identifier generation
- **morgan**: HTTP request logging
- **cors**: Cross-Origin Resource Sharing support
- **nodemon**: Automatic server reload during development

````md
## API Routes

### GET /api/contacts

Get all contacts.

- **Response**: Array of contacts
- **Status**: 200 OK

### GET /api/contacts/:id

Get a contact by identifier.

- **Response**: Contact object or error
- **Status**: 200 OK or 404 Not Found

### POST /api/contacts

Create a new contact.

- **Request Body**: `{ name, email, phone }` (all fields required)
- **Response**: Created contact object or error message
- **Status**: 201 Created or 400 Bad Request

### PUT /api/contacts/:id

Update an existing contact.

- **Request Body**: `{ name?, email?, phone? }` (at least one field)
- **Response**: Updated contact object or error message
- **Status**: 200 OK, 400 Bad Request, or 404 Not Found

### DELETE /api/contacts/:id

Delete a contact.

- **Response**: Deleted contact object or error message
- **Status**: 200 OK or 404 Not Found

## Contact Format

```json
{
  "id": "unique_identifier",
  "name": "Contact Name",
  "email": "email@example.com",
  "phone": "(123) 456-7890"
}
```
````
