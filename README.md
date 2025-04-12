# Contacts Manager Application

A full-stack application for managing contacts with a modern React frontend and Node.js/Express backend.

## Project Overview

This project is a complete solution for managing contacts, featuring:

- Modern, responsive user interface
- RESTful API backend
- Database persistence using Sequelize ORM
- Form validation on both client and server sides

## Repository Structure

The repository is organized into two main directories:

```
├── frontend/          # React application built with Vite
├── backend/           # Node.js/Express API with Sequelize
├── .gitignore
├── README.md          # This file
```

## Quick Links

- [Frontend Documentation](./frontend/README.md) - Detailed information about the React frontend
- [Backend Documentation](./backend/README.md) - Detailed information about the Express backend

## Features

- **View Contacts**: Display a list of all contacts
- **Add Contacts**: Create new contacts with validation
- **Delete Contacts**: Remove contacts from the database
- **Update Favorite Status**: Mark contacts as favorites

## Screenshots

![app](./frontend/assets/Screenshot%202025-04-12%20165301.png)
![database](./backend/assets/Screenshot%202025-04-12%20165628.png)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/contacts-manager.git
   cd contacts-manager
   ```

2. Set up the backend:

   ```
   cd backend
   npm install
   ```

   Create a `.env` file with your database credentials (see backend README for details)

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

2. In a separate terminal, start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:5173

## Tech Stack

### Frontend

- React 19
- React Hook Form
- Axios
- CSS Modules
- Vite

### Backend

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Joi (validation)

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact
- `PATCH /api/contacts/:id/favorite` - Update favorite status

For more details on API requests and responses, see the [Backend Documentation](./backend/README.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
