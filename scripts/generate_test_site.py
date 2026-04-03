#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List


ROOT = Path(__file__).resolve().parents[1]
TESTS_DIR = ROOT / "tests"
DATA_DIR = ROOT / "data"


REPORT_LABELS = {
    "Input file": "입력 파일",
    "Sampling rate": "샘플링 속도",
    "Ignition delay": "점화 지연",
    "Peak thrust": "최대 추력",
    "Total impulse": "총 임펄스",
    "Average thrust": "평균 추력",
    "Burn duration": "연소 시간",
    "Peak pressure": "최대 압력",
    "Drift correction": "드리프트 보정",
    "Loadcell threshold (3 percent)": "로드셀 임계값 (3%)",
    "Loadcell filter": "추력 필터",
    "Pressure filter": "압력 필터",
    "Pressure baseline offset": "압력 기준 오프셋",
    "Loadcell baseline offset": "로드셀 기준 오프셋",
    "Loadcell baseline window end": "로드셀 기준 구간 종료",
    "Ignition start time": "점화 시작 시점",
    "Loadcell calibration slope": "로드셀 보정 기울기",
    "Loadcell calibration intercept": "로드셀 보정 절편",
    "Loadcell calibration R^2": "로드셀 보정 R^2",
    "Pressure conversion": "압력 변환식",
}


@dataclass
class TestEntry:
    date: str
    title: str
    summary: str
    metrics: Dict[str, str]
    metric_rows: List[List[str]]
    note_rows: List[List[str]]
    calibration_rows: List[List[str]]
    links: Dict[str, str]
    assets_dir: Path
    report_file: Path
    pipeline_file: Path
    combined_plot: str | None
    loadcell_plot: str | None
    barometer_plot: str | None


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")


def date_title(date_str: str) -> str:
    year, month, day = date_str.split("-")
    return f"{int(year)}/{int(month)}/{int(day)} 연소 시험"


def summarize(metrics: Dict[str, str]) -> str:
    max_thrust = metrics.get("Peak thrust", "-")
    total_impulse = metrics.get("Total impulse", "-")
    return f"자동 생성된 시험 결과입니다. 최대 추력 {max_thrust}, 총 임펄스 {total_impulse}."


def classify_file(name: str) -> str | None:
    lowered = name.lower()
    if lowered.endswith("_executive_report.txt") or lowered.endswith("executive_report.txt") or "executive_report" in lowered:
        return "report"
    if lowered.endswith("_pipeline_data.txt") or lowered.endswith("pipeline_data.txt") or "pipeline_data" in lowered:
        return "pipeline"
    if "combined_plot" in lowered:
        return "combined"
    if "loadcell_plot" in lowered:
        return "loadcell"
    if "barometer_plot" in lowered:
        return "barometer"
    return None


def parse_report(report_text: str) -> tuple[Dict[str, str], List[str]]:
    metrics: Dict[str, str] = {}
    misc_lines: List[str] = []
    for raw_line in report_text.splitlines():
      line = raw_line.strip()
      if not line or set(line) == {"="} or set(line) == {"-"}:
          continue
      if ":" in line:
          key, value = line.split(":", 1)
          metrics[key.strip()] = value.strip()
      elif "REPORT" not in line:
          misc_lines.append(line)
    return metrics, misc_lines


def make_metric_rows(parsed: Dict[str, str]) -> List[List[str]]:
    rows: List[List[str]] = []
    for key in [
        "Input file",
        "Sampling rate",
        "Ignition delay",
        "Burn duration",
        "Peak thrust",
        "Average thrust",
        "Total impulse",
        "Peak pressure",
    ]:
        if key in parsed:
            rows.append([REPORT_LABELS[key], parsed[key]])
    return rows


