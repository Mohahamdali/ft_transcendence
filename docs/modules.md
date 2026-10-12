# Proposed 14-point module plan (NOT YET EARNED)

Reviewed against the team-provided `ft_tran_sub.pdf`, version 21.2. Page numbers below refer to the printed page numbers. A social network is explicitly allowed (pp. 7, 22); this plan does not require a game.

## Mandatory baseline

The 14 module points do not replace the mandatory requirements (pp. 8–9):

- **Frontend, backend, database and container startup:** configured in Docker Compose; full startup and live database/Redis integration still need verification.
- **Secrets:** `.env` is ignored by Git and `.env.example` contains empty required secret values.
- **HTTPS:** nginx provides the external HTTPS/WSS entry point. The subject allows unencrypted internal connections between backend/container services, so the existing internal HTTP routes are appropriate.
- **Secure email/password signup and login:** not implemented. Django's authentication infrastructure alone does not provide the application's registration/login flow.
- **Simultaneous users:** logged-in users and concurrent actions must work without conflicts or corrupting data. The ping demo does not demonstrate this.
- **Input validation:** the future account and social forms need validation on both the frontend and backend.
- **Database schema:** social tables and relationships are planned. Implement them and document actual key field types and relationships (also required by p. 28).
- **Frontend quality:** Tailwind is present; responsiveness, accessibility, latest stable Chrome compatibility and absence of browser console errors still need browser testing.
- **Privacy Policy and Terms:** linked pages exist, but their prototype notices must be updated for the finished application. Placeholder or inadequate policies do not satisfy the requirement.
- **Team and Git history:** document the actual team, roles and contributions; commit project files with meaningful messages from all contributors. README logins, communication details and ownership are still incomplete.

## Selected modules

These modules support the social network's accounts, relationships, conversations, notifications and data access. The selections and point values match pp. 12–14. Each still needs an implementation explanation and contributor attribution in the README (p. 28).

## Major (2 points each)

1. Web: frameworks on both frontend and backend — 2
2. Web: real-time features via WebSockets (updates across clients, graceful connection/disconnection handling, efficient broadcasting) — 2
3. Web: user interaction (send/receive chat, view profiles, add/remove/list friends) — 2
4. User Management: standard user management (editable profiles, uploaded/default avatars, friend online status and profile pages) — 2
5. Web: public database API (API-key authorization, rate limits, documentation, 5+ endpoints covering GET, POST, PUT and DELETE) — 2

## Minor (1 point each)

6. Web: ORM for the database — 1
7. Web: complete notification system for all creation, update and deletion actions — 1
8. Web: advanced search with filters, sorting and pagination — 1
9. Web: Server-Side Rendering (SSR) for performance and SEO — 1

**Total proposed:** 5*2 + 4*1 = 14 points.

Important: A module is worth zero until it meets every listed condition. The team should target backup modules only after this scope is stable, e.g., custom design system with 10 reusable components, or at least two additional browsers with complete functionality.

Frameworks, Django ORM and server rendering are already used in the starter; this does not make the complete application or its module plan evaluation-ready. The standard user-management major adds profile/avatar/friend features beyond the mandatory basic authentication flow.
