# Continuity and Recovery Workflow

This project now treats user workspace data as recoverable rather than permanently deleted.

## Runtime behavior

- Workspace edits are written locally first.
- Remote sync is debounced and retried.
- The header exposes save state: pending, saving, saved, failed, or conflict.
- A `row_version` check prevents silent overwrite when the same project is edited from two devices.
- Project deletes are soft deletes through `deleted_at`.
- Public sharing ignores soft-deleted projects.

## Database controls

Apply the latest SQL migrations before relying on these controls:

- `row_version integer default 1`
- `deleted_at timestamptz`
- `business_canvas_versions`
- `business_canvas_user_active_updated_idx`

## Restore a soft-deleted project

Run from a trusted SQL console or admin-only backend:

```sql
UPDATE public.business_canvas
SET deleted_at = NULL,
    updated_at = NOW()
WHERE id = '<PROJECT_ID>'
  AND user_id = '<USER_ID>';
```

## Restore a previous version

Inspect available snapshots:

```sql
SELECT id, version, created_at
FROM public.business_canvas_versions
WHERE canvas_id = '<PROJECT_ID>'
ORDER BY version DESC;
```

Restore one snapshot:

```sql
UPDATE public.business_canvas bc
SET canvas_data = v.snapshot,
    row_version = bc.row_version + 1,
    updated_at = NOW()
FROM public.business_canvas_versions v
WHERE bc.id = v.canvas_id
  AND bc.id = '<PROJECT_ID>'
  AND v.id = '<VERSION_ID>';
```

## External backup baseline

For production, schedule a nightly service-role backup outside the browser:

```bash
pg_dump "$SUPABASE_DATABASE_URL" \
  --format=custom \
  --no-owner \
  --file "backup-$(date +%Y-%m-%d).dump"
```

Store dumps outside Supabase, for example Cloudflare R2, S3, or Backblaze B2.

Suggested baseline:

- RPO: 24 hours for full database backups.
- RTO: 4 hours for manual restore.
- Retention: 7 daily backups, 4 weekly backups.

Do not store service-role keys in the frontend or public repository.