def make_note_rows(parsed: Dict[str, str]) -> List[List[str]]:
    rows: List[List[str]] = []
    for key in [
        "Drift correction",
        "Loadcell threshold (3 percent)",
        "Loadcell filter",
        "Pressure filter",
        "Pressure baseline offset",
        "Loadcell baseline offset",
        "Loadcell baseline window end",
        "Ignition start time",
    ]:
        if key in parsed:
            rows.append([REPORT_LABELS[key], parsed[key]])
    return rows


def make_calibration_rows(parsed: Dict[str, str]) -> List[List[str]]:
    rows: List[List[str]] = []
    for key in [
        "Loadcell calibration slope",
        "Loadcell calibration intercept",
        "Loadcell calibration R^2",
        "Pressure conversion",
    ]:
        if key in parsed:
            rows.append([REPORT_LABELS[key], parsed[key]])
    return rows


def find_test_entries() -> List[TestEntry]:
    entries: List[TestEntry] = []
    if not TESTS_DIR.exists():
        return entries

    for test_dir in sorted([path for path in TESTS_DIR.iterdir() if path.is_dir()]):
        date_str = test_dir.name
        assets_root = test_dir / "assets" / date_str
        if not assets_root.exists():
            continue

        classified: Dict[str, Path] = {}
        for child in assets_root.iterdir():
            file_type = classify_file(child.name)
            if file_type:
                classified[file_type] = child

        report_file = classified.get("report")
        pipeline_file = classified.get("pipeline")
        if not report_file or not pipeline_file:
            continue

        parsed, _ = parse_report(read_text(report_file))
        title = date_title(date_str)
        summary = summarize(parsed)
        entries.append(
            TestEntry(
                date=date_str,
                title=title,
                summary=summary,
                metrics={
                    "ignitionDelayMs": parsed.get("Ignition delay", "-"),
                    "burnTimeMs": parsed.get("Burn duration", "-"),
                    "maxThrustN": parsed.get("Peak thrust", "-"),
                    "averageThrustN": parsed.get("Average thrust", "-"),
                    "totalImpulseNs": parsed.get("Total impulse", "-"),
                    "maxPressure": parsed.get("Peak pressure", "-"),
                },
                metric_rows=make_metric_rows(parsed),
                note_rows=make_note_rows(parsed),
                calibration_rows=make_calibration_rows(parsed),
                links={
                    "page": f"./tests/{date_str}/index.html",
                    "markdown": f"./tests/{date_str}/index.md",
                    "assets": f"./tests/{date_str}/assets/{date_str}/",
                },
                assets_dir=assets_root,
                report_file=report_file,
                pipeline_file=pipeline_file,
                combined_plot=classified.get("combined").name if classified.get("combined") else None,
                loadcell_plot=classified.get("loadcell").name if classified.get("loadcell") else None,
                barometer_plot=classified.get("barometer").name if classified.get("barometer") else None,
            )
        )

    entries.sort(key=lambda item: item.date, reverse=True)
    return entries


def markdown_table(rows: List[List[str]]) -> str:
    body = "\n".join(f"| {label} | {value} |" for label, value in rows)
    return f"| 항목 | 값 |\n|---|---|\n{body}" if rows else ""


def render_test_markdown(entry: TestEntry) -> str:
    sections: List[str] = [f"# {entry.title}", "", "## Graphs", ""]

    if entry.combined_plot:
        sections.extend([
            "### Combined Plot",
            "",
            f"![Combined Plot](./assets/{entry.date}/{entry.combined_plot})",
            "",
        ])
    if entry.loadcell_plot:
        sections.extend([
            "### Loadcell Plot",
            "",
            f"![Loadcell Plot](./assets/{entry.date}/{entry.loadcell_plot})",
            "",
        ])
    if entry.barometer_plot:
        sections.extend([
            "### Barometer Plot",
            "",
            f"![Barometer Plot](./assets/{entry.date}/{entry.barometer_plot})",
            "",
        ])

    sections.extend(["## Metrics", "", markdown_table(entry.metric_rows), ""])

    if entry.note_rows:
        sections.extend(["## Processing Notes", "", markdown_table(entry.note_rows), ""])

    if entry.calibration_rows:
        sections.extend(["## Calibration And Conversion", "", markdown_table(entry.calibration_rows), ""])

    sections.extend([
        "## Result Files",
        "",
        f"- [Executive Report](./assets/{entry.date}/{entry.report_file.name})",
        f"- [Pipeline Data](./assets/{entry.date}/{entry.pipeline_file.name})",
        "",
    ])
    return "\n".join(sections).strip() + "\n"


