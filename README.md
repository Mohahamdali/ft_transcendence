*This project has been created as part of the 42 curriculum by <login1>, <login2>, <login3>, <login4>, <login5>.*

# Mini Facebook — ft_transcendence v0.0.1

> **Starter scaffold only.** This initial version is not a completed ft_transcendence submission. Replace placeholder 42 logins and assign team roles before merging to the team repository.

## Description

An educational social network web app. The team intends to add secure accounts, profiles, friendships, posts, comments, direct messages and notifications.

The current v0.0.1 provides starter infrastructure for Next.js, Django REST, Django Channels, PostgreSQL, Redis and nginx. Full Docker startup still needs to be verified.

## Instructions

Prerequisites: Docker Engine with Compose V2 (or equivalent compatible runtime), GNU Make and a Unix-like shell. Node and Python are installed **inside** the containers. The optional `make health` command also needs `curl`.

```bash
make       # Create .env if missing, build the images and start all services.
make ps    # Check service statuses.
make help  # List all available commands.
```

Run these commands from the repository root. `make init` creates `.env` with fresh random secrets and permissions restricted to your user. It preserves an existing `.env` unchanged; if that file was copied from `.env.example`, replace its example secrets before the first startup.

Open `https://localhost:8443` in a browser and accept the **development-only self-signed certificate** warning. The same endpoint over HTTP at `http://localhost:8080` redirects to HTTPS.

The home page lets you create an account with a username and password. It displays confirmation or a validation error in French. Registration creates the account; sign-in is not implemented yet.

```bash
make health
# Expected: {"status":"ok","database":"ok","redis":"ok","version":"0.0.1"}
```

Common commands:

| Command | What it does |
|---|---|
| `make` / `make up` | Build and start the project; also use this after changing code |
| `make down` / `make clean` | Stop and remove containers, keeping stored data |
| `make stop` | Stop containers without removing them |
| `make restart SERVICE=backend` | Restart an existing service without rebuilding its image |
| `make re` | Stop, rebuild and start the project, keeping stored data |
| `make build SERVICE=backend` | Build one service's image without starting it; omit `SERVICE` to build all |
| `make logs` | Follow logs for all services; use `SERVICE=backend` to filter |
| `make check` | Validate Compose, run Django checks and check TypeScript types |
| `make test` | Run Django tests; optionally select tests with `ARGS=apps.users` |
| `make makemigrations ARGS=users` | Generate migration files in the local `backend/` directory |
| `make migrate` | Apply migrations to the database |
| `make superuser` | Create an administrator account |
| `make manage ARGS="showmigrations"` | Run another Django management command |
| `make shell` | Open a shell in the backend; use `SERVICE=frontend` for the frontend |
| `make dbshell` | Open the PostgreSQL console |
| `make fclean` | **Permanently delete all project volumes**, including database data and development certificates |

Start the project before running checks, tests, database commands or shells. Django management commands use a temporary container with the local backend source mounted, so generated migrations remain on your machine and belong to your user. The backend also applies migrations automatically at startup. Run `make up` after changing code or generating migrations: the running services use code copied into their images, and `make restart` does not update it.

WebSocket test in the browser developer console on the page:

```javascript
const ws = new WebSocket('wss://localhost:8443/ws/ping/');
ws.onopen = () => ws.send(JSON.stringify({type: 'ping'}));
ws.onmessage = (event) => console.log(event.data); // {"type":"pong"}
```

Checks after starting the services:

```bash
make check # Compose validation, Django checks and TypeScript check; no ESLint is configured.
```

`make test ARGS=apps.users` runs the registration tests, including input validation, password hashing, duplicate usernames and CSRF protection. The health and WebSocket checks above are manual smoke tests.

Stop without deleting data: `make down`.

Reset stored data **permanently**: `make fclean` (deletes the volumes; only when intentionally resetting your development environment).

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
- Next.js registration form with loading, success and error messages in French
- Django username/password registration at `/api/users/register/`, with a CSRF token endpoint at `/api/users/csrf/`
- Django `/api/health/` checking PostgreSQL and Redis (starter)
- Channels `/ws/ping/` WebSocket ping demo (starter)
- Local TLS nginx routing + container build (starter)
- Development-only Privacy Policy / Terms pages

Future functionality: email-based registration, login, profiles, posts, comments, likes, friendship, chat, notifications, public API, search.

## Modules

The proposal (`docs/modules.md`) totals **14 planned points**, **0 validated points so far**. The evaluation team decides which completed modules qualify. A working `/api/health/` does not satisfy the secured public API module; a ping endpoint does not satisfy the WebSocket real-time module.

The team-provided v21.2 subject permits a social network. Secure email/password signup and login, simultaneous users, input validation, and the other mandatory requirements are required independently of module points. See [the mandatory baseline review](docs/modules.md#mandatory-baseline) for the current gaps.

## Individual Contributions

Record each person's actual commit references, files, feature ownership, difficulties and resolved issues here before evaluation. **TBD — no contribution attribution has been fabricated.**

## Resources

- Official ft_transcendence subject v21.2 (reviewed from the team-provided `ft_tran_sub.pdf`; PDF not included in this repository)
- Next.js documentation: https://nextjs.org/docs
- Django documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Channels documentation: https://channels.readthedocs.io/
- Docker Compose documentation: https://docs.docker.com/compose/

AI assistance: ChatGPT was used to draft the initial scaffold, review the v21.2 subject and propose architecture. It also assisted with a scoped readability refactor of Django settings, health checks, WebSocket routing, Next.js pages, and setup documentation, plus temporary build and smoke checks. Every generated file must be reviewed, tested and understood by the team before submission.

## Known limitations and security warning

This is a **local development prototype**, not production hardened: it has a self-signed TLS certificate, registration without sign-in, no social business endpoints and no complete GDPR/retention policy. Do not deploy it publicly or store real personal data. The two legal pages must be updated with the actual data practices and user rights before real users are enabled.
