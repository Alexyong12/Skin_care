# Contributing

## Naming

| Thing                   | Convention               | Example                         |
| ----------------------- | ------------------------ | ------------------------------- |
| Component file          | kebab-case               | `product-card.tsx`              |
| Component export        | PascalCase, named export | `export function ProductCard()` |
| Hook                    | `use-*.ts` / `useX`      | `use-products.ts`               |
| Service                 | `*.service.ts`           | `product.service.ts`            |
| Store                   | `*.store.ts`             | `ui.store.ts`                   |
| Types                   | `*.types.ts`             | `product.types.ts`              |
| Zod schema              | `*.schema.ts`            | `login.schema.ts`               |
| Boolean                 | `is/has/should`          | `isLoading`                     |
| Handler / prop callback | `handleX` / `onX`        | `handleSubmit`, `onSelect`      |

Default exports only where Next.js requires them (`page.tsx`, `layout.tsx`, ...).

## Rules

- UI and logic are separate: component, hook, service.
- No `fetch` outside `lib/api`.
- Cross-feature imports go through the feature's `index.ts`.
- Use `@/` imports, never `../../..`.
- Use `ROUTES` from `config/routes.ts`, never hardcoded paths.
- Mobile-first Tailwind; tap targets at least 44px (`h-11`).
- Comment the _why_, not the _what_. JSDoc exported services and hooks.

## Before opening a PR

```bash
npm run lint && npm run typecheck && npm run format
```

- [ ] Works at mobile, tablet and desktop widths
- [ ] Loading, empty and error states handled
- [ ] Docs updated if the structure changed
