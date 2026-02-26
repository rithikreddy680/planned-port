# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a pnpm monorepo (Turborepo) containing a single Next.js 16 portfolio site at `apps/web`. The `packages/` directory contains stub packages (`ui`, `config`, `database`) with no active source code.

### Running the app

- `pnpm dev` starts the Next.js dev server on `http://localhost:3000` (via Turborepo).
- The app requires `apps/web/.env.local` with `RESEND_API_KEY` and `CONTACT_EMAIL`. Without `RESEND_API_KEY`, the site renders fully but the `/api/contact` endpoint returns 500. Copy from `apps/web/.env.example` if needed.

### Known issues

- **Lint (`pnpm lint`)**: Fails because `next lint` was removed in Next.js 16. The `web` package script still calls `next lint`, which Next.js 16 interprets as `next [directory=lint]`. This is a pre-existing repo issue.
- **Tests (`pnpm test`)**: Exits with code 1 because no test files matching `**/*.{test,spec}.?(c|m)[jt]s?(x)` exist yet. Vitest is configured but no tests have been written.
- **Prisma build scripts**: `pnpm install` warns about ignored build scripts for `@prisma/engines` and `prisma`. This is expected since the `packages/database` package is a stub with no schema file. The `pnpm.onlyBuiltDependencies` field in root `package.json` only allows `sharp` and `esbuild`.

### Standard commands

See `README.md` for the full list. Key commands: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm test`.
