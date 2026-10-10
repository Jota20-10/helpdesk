
# HelpDesk — IT Support Ticket Management System

A responsive web application built with React and Vite to manage IT support requests, track incidents, and organize technical support workflows.

## Live Demo

[Open HelpDesk](https://helpdesk-jeybing.netlify.app)

## About the Project

HelpDesk is a frontend application designed to simulate a technical support ticket management system.

The project focuses on practicing React fundamentals, state management, CRUD operations, form handling, and client-side data persistence.

It provides an interactive dashboard for creating, organizing, and tracking support requests.

## Features

- Create support tickets with title and description
- Assign categories and priorities
- View and manage registered tickets
- Edit existing tickets
- Delete tickets with confirmation
- Change ticket status
- Search tickets by title or description
- Filter by status and priority
- Combine multiple filters
- View real-time ticket statistics
- Save tickets locally using localStorage
- Responsive dark-themed interface

### Ticket Statuses

- Open
- In Progress
- Resolved

### Priority Levels

- Low
- Medium
- High

### Ticket Categories

- Software
- Hardware
- Network
- Other

## Technologies Used

| Technology | Purpose |
|------------|---------|
| React | Component-based user interface |
| JavaScript | Application logic and CRUD operations |
| Vite | Development server and production build |
| CSS3 | Responsive layout and styling |
| localStorage | Browser-based ticket persistence |
| Git & GitHub | Version control and source code |
| Netlify | Application hosting and deployment |

## How It Works

1. A user creates a ticket through the support request form.
2. The ticket is added to the application state.
3. The dashboard automatically updates its statistics.
4. Users can search, filter, edit, or delete tickets.
5. Ticket changes are saved in the browser's localStorage.
6. Previously saved tickets are restored when the page reloads.

## Project Structure

```text
helpdesk/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Running Locally

### Requirements

- Node.js compatible with the project's Vite version
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Jota20-10/helpdesk.git
```

Enter the project directory:

```bash
cd helpdesk
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

```bash
npm run build
```

Vite generates the production files in the `dist` directory.

## Technical Concepts Practiced

This project demonstrates:

- React functional components
- JSX and component props
- useState and useEffect hooks
- Controlled forms
- Conditional rendering
- Array methods: map() and filter()
- Immutable state updates
- Dynamic statistics
- Browser storage with JSON serialization
- Responsive user interface design

## Current Limitations

HelpDesk is currently a frontend-only application.

- Tickets are stored separately in each browser.
- Data is not synchronized between devices.
- There is no user authentication.
- There is no centralized database.
- Clearing browser storage may remove saved tickets.
- The application is intended for demonstrations and learning, not for storing sensitive support information.

## Future Improvements

- Backend REST API
- Database integration
- User authentication
- Support agent assignment
- Ticket history and comments
- Role-based access control
- Improved reporting and analytics

## Author

**Jeybing Lewis Manzanares**

Computer Engineering Student

GitHub: https://github.com/Jota20-10

## Resumen en Español

HelpDesk es una aplicación web de gestión de tickets de soporte técnico desarrollada con React, JavaScript y Vite.

Permite registrar incidentes, asignar prioridades, modificar estados, editar y eliminar solicitudes, realizar búsquedas y aplicar filtros.

El dashboard muestra estadísticas actualizadas automáticamente y utiliza localStorage para conservar los tickets dentro del navegador.

El proyecto fue desarrollado como parte de mi portafolio profesional para fortalecer mis conocimientos de React, operaciones CRUD, manejo de estados y desarrollo frontend.

**Demostración:** https://helpdesk-jeybing.netlify.app
