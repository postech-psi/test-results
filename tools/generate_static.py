#!/usr/bin/env python3
"""Generate the no-JS static fallback HTML (home + per-test detail) from
tests/index.json so the static markup never drifts from the catalog.

The interactive experience is rendered by assets/site.js at runtime; these
files only need to be accurate, accessible fallbacks for no-JS clients and
crawlers. Run from the repo root:  python tools/generate_static.py
"""
import html
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERSION = "2026-06-16-no-intro-copy"

CARD_DIGITS = {
    "maxThrustN": (2, "N"),
    "totalImpulseNs": (2, "N s"),
    "burnTimeMs": (1, "ms"),
    "maxPressureBar": (3, "bar"),
}


def esc(value):
    return html.escape(str(value), quote=True)


def en(field):
    if isinstance(field, dict):
        return field.get("en") or field.get("ko") or ""
    return field if field is not None else ""


def fmt_delta(value, unit, digits):
    sign = "+" if value >= 0 else ""
    return f"{sign}{value:.{digits}f} {unit}"


def head(title, description, css_href, lang="en"):
    return f"""<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <link rel="stylesheet" href="{css_href}?v={VERSION}">
</head>
<body data-theme="light">"""


def scripts(root_path, page_config):
    cfg = json.dumps(page_config)
    base = f"{root_path}/assets"
    return f"""  <script>window.PSI_PAGE_CONFIG = {cfg};</script>
  <script src="{base}/vendor/echarts.min.js?v={VERSION}" defer></script>
  <script src="{base}/charts.js?v={VERSION}" defer></script>
  <script src="{base}/site.js?v={VERSION}" defer></script>
</body>
</html>
"""


def metric_card(label, value, delta=""):
    delta_html = f'<div class="metric-card__delta">{delta}</div>' if delta else ""
    return f"""        <article class="metric-card">
          <div class="metric-card__label">{esc(label)}</div>
          <div class="metric-card__value">{esc(value)}</div>
          {delta_html}
        </article>"""


def status_badges(test):
    level = (test.get("issueSummary") or {}).get("level", "none")
    issue_label = en((test.get("issueSummary") or {}).get("label", "No issues"))
    pub = en(test.get("statusLabel", "Published"))
    return (f'<span class="status-badge published">{esc(pub)}</span> '
            f'<span class="status-badge {esc(level)}">{esc(issue_label)}</span>')


def brand_header(root_path, title="Static Fire Test Results", controls='<span class="muted">EN / KO</span>'):
    base = f"{root_path}/assets"
    return f"""  <header class="site-header">
    <div class="site-header__inner">
      <div class="brand">
        <span class="logo-surface brand__logo-surface"><img class="brand__banner" src="{base}/logos/psi-logo-banner.jpeg" alt="PSI Postech Aerospace Initiative"></span>
        <div class="brand__text"><div class="brand__eyebrow">Postech Aerospace Initiative</div><div class="brand__title">{esc(title)}</div></div>
      </div>
      <div class="site-header__controls">{controls}</div>
    </div>
  </header>"""


def build_home(data):
    site = data["site"]
    tests = data["tests"]
    latest = tests[0]
    previous = tests[1] if len(tests) > 1 else None
    name = en(site["name"])
    meta = site["pageMeta"]["home"]

    cards = []
    for key, (digits, unit) in CARD_DIGITS.items():
        metric = latest["metrics"][key]
        delta = ""
        if previous:
            d = metric["value"] - previous["metrics"][key]["value"]
            arrow = "&#9650;" if d >= 0 else "&#9660;"
            delta = f'{arrow} {esc(fmt_delta(d, unit, digits))} vs {esc(previous["date"])}'
        cards.append(metric_card(en_metric_label(key), metric["display"], delta))

    rows = []
    for t in tests:
        rows.append(f"""            <tr>
              <td>{esc(t['date'])}</td>
              <td><strong>{esc(en(t['title']))}</strong><div class="muted">{esc(en(t['summary']))}</div></td>
              <td><span class="status-badge published">{esc(en(t['statusLabel']))}</span></td>
              <td><span class="status-badge {esc((t.get('issueSummary') or {}).get('level','none'))}">{esc(en((t.get('issueSummary') or {}).get('label','No issues')))}</span></td>
              <td>{esc(t['metrics']['maxThrustN']['display'])}</td>
              <td>{esc(t['metrics']['totalImpulseNs']['display'])}</td>
              <td>{esc(t['metrics']['maxPressureBar']['display'])}</td>
              <td><a class="archive-action" href="{esc(t['links']['page'])}">View test</a></td>
            </tr>""")

    body = f"""{head(en(meta['title']), en(meta['description']), 'assets/site.css')}
{brand_header('.', name)}

  <main class="site-shell static-shell">
    <section class="hero" id="overview">
      <div class="hero__grid">
        <div>
          <div class="verdict">Static fire test report</div>
          <h1 class="hero__title">{esc(en(site['name']))}</h1>
        </div>
        <aside class="hero__panel">
          <div class="hero__panel-header">
            <h2>Latest test &middot; {esc(latest['date'])}</h2>
            <span class="logo-surface hero__logo-surface"><img class="hero__emblem" src="assets/logos/psi-logo-circle.jpg" alt="Postech Aerospace Initiative circular logo"></span>
          </div>
          <div class="hero__summary">
            <div class="hero-stat"><div class="hero-stat__label">Peak thrust</div><div class="hero-stat__value">{esc(latest['metrics']['maxThrustN']['display'])}</div></div>
            <div class="hero-stat"><div class="hero-stat__label">Total impulse</div><div class="hero-stat__value">{esc(latest['metrics']['totalImpulseNs']['display'])}</div></div>
            <div class="hero-stat"><div class="hero-stat__label">Published tests</div><div class="hero-stat__value">{len(tests)}</div></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-heading"><h2>Latest test</h2></div>
      <div class="overview-grid">
{chr(10).join(cards)}
      </div>
    </section>

    <section class="section" id="archive">
      <div class="section-heading"><h2>Archive</h2></div>
      <div class="archive-table">
        <table>
          <thead><tr><th>Date</th><th>Test</th><th>Status</th><th>Issue</th><th>Peak thrust</th><th>Total impulse</th><th>Peak pressure</th><th>Link</th></tr></thead>
          <tbody>
{chr(10).join(rows)}
          </tbody>
        </table>
      </div>
    </section>

  </main>

{scripts('.', {'page': 'home', 'rootPath': '.'})}"""
    return body