def html_rows(rows: List[List[str]]) -> str:
    return "\n".join(f"      <tr><td>{label}</td><td>{value}</td></tr>" for label, value in rows)


def render_image_card(title: str, filename: str | None, alt: str) -> str:
    if not filename:
        return ""
    return f"""
    <h2>{title}</h2>
    <div class="card">
      <img src="./assets/{alt}/{filename}" alt="{title}">
    </div>""".replace("{alt}", alt)


def render_test_html(entry: TestEntry) -> str:
    plots = []
    if entry.combined_plot:
        plots.append(
            f"""    <h2>Combined Plot</h2>
    <div class="card">
      <img src="./assets/{entry.date}/{entry.combined_plot}" alt="Combined Plot">
    </div>"""
        )
    if entry.loadcell_plot:
        plots.append(
            f"""    <h2>Loadcell Plot</h2>
    <div class="card">
      <img src="./assets/{entry.date}/{entry.loadcell_plot}" alt="Loadcell Plot">
    </div>"""
        )
    if entry.barometer_plot:
        plots.append(
            f"""    <h2>Barometer Plot</h2>
    <div class="card">
      <img src="./assets/{entry.date}/{entry.barometer_plot}" alt="Barometer Plot">
    </div>"""
        )

    return f"""<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{entry.title}</title>
  <style>
    :root {{
      --bg: #ffffff;
      --surface: #ffffff;
      --surface-strong: #f6f8fa;
      --text: #1f2328;
      --muted: #59636e;
      --accent: #0969da;
      --border: #d0d7de;
    }}
    @media (prefers-color-scheme: dark) {{
      :root {{
        --bg: #0d1117;
        --surface: #0d1117;
        --surface-strong: #161b22;
        --text: #e6edf3;
        --muted: #8b949e;
        --accent: #58a6ff;
        --border: #30363d;
      }}
    }}
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }}
    .wrap {{ width: min(960px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }}
    header {{ padding-bottom: 24px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }}
    h1 {{ margin: 0 0 8px; font-size: clamp(2rem, 4vw, 2.5rem); }}
    p {{ margin: 0; color: var(--muted); }}
    h2 {{ margin: 24px 0 12px; font-size: 1.1rem; }}
    .card {{ border: 1px solid var(--border); border-radius: 8px; background: var(--surface); padding: 16px; }}
    table {{ width: 100%; border-collapse: collapse; }}
    th, td {{ padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }}
    th {{ background: var(--surface-strong); }}
    tr:last-child td {{ border-bottom: 0; }}
    img {{ width: 100%; display: block; border-radius: 6px; border: 1px solid var(--border); background: var(--surface-strong); }}
    ul {{ margin: 0; padding-left: 20px; }}
    a {{ color: var(--accent); }}
    .stack {{ display: grid; gap: 24px; }}
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <h1>{entry.title}</h1>
      <p>{entry.summary}</p>
    </header>
    <div class="stack">
{os.linesep.join(plots)}
      <section>
        <h2>Metrics</h2>
        <div class="card">
          <table>
            <tr><th>항목</th><th>값</th></tr>
{html_rows(entry.metric_rows)}
          </table>
        </div>
      </section>
      <section>
        <h2>Processing Notes</h2>
        <div class="card">
          <table>
            <tr><th>항목</th><th>값</th></tr>
{html_rows(entry.note_rows)}
          </table>
        </div>
      </section>
      <section>
        <h2>Calibration And Conversion</h2>
        <div class="card">
          <table>
            <tr><th>항목</th><th>값</th></tr>
{html_rows(entry.calibration_rows)}
          </table>
        </div>
      </section>
      <section>
        <h2>Result Files</h2>
        <div class="card">
          <ul>
            <li><a href="./assets/{entry.date}/{entry.report_file.name}">Executive Report</a></li>
            <li><a href="./assets/{entry.date}/{entry.pipeline_file.name}">Pipeline Data</a></li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</body>
</html>
"""


