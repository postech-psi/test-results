# Test Entry Raw Files

Manual page writing is no longer required for a normal test upload.

Place the raw result files in:

`tests/YYYY-MM-DD/assets/YYYY-MM-DD/`

Recommended file set:

- `*_executive_report.txt`
- `*_pipeline_data.txt`
- `*combined_plot*.png`
- `*loadcell_plot*.png`
- `*barometer_plot*.png`

Then run:

`powershell -ExecutionPolicy Bypass -File .\scripts\generate_test_site.ps1`

The script generates the Markdown page, HTML page, and catalog entries automatically.
