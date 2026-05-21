#!/usr/bin/env python3
"""Dependency-free static audit for the PSI results site."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parents[1]
TEXT_EXTENSIONS = {".html", ".js", ".css", ".json", ".md", ".txt"}
MOJIBAKE_MARKERS = ("Ã", "Â", "�", "ì—", "ì‹", "ê³", "íŒ", "ë")
REQUIRED_TSV_HEADERS = {
    "time_s",
    "raw_force_N",
    "corrected_force_N",
    "filtered_force_N",
    "raw_gauge_pressure",
    "filtered_gauge_pressure",
}


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str]] = []
        self.scripts: list[str] = []
        self.stylesheets: list[str] = []
        self.images: list[tuple[str, str]] = []
        self.buttons = 0
        self.h1 = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {key: value or "" for key, value in attrs}
        if tag == "a" and attrs_dict.get("href"):
            self.links.append(("href", attrs_dict["href"]))
        if tag == "script" and attrs_dict.get("src"):
            self.scripts.append(attrs_dict["src"])
        if tag == "link" and attrs_dict.get("rel") == "stylesheet" and attrs_dict.get("href"):
            self.stylesheets.append(attrs_dict["href"])
        if tag == "img":
            self.images.append((attrs_dict.get("src", ""), attrs_dict.get("alt", "")))
        if tag == "button":
            self.buttons += 1
        if tag == "h1":
            self.h1 += 1


def fail(message: str, failures: list[str]) -> None:
    failures.append(message)


def repo_path(path: str, base: Path) -> Path | None:
    parsed = urlparse(path)
    if parsed.scheme in {"http", "https", "mailto"} or path.startswith("#"):
        return None
    clean = unquote(parsed.path)
    if not clean:
        return None
    return (base.parent / clean).resolve()


def audit_encoding(failures: list[str]) -> None:
    for path in ROOT.rglob("*"):
        if ".git" in path.parts or not path.is_file() or path.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError as exc:
            fail(f"encoding: {path.relative_to(ROOT)} is not UTF-8 ({exc})", failures)
            continue
        for marker in MOJIBAKE_MARKERS:
            if marker in text:
                fail(f"encoding: possible mojibake marker {marker!r} in {path.relative_to(ROOT)}", failures)
                break


def audit_catalog(failures: list[str]) -> dict:
    catalog_path = ROOT / "tests" / "index.json"
    try:
        catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    except Exception as exc:
        fail(f"catalog: tests/index.json is invalid JSON ({exc})", failures)
        return {"tests": []}

    tests = catalog.get("tests", [])
    if not tests:
        fail("catalog: no tests listed", failures)
    for item in tests:
        for key in ["id", "date", "title", "summary", "metrics", "events", "links", "artifacts"]:
            if key not in item:
                fail(f"catalog: {item.get('id', '<unknown>')} missing {key}", failures)
        links = item.get("links", {})
        for link_key in ["page", "markdown", "pipelineData", "executiveReport"]:
            path = ROOT / links.get(link_key, "")
            if not path.exists():
                fail(f"catalog: {item.get('id')} {link_key} missing at {links.get(link_key)}", failures)
        for figure in item.get("artifacts", {}).get("figures", []):
            path = ROOT / figure.get("path", "")
            if not path.exists():
                fail(f"catalog: {item.get('id')} figure missing at {figure.get('path')}", failures)

        pipeline = ROOT / links.get("pipelineData", "")
        if pipeline.exists():
            header = set(pipeline.read_text(encoding="utf-8").splitlines()[0].split("\t"))
            missing = REQUIRED_TSV_HEADERS - header
            if missing:
                fail(f"pipeline: {pipeline.relative_to(ROOT)} missing headers {sorted(missing)}", failures)
    return catalog


def audit_html(failures: list[str]) -> None:
    for path in [ROOT / "index.html", *sorted((ROOT / "tests").glob("*/index.html"))]:
        parser = LinkParser()
        text = path.read_text(encoding="utf-8")
        parser.feed(text)
        if path.name == "index.html" and path.parent == ROOT and '<html lang="en">' not in text:
            fail("html: homepage fallback is not English-first", failures)
        if "<meta charset=\"utf-8\">" not in text.lower():
            fail(f"html: {path.relative_to(ROOT)} missing utf-8 charset", failures)
        if parser.h1 != 1:
            fail(f"html: {path.relative_to(ROOT)} expected one h1, found {parser.h1}", failures)
        if "window.PSI_PAGE_CONFIG" not in text:
            fail(f"html: {path.relative_to(ROOT)} missing PSI_PAGE_CONFIG", failures)
        for kind, link in parser.links:
            resolved = repo_path(link, path)
            if resolved and not resolved.exists():
                fail(f"link: {path.relative_to(ROOT)} {kind} target missing: {link}", failures)
        for script in parser.scripts:
            resolved = repo_path(script, path)
            if resolved and not resolved.exists():
                fail(f"html: {path.relative_to(ROOT)} script missing: {script}", failures)
        for stylesheet in parser.stylesheets:
            resolved = repo_path(stylesheet, path)
            if resolved and not resolved.exists():
                fail(f"html: {path.relative_to(ROOT)} stylesheet missing: {stylesheet}", failures)
        for src, alt in parser.images:
            resolved = repo_path(src, path)
            if resolved and not resolved.exists():
                fail(f"image: {path.relative_to(ROOT)} image missing: {src}", failures)
            if src and not alt:
                fail(f"image: {path.relative_to(ROOT)} image missing alt: {src}", failures)


def audit_css_js(failures: list[str]) -> None:
    css = (ROOT / "assets" / "site.css").read_text(encoding="utf-8")
    js = (ROOT / "assets" / "site.js").read_text(encoding="utf-8")
    required_css = ["@media (max-width: 720px)", ".chart-shell", ".status-badge", ".visually-hidden", ".chart-source"]
    required_js = ["renderLineChart", "buildComparisonPanel", "renderDetail", "localStorage", "aria-selected"]
    for token in required_css:
        if token not in css:
            fail(f"css: missing {token}", failures)
    for token in required_js:
        if token not in js:
            fail(f"js: missing {token}", failures)
    if re.search(r"font-size:\s*[^;]*vw", css):
        fail("css: font-size uses viewport width directly", failures)
    if 'state.lang = localStorage.getItem(STORAGE_KEYS.lang) || "en"' not in js:
        fail("js: default language is not English", failures)
    if "Public Review" in js or "Public Review" in (ROOT / "index.html").read_text(encoding="utf-8"):
        fail("copy: old Public Review wording remains", failures)
    forbidden_color_tokens = [
        "#126b5b",
        "#0b4d42",
        "#78cab8",
        "#a1dfd1",
        "#177248",
        "#355f9f",
        "#a45532",
        "#93620f",
    ]
    lower_css = css.lower()
    for token in forbidden_color_tokens:
        if token in lower_css:
            fail(f"css: non-monochrome color token remains: {token}", failures)
    for selector in [".hero__title", ".detail-hero__title"]:
        match = re.search(rf"{re.escape(selector)}[^\{{]*\{{[^}}]*font-size:\s*([0-9.]+)rem", css, re.S)
        if match and float(match.group(1)) > 3.25:
            fail(f"css: {selector} font size is too large for editorial layout", failures)


def main() -> int:
    failures: list[str] = []
    audit_encoding(failures)
    audit_catalog(failures)
    audit_html(failures)
    audit_css_js(failures)
    if failures:
        print("FAIL")
        for item in failures:
            print(f"- {item}")
        return 1
    print("PASS")
    print("- UTF-8 and mojibake scan passed")
    print("- Catalog, links, pipeline headers, and artifact paths passed")
    print("- Static HTML fallback and accessibility smoke checks passed")
    print("- CSS/JS feature smoke checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
