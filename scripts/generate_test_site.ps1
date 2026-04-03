$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$testsDir = Join-Path $root "tests"
$dataDir = Join-Path $root "data"

function Write-Utf8File {
    param(
        [string]$Path,
        [string]$Content
    )

    $directory = Split-Path -Parent $Path
    if (-not (Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Escape-Html {
    param([string]$Text)
    if ($null -eq $Text) { return "" }
    return $Text.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace('"', "&quot;")
}

function Parse-Report {
    param([string]$Path)

    $parsed = @{}
    foreach ($line in Get-Content $Path -Encoding utf8) {
        $trimmed = $line.Trim()
        if (-not $trimmed) { continue }
        if ($trimmed -match '^[=-]+$') { continue }
        if ($trimmed -notmatch ':') { continue }

        $parts = $trimmed.Split(':', 2)
        $key = $parts[0].Trim()
        $value = $parts[1].Trim()
        $parsed[$key] = $value
    }

    return $parsed
}

function Format-TestTitle {
    param([string]$DateString)
    $date = [datetime]::ParseExact($DateString, "yyyy-MM-dd", $null)
    return "{0}/{1}/{2} Static Fire Test" -f $date.Year, $date.Month, $date.Day
}

function Get-TestEntries {
    $entries = @()
    if (-not (Test-Path $testsDir)) {
        return $entries
    }

    $testDirs = Get-ChildItem $testsDir -Directory | Sort-Object Name -Descending
    foreach ($testDir in $testDirs) {
        $dateString = $testDir.Name
        $assetsDir = Join-Path $testDir.FullName ("assets\" + $dateString)
        if (-not (Test-Path $assetsDir)) {
            continue
        }

        $reportFile = Get-ChildItem $assetsDir -File | Where-Object { $_.Name -like "*executive_report*.txt" } | Select-Object -First 1
        $pipelineFile = Get-ChildItem $assetsDir -File | Where-Object { $_.Name -like "*pipeline_data*.txt" } | Select-Object -First 1
        if (-not $reportFile -or -not $pipelineFile) {
            continue
        }

        $combinedPlot = (Get-ChildItem $assetsDir -File | Where-Object { $_.Name -like "*combined_plot*" } | Select-Object -First 1)
        $loadcellPlot = (Get-ChildItem $assetsDir -File | Where-Object { $_.Name -like "*loadcell_plot*" } | Select-Object -First 1)
        $barometerPlot = (Get-ChildItem $assetsDir -File | Where-Object { $_.Name -like "*barometer_plot*" } | Select-Object -First 1)

        $parsed = Parse-Report -Path $reportFile.FullName
        $title = Format-TestTitle -DateString $dateString

        $entry = [ordered]@{
            date = $dateString
            title = $title
            summary = "Auto-generated test result. Peak thrust $($parsed['Peak thrust']), total impulse $($parsed['Total impulse'])."
            reportFileName = $reportFile.Name
            pipelineFileName = $pipelineFile.Name
            combinedPlotName = if ($combinedPlot) { $combinedPlot.Name } else { $null }
            loadcellPlotName = if ($loadcellPlot) { $loadcellPlot.Name } else { $null }
            barometerPlotName = if ($barometerPlot) { $barometerPlot.Name } else { $null }
            metrics = [ordered]@{
                ignitionDelayMs = $parsed['Ignition delay']
                burnTimeMs = $parsed['Burn duration']
                maxThrustN = $parsed['Peak thrust']
                averageThrustN = $parsed['Average thrust']
                totalImpulseNs = $parsed['Total impulse']
                maxPressure = $parsed['Peak pressure']
            }
            metricRows = @(
                @("Input file", $parsed['Input file']),
                @("Sampling rate", $parsed['Sampling rate']),
                @("Ignition delay", $parsed['Ignition delay']),
                @("Burn duration", $parsed['Burn duration']),
                @("Peak thrust", $parsed['Peak thrust']),
                @("Average thrust", $parsed['Average thrust']),
                @("Total impulse", $parsed['Total impulse']),
                @("Peak pressure", $parsed['Peak pressure'])
            ) | Where-Object { $_[1] }
            noteRows = @(
                @("Drift correction", $parsed['Drift correction']),
                @("Loadcell threshold (3%)", $parsed['Loadcell threshold (3 percent)']),
                @("Loadcell filter", $parsed['Loadcell filter']),
                @("Pressure filter", $parsed['Pressure filter']),
                @("Pressure baseline offset", $parsed['Pressure baseline offset']),
                @("Loadcell baseline offset", $parsed['Loadcell baseline offset']),
                @("Loadcell baseline window end", $parsed['Loadcell baseline window end']),
                @("Ignition start time", $parsed['Ignition start time'])
            ) | Where-Object { $_[1] }
            calibrationRows = @(
                @("Loadcell calibration slope", $parsed['Loadcell calibration slope']),
                @("Loadcell calibration intercept", $parsed['Loadcell calibration intercept']),
                @("Loadcell calibration R^2", $parsed['Loadcell calibration R^2']),
                @("Pressure conversion", $parsed['Pressure conversion'])
            ) | Where-Object { $_[1] }
            links = [ordered]@{
                page = "./tests/$dateString/index.html"
                markdown = "./tests/$dateString/index.md"
                assets = "./tests/$dateString/assets/$dateString/"
            }
        }

        $entries += [pscustomobject]$entry
    }

    return $entries
}

function Convert-RowsToMarkdownTable {
    param([object[]]$Rows)
    $lines = @("| Item | Value |", "|---|---|")
    foreach ($row in $Rows) {
        $lines += "| $($row[0]) | $($row[1]) |"
    }
    return ($lines -join "`n")
}

function Convert-RowsToHtml {
    param([object[]]$Rows)
    $lines = foreach ($row in $Rows) {
        "            <tr><td>$(Escape-Html $row[0])</td><td>$(Escape-Html $row[1])</td></tr>"
    }
    return ($lines -join "`n")
}

function Render-TestMarkdown {
    param([pscustomobject]$Entry)

    $lines = @(
        "# $($Entry.title)",
        "",
        "## Graphs",
        ""
    )

    if ($Entry.combinedPlotName) {
        $lines += @("### Combined Plot", "", "![Combined Plot](./assets/$($Entry.date)/$($Entry.combinedPlotName))", "")
    }
    if ($Entry.loadcellPlotName) {
        $lines += @("### Loadcell Plot", "", "![Loadcell Plot](./assets/$($Entry.date)/$($Entry.loadcellPlotName))", "")
    }
    if ($Entry.barometerPlotName) {
        $lines += @("### Barometer Plot", "", "![Barometer Plot](./assets/$($Entry.date)/$($Entry.barometerPlotName))", "")
    }

    $lines += @("## Metrics", "", (Convert-RowsToMarkdownTable $Entry.metricRows), "")

    if ($Entry.noteRows.Count -gt 0) {
        $lines += @("## Test Setup and Data Processing", "", (Convert-RowsToMarkdownTable $Entry.noteRows), "")
    }
    if ($Entry.calibrationRows.Count -gt 0) {
        $lines += @("## Calibration And Conversion", "", (Convert-RowsToMarkdownTable $Entry.calibrationRows), "")
    }

    $lines += @(
        "## Result Files",
        "",
        "- [Executive Report](./assets/$($Entry.date)/$($Entry.reportFileName))",
        "- [Pipeline Data](./assets/$($Entry.date)/$($Entry.pipelineFileName))",
        ""
    )

    return ($lines -join "`n")
}

function Render-TestHtml {
    param([pscustomobject]$Entry)

    $plotSections = @()
    if ($Entry.combinedPlotName) {
        $plotSections += @"
      <section>
        <h2>Combined Plot</h2>
        <div class="card">
          <img src="./assets/$($Entry.date)/$($Entry.combinedPlotName)" alt="Combined Plot">
        </div>
      </section>
"@
    }
    if ($Entry.loadcellPlotName) {
        $plotSections += @"
      <section>
        <h2>Loadcell Plot</h2>
        <div class="card">
          <img src="./assets/$($Entry.date)/$($Entry.loadcellPlotName)" alt="Loadcell Plot">
        </div>
      </section>
"@
    }
    if ($Entry.barometerPlotName) {
        $plotSections += @"
      <section>
        <h2>Barometer Plot</h2>
        <div class="card">
          <img src="./assets/$($Entry.date)/$($Entry.barometerPlotName)" alt="Barometer Plot">
        </div>
      </section>
"@
    }

    return @"
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$($Entry.title)</title>
  <style>
    :root {
      --bg: #ffffff;
      --surface: #ffffff;
      --surface-strong: #f6f8fa;
      --text: #1f2328;
      --muted: #59636e;
      --accent: #0969da;
      --border: #d0d7de;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0d1117;
        --surface: #0d1117;
        --surface-strong: #161b22;
        --text: #e6edf3;
        --muted: #8b949e;
        --accent: #58a6ff;
        --border: #30363d;
      }
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    .wrap { width: min(960px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
    header { padding-bottom: 24px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
    h1 { margin: 0 0 8px; font-size: clamp(2rem, 4vw, 2.5rem); }
    p { margin: 0; color: var(--muted); }
    h2 { margin: 24px 0 12px; font-size: 1.1rem; }
    .card { border: 1px solid var(--border); border-radius: 8px; background: var(--surface); padding: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
    th { background: var(--surface-strong); }
    tr:last-child td { border-bottom: 0; }
    img { width: 100%; display: block; border-radius: 6px; border: 1px solid var(--border); background: var(--surface-strong); }
    ul { margin: 0; padding-left: 20px; }
    a { color: var(--accent); }
    .stack { display: grid; gap: 24px; }
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <h1>$(Escape-Html $Entry.title)</h1>
      <p>$(Escape-Html $Entry.summary)</p>
    </header>
    <div class="stack">
$($plotSections -join "`n")
      <section>
        <h2>Metrics</h2>
        <div class="card">
          <table>
            <tr><th>Item</th><th>Value</th></tr>
$(Convert-RowsToHtml $Entry.metricRows)
          </table>
        </div>
      </section>
      <section>
        <h2>Test Setup and Data Processing</h2>
        <div class="card">
          <table>
            <tr><th>Item</th><th>Value</th></tr>
$(Convert-RowsToHtml $Entry.noteRows)
          </table>
        </div>
      </section>
      <section>
        <h2>Calibration And Conversion</h2>
        <div class="card">
          <table>
            <tr><th>Item</th><th>Value</th></tr>
$(Convert-RowsToHtml $Entry.calibrationRows)
          </table>
        </div>
      </section>
      <section>
        <h2>Result Files</h2>
        <div class="card">
          <ul>
            <li><a href="./assets/$($Entry.date)/$($Entry.reportFileName)">Executive Report</a></li>
            <li><a href="./assets/$($Entry.date)/$($Entry.pipelineFileName)">Pipeline Data</a></li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</body>
</html>
"@
}

function Render-CatalogJson {
    param([object[]]$Entries)
    $jsonItems = foreach ($entry in $Entries) {
        ([ordered]@{
            id = "$($entry.date)-combustion"
            date = $entry.date
            title = $entry.title
            category = "combustion"
            summary = $entry.summary
            status = "published"
            metrics = $entry.metrics
            links = $entry.links
        } | ConvertTo-Json -Depth 6)
    }

    if ($jsonItems.Count -eq 0) {
        return "{`n  `"tests`": []`n}"
    }

    $indentedItems = ($jsonItems | ForEach-Object {
        ($_ -split "`n" | ForEach-Object { "    $_" }) -join "`n"
    }) -join ",`n"

    return "{`n  `"tests`": [`n$indentedItems`n  ]`n}"
}

function Render-IndexMarkdown {
    param([object[]]$Entries)
    $lines = @("# PSI Test Results", "", "## Published Tests", "")
    foreach ($entry in $Entries) {
        $lines += "- [$($entry.title)]($($entry.links.page))"
    }
    $lines += @(
        "",
        "## Repository Layout",
        "",
        '- Result pages: `tests/YYYY-MM-DD/`',
        '- Metadata catalog: `data/tests.json`',
        '- Generator script: `scripts/generate_test_site.ps1`'
    )
    return ($lines -join "`n")
}

function Render-Readme {
    param([object[]]$Entries)
    $lines = @(
        "# PSI Test Results",
        "",
        "Repository for publishing and organizing PSI test results.",
        "",
        "GitHub Markdown is the primary home for this archive.",
        "The website is a secondary view:",
        "[https://postech-psi.github.io/test-results/](https://postech-psi.github.io/test-results/)",
        "",
        "## Add A New Test",
        "",
        '1. Create `tests/YYYY-MM-DD/assets/YYYY-MM-DD/`.',
        "2. Paste the raw result files into that folder.",
        "3. Run the command below.",
        '4. `data/tests.json`, `tests/YYYY-MM-DD/index.md`, and `tests/YYYY-MM-DD/index.html` are generated automatically.',
        "",
        "Run:",
        '`powershell -ExecutionPolicy Bypass -File .\scripts\generate_test_site.ps1`',
        "",
        "## Published Tests",
        ""
    )

    foreach ($entry in $Entries) {
        $lines += "- $($entry.title)"
        $webPageUrl = "https://postech-psi.github.io/test-results/tests/$($entry.date)/index.html"
        $markdownUrl = "https://github.com/postech-psi/test-results/blob/main/tests/$($entry.date)/index.md"
        $lines += "  - Web page: [$webPageUrl]($webPageUrl)"
        $lines += "  - Markdown: [$markdownUrl]($markdownUrl)"
    }

    $lines += @(
        "",
        "GitHub Actions runs the same script on push, so copying raw result files into the standard folder and pushing is enough to refresh generated pages."
    )

    return ($lines -join "`n")
}

$entries = @(Get-TestEntries)

Write-Utf8File -Path (Join-Path $dataDir "tests.json") -Content ((Render-CatalogJson -Entries $entries) + "`n")
Write-Utf8File -Path (Join-Path $root "index.md") -Content ((Render-IndexMarkdown -Entries $entries) + "`n")
Write-Utf8File -Path (Join-Path $root "README.md") -Content ((Render-Readme -Entries $entries) + "`n")

foreach ($entry in $entries) {
    $testDir = Join-Path $testsDir $entry.date
    Write-Utf8File -Path (Join-Path $testDir "index.md") -Content ((Render-TestMarkdown -Entry $entry) + "`n")
    Write-Utf8File -Path (Join-Path $testDir "index.html") -Content ((Render-TestHtml -Entry $entry) + "`n")
}

Write-Output "Generated site for $($entries.Count) test(s)."
