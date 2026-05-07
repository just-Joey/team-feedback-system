
   # Team Feedback System

A full-stack team feedback platform built with Node.js, Express, Prisma, PostgreSQL, and React.

This project allows teams to manage users, organize teams, and submit structured peer feedback with ratings and tags. The backend follows a service-based architecture with Prisma ORM and relational database modeling.

---

## Features

### Backend
- RESTful API with Express
- Prisma ORM + PostgreSQL
- Relational data modeling
- Service-layer architecture
- Dynamic filtering for feedback queries
- Team membership management
- Feedback tagging system
- Input validation and error handling
- Postman-tested endpoints

### Frontend
- React frontend interface
- User and team management
- Feedback submission UI
- API integration with backend services

---

## Tech Stack

### Backend
- Node.js
- Express
- Prisma
- PostgreSQL
- Supabase
- Postman

### Frontend
- React
- JavaScript
- CSS

---

## Database Schema

### Core Models
- User
- Team
- TeamMember
- Feedback
- FeedbackTag
- FeedbackCycle

### Relationships
- Users can belong to multiple teams
- Teams can contain multiple users
- Feedback supports:
  - sender/recipient relationships
  - optional teams
  - optional feedback cycles
  - multiple tags

---

## API Endpoints

### Users
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Teams
- `GET /teams`
- `GET /teams/:id`
- `POST /teams`
- `POST /teams/:id/members`

### Feedback
- `GET /feedback`
- `GET /feedback/:id`
- `POST /feedback`

Supports filtering:
```http
/feedback?fromUserId=1
/feedback?teamId=2
