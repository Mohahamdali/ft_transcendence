# Architecture decision — v0.0.1

## Architecture

Browser --HTTPS/WSS--> Nginx
- / -> Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS
- /api/ -> Django 5.2 + Django REST Framework via Uvicorn ASGI
- /ws/ -> Django Channels via Uvicorn ASGI

Django --> PostgreSQL 16 (relational records; ORM)
Django Channels --> Redis 7 (real-time channel layer; not a permanent data store)

Services communicate on Docker Compose's default network. Only nginx publishes host ports, bound to 127.0.0.1.

## Authentication plan (NOT YET IMPLEMENTED)

- Same-origin cookie-based sessions, secure and HttpOnly cookies; CSRF protection for writes.
- Password hashing uses Django authentication facilities.
- Use permissions and input validation in Django REST Framework.
- Do not assume a logged-in user based only on client-side JavaScript.

## Major decisions

- Next.js: the team already proposed Next.js and wants SSR as a module.
- Django + DRF: structured backend, authentication facilities and ORM.
- Channels + Redis: WebSockets and connection coordination across workers.
- PostgreSQL: relationships among users, friendships, posts, comments, likes and conversations.
- Nginx: HTTPS gateway and same-origin routing.

## v0.0.1 scope

A system health check, a WebSocket ping demo, a server-rendered page and development-only policy pages. No social feature or security module is complete yet.

## HTTPS/TLS

Self-signed localhost certificates are generated automatically by nginx for development.
Browsers will show a trust warning; do not use this certificate for deployment.
For production replace it with trusted certificates and update hostname, ports and environment settings.

The v21.2 subject (printed p. 9) requires HTTPS for external backend connections and permits unencrypted connections inside the backend/container infrastructure. Internal nginx/Next.js requests to Django, database connections and container health checks use that exception.
