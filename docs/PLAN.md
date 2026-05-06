# Interactive Resume Refactor Plan

## Summary
Replace the current [recruiter-dossier.jsx](/C:/Sushil/Workspace/career-portfolio/interactive-resume/recruiter-dossier.jsx) concept with a recruiter-first single-page HTML experience backed by a shared content model derived only from the seven PDFs in `/resume`, plus seven role-specific PDF outputs generated from the same normalized content. The page should default to `Technical Program Management / Technical Project Management`, switch categories instantly with no reload, and surface the best-fit story within the first screen.

## Current Issues
- The current mockup uses the wrong profile set and wrong order. It has 6+ fragmented identities, including separate AI categories and a `Change Management Lead` category that is out of scope.
- Content is invented, generic, and incomplete. It uses placeholders such as `[YOUR NAME]`, `[EMAIL]`, and non-source claims instead of PDF-derived text.
- The UI is visually off-target for recruiters: dark theme, neon accents, gradients, decorative type, matrix scoring, and tiny text all add friction.
- The default state is empty/indirect. Recruiters must interpret a competency matrix and click to reveal content instead of seeing the strongest profile immediately.
- The structure does not match the required scan order `core competencies -> impact -> experience highlights`.
- The implementation is React JSX, while the target deployment is plain HTML, CSS, and minimal JavaScript for GitHub hosting.
- The current layout is weak on accessibility and mobile clarity: low contrast, 7-11px text, horizontal scroll dependency, and no obvious keyboard/tab model.
- Encoding artifacts (`Â·`, broken bullets) indicate content hygiene problems that must be cleaned during the rewrite.

## Content Mapping And Restructuring
Use these exact categories in this exact order, with one source PDF per category:
- `Technical Program Management / Technical Project Management` <- `/resume/TPM/Sushil_K_Duseja_Resume.pdf`
- `Project Management` <- `/resume/PM/Sushil_Duseja_Resume.pdf`
- `Business Analyst / Product Owner` <- `/resume/BA/Sushil Duseja_Resume.pdf`
- `Solutions Architecture` <- `/resume/SA/Sushil_Kumar_Duseja_Resume.pdf`
- `Senior Java Developer` <- `/resume/JD/Duseja_Sushil_Kumar_Resume.pdf`
- `Agile Coach / Scrum Master` <- `/resume/SM/CV_Sushil_Duseja.pdf`
- `AI Safety and Governance (merged category)` <- `/resume/AI/Resume_Sushil_Duseja.pdf`

Normalize each PDF into one shared content schema used by both the interactive page and the PDF outputs:
- `id`, `label`, `primaryPositioning`, `summary`
- `coreCompetencies` with 5-8 short items
- `impactHighlights` with 3-4 quantified bullets
- `experienceHighlights` with 2-3 roles and 2-3 role-specific bullets each
- `supportingSignals` for certifications, research, tools, or domain context
- `downloadPdfPath`

Category-specific restructuring rules:
- `Technical Program Management / Technical Project Management`: lead with platform modernization, cross-functional delivery, budget/risk ownership, regulated-environment execution, and technical depth as supporting credibility.
- `Project Management`: lead with scope, timelines, stakeholder communication, delivery governance, KPI/risk tracking, and distributed execution; keep architecture and coding details secondary.
- `Business Analyst / Product Owner`: lead with requirements translation, roadmaps, backlog ownership, product launches, business outcomes, analytics, and AI/ML feature integration in regulated settings.
- `Solutions Architecture`: lead with target-state design, microservices/cloud migration, low-latency trading systems, security/compliance architecture, and scalable data platforms.
- `Senior Java Developer`: lead with hands-on Java/Spring engineering, event-driven systems, performance, DevSecOps, data layers, and production reliability; keep leadership only as context.
- `Agile Coach / Scrum Master`: lead with agile transformation, coaching, ceremonies, metrics, team health, adoption, and process improvement; retain tooling/technical fluency only as enablers.
- `AI Safety and Governance (merged category)`: merge research, governance frameworks, safety controls, auditability, fairness, prompt-injection defense, and human-override patterns into one unified profile; do not split research and advisory into separate identities.

