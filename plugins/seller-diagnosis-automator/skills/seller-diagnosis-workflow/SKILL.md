---
name: seller-diagnosis-workflow
description: Diagnose a Mercado Libre seller's assortment, traffic, conversion, price, content, and readiness; produce a KAM decision brief, seller remediation workbook, and direct-send Chinese message.
---

# Seller Diagnosis Workflow

Use this skill when a KAM asks to diagnose a Mercado Libre seller, merchant, storefront, or product pool. It turns evidence into a time-bound remediation plan for a named Site, category, customer scenario and price band.

## Start with a decision-ready intake

Collect the following before calling the result a full diagnosis:

1. `Site`: for example `MLM`, `MCO`, `MLB`, `MLC`, or `MLA`.
2. `Seller`: merchant ID plus store URL or seller name when available.
3. `Scope`: vertical, category/domain, customer scenario and price currency/band.
4. `Decision`: the next KAM or seller decision, such as repair current listings, test a new assortment direction, or decide whether to request traffic.
5. `Period`: reporting date or snapshot date for every metric.
6. `Evidence`: seller metrics, listing extract, storefront images/URLs, price references, inventory/content attributes, and any user-provided files.
7. `Output`: internal KAM brief, seller workbook, seller message, or all three.

When any required evidence is missing, continue with a clearly labelled hypothesis or data-gap note. Do not invent market scale, inventory, traffic, conversion, price, competitor performance, resource eligibility, or causal uplift.

For a structured JSON intake, start with `references/intake-template.json` and run:

```powershell
node scripts/validate-intake.mjs path\\to\\seller-intake.json
```

## Diagnostic sequence

Use this loop:

`Site and shopper mission -> target shelf -> current seller supply -> root cause -> qualified supply -> test -> Scale, Fix, or Stop`

1. **Set the metric boundary.** State the Site, category, period, source, currency, grain and denominator. Weighted conversion is `orders or sold units / visits` at the same grain; do not average row-level conversion rates.
2. **Measure traffic and selling coverage.** Review visits, orders/sold units, NMV or GMV, active listings, sold listings, visit per active item, sales coverage, top-item concentration and high-visit/no-sale items. A large catalog alone does not prove breadth or quality.
3. **Read the assortment.** Classify products by product form, customer use scene, price band, gender, fit, material, functional claims, seasonality and lifecycle role. Identify repeat listings, variants that should be merged, under-covered directions and over-represented forms.
4. **Check discoverability and content.** Audit category, `Género`, title, attribute completeness, image count, human-model imagery, size chart, video/Clips, stock, Buy Box and fulfilment only when evidence exists. Treat an unfilled attribute as a search/filter risk, not proof of zero traffic.
5. **Compare price/value.** Build a matched reference cohort by the same Site, direction, product form and known condition. Record current price, promotion/reference price where available, P25/median/P75, delivery/fulfilment caveats, and seller cost floor. A test price is not a requirement to match the lowest price.
6. **Separate the root cause.** Map evidence to one or more diagnosed causes: traffic/discoverability, conversion/value, duplicated assortment, price, content/attribute readiness, availability/fulfilment, compliance/IP, or unknown. State the alternative explanation and what would change the recommendation.
7. **Build a limited first round.** Select only a manageable group of priority items or proposed additions. Use a starter mix of roughly 20% entry/traffic items, 60% main-selling items and 20% upgrade items only when it matches the category and economics.
8. **Qualify before traffic.** Confirm title, category/attributes, price floor, images, size/variant structure, sellable inventory, fulfilment and compliance. Do not promise exposure, traffic or incremental GMV.
9. **Review the test.** Set a 7-14 day test window unless the product cycle requires otherwise. The default rule is: at 30-50 visits with zero orders, repair content/fit/price first; at about 100 visits with zero orders, pause the push and replace or stop the item. Adjust thresholds for high-ticket or low-traffic categories and record the reason.

## Minimum action card

Every priority item or assortment direction needs these fields:

| Field | Required content |
| --- | --- |
| Opportunity | Site, category/domain, customer scenario, product form and price band |
| Evidence | Period, source, metric grain/denominator and comparison or gap |
| Seller action | Listing, title, attributes, imagery, variants, price, stock or sourcing change |
| KAM action | Review, qualification, resource request or stop decision |
| Readiness gate | Sellable inventory, compliance, content, price floor and fulfilment checks |
| Cadence | Owner, due date, test window, review date and expected return material |
| Decision | `Scale`, `Fix`, `Stop`, or `Data Pending` with an observable rule |

## Output contract

For a full seller package, create these linked outputs with the same action IDs:

1. **Internal KAM brief:** evidence, diagnosis, alternatives, price/reference boundary, data gaps, owners and decision gate.
2. **Seller remediation workbook:** use the columns in `references/seller-workbook-columns.md`. Keep raw source data read-only. Highlight seller-input columns and use one action tracker as the execution source of truth.
3. **Seller message:** use simple, direct Chinese. Start with the result, then explain the root cause, first-round product focus, title/attribute/image work, price-test boundary, return materials and the review rule. Use `references/seller-message-template.md`.

Seller-facing material may use the seller's own item IDs and safe public examples. Do not expose internal table names, other sellers' non-public performance, individual competitor-sensitive data, hidden ranking/resource rules or unauthorized data.

## Apparel and beauty checks

### Apparel

- Put different colors and sizes of the same style into one parent listing where the platform model permits it; do not put single colors or sizes in the parent title.
- Put confirmed gender, product type, fit, material, true functional attributes, size and scenario into the listing fields.
- Use a clear human-model first image where relevant, then cover back/side fit, material/feature detail, and a centimetre size chart. A short video is useful for priority products when it demonstrates a real feature.
- For Spanish parent titles, use the `meli-title-optimizer` skill. The team default is 60 characters including spaces; override only with an explicit category/Site rule.

### Beauty

- Confirm product type, net content, shade/variant, skin/hair use, ingredients/claims, application and compliance before price or traffic recommendations.
- Never add efficacy, SPF, ingredient, medical or regulatory claims that are not confirmed on the product or approved documentation.

## Final check

Before delivery, confirm that every conclusion is marked as confirmed evidence, inference, or data pending; every rate has a denominator; seller and KAM owners are named; and resource support remains conditional on qualification.
