# Repo Structure Guide

This repository is a static GitHub Pages site for publishing PSI test results.

## Core Rule

Keep the repository simple and editable by hand.

## Expected Folder Layout

```text
.
|- guide.md
|- test-entry-notes.md
|- tests/
|  \- index.json
|  \- YYYY-MM-DD/
|     |- index.md
|     |- index.html
|     \- files/
|        |- *_executive_report.txt
|        |- *_pipeline_data.txt
|        |- *combined_plot*.png
|        |- *loadcell_plot*.png
|        \- *barometer_plot*.png
```

## Add A New Test

1. Create `tests/YYYY-MM-DD/`.
2. Add `index.md` and `index.html` for that test.
3. Place result assets in `tests/YYYY-MM-DD/files/`.
4. Update `README.md`, `index.md`, and `tests/index.json` as needed.
5. Commit and push.
