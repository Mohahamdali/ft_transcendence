*This project has been created as part of the 42 curriculum by <login1>, <login2>, <login3>, <login4>, <login5>.*

# Mini Facebook — ft_transcendence v0.0.1

> **Starter scaffold only.** This initial version is not a completed ft_transcendence submission. Replace placeholder 42 logins and assign team roles before merging to the team repository.

## Description

An educational social network web app. The team intends to add secure accounts, profiles, friendships, posts, comments, direct messages and notifications.

The current v0.0.1 only proves that Next.js, Django REST, Django Channels, PostgreSQL, Redis and nginx can start together.

## Instructions

Prerequisites: Docker Engine with Compose V2 (or equivalent compatible runtime). Node and Python are installed **inside** the containers.

```bash
cp -n .env.example .env # Preserve an existing .env.
# Edit .env and replace POSTGRES_PASSWORD and DJANGO_SECRET_KEY with random secrets.
# Example random key: python3 -c 'import secrets; print(secrets.token_urlsafe(48))'
docker compose up --build -d
# Check statuses:
docker compose ps
```

Open `https://localhost:8443` in a browser and accept the **development-only self-signed certificate** warning. The same endpoint over HTTP at `http://localhost:8080` redirects to HTTPS.

```bash
curl -k https://localhost:8443/api/health/
# Expected: {"status":"ok","database":"ok","redis":"ok","version":"0.0.1"}
```

WebSocket test in the browser developer console on the page:

```javascript
const ws = new WebSocket('wss://localhost:8443/ws/ping/');
ws.onopen = () => ws.send(JSON.stringify({type: 'ping'}));
ws.onmessage = (event) => console.log(event.data); // {"type":"pong"}
```

Checks after starting the services:

```bash
docker compose config --quiet
docker compose exec backend python manage.py check
docker compose exec frontend npm run lint # TypeScript check; no ESLint is configured.
```

There is no automated test suite yet. The health and WebSocket checks above are manual smoke tests.

Stop without deleting data: `docker compose down`.

Reset stored data **permanently**: `docker compose down -v` (deletes the volumes; only when intentionally resetting your development environment).

## Technical Stack

- Next.js + React + TypeScript + Tailwind CSS: web UI and server rendering
- Django + Django REST Framework: API and backend
- Django Channels + Redis: WebSocket channel layer
- PostgreSQL + Django ORM: relational persistence
- Nginx: local HTTPS reverse proxy
- Docker Compose: one-command deployment

Why: reuse the team's initial Mini Facebook architecture, keep web and database responsibilities clearly separated and enable the planned modules. See `docs/architecture.md`.

## Team Information

| Login | Assigned role(s) | Responsibilities |
|---|---|---|
| `<login1>` | Tech Lead + Developer | Architecture, infrastructure, integration; implement features too |
| `<login2>` | Developer | Authentication, profiles, database |
| `<login3>` | Developer | Chat, WebSockets, notifications |
| `<login4>` | PM + Developer | Coordination, frontend, posts/feed |
| `<login5>` | PO + Developer | Product backlog, friends/search, QA |

Adjust these assignments with the team. Each person must contribute code to the mandatory part and selected modules.

## Project Management

- GitHub Issues for tasks; project milestones tracked by version.
- Feature branches and Pull Requests into `main`; peer review before merging.
- Weekly sync for decisions, blockers, and integration problems.
- Communication channel: **TBD by team**.
- Keep issues, contributions and commits attributable to the actual author.

## Database Schema

See `docs/database-schema.md`. The listed social-domain entities are **planned**; v0.0.1 only runs built-in Django migrations.

## Features List

Currently implemented:
- Next.js welcome and infrastructure status page (starter)
- Django `/api/health/` checking PostgreSQL and Redis (starter)
- Channels `/ws/ping/` WebSocket ping demo (starter)
- Local TLS nginx routing + container build (starter)
- Development-only Privacy Policy / Terms pages

Future functionality: account registration/login, profiles, posts, comments, likes, friendship, chat, notifications, public API, search.

## Modules

The proposal (`docs/modules.md`) totals **14 planned points**, **0 validated points so far**. The evaluation team decides which completed modules qualify. A working `/api/health/` does not satisfy the secured public API module; a ping endpoint does not satisfy the WebSocket real-time module.

## Individual Contributions

Record each person's actual commit references, files, feature ownership, difficulties and resolved issues here before evaluation. **TBD — no contribution attribution has been fabricated.**

## Resources

- Official ft_transcendence subject v21.2 (team reference; not included in this repository)
- Next.js documentation: https://nextjs.org/docs
- Django documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Channels documentation: https://channels.readthedocs.io/
- Docker Compose documentation: https://docs.docker.com/compose/

AI assistance: ChatGPT was used to draft an initial scaffold, review the subject requirements and propose architecture. Every generated file must be reviewed, tested and understood by the team before submission.

## Known limitations and security warning

This is a **local development prototype**, not production hardened: it has a self-signed TLS certificate, no authentication/business endpoints, no access-control tests and no complete GDPR/retention policy. Do not deploy it publicly or store real personal data. The two legal pages must be updated with the actual data practices and user rights before real users are enabled.
