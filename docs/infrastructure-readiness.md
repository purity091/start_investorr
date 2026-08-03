# Infrastructure Readiness

This checklist covers the last scaling layer for running the app with many registered users while keeping Supabase focused on private user data.

## Already Addressed

- Public JSON and image assets have cache headers in `apps/web/next.config.ts`.
- AI endpoints are disabled, so there are no long-running Gemini calls in API routes.
- `/api/health` exists and returns a lightweight status payload.
- Auth middleware avoids calling Supabase on every request when JWT verification is available.

## Implemented In This Pass

- `turbo.json` now uses the same Supabase environment variable names as the app.
- `.env.example` documents the required production variables.
- `scripts/check-env.mjs` validates required variables without printing secret values.
- `apps/web` supports bundle analysis with `npm --workspace web run analyze`.
- `load-tests/k6-smoke.js` provides a repeatable public-read burst test.
- `apps/web/vercel.json` points the scheduled health check to `/api/health`.

## Commands

```bash
npm run check:env
NODE_ENV=production npm run check:env -- --production
npm --workspace web run analyze
BASE_URL=https://your-domain.example npm run load:test
```

`k6` must be installed on the machine running the load test.

## Heavy Work Policy

Do not run AI, PDF generation, exports, bulk sync, or financial analysis jobs synchronously inside Next API routes. The current AI route is intentionally disabled. When these features are re-enabled, route handlers should create a job and return a `job_id`; a worker service should process the job through a queue such as BullMQ, Inngest, Trigger.dev, or another managed queue.

## Launch Checklist

- Run `npm run check:env` locally and in CI before deployment.
- Run `npm --workspace web run build`.
- Run the k6 smoke test against a preview deployment before a campaign.
- Warm public pages and `/data/*` assets before sending a large notification.
- Roll out new high-traffic features gradually instead of enabling them for every user at once.
- Keep Supabase reads limited to private user data and mutations.
