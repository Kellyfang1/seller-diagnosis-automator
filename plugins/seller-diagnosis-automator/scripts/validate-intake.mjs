#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/validate-intake.mjs path\\to\\seller-intake.json");
  process.exit(2);
}

const requiredFields = ["site", "merchantId", "vertical", "category", "decision", "reportingPeriod"];
const allowedOutputs = new Set(["internalBrief", "sellerWorkbook", "sellerMessage"]);
const allowedEvidence = new Set(["sellerMetrics", "listingExtract", "storefront", "priceReference", "contentAndInventory"]);

let payload;
try {
  payload = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));
} catch (error) {
  console.error(`Cannot read valid JSON: ${error.message}`);
  process.exit(1);
}

const errors = [];
for (const field of requiredFields) {
  if (typeof payload[field] !== "string" || !payload[field].trim()) {
    errors.push(`Missing required string: ${field}`);
  }
}

if (!Array.isArray(payload.outputs) || !payload.outputs.length) {
  errors.push("outputs must contain at least one requested deliverable");
} else {
  for (const output of payload.outputs) {
    if (!allowedOutputs.has(output)) errors.push(`Unsupported output: ${output}`);
  }
}

if (!payload.evidence || typeof payload.evidence !== "object") {
  errors.push("evidence must be an object with source availability flags");
} else {
  for (const key of Object.keys(payload.evidence)) {
    if (!allowedEvidence.has(key)) errors.push(`Unsupported evidence field: ${key}`);
    if (typeof payload.evidence[key] !== "boolean") errors.push(`Evidence field must be boolean: ${key}`);
  }
}

if (errors.length) {
  console.error("Intake validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const availableEvidence = Object.entries(payload.evidence)
  .filter(([, available]) => available)
  .map(([key]) => key);

console.log(JSON.stringify({
  valid: true,
  site: payload.site,
  merchantId: payload.merchantId,
  vertical: payload.vertical,
  category: payload.category,
  reportingPeriod: payload.reportingPeriod,
  outputs: payload.outputs,
  availableEvidence,
  dataGaps: [...allowedEvidence].filter((key) => !availableEvidence.includes(key)),
}, null, 2));
