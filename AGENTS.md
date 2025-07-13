# Agent Guidelines for authwds

## Build/Lint/Test Commands

- **Dev**: `bun run dev` (Next.js with Turbopack)
- **Build**: `bun run build`
- **Lint**: `bun run lint` (Typescript check & oxlint)
- **Start**: `bun run start`
- **Tests**: No test framework configured

## Code Style Guidelines

- **Formatting**: Prettier with no semicolons, double quotes, 2-space indentation, 80 char width
- **Imports**: Must have newline after import statements (enforced as error)
- **TypeScript**: Strict mode enabled, use `@/*` path aliases for imports
- **Naming**: PascalCase for components (e.g., `LoginFormCard`), camelCase for functions/variables
- **Components**: Export as named exports, use interface Props for component props
- **Files**: Use `.tsx` for React components, `.ts` for utilities/types

## Tech Stack

- Next.js 15 with App Router
- React 19 with TypeScript
- Tailwind CSS for styling
- React Hook Form + Zod for forms
- Drizzle ORM with LibSQL
- Oxlint for fast linting
