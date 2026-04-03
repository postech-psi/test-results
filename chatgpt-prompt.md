# ChatGPT Prompt

Use the prompt below when asking ChatGPT to update or extend this repository.

```md
You are helping maintain the repository `postech-psi/test-results`.

Project purpose:
- This repository publishes PSI test results.
- GitHub Markdown is the primary home of the archive.
- The website is a secondary view.

Current repository structure:
- `README.md`: main GitHub-facing summary
- `index.html`: simple website homepage
- `index.md`: root markdown index
- `guide.md`: repository structure guide
- `test-entry-notes.md`: notes for adding test entries
- `tests/index.json`: homepage test list data
- `tests/YYYY-MM-DD/index.md`: markdown page for a test
- `tests/YYYY-MM-DD/index.html`: html page for a test
- `tests/YYYY-MM-DD/files/`: raw result files and plots for a test

Important content and style rules:
- Keep the repository simple and easy to edit by hand.
- Do not add automation scripts, generators, or GitHub Actions unless explicitly requested.
- Do not reintroduce auto-generation workflow files or helper scripts.
- GitHub Markdown is the main presentation layer; the website supports it.
- Keep README concise and useful for people browsing the GitHub repo.
- Most explanatory UI text should be in Korean.
- Do not translate data-like plot titles unless asked.
- Test titles should be in Korean when appropriate, for example `정적 연소 시험`.
- Avoid overengineering the folder structure.
- Prefer intuitive names and shallow structure.

Homepage rules:
- The homepage should stay minimal, modern, and clean, similar to a simple GitHub Pages-style site.
- Keep light/dark mode toggle support.
- Avoid decorative or overly flashy design.
- Korean homepage text must not be garbled; preserve UTF-8.
- Homepage data source is `tests/index.json`.

Repository wording rules:
- README should say that the repository is organized primarily around GitHub Markdown.
- The website should be described as a secondary view.
- Keep README links practical and public-facing.
- Avoid clutter like internal maintenance links unless they are genuinely useful.

How to add a new test:
- Add a new folder under `tests/YYYY-MM-DD/`.
- Put raw result files into `tests/YYYY-MM-DD/files/`.
- Update `tests/index.json`.
- Create or update `tests/YYYY-MM-DD/index.md`.
- Create or update `tests/YYYY-MM-DD/index.html`.
- Update `README.md` and `index.md` only when needed.

When editing:
- Preserve existing working content unless there is a clear reason to improve it.
- Make focused changes only.
- If restructuring, explain why the new structure is more intuitive.
- Keep paths and links consistent after any move.
- Be careful not to break existing published test pages.

What I may ask you to do next:
- Add another test result page
- Rewrite Korean or English wording
- Clean up homepage layout
- Improve manual maintenance flow
- Reorganize files more intuitively, but only if truly simpler

When responding:
- First summarize what you think should change.
- Then provide exact file-level edits or content.
- If there are tradeoffs, keep them short and practical.
```

