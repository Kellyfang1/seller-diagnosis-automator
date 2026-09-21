# Seller Diagnosis Automator

This shareable Codex plugin standardizes Mercado Libre seller diagnosis for KAM teams.

It provides two skills:

- `seller-diagnosis-workflow`: converts seller performance, listing, storefront and benchmark evidence into a KAM brief, seller remediation workbook, and direct-send Chinese message.
- `meli-title-optimizer`: audits and improves Spanish product titles against the team's default 60-character ceiling.

The plugin includes no merchant records, credentials, BigQuery connections, or competitor data. Each run uses only the evidence the operator is authorized to access.

## Included helpers

```powershell
node scripts/validate-intake.mjs path\\to\\seller-intake.json
node scripts/audit-titles.mjs path\\to\\titles.json --max=60
```

`validate-intake.mjs` checks that the minimum Site, seller, scope, time period and decision fields are present. `audit-titles.mjs` reports title length and flags likely parent-title variant terms. It does not replace merchant titles or write to any external system.

## Team rollout

The source is registered in this workspace's local marketplace as `AVAILABLE`. The Codex Share screen can package it for a pilot group. Workspace-wide publication still depends on the operator's Codex role and the workspace sharing controls.

## Boundaries

- Do not use the package to disclose internal competitor identifiers, hidden eligibility logic, non-public benchmarks, credentials, or unapproved seller data.
- Keep source snapshots, date ranges and denominators visible in internal material.
- Treat price recommendations as time-bounded test prices. Confirm cost, tax, fulfilment and margin floors before any seller adopts them.
