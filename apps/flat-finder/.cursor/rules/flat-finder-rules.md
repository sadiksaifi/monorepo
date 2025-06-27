# Flat Finder Cursor Rules (Updated)

## Core Stack & Frameworks

- Use **React 19** and **React DOM 19** for all UI development.
- Use **TypeScript** for all source files (`.ts`, `.tsx`). No usage of `any` unless justified with a comment.
- Use **Vite** (v6+) as the build tool and dev server. All scripts should use Vite commands as defined in `package.json`.

## Routing & Data Fetching

- Use **TanStack Router v1** (`@tanstack/react-router`) for all routing. Route files must follow TanStack conventions in `src/routes/`.
- Use **TanStack Query v5** (`@tanstack/react-query`) for all server data fetching and caching. Use `@tanstack/query-sync-storage-persister` and `@tanstack/react-query-persist-client` for persistence.
- Use **tRPC** (`@trpc/client`, `@trpc/tanstack-react-query`) for all backend communication.
- Use **superjson** for serialization where needed.

## UI & Styling

- Use **Tailwind CSS v4+** for all styling. No external CSS frameworks unless approved.
- Use **tailwind-merge** and **tw-animate-css** for class merging and animation utilities.
- Use **shadcn/ui** components (via `pnpm ui` and mcp server) for UI primitives. Prefer these over custom or third-party components.
- Use **Radix UI** primitives for dialogs, avatars, dropdowns, etc. (see dependencies for full list).
- Use **class-variance-authority** and **clsx** for conditional class management.
- Use **Lucide** for icons (`lucide-react`).
- Use **Embla Carousel** for carousels and **Vaul** for drawers/modals.

## Forms & Validation

- Use **react-hook-form** for all forms.
- Use **Zod** for schema validation and integrate with react-hook-form via `@hookform/resolvers`.

## File Uploads

- Use **UploadThing** (`@uploadthing/react`) for all file/media uploads.

## Authentication

- Use **better-auth** for authentication. Do not implement custom auth flows unless discussed.

## State & Notifications

- Use **Sonner** for toast notifications.
- Use **next-themes** for theme management (dark/light mode).

## Search & Filtering

- Use **FZF** for fuzzy search functionality.

## Monorepo & Workspace

- Reference workspace packages (`@workspace/backend`, `@workspace/ui`) for shared logic and UI.

## PWA & Offline Support

- Use **vite-plugin-pwa** for PWA support. Do not remove or bypass service worker registration or PWA manifest configuration in `vite.config.ts`.
- Use **workbox-window** for service worker management if needed.
- All new features must consider offline support where applicable.

## Code Quality & Tooling

- All code must pass **ESLint** checks using `@tanstack/eslint-config`.
- All code must be formatted with **Prettier v3+**.
- TypeScript type checks (`pnpm typecheck`) must pass before merging.
- Use **Vitest** for unit/integration tests and **Testing Library** for React component tests.

## File & Folder Structure

- Place business logic and utilities in `src/lib/`.
- Place custom hooks in `src/hooks/` and prefix with `use`.
- Place UI components in `src/components/ui/`.
- Place skeleton loaders and error components in `src/components/`.

## Accessibility & Documentation

- All interactive elements must be accessible (ARIA labels, keyboard navigation, etc.).
- Use semantic HTML wherever possible.
- All exported functions, components, and hooks must have JSDoc comments.
- Update `README.md` for any significant feature or configuration changes.

## Environment Variables

- All environment variables must be prefixed with `VITE_` and documented in `README.md`.

## Commit & PR Guidelines

- All commits should be descriptive.
- Pull requests must reference related issues or features and pass all checks.

## Additional Notes

- Only use libraries listed in `package.json` unless approved.
- Prefer shadcn/ui and Radix UI for UI components.
- Use skeleton loaders and error components for loading and error states.
