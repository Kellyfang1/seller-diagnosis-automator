# Publishing and Pilot Guide

## Public submission

Use `OPENAI_SUBMISSION.md` to complete a skills-only submission in the OpenAI
plugin submission portal. Before submission, replace the placeholder publisher
references with the exact verified OpenAI developer or business identity, host
the support, privacy, and terms pages at public URLs, and upload the final
plugin bundle. The portal requires five positive and three negative test cases;
the reviewed cases are included in the submission kit.

Submitting starts OpenAI review. It does not make the plugin public until the
publisher selects Publish after approval.

## Pilot

1. Open the plugin from the Codex Share screen.
2. Share it with the KAM pilot group as `AVAILABLE`.
3. Ask each tester to start a new Codex task and use one of the three default prompts.
4. Review whether every diagnosis records Site, category, reporting period, currency, source status, seller owner, KAM owner and a `Scale`, `Fix` or `Stop` decision.

## Acceptance checks

- The seller pack contains only the seller's own items and safe public reference examples.
- Any rate uses a stated numerator and denominator.
- The workbook clearly marks seller-input fields and does not overwrite raw data.
- Recommendations name a due date, readiness gate and review rule.
- Traffic or resource support is conditional on content, inventory, price and compliance readiness.

## Versioning

Use the plugin cachebuster helper after a source update, then reinstall from the configured marketplace before testing in a new Codex task. Keep pilot changes in the plugin source; do not edit generated packages in place.
