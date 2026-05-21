# Website Reevaluation Iterations

This log records the self-review loop used for the publication-grade website pass.

| Phase | Focus | Result |
|---|---|---|
| 1 | Baseline audit | Identified stale fallback pages, oversized first screen, mixed section language, and need for repeatable checks. |
| 2 | Content integrity | Replaced fallback copy with clean Korean-first publication text and kept UTF-8 validation in the audit harness. |
| 3 | Information architecture | Reordered the public flow around latest result, metrics, comparison, findings, archive, methods, and evidence files. |
| 4 | Visual hierarchy | Reduced headline scale, tightened spacing, improved cards, badges, and section rhythm. |
| 5 | Chart and graph readability | Rebuilt chart rendering with clearer axes, units, event markers, peaks, legends, and responsive scroll behavior. |
| 6 | Data trust | Preserved `tests/index.json` as source of truth and added checks for required catalog fields, links, artifacts, and TSV headers. |
| 7 | Interaction behavior | Kept language, theme, tabs, aligned/absolute mode, and archive sort interactions with persistent preferences. |
| 8 | Accessibility | Added semantic nav, tab roles, focus-visible states, one-H1 fallback checks, alt text checks, and visually hidden labels. |
| 9 | Responsive layout | Added mobile breakpoints for hero, metrics, evidence links, tables, artifacts, and chart overflow. |
| 10 | No-JS fallback | Rewrote static homepage and detail pages so summaries and file links remain useful before hydration. |
| 11 | Resilience and performance | Added fetch failure UI, localStorage guards, downsampled chart series, and static dependency-free checks. |
| 12 | Publication polish | Simplified public copy, normalized test titles, fixed Markdown unit consistency, and removed internal-sounding fallback text. |
| 13 | Regression loop | Rerun `python tools/audit_site.py` and browser checks after each fix; repeat visual/content passes until stopped. |

## Commands

```powershell
python tools/audit_site.py
python -m http.server 4173 --bind 127.0.0.1
```

## Monochrome Editorial Redesign Loop

| Phase | Focus | Result |
|---|---|---|
| 1 | Reference audit | Applied McKinsey/Reuters/Datawrapper/FT lessons: chart-led structure, concise copy, subtle grids, direct evidence. |
| 2 | Copy reset | Replaced “public review” phrasing with plain editorial report language. |
| 3 | Language default | Changed the hydrated and fallback experience to English-first while preserving KO toggle. |
| 4 | Palette reset | Removed green/teal/accent color system from the UI and moved to black, white, off-white, and gray. |
| 5 | Type scale | Reduced hero typography to article/report scale and removed giant landing-page behavior. |
| 6 | Layout | Reduced dashboard-card feeling with metric strips, rules, and report-style sections. |
| 7 | Chart encoding | Latest run uses a black line; previous/raw/reference lines use gray and dashed styling. |
| 8 | Annotation | Kept ignition, burn end, and peak labels while adding source notes below charts. |
| 9 | Detail pages | Updated detail fallbacks and hydrated pages to read as technical report records. |
| 10 | Mobile | Preserved chart scroll and no-overflow expectations for narrow viewports. |
| 11 | Static fallback | Rebuilt no-JS pages as English-first evidence pages. |
| 12 | Audit harness | Added checks for English default, monochrome color tokens, chart source notes, and editorial type scale. |
| 13 | Regression | Rerun static audit and browser checks after each visual adjustment. |
