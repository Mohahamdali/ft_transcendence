# Mini Facebook – Friends & Profile Frontend

Frontend starter built with Next.js App Router, TypeScript and Tailwind CSS.
It uses local fake data only. There is no Django/API/database connection yet.

## Requirements
- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm

## Run on Windows / Linux / macOS
1. Extract `mini-facebook-frontend.zip`.
2. Open a terminal inside the extracted `mini-facebook-frontend` folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

## Pages
- `/friends` – invitations, suggestions and your friends.
- `/profile/me` – your own profile, with edit-profile controls.
- `/profile/ahmed` – example friend profile.
- `/profile/karim` – example non-friend profile (locked profile).

## Demo behaviour
- Accept or delete invitations.
- Add/remove friends.
- Open a person's profile by clicking their name or avatar.
- Friend profiles show posts and shared profile sections.
- Non-friend profiles show public information and a locked-profile message.
- The demo state is held in React context in memory. Refreshing the browser resets it.

## Where to customise
- `src/data/users.ts` – fake users, posts, invitations and suggestions.
- `src/context/FriendsContext.tsx` – demo friend/request actions.
- `src/app/globals.css` – global styling.
- `src/components` – reusable UI components.

## Later Django integration
Replace the fake data/context actions with API calls to your Django REST Framework backend.
Do not put real passwords or secrets in frontend code.
# ft_trans
# ft_transc