Content handling rules:
- Reuse the same employers across categories only when role-relevant, and rewrite the emphasis, not the facts.
- Remove duplicated bullets unless they are essential proof for more than one category.
- Preserve measurable claims from source PDFs, but compress wording for recruiter scanning.
- Flag any ambiguous or corrupted extraction text for manual PDF verification before implementation.

## UI, Interaction, And Output Design
Replace the matrix layout with a neutral enterprise single-page layout:
- Header: full name, one-line positioning tied to the active category, location/contact, primary `Download PDF` action for the active profile.
- Category selector: seven horizontal tabs in the required order, full labels shown, wrapping on smaller screens, with sticky behavior on scroll if it improves scan speed.
- Main content order: `Core Competencies`, `Impact Highlights`, `Experience Highlights`.
- First viewport goal: recruiter can identify active role, 3 strongest proofs, and the matching PDF download without scrolling far.
- Visual direction: light or warm-neutral theme, charcoal text, subtle gray dividers, no gradients, no blue/purple accents, no AI-styled glow effects, no decorative matrix metaphors.
- Typography and spacing: readable enterprise hierarchy, body text sized for fast scanning, compact but not dense, consistent rhythm across all categories.
- Motion: only a short content crossfade/slide on tab switch and clear focus/hover states; no page-level animation.

Interaction model:
- Default active category is `Technical Program Management / Technical Project Management`.
- Switching tabs updates header positioning, competencies, impact bullets, experience highlights, and download link in place with no reload.
- Support mouse, keyboard, and deep-link state via hash or equivalent simple client-side state.
- Keep all content local in the page or a local data file to avoid runtime fetch complexity on GitHub Pages.

Seven-output plan:
- Treat the seven role PDFs as the primary deliverables, per your instruction.
- Build one shared print-ready template from the normalized content model and export seven consistent PDFs from it.
- Keep the interactive page as the on-site selector and preview surface because the UX requirements explicitly require dynamic switching.
- Ensure the interactive page and the exported PDFs are generated from the same content source so wording cannot drift.

## Execution Sequence
1. Audit the current mockup and remove every out-of-scope concept from the implementation target: matrix scoring, extra identities, placeholder links, gradients, and invented copy.
2. Extract each PDF into a content worksheet, then manually verify against the original PDFs where extraction is broken or encoded.
3. Normalize all seven categories into the shared schema and enforce the exact order and merged AI category naming.
4. Trim and rewrite each category into standalone recruiter-first content blocks using only source facts and quantified outcomes.
5. Define the final page information architecture and print template so both surfaces use the same sections and hierarchy.
6. Rebuild the front end as plain HTML, CSS, and minimal JavaScript with tab switching, default TPM landing, and active-category PDF download action.
7. Generate the seven checked-in PDF outputs from the shared print template and verify that each PDF reinforces its category as the primary identity.
8. Run final QA across content fidelity, readability, responsiveness, accessibility, and no-reload switching behavior.

## Test Plan
- Category order matches the required 1-7 list exactly on page load and in any download controls.
- Default load shows `Technical Program Management / Technical Project Management` with no click required.
- Every displayed bullet can be traced back to its category PDF; no invented or generic filler remains.
- Tab switching updates all dependent content and the active PDF link without a page refresh.
- Recruiter-first scan test: within a few seconds, the page shows active identity, top competencies, quantified impact, and relevant experience.
- Mobile test: no forced matrix scroll, no clipped labels, no unreadable dense blocks.
- Accessibility test: visible focus states, keyboard-operable tabs, sufficient contrast, sensible semantic headings.
- PDF test: seven outputs exist, use the same structure/style, fit cleanly on the intended page count, and preserve role-specific positioning.

## Assumptions
- The existing PDFs in `/resume` are the factual source of truth, but not the final presentation format.
- The interactive site remains part of scope even though the seven tailored outputs are PDF-first.
- Any corrupted PDF extraction segments are resolved by manual verification against the original PDF, not by inventing replacement text.
- A shared local data source is preferable to duplicating content separately across HTML and PDFs.
