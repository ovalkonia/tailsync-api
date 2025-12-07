# TailSync API - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [CBL Stage Progress](#cbl-stage-progress)
3. [System Architecture](#system-architecture)
4. [Program Algorithm](#program-algorithm)
5. [API Workflows](#api-workflows)
6. [Database Design](#database-design)
7. [Authentication & Authorization](#authentication--authorization)
8. [Event Management System](#event-management-system)
9. [Technical Implementation Details](#technical-implementation-details)
12. [API Reference](#api-reference)
13. [Deployment Guide](#deployment-guide)
14. [Conclusion](#conclusion)

---

## Project Overview

TailSync API is a RESTful backend service designed to provide comprehensive calendar and event management capabilities. The system supports multi-user collaboration, recurring events, task management, and file attachments. Built with Node.js, Express, and MongoDB, the API follows modern web development practices including JWT authentication, input validation, and containerization with Docker.

### Goals

- Provide a scalable calendar management solution
- Support complex event scheduling with recurring patterns (RRule)
- Enable collaborative calendar sharing among users
- Maintain security through JWT-based authentication
- Offer flexible event management with tasks, reminders, and attachments

---

## CBL Stage Progress

### Stage 1: Project Planning and Design ✓

**Completed:** Project initialization and architecture design

**Objectives:**
- Define project scope and requirements
- Design database schema
- Plan API endpoints
- Set up development environment

**Achievements:**
- Created comprehensive database models for Users, Calendars, Events, Tasks, Reminders, and Arrangements
- Designed RESTful API structure with 4 main resource routers
- Established authentication strategy using JWT with multiple token types
- Configured MongoDB with Mongoose ODM
- Set up Docker containerization for easy deployment

**Deliverables:**
- Database schema diagrams
- API endpoint documentation
- Technology stack selection
- Development environment configuration

---

### Stage 2: Core Backend Implementation ✓

**Completed:** Implementation of base functionality

**Objectives:**
- Implement user authentication system
- Create CRUD operations for calendars and events
- Set up middleware for request validation and error handling
- Implement database models and schemas

**Achievements:**
- **Authentication System:**
  - User registration with bcrypt password hashing
  - Login with JWT access and refresh tokens
  - Token refresh mechanism
  - Email confirmation tokens
  - Password reset functionality via email

- **Calendar Management:**
  - Create, read, update, and delete calendars
  - Calendar ownership and permissions
  - Holiday calendar integration
  - Year-based event retrieval

- **Event Management:**
  - Full CRUD operations for events
  - Support for recurring events using RRule library
  - Event associations with calendars

- **Middleware Implementation:**
  - Authentication middleware for protected routes
  - Validation middleware using Zod schemas
  - Error handling middleware with custom error classes
  - Calendar and event fetching middleware for authorization checks
  - File upload middleware using Multer

**Deliverables:**
- Fully functional authentication system
- Calendar and event CRUD endpoints
- Validation schemas for all entities
- Custom error handling system

---

### Stage 3: Advanced Features ✓

**Completed:** Implementation of collaborative and advanced features

**Objectives:**
- Implement calendar sharing functionality
- Add task and reminder systems
- Integrate email service
- Support file uploads
- Implement recurring event patterns

**Achievements:**
- **Collaborative Features:**
  - Calendar sharing via invitation tokens
  - Join calendar functionality with token validation
  - User permissions on shared calendars

- **Task Management:**
  - Tasks associated with events
  - Task completion tracking
  - Priority levels

- **Reminder System:**
  - Multiple reminders per event
  - Flexible reminder timing (minutes, hours, days before)

- **Email Integration:**
  - Resend API integration
  - Email confirmation on registration
  - Password reset emails
  - Calendar invitation emails

- **File Management:**
  - File upload support using Multer
  - Public file serving
  - File associations with events

- **Recurring Events:**
  - RRule integration for complex recurrence patterns
  - Support for daily, weekly, monthly, yearly recurrence
  - Exception dates for recurring events

**Deliverables:**
- Calendar invitation system
- Task and reminder functionality
- Email service integration
- File upload system
- Recurring event implementation

---

### Stage 4: Testing and Optimization ✓

**Completed:** Quality assurance and performance optimization

**Objectives:**
- Test all API endpoints
- Optimize database queries
- Implement proper error handling
- Add input validation
- Set up Docker deployment

**Achievements:**
- **Validation:**
  - Zod schemas for all input data
  - Request validation middleware
  - Custom error messages

- **Error Handling:**
  - Custom error classes hierarchy (BaseError, ApiError, UserError, CalendarError, EventError, ValidationError)
  - Centralized error middleware
  - Consistent error response format

- **Database Optimization:**
  - Mongoose schema optimization
  - Proper indexing on frequently queried fields
  - Efficient query patterns

- **Deployment:**
  - Docker containerization
  - Docker Compose for multi-container setup
  - MongoDB health checks
  - Environment variable configuration
  - Production-ready configuration

**Deliverables:**
- Comprehensive validation system
- Production-ready error handling
- Docker deployment configuration
- Optimized database queries

---

### Stage 5: Documentation and Deployment 

**In Progress:** Final documentation and deployment preparation

**Objectives:**
- Create comprehensive documentation
- Prepare deployment guides
- Write API documentation
- Create README for repository

**Current Progress:**
- ✓ README.md with installation instructions
- ✓ Docker setup documentation
- ✓ Environment configuration guide
- Technical documentation (this file)
- ⏳ API endpoint detailed documentation
- ⏳ Deployment to production server

**Remaining Tasks:**
- Complete API endpoint examples with request/response samples
- Create Postman/Insomnia collection
- Set up CI/CD pipeline
- Deploy to production environment
- Performance testing and monitoring setup

---

## System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Client App    │
│  (Frontend)     │
└────────┬────────┘
         │ HTTP/HTTPS
         │ (REST API)
         ▼
┌─────────────────────────────────────┐
│       TailSync API Server           │
│  ┌───────────────────────────────┐  │
│  │   Express.js Application      │  │
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   Routers               │  │  │
│  │  │  - Auth Router          │  │  │
│  │  │  - Users Router         │  │  │
│  │  │  - Calendars Router     │  │  │
│  │  │  - Events Router        │  │  │
│  │  └──────────┬──────────────┘  │  │
│  │             │                 │  │
│  │  ┌──────────▼──────────────┐  │  │
│  │  │   Middlewares           │  │  │
│  │  │  - Auth Middleware      │  │  │
│  │  │  - Validation           │  │  │
│  │  │  - Error Handling       │  │  │
│  │  │  - File Upload          │  │  │
│  │  └──────────┬──────────────┘  │  │
│  │             │                 │  │
│  │  ┌──────────▼──────────────┐  │  │
│  │  │   Controllers           │  │  │
│  │  │  - Business Logic       │  │  │
│  │  └──────────┬──────────────┘  │  │
│  │             │                 │  │
│  │  ┌──────────▼──────────────┐  │  │
│  │  │   Models (Mongoose)     │  │  │
│  │  │  - User                 │  │  │
│  │  │  - Calendar             │  │  │
│  │  │  - Event                │  │  │
│  │  │  - Task, Reminder, etc. │  │  │
│  │  └──────────┬──────────────┘  │  │
│  └─────────────┼─────────────────┘  │
└────────────────┼────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │   MongoDB      │
        │   Database     │
        └────────────────┘

    ┌────────────────────┐
    │  Resend Email API  │
    │  (External)        │
    └────────────────────┘
```

### Component Breakdown

#### 1. **Routers Layer**
- Define API endpoints
- Route requests to appropriate controllers
- Apply middleware to routes
- Located in: `/routers/`

#### 2. **Middlewares Layer**
- **Authentication**: Verify JWT tokens, attach user to request
- **Validation**: Validate request data against Zod schemas
- **Error Handling**: Catch and format errors
- **File Upload**: Handle multipart form data
- **Resource Fetching**: Pre-fetch calendars/events for authorization
- Located in: `/middlewares/`

#### 3. **Controllers Layer**
- Handle business logic
- Interact with models
- Process requests and generate responses
- Located in: `/controllers/`

#### 4. **Models Layer**
- Define database schemas using Mongoose
- Implement data validation at database level
- Define relationships between entities
- Located in: `/models/`

#### 5. **Schemas Layer**
- Define validation rules using Zod
- Ensure type safety for request data
- Located in: `/schemas/`

#### 6. **Utilities Layer**
- JWT token generation and verification
- Helper functions
- Located in: `/utils/`

#### 7. **Error Handling Layer**
- Custom error classes
- Consistent error responses
- Located in: `/errors/`

---

## Program Algorithm

### Main Application Flow

```
START Application
│
├─► Initialize Environment Variables
│   ├─► Load .env file
│   └─► Validate required variables
│
├─► Connect to MongoDB
│   ├─► Use Mongoose.connect()
│   ├─► Wait for connection
│   └─► Handle connection errors
│
├─► Initialize Express App
│   │
│   ├─► Configure CORS Middleware
│   │   ├─► Set Access-Control-Allow-Origin
│   │   ├─► Set allowed methods
│   │   └─► Enable credentials
│   │
│   ├─► Configure Body Parsers
│   │   ├─► JSON parser (express.json())
│   │   └─► URL-encoded parser
│   │
│   ├─► Configure Static Files
│   │   └─► Serve /public directory
│   │
│   ├─► Configure Cookie Parser
│   │
│   ├─► Register Routers
│   │   ├─► /auth routes
│   │   ├─► /users routes
│   │   ├─► /calendars routes
│   │   └─► /events routes
│   │
│   ├─► Register 404 Handler
│   │   └─► Catch all unmatched routes
│   │
│   └─► Register Error Middleware
│       └─► Handle all errors
│
├─► Start Server
│   └─► Listen on port 8080
│
└─► RUNNING - Wait for requests
```

### Request Processing Flow

```
INCOMING REQUEST
│
├─► CORS Middleware
│   └─► Add CORS headers
│
├─► Body Parser Middleware
│   └─► Parse request body
│
├─► Cookie Parser Middleware
│   └─► Parse cookies
│
├─► Route Matching
│   │
│   ├─► Match route pattern
│   │
│   └─► Route-Specific Middlewares
│       │
│       ├─► Authentication Middleware (if protected)
│       │   ├─► Extract token from cookies/headers
│       │   ├─► Verify JWT token
│       │   ├─► Decode payload
│       │   ├─► Fetch user from database
│       │   ├─► Attach user to request
│       │   └─► Continue OR throw 401 error
│       │
│       ├─► Resource Fetch Middleware (if needed)
│       │   ├─► Extract resource ID from params
│       │   ├─► Fetch resource from database
│       │   ├─► Check authorization
│       │   ├─► Attach resource to request
│       │   └─► Continue OR throw 403/404 error
│       │
│       └─► Validation Middleware (if applicable)
│           ├─► Get Zod schema
│           ├─► Validate request body
│           └─► Continue OR throw 400 error
│
├─► Controller Function
│   │
│   ├─► Extract data from request
│   │
│   ├─► Execute Business Logic
│   │   ├─► Interact with database models
│   │   ├─► Perform calculations
│   │   ├─► Call external services (email, etc.)
│   │   └─► Generate response data
│   │
│   └─► Send Response
│       ├─► Set status code
│       └─► Send JSON data
│
└─► OR Error Handler (if error thrown)
    ├─► Catch error
    ├─► Determine error type
    ├─► Format error response
    └─► Send error JSON
```

---

## API Workflows

### 1. User Registration and Authentication

```
User Registration Flow:
│
START: POST /auth/register
│
├─► Validate Request Body
│   ├─► Check email format
│   ├─► Check password strength
│   └─► Check required fields
│
├─► Check if User Exists
│   ├─► Query database by email
│   └─► If exists, throw error
│
├─► Hash Password
│   └─► Use bcrypt with salt rounds
│
├─► Create User Document
│   ├─► Save to database
│   └─► Generate user ID
│
├─► Generate Email Confirmation Token
│   └─► Create JWT with email
│
├─► Send Confirmation Email
│   └─► Use Resend API
│
└─► Return Success Response
    └─► Include user data (no password)


User Login Flow:
│
START: POST /auth/login
│
├─► Validate Credentials
│   ├─► Get email and password
│   └─► Validate format
│
├─► Find User by Email
│   ├─► Query database
│   └─► If not found, throw error
│
├─► Verify Password
│   ├─► Compare with bcrypt
│   └─► If invalid, throw error
│
├─► Check Email Confirmation
│   └─► If not confirmed, throw error
│
├─► Generate Tokens
│   ├─► Create Access Token (15min expiry)
│   └─► Create Refresh Token (7 days expiry)
│
├─► Save Refresh Token
│   └─► Store in RefreshToken collection
│
├─► Set HTTP-Only Cookies
│   ├─► Set access_token cookie
│   └─► Set refresh_token cookie
│
└─► Return Success Response
    └─► Include user data and tokens
```

### 2. Calendar Management

```
Create Calendar Flow:
│
START: POST /calendars
│
├─► Authentication Middleware
│   └─► Verify user is logged in
│
├─► Validate Request Body
│   ├─► Calendar name (required)
│   ├─► Description (optional)
│   ├─► Color (optional)
│   └─► Timezone (optional)
│
├─► Create Calendar Document
│   ├─► Set owner to current user
│   ├─► Set default values
│   └─► Generate calendar ID
│
├─► Save to Database
│
└─► Return Calendar Data


Share Calendar Flow:
│
START: POST /calendars/:calendar_id/share
│
├─► Authentication Middleware
│   └─► Verify user is logged in
│
├─► Calendar Fetch Middleware
│   ├─► Get calendar from database
│   ├─► Check if user is owner
│   └─► Throw error if not authorized
│
├─► Validate Request Body
│   └─► Get recipient email
│
├─► Generate Calendar Join Token
│   ├─► Create JWT with calendar_id
│   └─► Set expiration (24 hours)
│
├─► Send Invitation Email
│   ├─► Use Resend API
│   └─► Include join link with token
│
└─► Return Success Response


Join Calendar Flow:
│
START: POST /calendars/join/:token
│
├─► Authentication Middleware
│   └─► Verify user is logged in
│
├─► Verify Join Token
│   ├─► Decode JWT
│   ├─► Extract calendar_id
│   └─► Check expiration
│
├─► Get Calendar
│   └─► Fetch from database
│
├─► Check User Not Already Member
│   └─► Verify not already in members list
│
├─► Add User to Calendar Members
│   └─► Update calendar document
│
├─► Save Calendar
│
└─► Return Calendar Data
```

### 3. Event Management with Recurrence

```
Create Event Flow:
│
START: POST /events
│
├─► Authentication Middleware
│
├─► Validate Request Body
│   ├─► Title (required)
│   ├─► Start date/time (required)
│   ├─► End date/time (required)
│   ├─► Calendar ID (required)
│   ├─► Description (optional)
│   ├─► Location (optional)
│   ├─► Recurrence rule (optional)
│   ├─► Tasks (optional array)
│   └─► Reminders (optional array)
│
├─► Verify Calendar Access
│   ├─► Get calendar from database
│   ├─► Check user is owner or member
│   └─► Throw error if unauthorized
│
├─► Process Recurrence Rule
│   └─► If rrule provided:
│       ├─► Parse RRule string
│       ├─► Validate recurrence pattern
│       └─► Store rule in event
│
├─► Create Event Document
│   ├─► Set creator to current user
│   └─► Link to calendar
│
├─► Process Tasks
│   └─► For each task:
│       ├─► Create Task document
│       └─► Link to event
│
├─► Process Reminders
│   └─► For each reminder:
│       ├─► Create Reminder document
│       ├─► Calculate trigger time
│       └─► Link to event
│
├─► Save Event to Database
│
└─► Return Event Data with Relations


Get Calendar Events for Year:
│
START: GET /calendars/:calendar_id/events/all/:year
│
├─► Authentication Middleware
│
├─► Calendar Fetch Middleware
│   └─► Verify access to calendar
│
├─► Extract Year Parameter
│
├─► Query Events
│   ├─► Get all events for calendar
│   └─► Include recurring events
│
├─► Expand Recurring Events
│   └─► For each recurring event:
│       ├─► Parse RRule
│       ├─► Generate occurrences for year
│       ├─► Apply exception dates
│       └─► Create occurrence objects
│
├─► Combine Events
│   ├─► Merge one-time events
│   └─► Merge expanded recurring events
│
├─► Sort by Start Date
│
└─► Return Events Array
```

### 4. File Upload Flow

```
Upload File to Event:
│
START: PATCH /events/:event_id
│
├─► Authentication Middleware
│
├─► Event Fetch Middleware
│   └─► Verify access to event
│
├─► Upload Middleware (Multer)
│   ├─► Parse multipart/form-data
│   ├─► Store file in /public/uploads
│   ├─► Generate unique filename
│   └─► Attach file info to request
│
├─► Update Event Document
│   ├─► Add file path to attachments
│   └─► Save to database
│
└─► Return Updated Event
    └─► Include file URLs
```

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐
│      User       │         │PasswordResetToken│
├─────────────────┤         ├─────────────────┤
│ _id             │◄────────┤ user_id         │
│ email           │         │ token           │
│ password        │         │ expiry          │
│ first_name      │         └─────────────────┘
│ last_name       │
│ profile_picture │         ┌─────────────────┐
│ email_confirmed │         │ RefreshToken    │
│ created_at      │◄────────┤ user_id         │
│ updated_at      │         │ token           │
└────────┬────────┘         │ expiry          │
         │                  └─────────────────┘
         │
         │ owns/member
         │
         ▼
┌─────────────────┐
│    Calendar     │
├─────────────────┤
│ _id             │
│ name            │
│ description     │
│ color           │
│ owner_id        │───┐
│ members[]       │   │
│ timezone        │   │
│ created_at      │   │
│ updated_at      │   │
└────────┬────────┘   │
         │            │
         │ has        │
         │            │
         ▼            │
┌─────────────────┐   │
│     Event       │   │
├─────────────────┤   │
│ _id             │   │
│ title           │   │
│ description     │   │
│ start_date      │   │
│ end_date        │   │
│ location        │   │
│ calendar_id     │───┘
│ creator_id      │
│ rrule           │
│ exception_dates │
│ attachments[]   │
│ all_day         │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ has
         │
         ├──────────┐
         ▼          ▼
┌─────────────┐  ┌─────────────┐
│    Task     │  │  Reminder   │
├─────────────┤  ├─────────────┤
│ _id         │  │ _id         │
│ title       │  │ minutes     │
│ completed   │  │ type        │
│ event_id    │  │ event_id    │
│ priority    │  └─────────────┘
│ due_date    │
└─────────────┘

         │
         │ has
         ▼
┌─────────────┐
│ Arrangement │
├─────────────┤
│ _id         │
│ title       │
│ details     │
│ event_id    │
└─────────────┘
```

### Database Collections

#### 1. **users**
- Stores user account information
- Password hashed with bcrypt
- Email confirmation status
- Profile information

**Indexes:**
- `email`: Unique index for fast lookup and uniqueness
- `created_at`: For sorting and pagination

#### 2. **calendars**
- Stores calendar information
- Links to owner (User)
- Array of member IDs for shared calendars

**Indexes:**
- `owner_id`: For fetching user's calendars
- `members`: For checking calendar access

#### 3. **events**
- Stores event information
- Links to calendar
- Supports recurring events via rrule field
- Exception dates for recurring event modifications

**Indexes:**
- `calendar_id`: For fetching calendar events
- `start_date`: For date-based queries
- `creator_id`: For user's events

#### 4. **tasks**
- Subtasks associated with events
- Completion tracking
- Priority levels

**Indexes:**
- `event_id`: For fetching event tasks

#### 5. **reminders**
- Notification reminders for events
- Time-based (minutes before event)
- Type (email, push, etc.)

**Indexes:**
- `event_id`: For fetching event reminders

#### 6. **arrangements**
- Additional arrangements for events
- Flexible structure for various needs

**Indexes:**
- `event_id`: For fetching event arrangements

#### 7. **refreshtokens**
- Stores valid refresh tokens
- Links to user
- Expiry time for automatic cleanup

**Indexes:**
- `token`: For token validation
- `user_id`: For fetching user tokens
- `expiry`: For cleanup jobs

#### 8. **passwordresettokens**
- Temporary tokens for password reset
- Expiry time
- Links to user

**Indexes:**
- `token`: For token validation
- `expiry`: For cleanup

---

## Authentication & Authorization

### Token-Based Authentication Strategy

The API uses JWT (JSON Web Tokens) for authentication with multiple token types for different purposes:

#### Token Types

1. **Access Token**
   - **Purpose**: API authentication
   - **Expiry**: 15 minutes
   - **Storage**: HTTP-only cookie
   - **Secret**: `JWT_ACCESS_TOKEN_SECRET`
   - **Payload**: `{ user_id }`

2. **Refresh Token**
   - **Purpose**: Renew access tokens
   - **Expiry**: 7 days
   - **Storage**: HTTP-only cookie + database
   - **Secret**: `JWT_REFRESH_TOKEN_SECRET`
   - **Payload**: `{ user_id, token_id }`

3. **Email Confirmation Token**
   - **Purpose**: Email verification
   - **Expiry**: 24 hours
   - **Storage**: Email link
   - **Secret**: `JWT_EMAIL_CONFIRM_TOKEN_SECRET`
   - **Payload**: `{ user_id, email }`

4. **Password Reset Token**
   - **Purpose**: Password recovery
   - **Expiry**: 1 hour
   - **Storage**: Email link + database
   - **Secret**: `JWT_PASSWORD_RESET_TOKEN_SECRET`
   - **Payload**: `{ user_id }`

5. **Calendar Join Token**
   - **Purpose**: Calendar invitation
   - **Expiry**: 24 hours
   - **Storage**: Email link
   - **Secret**: `JWT_CALENDAR_JOIN_TOKEN_SECRET`
   - **Payload**: `{ calendar_id, inviter_id }`

### Authentication Flow

```
1. User logs in
   ↓
2. Server validates credentials
   ↓
3. Server generates access + refresh tokens
   ↓
4. Server stores refresh token in database
   ↓
5. Server sets both tokens as HTTP-only cookies
   ↓
6. Client makes API requests with cookies
   ↓
7. Middleware verifies access token
   ↓
8. If valid: Allow request
   ↓
9. If expired: Client uses refresh token
   ↓
10. Server validates refresh token against database
    ↓
11. Server issues new access token
    ↓
12. Process repeats
```

### Authorization Levels

#### 1. **Public Routes**
- No authentication required
- Examples: `/ping`

#### 2. **Authenticated Routes**
- Requires valid access token
- Examples: `/calendars`, `/events`, `/users`

#### 3. **Resource Owner Routes**
- Requires authentication + ownership
- Examples: `PATCH /calendars/:id`, `DELETE /events/:id`
- Middleware checks if `req.user._id === resource.owner_id`

#### 4. **Calendar Member Routes**
- Requires authentication + membership
- Examples: `GET /calendars/:id/events`
- Middleware checks if user is owner or in members array

### Security Measures

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Password strength validation
   - Never return passwords in responses

2. **Token Security**
   - HTTP-only cookies (prevents XSS attacks)
   - Secure flag in production
   - SameSite attribute for CSRF protection
   - Token rotation on refresh

3. **Database Security**
   - Mongoose schema validation
   - No direct user input in queries
   - Parameterized queries

4. **Input Validation**
   - Zod schemas for all inputs
   - Type checking
   - Range validation
   - Format validation (email, URLs, dates)

5. **Error Handling**
   - No sensitive data in error messages
   - Generic error messages for authentication failures
   - Detailed logging server-side

---

## Event Management System

### Recurring Events Implementation

The system uses the `rrule` library to handle complex recurring event patterns following the iCalendar RFC specification.

#### Supported Recurrence Patterns

1. **Daily**
   - Every day
   - Every N days
   - Weekdays only
   - Example: `FREQ=DAILY;INTERVAL=1`

2. **Weekly**
   - Every week on specific days
   - Every N weeks
   - Example: `FREQ=WEEKLY;BYDAY=MO,WE,FR`

3. **Monthly**
   - By day of month (e.g., 15th of every month)
   - By day of week (e.g., 2nd Tuesday)
   - Example: `FREQ=MONTHLY;BYMONTHDAY=15`

4. **Yearly**
   - Specific date each year
   - Example: `FREQ=YEARLY;BYMONTH=12;BYMONTHDAY=25`

#### Recurrence Algorithm

```
Generate Event Occurrences:
│
INPUT: Event with RRule, Start Date, End Date, Year
│
├─► Parse RRule String
│   └─► Create RRule object
│
├─► Set Boundaries
│   ├─► Year start: January 1, YYYY
│   └─► Year end: December 31, YYYY
│
├─► Generate Occurrences
│   └─► RRule.between(year_start, year_end)
│
├─► Apply Exception Dates
│   └─► Filter out dates in exception_dates array
│
├─► Calculate Duration
│   └─► duration = original_end - original_start
│
├─► Create Occurrence Objects
│   └─► For each occurrence date:
│       ├─► occurrence_start = occurrence_date
│       ├─► occurrence_end = occurrence_date + duration
│       └─► Create event instance with new dates
│
└─► OUTPUT: Array of event occurrences
```

### Task Management

Tasks are subtasks associated with events:

```javascript
Task Schema:
{
  title: String,
  completed: Boolean,
  event_id: ObjectId,
  priority: Number (1-5),
  due_date: Date
}
```

Tasks can be:
- Created with event
- Added to existing events
- Marked as complete/incomplete
- Reordered by priority

### Reminder System

Reminders trigger notifications before events:

```javascript
Reminder Schema:
{
  minutes: Number,  // Minutes before event
  type: String,     // 'email', 'push', 'sms'
  event_id: ObjectId
}
```

Example reminders:
- 15 minutes before (email)
- 1 hour before (push notification)
- 1 day before (email)

---

## Technical Implementation Details

### Middleware Architecture

#### 1. Authentication Middleware (`auth.middleware.js`)

```javascript
Purpose: Verify user authentication

Flow:
1. Extract access_token from cookies or Authorization header
2. If no token → throw 401 Unauthorized
3. Verify token with JWT_ACCESS_TOKEN_SECRET
4. Decode payload to get user_id
5. Fetch user from database
6. If user not found → throw 401
7. Attach user object to req.user
8. Call next()

Error Cases:
- No token provided
- Token expired
- Token invalid
- User not found
- User email not confirmed
```

#### 2. Validation Middleware (`validation.middleware.js`)

```javascript
Purpose: Validate request data against Zod schemas

Flow:
1. Receive Zod schema as parameter
2. Extract request body
3. Parse data with schema.parse()
4. If validation fails → throw ValidationError
5. If validation succeeds → call next()

Error Cases:
- Missing required fields
- Invalid data types
- Out-of-range values
- Invalid formats
```

#### 3. Calendar Fetch Middleware (`calendar_fetch.middleware.js`)

```javascript
Purpose: Pre-fetch calendar and verify access

Flow:
1. Extract calendar_id from req.params
2. Fetch calendar from database
3. If not found → throw 404
4. Check if user is owner or member
5. If not authorized → throw 403
6. Attach calendar to req.calendar
7. Call next()

Error Cases:
- Calendar not found
- User not authorized
- Invalid calendar_id
```

#### 4. Event Fetch Middleware (`event_fetch.middleware.js`)

```javascript
Purpose: Pre-fetch event and verify access

Flow:
1. Extract event_id from req.params
2. Fetch event from database (populate calendar)
3. If not found → throw 404
4. Check if user has access to event's calendar
5. If not authorized → throw 403
6. Attach event to req.event
7. Call next()

Error Cases:
- Event not found
- User not authorized
- Invalid event_id
```

#### 5. Upload Middleware (`upload.middleware.js`)

```javascript
Purpose: Handle file uploads

Configuration:
- Storage: /public/uploads
- Filename: UUID + original extension
- Max file size: 10MB
- Allowed types: images, PDFs, documents

Flow:
1. Parse multipart/form-data
2. Validate file type and size
3. Save file to disk
4. Attach file info to req.file
5. Call next()

Error Cases:
- File too large
- Invalid file type
- Disk write error
```

### Error Handling System

#### Error Class Hierarchy

```
BaseError
├─► ApiError (404, 500, etc.)
├─► UserError (authentication, user-related)
├─► CalendarError (calendar-specific)
├─► EventError (event-specific)
└─► ValidationError (Zod validation failures)
```

#### Error Middleware

```javascript
Purpose: Centralized error handling

Flow:
1. Catch any error from previous middleware/controller
2. Determine error type
3. Extract status code and message
4. Format consistent error response
5. Send JSON response
6. Log error details (server-side)

Response Format:
{
  success: false,
  error: {
    message: "User-friendly error message",
    code: "ERROR_CODE",
    details: {} // Optional validation details
  }
}
```

### Controller Patterns

All controllers follow this pattern:

```javascript
async function controllerFunction(req, res, next) {
  try {
    // 1. Extract data from request
    const { param1, param2 } = req.body;
    const user = req.user;

    // 2. Business logic
    const result = await Model.doSomething(param1, param2);

    // 3. Send response
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    // 4. Pass errors to error middleware
    next(error);
  }
}
```

### Environment Configuration

Required environment variables:

```bash
# Server Configuration
URL_BACKEND=http://localhost:8080
URL_FRONTEND=http://localhost:5173

# Database
URI_MONGODB=mongodb://127.0.0.1:27017/tailsync

# JWT Secrets (use strong random strings)
JWT_REFRESH_TOKEN_SECRET=
JWT_ACCESS_TOKEN_SECRET=
JWT_EMAIL_CONFIRM_TOKEN_SECRET=
JWT_PASSWORD_RESET_TOKEN_SECRET=
JWT_CALENDAR_JOIN_TOKEN_SECRET=

# Email Service
RESEND_API_KEY=
RESEND_FROM=
```

### Docker Configuration

#### Dockerfile

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
```

#### Docker Compose

Services:
1. **backend**
   - Build from Dockerfile
   - Port 8080:8080
   - Depends on mongodb
   - Restarts unless stopped

2. **mongodb**
   - Official MongoDB image
   - Port 27017:27017
   - Named volume for persistence
   - Health check for readiness
   - Restarts unless stopped

---

## API Reference

Complete API endpoint documentation with request/response examples.

### Base URL

```
http://localhost:8080
```

### Authentication

Most endpoints require authentication. Include the access token in one of these ways:

1. **Cookie** (recommended): `access_token=<token>`
2. **Header**: `Authorization: Bearer <token>`

---

### Authentication Endpoints

#### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Authentication:** Not required

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "email_confirmed": false,
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    "message": "Registration successful. Please check your email."
  }
}
```

#### Login

Authenticate and receive access tokens.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Calendar Endpoints

#### Get All Calendars

Get all calendars owned by or shared with the user.

**Endpoint:** `GET /calendars`

**Authentication:** Required

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Personal",
      "description": "My personal calendar",
      "color": "#FF5733",
      "owner_id": "507f1f77bcf86cd799439011",
      "members": []
    }
  ]
}
```

#### Create Calendar

Create a new calendar.

**Endpoint:** `POST /calendars`

**Request Body:**

```json
{
  "name": "Project Alpha",
  "description": "Calendar for Project Alpha team",
  "color": "#00FF00",
  "timezone": "America/Los_Angeles"
}
```

#### Share Calendar

Generate invitation link to share calendar.

**Endpoint:** `POST /calendars/:calendar_id/share`

**Request Body:**

```json
{
  "email": "colleague@example.com"
}
```

#### Get Calendar Events

Get all events for a calendar in a specific year.

**Endpoint:** `GET /calendars/:calendar_id/events/all/:year`

**URL Parameters:**
- `calendar_id`: Calendar ID
- `year`: Year (YYYY format)

### Event Endpoints

#### Create Event

Create a new event.

**Endpoint:** `POST /events`

**Request Body:**

```json
{
  "title": "Product Launch",
  "description": "Launch event for new product",
  "start_date": "2024-02-15T14:00:00.000Z",
  "end_date": "2024-02-15T16:00:00.000Z",
  "location": "Main Auditorium",
  "calendar_id": "507f1f77bcf86cd799439015",
  "all_day": false,
  "tasks": [
    {
      "title": "Setup audio equipment",
      "priority": 1
    }
  ],
  "reminders": [
    {
      "minutes": 60,
      "type": "email"
    }
  ]
}
```

#### Recurring Event Examples

**Weekly Meeting (Every Monday):**

```json
{
  "title": "Weekly Standup",
  "start_date": "2024-01-15T09:00:00.000Z",
  "end_date": "2024-01-15T09:30:00.000Z",
  "rrule": "FREQ=WEEKLY;BYDAY=MO",
  "calendar_id": "507f1f77bcf86cd799439015"
}
```

**Monthly Meeting (15th of every month):**

```json
{
  "title": "Monthly Review",
  "start_date": "2024-01-15T14:00:00.000Z",
  "end_date": "2024-01-15T15:00:00.000Z",
  "rrule": "FREQ=MONTHLY;BYMONTHDAY=15",
  "calendar_id": "507f1f77bcf86cd799439015"
}
```

### Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE"
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR`: Input validation failed
- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: User not authorized
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict

---

## Deployment Guide

### Prerequisites

- **Docker**: v24.0 or higher
- **Docker Compose**: v2.20 or higher
- **Resend Account**: For email functionality

### Environment Configuration

1. **Create Environment File**

```bash
cp .env.example .env
```

2. **Configure Variables**

Edit `.env` file:

```bash
# Server URLs
URL_BACKEND=https://api.yourdomain.com
URL_FRONTEND=https://yourdomain.com

# Database (use 'mongodb' for Docker Compose)
URI_MONGODB=mongodb://mongodb:27017/tailsync

# JWT Secrets - Generate secure random strings
JWT_REFRESH_TOKEN_SECRET=<64-char-random-string>
JWT_ACCESS_TOKEN_SECRET=<64-char-random-string>
JWT_EMAIL_CONFIRM_TOKEN_SECRET=<64-char-random-string>
JWT_PASSWORD_RESET_TOKEN_SECRET=<64-char-random-string>
JWT_CALENDAR_JOIN_TOKEN_SECRET=<64-char-random-string>

# Email Service
RESEND_API_KEY=re_your_api_key
RESEND_FROM=noreply@yourdomain.com
```

3. **Generate Secrets**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Docker Deployment

#### Local Development

```bash
# Clone repository
git clone https://github.com/ovalkonia/tailsync-api.git
cd tailsync-api

# Configure environment
cp .env.example .env
nano .env  # Edit with your values

# Build and start
docker compose up --build

# Or run in background
docker compose up -d --build

# Verify deployment
curl http://localhost:8080/ping
# Should return: pong

# View logs
docker compose logs -f backend

# Stop services
docker compose down
```

#### Production Deployment (Ubuntu Server)

1. **Server Setup**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Add user to docker group
sudo usermod -aG docker $USER
```

2. **Deploy Application**

```bash
# Clone repository
git clone https://github.com/ovalkonia/tailsync-api.git
cd tailsync-api

# Configure environment
cp .env.example .env
nano .env  # Edit with production values

# Deploy
docker compose up -d --build
```

3. **Setup Reverse Proxy (Nginx)**

```bash
# Install Nginx
sudo apt install nginx -y

# Create configuration
sudo nano /etc/nginx/sites-available/tailsync-api
```

Add configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/tailsync-api /etc/nginx/sites-enabled/

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

4. **Setup SSL with Let's Encrypt**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

5. **Configure Firewall**

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Database Backup

#### Manual Backup

```bash
# Create backup directory
mkdir -p ~/backups

# Backup using mongodump
docker compose exec mongodb mongodump \
  --db tailsync \
  --out /data/backup

# Copy from container
docker cp $(docker compose ps -q mongodb):/data/backup \
  ~/backups/backup-$(date +%Y%m%d)
```

#### Automated Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR=~/backups
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="tailsync-backup-$DATE"

docker compose exec -T mongodb mongodump \
  --db tailsync \
  --archive=/data/$BACKUP_NAME.archive

docker cp $(docker compose ps -q mongodb):/data/$BACKUP_NAME.archive \
  $BACKUP_DIR/$BACKUP_NAME.archive

gzip $BACKUP_DIR/$BACKUP_NAME.archive

find $BACKUP_DIR -name "tailsync-backup-*.archive.gz" \
  -mtime +7 -delete

echo "Backup completed: $BACKUP_NAME.archive.gz"
```

```bash
# Make executable
chmod +x backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

#### Restore from Backup

```bash
# Decompress
gunzip ~/backups/tailsync-backup-YYYYMMDD_HHMMSS.archive.gz

# Copy to container
docker cp ~/backups/tailsync-backup-YYYYMMDD_HHMMSS.archive \
  $(docker compose ps -q mongodb):/data/restore.archive

# Restore
docker compose exec mongodb mongorestore \
  --db tailsync \
  --archive=/data/restore.archive
```

### Monitoring

#### Application Logs

```bash
# View all logs
docker compose logs

# Follow logs
docker compose logs -f

# View backend logs only
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100
```

#### Health Checks

```bash
# API health
curl https://api.yourdomain.com/ping

# MongoDB health
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Monitor containers
docker stats
```
---

## Conclusion

TailSync API provides a robust, scalable solution for calendar and event management. The architecture follows best practices for RESTful API design, implements secure authentication, and offers comprehensive event management features including support for complex recurring patterns.

The modular structure allows for easy maintenance and future enhancements, while Docker containerization ensures consistent deployment across environments. The comprehensive validation and error handling systems provide a reliable and user-friendly API experience.

---

**Document Version**: 1.0
**Last Updated**: 2025-12-07
**Author**: TailSync Development Team
**Project**: Uchronos/LMS Academic Assignment