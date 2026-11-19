# Skin Care: customer web UI

Frontend for the Skin Care online shop, built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**.
This project is the **client UI only**. It has no database and no business logic: every piece of data comes from a separate backend API.

```
Browser -> Next.js UI (this project) -> Backend API (API_URL) -> Database
```

## Quick start

```bash
npm install
cp .env.example .env.local      # then set NEXT_PUBLIC_API_URL
npm run dev                     # http://localhost:3000
```

| Script              | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the dev server              |
| `npm run build`     | Production build                  |
| `npm run start`     | Run the production build          |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript check                  |
| `npm run format`    | Prettier (sorts Tailwind classes) |

## Pages

| URL                                                   | Purpose                                            | Needs login                   |
| ----------------------------------------------------- | -------------------------------------------------- | ----------------------------- |
| `/`                                                   | Home                                               | no                            |
| `/products`, `/products/:id`                          | Shop list (search, category, skin type) and detail | no                            |
| `/cart`                                               | Cart (also available as a slide-over drawer)       | no (cart needs login to load) |
| `/checkout`                                           | Delivery details + payment method                  | yes                           |
| `/orders`, `/orders/:id`                              | Order history and detail                           | yes                           |
| `/account`, `/account/addresses`, `/account/security` | Profile, addresses, password                       | yes                           |
| `/login`, `/register`                                 | Authentication                                     | no                            |

Login protection is done in `src/middleware.ts` (cookie `access_token`).

## Backend API contract (what the UI expects)

Base URL = `NEXT_PUBLIC_API_URL`. If your backend differs, adjust **one place**: `src/services/module/create-service.ts` (CRUD shape) and the feature services in `src/features/*/services`.

- One item: `{ "data": { ... } }`
- List: `{ "data": [ ... ], "meta": { "page", "perPage", "total", "lastPage" } }`
- Error (4xx/5xx): `{ "message": "...", "errors": { "field": ["..."] } }`
- Auth: `Authorization: Bearer <token>`

| Method              | Path                                              | Used by                                 |
| ------------------- | ------------------------------------------------- | --------------------------------------- |
| POST                | `/auth/login`, `/auth/register`                   | returns `{ data: { token, user } }`     |
| POST                | `/auth/logout`                                    | sign out                                |
| GET                 | `/products?page&perPage&search&category&skinType` | shop list                               |
| GET                 | `/products/:id`                                   | product detail                          |
| GET                 | `/cart`                                           | current cart                            |
| POST                | `/cart/items` `{ productId, quantity }`           | add to cart                             |
| PATCH / DELETE      | `/cart/items/:itemId`                             | change / remove                         |
| POST                | `/checkout`                                       | place order, returns `{ data: { id } }` |
| GET                 | `/orders`, `/orders/:id`                          | order history                           |
| GET / PUT           | `/account/profile`                                | profile                                 |
| GET / POST / DELETE | `/account/addresses[/:id]`                        | addresses                               |
| POST                | `/account/change-password`                        | password                                |

## Folder structure (short)

```
src/
  app/          Routes only (thin pages)
  services/     Shared engine: createService / createHooks for any module
  lib/api/      API connection: client.ts, error.ts (ApiError), types.ts, interceptors.ts
  lib/query/    TanStack Query provider + defaults
  features/     One folder per module: components, hooks, services, schemas, types, index.ts
  components/   ui (primitives), common (shared), layout (header, nav, footer, sidebar)
  hooks/ stores/ config/ types/
```

See `docs/ARCHITECTURE.md` for the layers and how to add a module.

## Responsive design

Tailwind, mobile-first. Base styles = mobile; `md:` = tablet (768px); `lg:` = desktop (1024px).
Tables become cards on mobile (`ResponsiveTable`), the menu becomes a drawer, the account sidebar becomes scrollable tabs.

## Not included yet

Dark mode and i18n (English / Khmer) were left out on purpose; both can be added later without changing the structure.
