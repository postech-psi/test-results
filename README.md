# PSI Test Results

Repository for publishing and organizing PSI test results.

GitHub Markdown is the primary home for this archive.
The website is a secondary view:
[https://postech-psi.github.io/test-results/](https://postech-psi.github.io/test-results/)

## Add A New Test

1. Create `tests/YYYY-MM-DD/assets/YYYY-MM-DD/`.
2. Paste the raw result files into that folder.
3. Run the command below.
4. `data/tests.json`, `tests/YYYY-MM-DD/index.md`, and `tests/YYYY-MM-DD/index.html` are generated automatically.

Run:
`powershell -ExecutionPolicy Bypass -File .\scripts\generate_test_site.ps1`

## Published Tests

- 2026/4/3 Static Fire Test
  - Web page: [https://postech-psi.github.io/test-results/tests/2026-04-03/index.html](https://postech-psi.github.io/test-results/tests/2026-04-03/index.html)
  - Markdown: [https://github.com/postech-psi/test-results/blob/main/tests/2026-04-03/index.md](https://github.com/postech-psi/test-results/blob/main/tests/2026-04-03/index.md)

GitHub Actions runs the same script on push, so copying raw result files into the standard folder and pushing is enough to refresh generated pages.