def render_catalog(entries: List[TestEntry]) -> str:
    payload = {
        "tests": [
            {
                "id": f"{entry.date}-combustion",
                "date": entry.date,
                "title": entry.title,
                "category": "combustion",
                "summary": entry.summary,
                "status": "published",
                "metrics": entry.metrics,
                "links": entry.links,
            }
            for entry in entries
        ]
    }
    return json.dumps(payload, ensure_ascii=False, indent=2) + "\n"


def render_index_md(entries: List[TestEntry]) -> str:
    lines = ["# PSI Test Results", "", "## Published Tests", ""]
    for entry in entries:
        lines.append(f"- [{entry.title}]({entry.links['page']})")
    lines.extend([
        "",
        "## Repository Layout",
        "",
        "- 결과 페이지: `tests/YYYY-MM-DD/`",
        "- 메타데이터 카탈로그: `data/tests.json`",
        "- 자동 생성 스크립트: `scripts/generate_test_site.py`",
    ])
    return "\n".join(lines) + "\n"


def render_readme(entries: List[TestEntry]) -> str:
    lines = [
        "# PSI Test Results",
        "",
        "PSI 시험 결과 공개 및 정리용 저장소입니다.",
        "",
        "- 웹페이지 바로가기: [https://postech-psi.github.io/test-results/](https://postech-psi.github.io/test-results/)",
        "- 테스트 카탈로그: [data/tests.json](./data/tests.json)",
        "- 자동 생성 스크립트: [scripts/generate_test_site.py](./scripts/generate_test_site.py)",
        "- 작성 가이드: [docs/repo-structure.md](./docs/repo-structure.md)",
        "",
        "## 새 시험 추가",
        "",
        "1. `tests/YYYY-MM-DD/assets/YYYY-MM-DD/` 폴더를 만들고 결과 파일들을 그대로 복붙합니다.",
        "2. 아래 명령을 실행합니다.",
        "3. 자동으로 `data/tests.json`, `tests/YYYY-MM-DD/index.md`, `tests/YYYY-MM-DD/index.html` 이 생성됩니다.",
        "",
        "```powershell",
        "python .\\scripts\\generate_test_site.py",
        "```",
        "",
        "## 현재 공개된 시험",
        "",
    ]
    for entry in entries:
        lines.append(f"- {entry.date} {entry.title.split(' ', 1)[1] if ' ' in entry.title else entry.title}")
        lines.append(f"  - 웹페이지: [{entry.links['page']}]({entry.links['page']})")
        lines.append(f"  - Markdown: [{entry.links['markdown']}]({entry.links['markdown']})")
    lines.extend([
        "",
        "GitHub Actions에서도 같은 스크립트를 실행하도록 설정되어 있어, 결과 파일만 추가해 푸시해도 페이지가 다시 생성됩니다.",
    ])
    return "\n".join(lines) + "\n"


def main() -> None:
    entries = find_test_entries()
    DATA_DIR.mkdir(exist_ok=True)
    write_text(DATA_DIR / "tests.json", render_catalog(entries))
    write_text(ROOT / "index.md", render_index_md(entries))
    write_text(ROOT / "README.md", render_readme(entries))
    for entry in entries:
        write_text(TESTS_DIR / entry.date / "index.md", render_test_markdown(entry))
        write_text(TESTS_DIR / entry.date / "index.html", render_test_html(entry))
    print(f"Generated site for {len(entries)} test(s).")


if __name__ == "__main__":
    main()
