# TeamForge API

REST API built with Node.js, Express, Sequelize and PostgreSQL to manage teams and assign creatures to them, with authentication, authorization and server-side validation.

---

## Overview

TeamForge API is a backend project focused on API design, database interaction and route protection.

It allows users to:
- register and log in,
- create and manage their own teams,
- add or remove creatures from a team,
- protect sensitive routes with JWT authentication,
- validate incoming data before it reaches the controllers.

This project was developed as part of my web development training and helped me strengthen my understanding of backend architecture, middleware logic and relational data management.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT (JSON Web Token)
- Joi
- dotenv

---

## Main Features

- User registration
- User authentication with JWT
- Protected routes with authentication middleware
- Authorization check to ensure only the team owner can modify or delete a team
- Full CRUD operations for teams
- Add a creature to a team
- Remove a creature from a team
- Request body validation with Joi
- Reusable custom middlewares for validation, authorization and resource lookup
- Environment-based configuration with `.env`

---

## Project Structure

```bash
.
├── controllers/
├── middlewares/
│   ├── async-handler.js
│   ├── auth.middlewares.js
│   ├── pokemon.middlewares.js
│   ├── teams.middlewares.js
│   └── validation.middleware.js
├── models/
├── routes/
│   ├── auth.router.js
│   └── teams.router.js
├── schemas/
├── database/
├── app.js
└── .env