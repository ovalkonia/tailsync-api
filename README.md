# TailSync API

A RESTful API for calendar and event management with support for recurring events, tasks, reminders, and collaborative calendars.

## Description

TailSync API is a comprehensive backend solution for managing calendars and events. It provides robust authentication, user management, and calendar collaboration features. The API supports complex event scheduling including recurring events (using the RRule standard), tasks, reminders, and file attachments. Users can create multiple calendars, share them with others via invitation links, and manage events collaboratively.

### Key Features

- **User Authentication & Authorization**: JWT-based authentication with access and refresh tokens
- **Calendar Management**: Create, update, delete, and share calendars
- **Event Management**: Full CRUD operations for events with support for:
  - Recurring events (using RRule)
  - Tasks and subtasks
  - Reminders and notifications
  - File attachments
  - Arrangements
- **Collaborative Calendars**: Share calendars with other users via secure invitation links
- **Holiday Events**: Built-in support for holiday calendars
- **Email Integration**: Email notifications and password reset functionality using Resend
- **File Uploads**: Support for file attachments on events

## Requirements and Dependencies

### System Requirements

- **Node.js**: v22 or higher
- **npm**: v10 or higher
- **MongoDB**: v7.0 or higher
- **Docker**: v24.0 or higher (optional, for containerized deployment)
- **Docker Compose**: v2.20 or higher (optional, for containerized deployment)

### NPM Dependencies

#### Production Dependencies

- **express** (^5.1.0) - Web application framework
- **mongoose** (^8.19.2) - MongoDB object modeling
- **bcrypt** (^6.0.0) - Password hashing
- **jsonwebtoken** (^9.0.2) - JWT authentication
- **cookie-parser** (^1.4.7) - Cookie parsing middleware
- **multer** (^2.0.2) - File upload handling
- **zod** (^4.1.12) - Schema validation
- **rrule** (^2.8.1) - Recurring event rules
- **resend** (^6.4.2) - Email service integration
- **uuid** (^13.0.0) - UUID generation

#### Development Dependencies

- **nodemon** (^3.1.10) - Development server with auto-reload

### Environment Variables

The following environment variables must be configured (see `.env.example`):

```env
# Server URLs
URL_BACKEND=http://localhost:8080
URL_FRONTEND=http://localhost:5173

# Database
URI_MONGODB=mongodb://127.0.0.1:27017/tailsync

# JWT Secrets
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret_here
JWT_ACCESS_TOKEN_SECRET=your_access_secret_here
JWT_EMAIL_CONFIRM_TOKEN_SECRET=your_email_confirm_secret_here
JWT_PASSWORD_RESET_TOKEN_SECRET=your_password_reset_secret_here
JWT_CALENDAR_JOIN_TOKEN_SECRET=your_calendar_join_secret_here

# Email Service (Resend)
RESEND_API_KEY=re_xxxx...xxxxxx
RESEND_FROM=onboarding@resend.dev
```

## How to Run

### Option 1: Using Docker (Recommended)

Docker provides the easiest way to run the application with all its dependencies.

#### Prerequisites

- Docker and Docker Compose installed on your machine

#### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ovalkonia/tailsync-api.git
   cd tailsync-api
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and update the environment variables with your values. Make sure to:
   - Generate secure random strings for all JWT secrets
   - Add your Resend API key (sign up at https://resend.com)
   - Update the MongoDB URI if using Docker Compose: `URI_MONGODB=mongodb://mongodb:27017/tailsync`

3. **Build and start the containers**

   ```bash
   docker compose up --build
   ```

   Or run in detached mode:

   ```bash
   docker compose up -d --build
   ```

4. **Verify the application is running**

   Open your browser or API client and navigate to:
   ```
   http://localhost:8080/ping
   ```

   You should receive a response: `pong`

5. **View logs** (if running in detached mode)

   ```bash
   docker compose logs -f backend
   ```

6. **Stop the application**

   ```bash
   docker compose down
   ```

   To remove volumes as well:
   ```bash
   docker compose down -v
   ```

### Option 2: Local Development (Without Docker)

#### Prerequisites

- Node.js v22 or higher installed
- MongoDB installed and running locally

#### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ovalkonia/tailsync-api.git
   cd tailsync-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start MongoDB**

   Make sure MongoDB is running on your local machine:

   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Linux with systemd
   sudo systemctl start mongod

   # Or run MongoDB directly
   mongod --dbpath /path/to/your/data/directory
   ```

4. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and update the environment variables. For local development:
   - Use `URI_MONGODB=mongodb://127.0.0.1:27017/tailsync`
   - Generate secure random strings for all JWT secrets
   - Add your Resend API key

5. **Start the development server**

   ```bash
   npm run dev
   ```

   This will start the server with auto-reload on file changes.

6. **Start the production server**

   ```bash
   npm start
   ```

7. **Verify the application is running**

   Open your browser or API client and navigate to:
   ```
   http://localhost:8080/ping
   ```

   You should receive a response: `pong`

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/password/reset` - Request password reset
- `POST /auth/confirm` - Confirm email address

### Users

- `GET /users` - Get current user profile
- `PATCH /users` - Update user profile
- `DELETE /users` - Delete user account

### Calendars

- `GET /calendars` - Get all user calendars
- `GET /calendars/:calendar_id` - Get specific calendar
- `GET /calendars/holidays/events/all/:year` - Get holiday events for a year
- `GET /calendars/:calendar_id/events/all/:year` - Get all calendar events for a year
- `POST /calendars` - Create new calendar
- `POST /calendars/:calendar_id/share` - Share calendar with others
- `POST /calendars/join/:token` - Join shared calendar
- `PATCH /calendars/:calendar_id` - Update calendar
- `DELETE /calendars/:calendar_id` - Delete calendar

### Events

- `GET /events/:event_id` - Get specific event
- `POST /events` - Create new event
- `PATCH /events/:event_id` - Update event
- `DELETE /events/:event_id` - Delete event

## Project Structure

```
tailsync-api/
├── controllers/        # Request handlers
├── errors/            # Custom error classes
├── middlewares/       # Express middlewares
├── models/           # Mongoose models
├── routers/          # Route definitions
├── schemas/          # Zod validation schemas
├── utils/            # Utility functions
├── public/           # Static files (uploads)
├── index.js          # Application entry point
├── Dockerfile        # Docker image configuration
├── compose.yaml      # Docker Compose configuration
├── package.json      # NPM dependencies
└── .env.example      # Environment variables template
```

## Development

### Generate JWT Secrets

You can generate secure random strings for JWT secrets using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this command for each JWT secret required in the `.env` file.

### Database Migrations

This project uses Mongoose for database management. Schemas are defined in the `models/` directory and will be automatically synced with MongoDB on application startup.

## License

This project is part of an academic assignment for the LMS/Uchronos course.
