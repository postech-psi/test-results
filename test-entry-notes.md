# Adding a test record

1. Confirm the calendar date and identify which files contain actual thrust events. Preserve all original recordings.
2. Run `Calibration/tms_data_pipeline.py` in the TMS repository with an explicit input file and canonical output prefix. Follow the [naming and structure guide](./guide.md).
3. Add the raw recordings, derived data, quality/provenance inventory, report, figures, and supplied video under `tests/YYYY-MM-DD/files/`.
4. Add the date's Markdown page and matching catalog entry in `tests/index.json`; keep unavailable values null and disclose provisional metrics.
5. Refresh the HTML pages, README, and Markdown index. Check links, raw hashes, numeric consistency, and browser behavior before publishing.

The date is a session identity. SD file numbers do not identify global test order. Startup probes and no-event recordings belong to the inventory, not additional firing entries.