def en_metric_label(key):
    return {
        "maxThrustN": "Peak thrust",
        "totalImpulseNs": "Total impulse",
        "burnTimeMs": "Burn duration",
        "maxPressureBar": "Peak pressure",
    }[key]


def rel_from_detail(test, path):
    """Convert a root-relative catalog path to one relative to tests/<date>/."""
    prefix = f"tests/{test['date']}/"
    if path.startswith(prefix):
        return path[len(prefix):]
    return "../../" + path


def build_detail(data, test):
    meta = test["meta"]
    cards = "\n".join([
        metric_card("Date", test["date"], status_badges(test)),
        metric_card("Peak thrust", test["metrics"]["maxThrustN"]["display"], f"Average thrust: {esc(test['metrics']['averageThrustN']['display'])}"),
        metric_card("Total impulse", test["metrics"]["totalImpulseNs"]["display"], f"Burn duration: {esc(test['metrics']['burnTimeMs']['display'])}"),
        metric_card("Peak pressure", test["metrics"]["maxPressureBar"]["display"], f"Peak time: {esc(test['metrics']['maxPressureTimeS']['display'])}"),
    ])

    figures = "\n".join([
        f'          <p><a href="{esc(rel_from_detail(test, fig["path"]))}">{esc(en(fig["label"]))}</a></p>'
        for fig in test["artifacts"]["figures"]
    ])

    body = f"""{head(en(meta['title']), en(meta['description']), '../../assets/site.css')}
{brand_header('../..', 'Static Fire Test Results', '<a href="../../index.html">All results</a>')}

  <main class="site-shell static-shell">
    <section class="detail-hero">
      <a class="detail-hero__back" href="../../index.html">&larr; Back to results</a>
      <div class="verdict">Static fire test report</div>
      <h1 class="detail-hero__title">{esc(en(test['title']))}</h1>
      <div class="detail-summary">
{cards}
      </div>
    </section>

    <section class="section">
      <div class="section-heading"><h2>Result files</h2></div>
      <div class="fallback-grid">
        <article class="fallback-card">
          <h3>Result files</h3>
          <p><a href="{esc(rel_from_detail(test, test['links']['executiveReport']))}">Executive report</a></p>
          <p><a href="{esc(rel_from_detail(test, test['links']['pipelineData']))}">Pipeline data</a></p>
          <p><a href="index.md">Markdown record</a></p>
        </article>
        <article class="fallback-card">
          <h3>Reference figures</h3>
{figures}
        </article>
      </div>
      <noscript><div class="empty-state" style="margin-top:18px;">JavaScript is disabled. The summary and file links remain available.</div></noscript>
    </section>
  </main>

{scripts('../..', {'page': 'detail', 'rootPath': '../..', 'testId': test['id']})}"""
    return body


def main():
    with open(os.path.join(ROOT, "tests", "index.json"), encoding="utf-8") as fh:
        data = json.load(fh)

    home = build_home(data)
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(home)
    print("wrote index.html")

    for test in data["tests"]:
        out = os.path.join(ROOT, "tests", test["date"], "index.html")
        with open(out, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(build_detail(data, test))
        print(f"wrote tests/{test['date']}/index.html")


if __name__ == "__main__":
    main()
