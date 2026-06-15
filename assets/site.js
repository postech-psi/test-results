(function () {
  const PAGE = window.PSI_PAGE_CONFIG || { page: "home", rootPath: "." };
  const STORAGE_KEYS = {
    lang: "psi-site-language-editorial",
    theme: "psi-site-theme-editorial"
  };

  const UI = {
    ko: {
      nav: {
        overview: "요약",
        comparison: "비교",
        findings: "해석",
        archive: "아카이브",
        methods: "방법",
        access: "자료"
      },
      common: {
        latestRun: "최신 시험",
        publishedRuns: "공개 시험",
        comparisonScope: "비교 범위",
        allRuns: "전체 공개 시험",
        verdict: "공개 검토용 결과",
        directView: "절대 시간",
        alignedView: "점화 정렬",
        noIssues: "이슈 없음",
        reviewRequired: "검토 필요",
        published: "공개 완료",
        pipelineDerived: "Pipeline data 기준",
        filteredSource: "filtered force / filtered gauge pressure",
        noPublicVideo: "공개 영상 없음",
        backToSite: "전체 결과로 돌아가기",
        methodology: "처리 방법",
        calibration: "보정",
        issues: "시험 이슈",
        media: "시험 영상",
        files: "자료 파일",
        exportedFigures: "참고 그림",
        chartMethodNote: "차트는 PNG를 재사용하지 않고 pipeline data에서 다시 그립니다.",
        alignmentNote: "점화 정렬은 ignition 시점을 0 s로 맞춰 시험 간 응답을 비교합니다.",
        absoluteNote: "절대 시간은 기록된 시험 시간축을 그대로 보여줍니다.",
        sourceArtifactsNote: "PNG 그림은 참고용이며, 비교 판단은 재구성 차트와 원자료를 기준으로 합니다.",
        signalProcessing: "신호 처리",
        metrics: "핵심 지표",
        thrust: "추력",
        pressure: "압력",
        performance: "성능",
        latestReport: "최신 보고서",
        markdownRecord: "Markdown 기록",
        pipelineData: "Pipeline data",
        executiveReport: "Executive report",
        detailPage: "상세 보기",
        sortingNewest: "최신순",
        sortingThrust: "최대 추력순",
        sortingImpulse: "총 임펄스순",
        sortingPressure: "최대 압력순",
        loading: "자료를 불러오는 중입니다.",
        loadError: "자료를 불러오지 못했습니다. 파일 경로와 JSON 형식을 확인해 주세요.",
        noData: "표시할 자료가 없습니다.",
        date: "날짜",
        test: "시험",
        status: "상태",
        peakThrust: "최대 추력",
        totalImpulse: "총 임펄스",
        burnDuration: "연소 시간",
        peakPressure: "최대 압력",
        averageThrust: "평균 추력",
        issueFlag: "이슈",
        actions: "링크",
        sourceInput: "입력 파일",
        ignitionDelay: "점화 지연",
        peakTime: "피크 시점",
        highlightRun: "강조할 시험",
        allRunsBackground: "전체"
      },
      home: {
        eyebrow: "POSTECH PSI",
        title: "연소 시험 결과 공개 기록",
        lead: "POSTECH PSI 연소 시험 데이터를 공개 검토에 맞게 정리했습니다. 최신 결과, 이전 시험과의 변화, 원자료, 처리 방법을 한 흐름에서 확인할 수 있습니다.",
        executiveTitle: "최신 결과",
        executiveLead: "최신 시험과 직전 시험의 차이를 먼저 보여 주고, 필요한 경우 원자료와 처리 방법까지 내려가 확인할 수 있습니다.",
        comparisonTitle: "시험 간 비교",
        comparisonLead: "추력과 압력은 같은 기준으로 다시 그려 비교합니다. 시간축은 원 기록 그대로 보거나 점화 시점으로 정렬할 수 있습니다.",
        findingsTitle: "공개 해석",
        findingsLead: "수치 변화와 시험 노트를 함께 읽어야 하는 항목을 간결하게 정리했습니다.",
        methodsTitle: "측정과 처리",
        archiveTitle: "시험 아카이브",
        archiveSubtitle: "공개된 시험을 날짜, 성능, 이슈 상태로 빠르게 확인합니다.",
        accessTitle: "자료 접근"
      },
      detail: {
        chartsTitle: "재구성 신호",
        chartsLead: "상세 페이지의 그래프도 원 PNG가 아니라 pipeline data의 수치열에서 다시 렌더링합니다.",
        methodsTitle: "시험 조건과 처리",
        methodsLead: "필터, 기준선 보정, 임계값, 보정식을 결과와 함께 제시합니다.",
        artifactsLead: "내보낸 그림 파일은 빠른 확인용 참고 자료입니다.",
        evidenceTitle: "근거 자료",
        evidenceLead: "보고서, Markdown 기록, pipeline data를 직접 열어 확인할 수 있습니다."
      },
      labels: {
        ignition: "점화",
        burnEnd: "연소 종료",
        peak: "피크",
        rawForce: "원시 추력",
        correctedForce: "보정 추력",
        filteredForce: "필터 추력",
        rawPressure: "원시 압력",
        filteredPressure: "필터 압력",
        timeSeconds: "시간 (s)",
        alignedTimeSeconds: "점화 정렬 시간 (s)",
        thrustUnit: "추력 (N)",
        pressureUnit: "압력 (bar)"
      }
    },
    en: {
      nav: {
        overview: "Summary",
        comparison: "Comparison",
        findings: "Findings",
        archive: "Archive",
        methods: "Methods",
        access: "Evidence"
      },
      common: {
        latestRun: "Latest test",
        publishedRuns: "Published tests",
        comparisonScope: "Comparison",
        allRuns: "All runs",
        verdict: "Static fire test report",
        directView: "Recorded time",
        alignedView: "Ignition aligned",
        noIssues: "No issues",
        reviewRequired: "Review required",
        published: "Published",
        pipelineDerived: "Pipeline data",
        filteredSource: "filtered force / filtered gauge pressure",
        noPublicVideo: "No public video",
        backToSite: "Back to results",
        methodology: "Processing method",
        calibration: "Calibration",
        issues: "Test issues",
        media: "Test video",
        files: "Evidence files",
        exportedFigures: "Reference Figures",
        chartMethodNote: "Source: pipeline data. Lines are replotted from numeric series, not exported PNGs.",
        alignmentNote: "Ignition aligned mode shifts each run so ignition is 0 s.",
        absoluteNote: "Absolute time preserves the original test timeline.",
        sourceArtifactsNote: "PNG figures are secondary references; comparison uses replotted signals and source data.",
        signalProcessing: "Signal processing",
        metrics: "Key metrics",
        thrust: "Thrust",
        pressure: "Pressure",
        performance: "Performance",
        latestReport: "Latest report",
        markdownRecord: "Markdown record",
        pipelineData: "Pipeline data",
        executiveReport: "Executive report",
        detailPage: "View test",
        sortingNewest: "Newest first",
        sortingThrust: "Peak thrust",
        sortingImpulse: "Total impulse",
        sortingPressure: "Peak pressure",
        loading: "Loading data.",
        loadError: "Unable to load data. Check file paths and JSON format.",
        noData: "No data available.",
        date: "Date",
        test: "Test",
        status: "Status",
        peakThrust: "Peak Thrust",
        totalImpulse: "Total Impulse",
        burnDuration: "Burn Duration",
        peakPressure: "Peak Pressure",
        averageThrust: "Average Thrust",
        issueFlag: "Issue",
        actions: "Links",
        sourceInput: "Input File",
        ignitionDelay: "Ignition Delay",
        peakTime: "Peak Time",
        highlightRun: "Highlight test",
        allRunsBackground: "All"
      },
      home: {
        eyebrow: "POSTECH PSI",
        title: "POSTECH PSI Static Fire Test Results",
        lead: "A concise record of published static fire tests, with measured performance, run-to-run comparison, methods, and source files kept together.",
        executiveTitle: "Latest test",
        executiveLead: "The latest run produced higher peak thrust and total impulse than the previous test, with a shorter burn duration.",
        comparisonTitle: "Run comparison",
        comparisonLead: "Thrust and pressure are replotted on a shared basis. Time can be viewed as recorded or aligned to ignition.",
        findingsTitle: "Findings",
        findingsLead: "Measured changes and test notes are summarized for quick review.",
        methodsTitle: "Methods",
        archiveTitle: "Archive",
        archiveSubtitle: "Published tests organized by date, performance, and issue state.",
        accessTitle: "Evidence"
      },
      detail: {
        chartsTitle: "Signals",
        chartsLead: "Charts are rendered from numeric pipeline series, not reused PNGs.",
        methodsTitle: "Methods",
        methodsLead: "Filters, baselines, thresholds, and calibration formulas are shown beside the results.",
        artifactsLead: "Exported figures are retained as secondary references.",
        evidenceTitle: "Evidence",
        evidenceLead: "Reports, Markdown records, and pipeline data can be opened directly."
      },
      labels: {
        ignition: "Ignition",
        burnEnd: "Burn End",
        peak: "Peak",
        rawForce: "Raw Force",
        correctedForce: "Corrected Force",
        filteredForce: "Filtered Force",
        rawPressure: "Raw Pressure",
        filteredPressure: "Filtered Pressure",
        timeSeconds: "Time (s)",
        alignedTimeSeconds: "Ignition Aligned Time (s)",
        thrustUnit: "Thrust (N)",
        pressureUnit: "Pressure (bar)"
      }
    }
  };

  const state = {
    lang: "en",
    theme: "light",
    comparisonTab: "thrust",
    comparisonMode: "absolute",
    selectedTestId: null,
    archiveSort: "date"
  };

  let catalog = null;
  const dataCache = new Map();

  function getRootBase() {
    return new URL(`${PAGE.rootPath || "."}/`, document.baseURI);
  }

  function resolvePath(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    const normalized = path
      .replace(/\\/g, "/")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return new URL(normalized, getRootBase()).toString();
  }

  function copy(path) {
    return path.split(".").reduce((value, key) => value && value[key], UI[state.lang]) || "";
  }

  function localize(field) {
    if (field == null) return "";
    if (typeof field === "string" || typeof field === "number") return String(field);
    if (Array.isArray(field)) return field;
    return field[state.lang] || field.ko || field.en || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setDocumentMeta(meta) {
    document.documentElement.lang = state.lang;
    if (meta && meta.title) document.title = localize(meta.title);
    const description = meta && meta.description ? localize(meta.description) : localize(catalog.site.mission);
    let node = document.querySelector('meta[name="description"]');
    if (!node) {
      node = document.createElement("meta");
      node.name = "description";
      document.head.appendChild(node);
    }
    node.content = description;
  }

  function formatNumber(value, digits) {
    if (value == null || Number.isNaN(value)) return copy("common.noData");
    return new Intl.NumberFormat(state.lang === "ko" ? "ko-KR" : "en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(value);
  }

  function formatDelta(value, unit, digits) {
    if (value == null || Number.isNaN(value)) return copy("common.noData");
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${formatNumber(value, digits)} ${unit}`;
  }

  function setTheme(theme) {
    state.theme = theme;
    document.body.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch (_) {
      /* localStorage can be disabled in strict browser contexts. */
    }
  }

  function themeToggleLabel() {
    if (state.lang === "ko") return state.theme === "dark" ? "라이트 모드" : "다크 모드";
    return state.theme === "dark" ? "Light Mode" : "Dark Mode";
  }

  function getThemePalette() {
    return state.theme === "dark"
      ? ["#f6f4ee", "#a8a8a8", "#747474", "#d0d0d0"]
      : ["#111111", "#777777", "#b0b0b0", "#444444"];
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    return response.json();
  }

  async function fetchText(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    return response.text();
  }

  function parseTSV(text) {
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    const headers = lines[0].split("\t");
    return lines.slice(1).map((line) => {
      const cells = line.split("\t");
      return headers.reduce((entry, header, index) => {
        entry[header] = Number(cells[index]);
        return entry;
      }, {});
    });
  }

  function downsample(rows, maxPoints) {
    if (rows.length <= maxPoints) return rows;
    const stride = Math.ceil(rows.length / maxPoints);
    const sampled = [];
    for (let index = 0; index < rows.length; index += stride) sampled.push(rows[index]);
    if (sampled[sampled.length - 1] !== rows[rows.length - 1]) sampled.push(rows[rows.length - 1]);
    return sampled;
  }

  function getPeakForField(rows, field) {
    return rows.reduce((peak, row) => (row[field] > peak[field] ? row : peak), rows[0]);
  }

  async function ensureSeries(test) {
    if (dataCache.has(test.id)) return dataCache.get(test.id);
    const rows = parseTSV(await fetchText(resolvePath(test.links.pipelineData)));
    const derived = {
      rows,
      peakThrust: getPeakForField(rows, "filtered_force_N"),
      peakPressure: getPeakForField(rows, "filtered_gauge_pressure")
    };
    dataCache.set(test.id, derived);
    return derived;
  }

  function niceStep(range, targetTicks) {
    const rough = range / Math.max(targetTicks, 1);
    const base = Math.pow(10, Math.floor(Math.log10(Math.max(rough, 0.0001))));
    return ([1, 2, 2.5, 5, 10].map((value) => value * base).find((value) => value >= rough) || base);
  }

  function buildTicks(min, max, targetTicks) {
    if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) return [min || 0];
    const step = niceStep(max - min, targetTicks);
    const start = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;
    const ticks = [];
    for (let value = start; value <= end + step * 0.5; value += step) {
      ticks.push(Number(value.toFixed(6)));
    }
    return ticks;
  }

  function linePath(points, xScale, yScale) {
    return points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${xScale(point.x).toFixed(2)} ${yScale(point.y).toFixed(2)}`)
      .join(" ");
  }

  function renderLineChart(config) {
    const width = 920;
    const height = 420;
    const margin = { top: 30, right: 34, bottom: 58, left: 74 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const allPoints = config.series.flatMap((series) => series.points).filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    if (!allPoints.length) return `<div class="chart-empty">${copy("common.noData")}</div>`;

    const scalePoints = (config.scalePoints || allPoints).filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    const axisPoints = scalePoints.length ? scalePoints : allPoints;
    const xAxisPoints = (config.xScalePoints || axisPoints).filter((point) => Number.isFinite(point.x));
    const yAxisPoints = (config.yScalePoints || axisPoints).filter((point) => Number.isFinite(point.y));
    const xMin = Math.min(...(xAxisPoints.length ? xAxisPoints : allPoints).map((point) => point.x));
    const xMax = Math.max(...(xAxisPoints.length ? xAxisPoints : allPoints).map((point) => point.x));
    const rawYMin = Math.min(...(yAxisPoints.length ? yAxisPoints : allPoints).map((point) => point.y), 0);
    const rawYMax = Math.max(...(yAxisPoints.length ? yAxisPoints : allPoints).map((point) => point.y), 0);
    const yPadding = Math.max((rawYMax - rawYMin) * 0.08, 1);
    const yMin = rawYMin - yPadding;
    const yMax = rawYMax + yPadding;
    const xTicks = buildTicks(xMin, xMax, 6);
    const yTicks = buildTicks(yMin, yMax, 5);
    const xScale = (value) => margin.left + ((value - xMin) / (xMax - xMin || 1)) * plotWidth;
    const yScale = (value) => margin.top + plotHeight - ((value - yMin) / (yMax - yMin || 1)) * plotHeight;

    const grid = yTicks.map((tick) => `
      <g>
        <line x1="${margin.left}" y1="${yScale(tick)}" x2="${width - margin.right}" y2="${yScale(tick)}" stroke="var(--line)" stroke-width="1"></line>
        <text x="${margin.left - 12}" y="${yScale(tick) + 5}" fill="var(--ink-soft)" font-size="12" text-anchor="end">${formatNumber(tick, Math.abs(tick) < 10 ? 1 : 0)}</text>
      </g>
    `).join("");

    const xAxis = xTicks.map((tick) => `
      <g>
        <line x1="${xScale(tick)}" y1="${height - margin.bottom}" x2="${xScale(tick)}" y2="${height - margin.bottom + 6}" stroke="var(--line-strong)" stroke-width="1"></line>
        <text x="${xScale(tick)}" y="${height - margin.bottom + 24}" fill="var(--ink-soft)" font-size="12" text-anchor="middle">${formatNumber(tick, Math.abs(tick) < 10 ? 1 : 0)}</text>
      </g>
    `).join("");

    const series = config.series.map((item) => `
      <path d="${linePath(item.points, xScale, yScale)}" fill="none" stroke="${item.color}" stroke-width="${item.strokeWidth || 2.8}" opacity="${item.opacity == null ? 1 : item.opacity}" ${item.className ? `class="${escapeHtml(item.className)}"` : ""} ${item.dash ? `stroke-dasharray="${item.dash}"` : ""} stroke-linejoin="round" stroke-linecap="round"></path>
    `).join("");

    const events = (config.events || []).map((event) => `
      <g opacity="${event.opacity == null ? 1 : event.opacity}">
        <line x1="${xScale(event.x)}" y1="${margin.top}" x2="${xScale(event.x)}" y2="${height - margin.bottom}" stroke="${event.color}" stroke-width="${event.strokeWidth || 1.2}" stroke-dasharray="4 5"></line>
        ${event.label ? `<text x="${Math.min(width - margin.right - 6, xScale(event.x) + 7)}" y="${margin.top + 15}" fill="${event.color}" font-size="12" font-weight="800">${escapeHtml(event.label)}</text>` : ""}
      </g>
    `).join("");

    const peaks = (config.peaks || []).map((peak) => `
      <g opacity="${peak.opacity == null ? 1 : peak.opacity}">
        <circle cx="${xScale(peak.x)}" cy="${yScale(peak.y)}" r="4" fill="${peak.color}" stroke="var(--surface)" stroke-width="2"></circle>
        ${peak.label ? `<text x="${Math.min(width - margin.right - 40, xScale(peak.x) + 8)}" y="${Math.max(margin.top + 18, yScale(peak.y) - 8)}" fill="${peak.color}" font-size="12" font-weight="800">${escapeHtml(peak.label)}</text>` : ""}
      </g>
    `).join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(config.ariaLabel)}">
        <rect x="0" y="0" width="${width}" height="${height}" fill="transparent"></rect>
        <g>${grid}${xAxis}</g>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="var(--line-strong)" stroke-width="1.2"></line>
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="var(--line-strong)" stroke-width="1.2"></line>
        <text x="${margin.left + plotWidth / 2}" y="${height - 16}" fill="var(--ink-soft)" font-size="13" text-anchor="middle">${escapeHtml(config.xLabel)}</text>
        <text transform="translate(18 ${margin.top + plotHeight / 2}) rotate(-90)" fill="var(--ink-soft)" font-size="13" text-anchor="middle">${escapeHtml(config.yLabel)}</text>
        ${events}
        ${series}
        ${peaks}
      </svg>
    `;
  }

  function renderMetricBars(tests, selectedTestId) {
    const metrics = [
      { key: "maxThrustN", label: copy("common.peakThrust"), digits: 1 },
      { key: "totalImpulseNs", label: copy("common.totalImpulse"), digits: 1 },
      { key: "burnTimeMs", label: copy("common.burnDuration"), digits: 0 },
      { key: "maxPressureBar", label: copy("common.peakPressure"), digits: 1 }
    ];
    const palette = getThemePalette();
    const hasHighlight = selectedTestId && selectedTestId !== "all";
    const groups = metrics.map((metric) => {
      const maxValue = Math.max(...tests.map((test) => test.metrics[metric.key].value));
      const bars = tests.map((test, index) => {
        const value = test.metrics[metric.key].value;
        const width = Math.max(4, (value / maxValue) * 100);
        const isActive = !hasHighlight || test.id === selectedTestId;
        const opacity = isActive ? 1 : 0.24;
        return `
          <div class="metric-bar-row" style="opacity:${opacity};">
            <div class="muted">${test.date}</div>
            <div style="height:12px;border-radius:999px;background:${palette[index % palette.length]};width:${width}%;"></div>
            <strong>${formatNumber(value, metric.digits)} ${test.metrics[metric.key].unit}</strong>
          </div>
        `;
      }).join("");
      return `<article class="mini-panel"><h3>${metric.label}</h3><div style="display:grid;gap:9px;margin-top:12px;">${bars}</div></article>`;
    }).join("");
    return `<div class="finding-grid">${groups}</div>`;
  }

  function metricDelta(current, previous, key) {
    if (!previous) return null;
    return current.metrics[key].value - previous.metrics[key].value;
  }

  function buildOverviewCards(tests) {
    const latest = tests[0];
    const previous = tests[1];
    const cards = [
      { label: copy("common.peakThrust"), key: "maxThrustN", digits: 2 },
      { label: copy("common.totalImpulse"), key: "totalImpulseNs", digits: 2 },
      { label: copy("common.burnDuration"), key: "burnTimeMs", digits: 1 },
      { label: copy("common.peakPressure"), key: "maxPressureBar", digits: 3 }
    ];
    return cards.map((card) => {
      const metric = latest.metrics[card.key];
      const delta = metricDelta(latest, previous, card.key);
      const trendClass = delta == null ? "" : delta >= 0 ? "positive" : "negative";
      return `
        <article class="metric-card">
          <div class="metric-card__label">${card.label}</div>
          <div class="metric-card__value">${metric.display}</div>
          <div class="metric-card__delta ${trendClass}">${previous ? `${formatDelta(delta, metric.unit, card.digits)} vs ${previous.date}` : copy("common.noData")}</div>
        </article>
      `;
    }).join("");
  }

  function buildComparisonChart(tests, activeTab, activeMode) {
    const selectedTestId = state.selectedTestId || (tests[0] && tests[0].id) || "all";
    if (activeTab === "metrics") return renderMetricBars(tests, selectedTestId);
    const palette = getThemePalette();
    const labels = copy("labels");
    const field = activeTab === "pressure" ? "filtered_gauge_pressure" : "filtered_force_N";
    const yLabel = activeTab === "pressure" ? labels.pressureUnit : labels.thrustUnit;
    const title = activeTab === "pressure" ? copy("common.pressure") : copy("common.thrust");
    const hasHighlight = selectedTestId !== "all";
    const chartItems = tests.map((test, index) => ({ test, index })).sort((a, b) => {
      if (!hasHighlight) return a.index - b.index;
      if (a.test.id === selectedTestId) return 1;
      if (b.test.id === selectedTestId) return -1;
      return a.index - b.index;
    });
    const series = chartItems.map(({ test, index }) => {
      const derived = dataCache.get(test.id);
      const rows = downsample(derived.rows, 420);
      const isActive = !hasHighlight || test.id === selectedTestId;
      return {
        name: `${test.date} - ${localize(test.title)}`,
        color: palette[index % palette.length],
        strokeWidth: isActive ? 3.2 : 1.25,
        opacity: isActive ? 1 : 0.22,
        className: isActive ? "chart-line-active" : "chart-line-background",
        dash: isActive ? "" : "5 5",
        points: rows.map((row) => ({
          x: activeMode === "aligned" ? row.time_s - test.events.ignitionTimeS : row.time_s,
          y: row[field]
        }))
      };
    });
    const allScalePoints = series.flatMap((item) => item.points);
    const selectedSeries = hasHighlight ? series.find((item) => item.className === "chart-line-active") : null;
    const yScalePoints = selectedSeries ? selectedSeries.points : allScalePoints;
    const events = activeMode === "absolute"
      ? tests.flatMap((test, index) => {
        const isActive = !hasHighlight || test.id === selectedTestId;
        return [
          { x: test.events.ignitionTimeS, color: palette[index % palette.length], label: "", opacity: isActive ? 1 : 0.2, strokeWidth: isActive ? 1.4 : 0.8 },
          { x: test.events.burnEndTimeS, color: palette[index % palette.length], label: "", opacity: isActive ? 1 : 0.2, strokeWidth: isActive ? 1.4 : 0.8 }
        ];
      }).filter((event) => !hasHighlight || event.opacity === 1)
      : [{ x: 0, color: palette[0], label: "" }];
    const peaks = tests.map((test, index) => {
      const derived = dataCache.get(test.id);
      const peak = activeTab === "pressure" ? derived.peakPressure : derived.peakThrust;
      const isActive = !hasHighlight || test.id === selectedTestId;
      return {
        x: activeMode === "aligned" ? peak.time_s - test.events.ignitionTimeS : peak.time_s,
        y: peak[field],
        color: palette[index % palette.length],
        label: "",
        opacity: isActive ? 1 : 0.18
      };
    }).filter((peak) => !hasHighlight || peak.opacity === 1);
    return `
      <div class="chart-shell">${renderLineChart({
        ariaLabel: `${title} comparison chart`,
        xLabel: activeMode === "aligned" ? labels.alignedTimeSeconds : labels.timeSeconds,
        yLabel,
        series,
        xScalePoints: allScalePoints,
        yScalePoints,
        events,
        peaks
      })}</div>
      <div class="legend">
        ${series.map((item) => `
          <div class="legend__item">
            <span class="legend__swatch" style="background:${item.color};${item.dash ? "opacity:.7" : ""}"></span>
            <span>${escapeHtml(item.name)}</span>
          </div>
        `).join("")}
      </div>
      <div class="chart-source">${copy("common.chartMethodNote")}</div>
    `;
  }

  function buildComparisonPanel(tests) {
    const tabs = ["thrust", "pressure", "metrics"];
    const selectedTestId = state.selectedTestId || (tests[0] && tests[0].id) || "all";
    return `
      <section class="section" id="comparison">
        <div class="section-heading">
          <h2>${copy("home.comparisonTitle")}</h2>
          <p>${copy("home.comparisonLead")}</p>
        </div>
        <div class="panel comparison-layout">
          <div class="toolbar">
            <div class="tablist" role="tablist" aria-label="${state.lang === "ko" ? "비교 차트 선택" : "Comparison chart selection"}">
              ${tabs.map((tab) => `
                <button type="button" id="tab-${tab}" role="tab" data-comparison-tab="${tab}" aria-selected="${state.comparisonTab === tab}" aria-controls="panel-${tab}" tabindex="${state.comparisonTab === tab ? "0" : "-1"}">${copy(`common.${tab}`)}</button>
              `).join("")}
            </div>
            <div class="mode-toggle" aria-label="${state.lang === "ko" ? "시간축 선택" : "Time mode selection"}">
              <button type="button" data-comparison-mode="absolute" aria-pressed="${state.comparisonMode === "absolute"}">${copy("common.directView")}</button>
              <button type="button" data-comparison-mode="aligned" aria-pressed="${state.comparisonMode === "aligned"}">${copy("common.alignedView")}</button>
            </div>
            <div class="mode-toggle" aria-label="${copy("common.highlightRun")}">
              <button type="button" data-highlight-test="all" aria-pressed="${selectedTestId === "all"}">${copy("common.allRunsBackground")}</button>
              ${tests.map((test) => `<button type="button" data-highlight-test="${test.id}" aria-pressed="${selectedTestId === test.id}">${test.date}</button>`).join("")}
            </div>
          </div>
          ${tabs.map((tab) => `
            <div class="tabpanel" id="panel-${tab}" role="tabpanel" aria-labelledby="tab-${tab}" ${state.comparisonTab === tab ? "" : "hidden"}>
              <div class="chart-header">
                <div class="chart-header__title">${copy(`common.${tab}`)}</div>
                <div class="chart-header__note">${tab === "metrics" ? copy("home.executiveLead") : (state.comparisonMode === "aligned" ? copy("common.alignmentNote") : copy("common.absoluteNote"))}</div>
              </div>
              ${buildComparisonChart(tests, tab, state.comparisonMode)}
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function buildFindings(tests) {
    const latest = tests[0];
    const previous = tests[1];
    const issueItems = localize(latest.issues);
    return `
      <section class="section" id="findings">
        <div class="section-heading">
          <h2>${copy("home.findingsTitle")}</h2>
          <p>${copy("home.findingsLead")}</p>
        </div>
        <div class="publication-layout">
          <article class="mini-panel">
            <h3>${localize(latest.title)}</h3>
            <ul>
              ${localize(latest.highlights).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              ${issueItems.length ? issueItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : `<li>${copy("common.noIssues")}</li>`}
            </ul>
          </article>
          <article class="mini-panel">
            <h3>${previous ? `${state.lang === "ko" ? "직전 시험 대비" : "Compared with Previous Run"}` : copy("common.metrics")}</h3>
            <ul>
              <li>${copy("common.peakThrust")}: ${previous ? formatDelta(metricDelta(latest, previous, "maxThrustN"), "N", 2) : copy("common.noData")}</li>
              <li>${copy("common.totalImpulse")}: ${previous ? formatDelta(metricDelta(latest, previous, "totalImpulseNs"), "N s", 2) : copy("common.noData")}</li>
              <li>${copy("common.burnDuration")}: ${previous ? formatDelta(metricDelta(latest, previous, "burnTimeMs"), "ms", 1) : copy("common.noData")}</li>
              <li>${copy("common.sourceArtifactsNote")}</li>
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function sortedTests(tests) {
    return [...tests].sort((a, b) => {
      if (state.archiveSort === "thrust") return b.metrics.maxThrustN.value - a.metrics.maxThrustN.value;
      if (state.archiveSort === "impulse") return b.metrics.totalImpulseNs.value - a.metrics.totalImpulseNs.value;
      if (state.archiveSort === "pressure") return b.metrics.maxPressureBar.value - a.metrics.maxPressureBar.value;
      return b.date.localeCompare(a.date);
    });
  }

  function renderStatusBadge(test) {
    const level = test.issueSummary && test.issueSummary.level ? test.issueSummary.level : "none";
    return `<span class="status-badge ${level}">${localize(test.issueSummary.label)}</span>`;
  }

  function renderPublicationBadge(test) {
    return `<span class="status-badge published">${localize(test.statusLabel)}</span>`;
  }

  function buildArchive(tests) {
    return `
      <section class="section" id="archive">
        <div class="section-heading">
          <h2>${copy("home.archiveTitle")}</h2>
          <p>${copy("home.archiveSubtitle")}</p>
        </div>
        <div class="archive-tools">
          <div class="muted">${tests.length} ${copy("common.publishedRuns")}</div>
          <label class="visually-hidden" for="archive-sort">${state.lang === "ko" ? "정렬" : "Sort"}</label>
          <select class="select-input" id="archive-sort">
            <option value="date" ${state.archiveSort === "date" ? "selected" : ""}>${copy("common.sortingNewest")}</option>
            <option value="thrust" ${state.archiveSort === "thrust" ? "selected" : ""}>${copy("common.sortingThrust")}</option>
            <option value="impulse" ${state.archiveSort === "impulse" ? "selected" : ""}>${copy("common.sortingImpulse")}</option>
            <option value="pressure" ${state.archiveSort === "pressure" ? "selected" : ""}>${copy("common.sortingPressure")}</option>
          </select>
        </div>
        <div class="archive-table">
          <table>
            <thead>
              <tr>
                <th>${copy("common.date")}</th>
                <th>${copy("common.test")}</th>
                <th>${copy("common.status")}</th>
                <th>${copy("common.issueFlag")}</th>
                <th>${copy("common.peakThrust")}</th>
                <th>${copy("common.totalImpulse")}</th>
                <th>${copy("common.peakPressure")}</th>
                <th>${copy("common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${sortedTests(tests).map((test) => `
                <tr>
                  <td>${test.date}</td>
                  <td><strong>${localize(test.title)}</strong><div class="muted">${localize(test.summary)}</div></td>
                  <td>${renderPublicationBadge(test)}</td>
                  <td>${renderStatusBadge(test)}</td>
                  <td>${test.metrics.maxThrustN.display}</td>
                  <td>${test.metrics.totalImpulseNs.display}</td>
                  <td>${test.metrics.maxPressureBar.display}</td>
                  <td><a href="${resolvePath(test.links.page)}">${copy("common.detailPage")}</a></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function buildMethods(tests) {
    const latest = tests[0];
    return `
      <section class="section" id="methods">
        <div class="section-heading">
          <h2>${copy("home.methodsTitle")}</h2>
          <p>${localize(catalog.site.methodologySummary)}</p>
        </div>
        <div class="finding-grid">
          <article class="mini-panel">
            <h3>${copy("common.methodology")}</h3>
            <ul>
              ${latest.processing.slice(0, 5).map((item) => `<li><strong>${localize(item.label)}:</strong> ${localize(item.value)}</li>`).join("")}
            </ul>
          </article>
          <article class="mini-panel">
            <h3>${copy("common.pipelineDerived")}</h3>
            <ul>
              <li>${copy("common.filteredSource")}</li>
              <li>${copy("common.sourceArtifactsNote")}</li>
              <li>${state.lang === "ko" ? "각 상세 페이지에서 보정 값과 입력 파일을 함께 확인할 수 있습니다." : "Each detail page includes calibration values and source input references."}</li>
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function buildAccess(tests) {
    const latest = tests[0];
    return `
      <section class="section" id="access">
        <div class="section-heading">
          <h2>${copy("home.accessTitle")}</h2>
          <p>${copy("detail.evidenceLead")}</p>
        </div>
        <div class="data-links">
          <a class="data-link" href="${resolvePath(latest.links.page)}"><div class="data-link__title">${copy("common.detailPage")}</div><div class="data-link__meta">${localize(latest.title)}</div></a>
          <a class="data-link" href="${resolvePath(latest.links.executiveReport)}"><div class="data-link__title">${copy("common.executiveReport")}</div><div class="data-link__meta">${latest.date}</div></a>
          <a class="data-link" href="${resolvePath(latest.links.markdown)}"><div class="data-link__title">${copy("common.markdownRecord")}</div><div class="data-link__meta">${latest.date}</div></a>
          <a class="data-link" href="${resolvePath(latest.links.pipelineData)}"><div class="data-link__title">${copy("common.pipelineData")}</div><div class="data-link__meta">${copy("common.filteredSource")}</div></a>
        </div>
      </section>
    `;
  }

  function renderHeader() {
    return `
      <header class="site-header">
        <div class="site-header__inner">
          <div class="brand">
            <div class="brand__eyebrow">${copy("home.eyebrow")}</div>
            <div class="brand__title">${localize(catalog.site.name)}</div>
          </div>
          <div class="site-header__controls">
            <div class="pill-toggle" aria-label="${state.lang === "ko" ? "언어 선택" : "Language selection"}">
              <button type="button" data-language="ko" aria-pressed="${state.lang === "ko"}">KO</button>
              <button type="button" data-language="en" aria-pressed="${state.lang === "en"}">EN</button>
            </div>
            <button type="button" class="icon-button" id="theme-toggle" aria-label="${themeToggleLabel()}">${themeToggleLabel()}</button>
          </div>
        </div>
      </header>
    `;
  }

  function renderHome() {
    const tests = catalog.tests;
    const latest = tests[0];
    setDocumentMeta(catalog.site.pageMeta.home);
    document.body.innerHTML = `
      ${renderHeader()}
      <main class="site-shell">
        <section class="hero" id="overview">
          <nav class="site-nav" aria-label="${state.lang === "ko" ? "페이지 섹션" : "Page sections"}">
            <a href="#overview">${copy("nav.overview")}</a>
            <a href="#comparison">${copy("nav.comparison")}</a>
            <a href="#findings">${copy("nav.findings")}</a>
            <a href="#archive">${copy("nav.archive")}</a>
            <a href="#methods">${copy("nav.methods")}</a>
            <a href="#access">${copy("nav.access")}</a>
          </nav>
          <div class="hero__grid">
            <div>
              <div class="verdict">${copy("common.verdict")}</div>
              <h1 class="hero__title">${copy("home.title")}</h1>
              <p class="hero__lead">${copy("home.lead")}</p>
            </div>
            <aside class="hero__panel" aria-label="${copy("home.executiveTitle")}">
              <h2>${copy("home.executiveTitle")}</h2>
              <p>${localize(latest.context)}</p>
              <div class="hero__summary">
                <div class="hero-stat"><div class="hero-stat__label">${copy("common.latestRun")}</div><div class="hero-stat__value">${latest.date}</div></div>
                <div class="hero-stat"><div class="hero-stat__label">${copy("common.publishedRuns")}</div><div class="hero-stat__value">${tests.length}</div></div>
                <div class="hero-stat"><div class="hero-stat__label">${copy("common.comparisonScope")}</div><div class="hero-stat__value">${copy("common.allRuns")}</div></div>
              </div>
            </aside>
          </div>
        </section>
        <section class="section">
          <div class="section-heading">
            <h2>${copy("home.executiveTitle")}</h2>
            <p>${copy("home.executiveLead")}</p>
          </div>
          <div class="overview-grid">${buildOverviewCards(tests)}</div>
        </section>
        ${buildComparisonPanel(tests)}
        ${buildFindings(tests)}
        ${buildArchive(tests)}
        ${buildMethods(tests)}
        ${buildAccess(tests)}
      </main>
      <footer class="footer">${localize(catalog.site.mission)}</footer>
    `;
    bindCommonControls();
    bindHomeControls();
  }

  function renderDetailTables(rows) {
    return `
      <table class="detail-table">
        <tbody>
          ${rows.map((item) => `
            <tr>
              <th>${localize(item.label)}</th>
              <td>${localize(item.value)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  function buildDetailChart(test, activeTab) {
    const derived = dataCache.get(test.id);
    const palette = getThemePalette();
    const labels = copy("labels");
    if (activeTab === "metrics") return renderMetricBars([test]);
    const events = [
      { x: test.events.ignitionTimeS, color: palette[0], label: labels.ignition },
      { x: test.events.burnEndTimeS, color: palette[1], label: labels.burnEnd }
    ];
    const pressureConfig = {
      ariaLabel: `${localize(test.title)} pressure chart`,
      xLabel: labels.timeSeconds,
      yLabel: labels.pressureUnit,
      series: [
        { name: labels.rawPressure, color: palette[1], strokeWidth: 1.4, dash: "4 5", points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.raw_gauge_pressure })) },
        { name: labels.filteredPressure, color: palette[0], strokeWidth: 2.8, points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.filtered_gauge_pressure })) }
      ],
      events,
      peaks: [{ x: derived.peakPressure.time_s, y: derived.peakPressure.filtered_gauge_pressure, color: palette[0], label: labels.peak }]
    };
    const thrustConfig = {
      ariaLabel: `${localize(test.title)} thrust chart`,
      xLabel: labels.timeSeconds,
      yLabel: labels.thrustUnit,
      series: [
        { name: labels.rawForce, color: palette[1], strokeWidth: 1.3, dash: "4 5", points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.raw_force_N })) },
        { name: labels.correctedForce, color: palette[2], strokeWidth: 1.7, dash: "2 5", points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.corrected_force_N })) },
        { name: labels.filteredForce, color: palette[0], strokeWidth: 2.8, points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.filtered_force_N })) }
      ],
      events,
      peaks: [{ x: derived.peakThrust.time_s, y: derived.peakThrust.filtered_force_N, color: palette[0], label: labels.peak }]
    };
    const config = activeTab === "pressure" ? pressureConfig : thrustConfig;
    return `
      <div class="chart-shell">${renderLineChart(config)}</div>
      <div class="legend">
        ${config.series.map((item) => `<div class="legend__item"><span class="legend__swatch" style="background:${item.color};"></span><span>${item.name}</span></div>`).join("")}
      </div>
      <div class="chart-source">${copy("common.chartMethodNote")}</div>
    `;
  }

  function renderDetail(test) {
    if (!test) {
      renderError();
      return;
    }
    setDocumentMeta(test.meta);
    const tabs = ["thrust", "pressure", "metrics"];
    const issues = localize(test.issues);
    document.body.innerHTML = `
      ${renderHeader()}
      <main class="site-shell">
        <section class="detail-hero">
          <a class="detail-hero__back" href="${resolvePath("index.html")}">${copy("common.backToSite")}</a>
          <div class="verdict">${copy("common.verdict")}</div>
          <h1 class="detail-hero__title">${localize(test.title)}</h1>
          <p class="detail-hero__lead">${localize(test.summary)}</p>
          <div class="detail-summary">
            <article class="metric-card"><div class="metric-card__label">${copy("common.date")}</div><div class="metric-card__value">${test.date}</div><div class="metric-card__delta">${renderPublicationBadge(test)} ${renderStatusBadge(test)}</div></article>
            <article class="metric-card"><div class="metric-card__label">${copy("common.peakThrust")}</div><div class="metric-card__value">${test.metrics.maxThrustN.display}</div><div class="metric-card__delta">${copy("common.averageThrust")}: ${test.metrics.averageThrustN.display}</div></article>
            <article class="metric-card"><div class="metric-card__label">${copy("common.totalImpulse")}</div><div class="metric-card__value">${test.metrics.totalImpulseNs.display}</div><div class="metric-card__delta">${copy("common.burnDuration")}: ${test.metrics.burnTimeMs.display}</div></article>
            <article class="metric-card"><div class="metric-card__label">${copy("common.peakPressure")}</div><div class="metric-card__value">${test.metrics.maxPressureBar.display}</div><div class="metric-card__delta">${copy("common.peakTime")}: ${test.metrics.maxPressureTimeS.display}</div></article>
          </div>
        </section>
        <section class="section">
          <div class="section-heading">
            <h2>${copy("detail.chartsTitle")}</h2>
            <p>${copy("detail.chartsLead")}</p>
          </div>
          <div class="panel">
            <div class="toolbar">
              <div class="tablist" role="tablist" aria-label="${state.lang === "ko" ? "상세 차트 선택" : "Detail chart selection"}">
                ${tabs.map((tab) => `<button type="button" id="detail-tab-${tab}" role="tab" data-comparison-tab="${tab}" aria-selected="${state.comparisonTab === tab}" aria-controls="detail-panel-${tab}" tabindex="${state.comparisonTab === tab ? "0" : "-1"}">${copy(`common.${tab}`)}</button>`).join("")}
              </div>
            </div>
            ${tabs.map((tab) => `
              <div class="tabpanel" id="detail-panel-${tab}" role="tabpanel" aria-labelledby="detail-tab-${tab}" ${state.comparisonTab === tab ? "" : "hidden"}>
                <div class="chart-header">
                  <div class="chart-header__title">${copy(`common.${tab}`)}</div>
                  <div class="chart-header__note">${tab === "metrics" ? copy("home.executiveLead") : copy("common.chartMethodNote")}</div>
                </div>
                ${buildDetailChart(test, tab)}
              </div>
            `).join("")}
          </div>
        </section>
        <section class="section">
          <div class="section-heading">
            <h2>${copy("detail.methodsTitle")}</h2>
            <p>${copy("detail.methodsLead")}</p>
          </div>
          <div class="detail-grid">
            <div class="detail-stack">
              <article class="panel"><div class="subsection-title">${copy("common.methodology")}</div>${renderDetailTables(test.processing)}</article>
              <article class="panel"><div class="subsection-title">${copy("common.calibration")}</div>${renderDetailTables(test.calibration)}</article>
            </div>
            <div class="detail-stack">
              <article class="panel">
                <div class="subsection-title">${copy("detail.evidenceTitle")}</div>
                <p class="detail-meta-note">${copy("detail.evidenceLead")}</p>
                <div class="data-links" style="grid-template-columns:1fr;margin-top:12px;">
                  <a class="data-link" href="${resolvePath(test.links.executiveReport)}"><div class="data-link__title">${copy("common.executiveReport")}</div><div class="data-link__meta">${test.date}</div></a>
                  <a class="data-link" href="${resolvePath(test.links.pipelineData)}"><div class="data-link__title">${copy("common.pipelineData")}</div><div class="data-link__meta">${copy("common.filteredSource")}</div></a>
                  <a class="data-link" href="${resolvePath(test.links.markdown)}"><div class="data-link__title">${copy("common.markdownRecord")}</div><div class="data-link__meta">${copy("common.detailPage")}</div></a>
                </div>
              </article>
              <article class="panel"><div class="subsection-title">${copy("common.media")}</div><p class="detail-meta-note">${test.media.videoUrl ? `<a href="${test.media.videoUrl}">${localize(test.media.videoLabel)}</a>` : localize(test.media.videoLabel)}</p></article>
              <article class="panel"><div class="subsection-title">${copy("common.sourceInput")}</div><p class="detail-meta-note">${escapeHtml(test.source.inputFile)}</p></article>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="section-heading"><h2>${copy("common.issues")}</h2><p>${localize(test.context)}</p></div>
          <div class="panel">${issues.length ? `<ul class="detail-list">${issues.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<div class="empty-state">${copy("common.noIssues")}</div>`}</div>
        </section>
        <section class="section">
          <div class="section-heading"><h2>${copy("common.exportedFigures")}</h2><p>${copy("detail.artifactsLead")}</p></div>
          <div class="artifact-grid">
            ${test.artifacts.figures.map((figure) => `
              <article class="artifact-card">
                <a href="${resolvePath(figure.path)}"><div class="artifact-card__media"><img src="${resolvePath(figure.path)}" alt="${escapeHtml(localize(figure.label))}"></div></a>
                <div class="artifact-card__title">${localize(figure.label)}</div>
              </article>
            `).join("")}
          </div>
        </section>
      </main>
      <footer class="footer">${localize(catalog.site.mission)}</footer>
    `;
    bindCommonControls();
    bindDetailControls();
  }

  function bindCommonControls() {
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lang = button.dataset.language;
        try {
          localStorage.setItem(STORAGE_KEYS.lang, state.lang);
        } catch (_) {
          /* noop */
        }
        rerender();
      });
    });
    const themeButton = document.getElementById("theme-toggle");
    if (themeButton) {
      themeButton.addEventListener("click", () => {
        setTheme(state.theme === "dark" ? "light" : "dark");
        rerender();
      });
    }
    document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      tabs.forEach((tab, index) => {
        tab.addEventListener("keydown", (event) => {
          let nextIndex = null;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") nextIndex = 0;
          if (event.key === "End") nextIndex = tabs.length - 1;
          if (nextIndex == null) return;
          event.preventDefault();
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        });
      });
    });
  }

  function bindHomeControls() {
    document.querySelectorAll("[data-comparison-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.comparisonTab = button.dataset.comparisonTab;
        rerender();
      });
    });
    document.querySelectorAll("[data-comparison-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        state.comparisonMode = button.dataset.comparisonMode;
        rerender();
      });
    });
    document.querySelectorAll("[data-highlight-test]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedTestId = button.dataset.highlightTest;
        rerender();
      });
    });
    const sortInput = document.getElementById("archive-sort");
    if (sortInput) {
      sortInput.addEventListener("change", (event) => {
        state.archiveSort = event.target.value;
        rerender();
      });
    }
  }

  function bindDetailControls() {
    document.querySelectorAll("[data-comparison-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.comparisonTab = button.dataset.comparisonTab;
        rerender();
      });
    });
  }

  function renderError() {
    document.documentElement.lang = state.lang;
    document.body.innerHTML = `<main class="site-shell"><section class="section"><div class="empty-state">${copy("common.loadError")}</div></section></main>`;
  }

  function rerender() {
    document.body.dataset.theme = state.theme;
    if (PAGE.page === "detail") {
      renderDetail(catalog.tests.find((item) => item.id === PAGE.testId));
      return;
    }
    renderHome();
  }

  async function preloadData() {
    if (PAGE.page === "detail") {
      const test = catalog.tests.find((item) => item.id === PAGE.testId);
      if (test) await ensureSeries(test);
      return;
    }
    await Promise.all(catalog.tests.map((test) => ensureSeries(test)));
  }

  async function init() {
    try {
      state.lang = localStorage.getItem(STORAGE_KEYS.lang) || "en";
    } catch (_) {
      state.lang = "en";
    }
    try {
      state.theme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
    } catch (_) {
      state.theme = "light";
    }
    document.body.dataset.theme = state.theme;
    try {
      catalog = await fetchJson(resolvePath("tests/index.json"));
      await preloadData();
      rerender();
    } catch (error) {
      console.error(error);
      renderError();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
