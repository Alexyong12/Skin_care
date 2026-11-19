# Architecture

## Layers (dependencies point inward)

```
Page (app/)  ->  Component  ->  Hook  ->  Service  ->  lib/api (client)  ->  Backend
```

| Layer     | Lives in                | Rule                                                             |
| --------- | ----------------------- | ---------------------------------------------------------------- |
| Page      | `src/app/**/page.tsx`   | Thin. Imports one component from a feature. No logic.            |
| Component | `features/*/components` | Renders. No `fetch`. Reads data through a hook.                  |
| Hook      | `features/*/hooks`      | Owns data, loading, errors, cache invalidation (TanStack Query). |
| Service   | `features/*/services`   | Calls the API and returns typed data. No React.                  |
| API core  | `src/lib/api`           | The only place that calls `fetch`. Knows nothing about React.    |

## The shared engine: `src/services`

`createService<T>("/path")` gives list / get / create / update / remove for any REST resource.
`createHooks("name", service)` gives `useList`, `useDetail`, `useCreate`, `useUpdate`, `useDelete` with automatic cache invalidation.

> Do not confuse it with `features/<name>/services`. The top-level `services/` is the generic factory; each feature's `services/` holds that module's own API calls.

## API core: `src/lib/api`

| File              | Job                                                                       |
| ----------------- | ------------------------------------------------------------------------- |
| `client.ts`       | `apiClient.get/post/put/patch/delete`: base URL, headers, JSON, errors    |
| `error.ts`        | `ApiError(status, message, data)`; `status 0` = server unreachable        |
| `types.ts`        | `ApiResponse<T>`, `PaginatedResponse<T>`, `RequestOptions`, `QueryParams` |
| `interceptors.ts` | Attach the token, handle 401, token cookie helpers                        |

## State

- **Server data** (products, cart, orders, profile) -> TanStack Query.
- **UI state** (drawer open, mobile menu) -> Zustand (`stores/ui.store.ts`).
- **Filters / pagination** -> the URL (shareable, back button works).
- **Forms** -> React Hook Form + Zod schemas in `features/*/schemas`.

## Feature public API

Each feature exposes only its `index.ts`. Import `@/features/cart`, never `@/features/cart/hooks/use-cart`.

## Add a new module (example: `reviews`)

1. Create `src/features/reviews/{components,hooks,services,types}` and `index.ts`.
2. `types/review.types.ts` -> `Review`.
3. `services/review.service.ts` -> `export const reviewService = createService<Review>("/reviews");`
4. `hooks/use-reviews.ts` -> `const h = createHooks<Review>("reviews", reviewService); export const useReviews = h.useList;`
5. Build components that call the hook; export them from `index.ts`.
6. Add `src/app/reviews/page.tsx` that renders the component, and the URL in `config/routes.ts`.

## Auth

Login stores the token in the `access_token` cookie (`lib/api/interceptors.ts`). `middleware.ts` uses it to protect `/account`, `/orders`, `/checkout`.
For stricter security, have the backend set it as an `httpOnly` cookie. The middleware is only a UX gate: the backend must authorize every request.
