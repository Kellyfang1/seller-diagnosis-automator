#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const inputPath = process.argv[2];
const maxArg = process.argv.find((arg) => arg.startsWith("--max="));
const maxLength = maxArg ? Number(maxArg.slice("--max=".length)) : 60;

if (!inputPath || !Number.isInteger(maxLength) || maxLength < 1) {
  console.error("Usage: node scripts/audit-titles.mjs path\\to\\titles.json --max=60");
  process.exit(2);
}

let source;
try {
  source = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));
} catch (error) {
  console.error(`Cannot read valid JSON: ${error.message}`);
  process.exit(1);
}

const rows = Array.isArray(source) ? source : source?.titles;
if (!Array.isArray(rows)) {
  console.error("Input must be a JSON array or an object with a titles array.");
  process.exit(1);
}

const variantPattern = /\b(xs|s|m|l|xl|xxl|xxxl|ch|med|g|xg|negro|blanco|gris|azul|rojo|rosa|verde|morado|cafe|café|black|white|grey|gray|blue|red|pink|green|purple|brown)\b/gi;
const audited = rows.map((row, index) => {
  const sourceRow = typeof row === "string" ? { title: row } : row ?? {};
  const title = String(sourceRow.title ?? "").trim().replace(/\s+/g, " ");
  const variantTerms = [...title.matchAll(variantPattern)].map((match) => match[0]);
  return {
    index: index + 1,
    id: sourceRow.id ?? null,
    title,
    characterCount: Array.from(title).length,
    maxLength,
    passesLength: Array.from(title).length <= maxLength,
    likelyVariantTerms: [...new Set(variantTerms)],
    action: !title
      ? "Missing title"
      : Array.from(title).length > maxLength
        ? "Shorten title"
        : variantTerms.length
          ? "Move color/size terms to variants"
          : "Length passes; validate product facts before publishing",
  };
});

console.log(JSON.stringify({
  maxLength,
  total: audited.length,
  passingLength: audited.filter((row) => row.passesLength).length,
  rows: audited,
}, null, 2));
