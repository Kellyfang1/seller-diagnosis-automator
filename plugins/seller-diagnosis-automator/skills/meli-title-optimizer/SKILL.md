---
name: meli-title-optimizer
description: Audit and optimize Mercado Libre Spanish product titles to the team's default 60-character ceiling while preserving only confirmed product facts.
---

# Mercado Libre Title Optimizer

Use this skill when a KAM asks to improve one or more Spanish product titles, check title length, make a title searchable, or remove color/size clutter from parent titles.

## Title rule

Use a default ceiling of **60 characters including spaces**. This is the team's operational rule for this workflow. If the user provides a different Site/category limit, use that limit and state it.

For apparel, use this order when the facts are confirmed:

`Género + producto o piezas + fit/silhouette + material + true function + use scene`

Examples of structure, not claims to copy:

- `Pantalón Yoga Mujer Cintura Alta Pierna Ancha Licra Gym`
- `Camisa Hombre Manga Corta Estampado Floral Casual Verano`
- `Conjunto Deportivo Mujer 2 Piezas Top Leggings Yoga`

For beauty, use:

`producto + brand when authorized + content/shade + confirmed use or finish`

## Workflow

1. Confirm the product type, gender/audience, piece count, fit, material, function, scenario and Site limit.
2. Count the current title including spaces. For a batch JSON file, run:

```powershell
node scripts/audit-titles.mjs path\\to\\titles.json --max=60
```

3. Remove color, size, duplicated gender words, filler and unconfirmed claims from the parent title. Keep colors and sizes in variants.
4. Retain the strongest category and search terms, but do not stuff every keyword into the title.
5. Never add unsupported material/function claims, copyrighted characters/brands, medical claims, prices, promotions or delivery promises.
6. Return each result as `current title`, `recommended title`, `character count`, `changed terms`, and `attributes that still need completion`.

If the product facts are incomplete, give a title frame with `[confirm]` placeholders only in the internal draft. Do not give the seller a final title until the product facts are confirmed.

## Batch JSON input

Use either a JSON array or an object with a `titles` array. Each row can be a plain string or an object with `id` and `title`.

```json
[
  { "id": "example-1", "title": "Pantalón Yoga Mujer Cintura Alta Pierna Ancha Licra Elástica Gym" }
]
```
