# AGENTS.md

This project uses:

- Vite 6
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Radix UI primitives
- Lucide React
- Recharts
- RTL Arabic-first UI

Core rules:

- Always prefer `shadcn/ui` components and patterns.
- Prefer existing components from `src/components/ui`.
- Use `cn()` from `@/lib/utils`.
- Use semantic colors and the existing CSS variables in `src/index.css`.
- Preserve RTL behavior and Arabic-friendly alignment, spacing, and icon placement.
- Keep layouts simple, readable, and close to `shadcn` composition patterns.
- Use borderless, clean surfaces (`border-0`), restrained subtle shadows (`shadow-2xs`), and solid background contrast instead of visible structural borders.

Do not:

- Do not use visible borders (`border`, `border-b`, `border-t`, `ring-1`, `border-border`) on containers, cards, tables, table headers, rows, or sections. Enforce clean, borderless (`border-0`) surfaces.
- Do not create custom replacements for core UI primitives such as Button, Input, Card, Dialog, Table, Sheet, Dropdown, Sidebar if a `shadcn/ui` version exists or should exist.
- Do not introduce dark-mode-only sections or night-style surfaces.
- Do not add flashy hover effects, glassmorphism, or unnecessary motion.
- Do not break existing route names or navigation structure unless explicitly requested.
- Do not add backend logic or API assumptions unless explicitly requested.

Component and architecture rules:

- Reuse `src/components/ui/*` before creating new UI files.
- If a missing primitive is needed, add it in `src/components/ui` using `shadcn` conventions.
- Prefer compositional page structure:
  - page shell
  - header / toolbar
  - content sections
  - states
- For sidebars, tables, dialogs, menus, and forms, follow official `shadcn` composition as closely as practical.
- Keep page-specific styling inside the page only when it cannot be expressed through shared UI primitives.

Responsive rules:

- Every major page should be intentionally designed for:
  - mobile
  - tablet
  - desktop
  - wide desktop
- Do not leave large-screen whitespace unused when content can be organized better.
- Prefer tables on desktop for dense management views, with safe fallbacks for smaller screens.

State rules:

- Important pages should account for:
  - loading
  - empty
  - first-use
  - no-results
  - success
  - error

Project-specific guidance:

- This repository is frontend-first for now. Prioritize interface quality, structure, and delivery readiness for a future developer handoff.
- `MyProjects`, `CustomerPortal`, `BrandIdentityStudio`, `BusinessModelCanvas`, and shared navigation are high-priority surfaces.
- Keep Arabic text readable: strong contrast, right alignment where appropriate, and no LTR-biased spacing in RTL layouts.
