# TaskFlow API — Learning Roadmap

We are building **TaskFlow**, a task-management backend (think a tiny Trello/Jira),
one step at a time. Each step adds one real backend concept to the same project.

## What the finished app does

- Users sign up and log in
- A user creates **projects**
- Projects contain **tasks** (title, status, priority, due date)
- Tasks can have **labels** and can be assigned to users
- Filtering, sorting and pagination of tasks
- Fully tested, dockerized and deployed — with a React frontend talking to it

## Steps

| # | Step | Concept you learn |
|---|------|-------------------|
| 1 | Project setup + raw `node:http` server | How a request/response really works, without a framework |
| 2 | In-memory Tasks CRUD with raw Node | Routing, reading request bodies, status codes, JSON |
| 3 | Rewrite with Express | Why frameworks exist, middleware, routers |
| 4 | Validation + error handling | Zod schemas, centralized error middleware |
| 5 | Project structure | routes → controllers → services → repositories, config via env vars |
| 6 | PostgreSQL in Docker + raw SQL | Tables, primary/foreign keys, SQL queries |
| 7 | Prisma / Drizzle ORM + migrations | Schema-as-code, migrations, relations |
| 8 | Users + authentication | Password hashing, JWT/sessions, protected routes |
| 9 | Authorization | "Can this user touch this project?" |
| 10 | Filtering, sorting, pagination | Query params, indexes, efficient queries |
| 11 | Testing | Vitest + Supertest, test database |
| 12 | Logging, security hardening | pino, helmet, CORS, rate limiting |
| 13 | Docker + deployment + CI | Dockerfile, docker-compose, GitHub Actions |
| 14 | Connect a React frontend | Fullstack end to end |

## How each step works

1. I explain the concept and why it exists.
2. We write the code together, with comments explaining the non-obvious parts.
3. You run it and see it work.
4. You do a small **exercise** on your own before we move on.
5. You commit: `git add . && git commit -m "Step N: ..."`

## Progress

- [ ] Step 1 — Project setup + raw HTTP server
