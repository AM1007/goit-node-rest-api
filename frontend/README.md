# Contacts Manager Frontend

[back to General Description](../README.md)

A modern React application for managing contacts, built with Vite, React 19, and CSS Modules.

## Features

- View, add, and delete contacts
- Real-time form validation
- Responsive design
- Clean, modular architecture

## Tech Stack

- **React 19**: Latest version of React with improved performance
- **Vite**: Fast and efficient build tool
- **React Hook Form**: For form handling and validation
- **Axios**: For API requests
- **CSS Modules**: For component-scoped styling

## Project Structure

```
├── src
    ├── api
        └── contacts.js        # API integration with backend
    ├── modules
        ├── ContactsList       # Contacts listing components
            └── ContactsList.jsx
            └── ContactsListItem.jsx
            └── ContactsList.module.css
            └── ContactsListItem.module.css
        ├── MyContactsAddForm  # Contact creation form
            └── MyContactsAddForm.jsx
            └── MyContactsAddForm.module.css
        ├── MyContacts         # Main container component
            └── MyContacts.jsx
            └── MyContacts.module.css
    └── App.jsx                # Root component
    └── App.module.css
    └── main.jsx               # Entry point
    └── index.css              # Global styles
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Backend Integration

This frontend connects to a Node.js/Express backend with Sequelize ORM for database operations. The API endpoints are:

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact by ID

## Form Validation

The application implements client-side validation for contact creation with the following rules:

- **Name**: Required field
- **Email**: Required, must match email format
- **Phone**: Required, must match format (xxx) xxx-xxxx

## Styling

The application uses CSS Modules to ensure component-scoped styling without conflicts. Each component has its own CSS module with isolated styles.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Requirements

- Node.js 16+
- npm or yarn
