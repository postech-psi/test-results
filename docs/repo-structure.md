# Repo Structure Guide

This repository is a static GitHub Pages site for publishing PSI test results.

## Core Rule

Do not hand-edit each new test page.

For a new test, paste the raw result files into the standard folder and run the generator:

`powershell -ExecutionPolicy Bypass -File .\scripts\generate_test_site.ps1`

## Expected Folder Layout

```text
.
|- data/
|  \- tests.json
|- docs/
|  \- repo-structure.md
|- scripts/
|  \- generate_test_site.ps1
|- tests/
|  \- YYYY-MM-DD/
|     |- index.md
|     |- index.html
|     \- assets/
|        \- YYYY-MM-DD/
|           |- *_executive_report.txt
|           |- *_pipeline_data.txt
|           |- *combined_plot*.png
|           |- *loadcell_plot*.png
|           \- *barometer_plot*.png
```

## Add A New Test

1. Create `tests/YYYY-MM-DD/assets/YYYY-MM-DD/`.
2. Paste the raw output files into that folder.
3. Run the generator script.
4. Review the updated `data/tests.json` and generated pages.
5. Commit and push.

## Generated Files

The generator updates these files automatically:

- `data/tests.json`
- `README.md`
- `index.md`
- `tests/YYYY-MM-DD/index.md`
- `tests/YYYY-MM-DD/index.html`
