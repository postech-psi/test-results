# Repository structure and naming

This repository publishes static fire records as Markdown and a static GitHub Pages site. Keep one entry per confirmed test date; retain associated idle recordings and startup probes in that session's inventory.

```text
tests/
  index.json
  YYYY-MM-DD/
    index.md
    index.html
    files/
      YYYY-MM-DD_tms-N_raw.txt
      YYYY-MM-DD_tms-N_executive_report.txt
      YYYY-MM-DD_tms-N_pipeline_data.txt
      YYYY-MM-DD_tms-N_quality.json
      YYYY-MM-DD_tms-N_combined_plot.png
      YYYY-MM-DD_tms-N_loadcell_plot.png
      YYYY-MM-DD_tms-N_barometer_plot.png
      YYYY-MM-DD_tms-N_video.mp4
      YYYY-MM-DD_tms-N_video_original.mp4
      YYYY-MM-DD_session_manifest.json
      YYYY-MM-DD_analysis.md
```

## Naming rules

- Dates and folder names use ISO `YYYY-MM-DD`. Titles use `YYYY-MM-DD Static Fire Test` in English and `YYYY년 M월 D일 연소 시험` in Korean.
- Canonical artifact names are lowercase ASCII, without spaces. Use `<date>_tms-<SD-recording-number>_<artifact>.<extension>`.
- An SD recording number is local to the recording session; `TMS_5` from two dates is not the same test. Never infer a firing count or calendar date from that number.
- If a historical recording number is unknown, use `<date>_tms_<artifact>`; April 3 has no known SD index. Do not invent one.
- Source filenames and hashes remain in provenance, and raw files retain their original bytes even when their published filenames change.
- Stable entry IDs remain `<date>-combustion`; page addresses remain `tests/<date>/index.html`. Catalog paths use forward slashes.
- Historical output values are preserved. Missing historical raw files are identified explicitly; derived arrays are not presented as original ADC logs.

The October 2026 cleanup replaces mixed `TMS_4`, `tms_5`, and `26.04.03 data` artifact stems with the canonical pattern. The [migration map](./tests/2026-10-13/files/2026-10-13_naming_migration.json) records old and new file paths. Test page addresses are unchanged; old direct artifact URLs have moved to the canonical paths.

## Data quality and publishing

`tests/index.json` is the catalog used by the website. Include metrics, processing, calibration, source provenance, links, and reference figures. Mark provisional measurements in their display and status fields. Use JSON `null` for unavailable metrics, never zero. Invalid pressure is excluded from comparison curves; suspect historical pressure is labeled.

Preserve all session recordings, including probes and no-event files, in the raw inventory. Count only clear firing events as published tests. Include the original video and a browser-compatible copy when supplied. Do not infer synchronization or thrust from plume duration.

Analysis code lives in [TMS](https://github.com/postech-psi/TMS), under `Calibration/tms_data_pipeline.py`; raw data and its analysis live in `Data/<year>/<month_day>/`. This publication repository contains the site and result artifacts, without session helper scripts or a copied pipeline.
