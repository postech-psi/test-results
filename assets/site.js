(function () {
  const PAGE = window.PSI_PAGE_CONFIG || { page: "home", rootPath: "." };
  const STORAGE_KEYS = {
    lang: "psi-site-language",
    theme: "psi-site-theme"
  };

  const COPY = {
    ko: {
      nav: {
        overview: "개요",
        comparison: "비교",
        findings: "핵심 해석",
        archive: "시험 아카이브",
        methods: "방법론",
        access: "데이터 접근"
      },
      common: {
        latestRun: "최신 시험",
        publishedRuns: "공개된 시험",
        comparisonScope: "비교 기준",
        directView: "절대 시간",
        alignedView: "정렬 보기",
        noIssues: "이슈 없음",
        reviewRequired: "검토 필요",
        pipelineDerived: "파이프라인 데이터 기반",
        filteredSource: "filtered force / filtered gauge pressure",
        noPublicVideo: "공개된 영상 없음",
        backToSite: "전체 결과 포털로 돌아가기",
        methodology: "방법론 요약",
        calibration: "보정 값",
        issues: "시험 이슈",
        media: "시험 영상",
        files: "결과 파일",
        exportedFigures: "내보낸 그림 파일",
        chartMethodNote: "비교 차트는 파이프라인 데이터에서 직접 다시 그렸습니다.",
        alignmentNote: "정렬 보기는 ignition delay를 기준으로 시간을 이동해 ignition = 0 s가 되도록 맞춥니다.",
        absoluteNote: "절대 시간 보기는 원래 시험 시간축을 그대로 유지합니다.",
        sourceArtifactsNote: "PNG 그림은 참고용 아티팩트로만 유지하며, 비교는 사이트 내 차트에서 수행합니다.",
        signalProcessing: "신호 처리",
        metrics: "핵심 지표",
        thrust: "추력",
        pressure: "압력",
        performance: "성능 요약",
        latestReport: "최신 보고서",
        markdownRecord: "Markdown 기록",
        pipelineData: "파이프라인 데이터",
        executiveReport: "Executive Report",
        detailPage: "상세 보기",
        sortingNewest: "최신 시험 순",
        sortingThrust: "최대 추력 순",
        sortingImpulse: "총 임펄스 순",
        sortingPressure: "최대 압력 순",
        findingsTitle: "핵심 해석",
        loading: "데이터를 불러오는 중입니다.",
        loadError: "데이터를 불러오지 못했습니다.",
        noData: "표시할 데이터가 없습니다.",
        date: "날짜",
        test: "시험",
        status: "상태",
        peakThrust: "최대 추력",
        totalImpulse: "총 임펄스",
        burnDuration: "연소 시간",
        peakPressure: "최대 압력",
        issueFlag: "이슈",
        actions: "링크",
        compareLatestTwo: "최근 2개 시험",
        compareAllRuns: "전체 공개 시험",
        keyMetricsTabNote: "주요 성능 수치를 동일한 축 기준으로 비교합니다.",
        archiveLead: "전체 시험 기록을 날짜, 성능, 이슈 기준으로 빠르게 스캔할 수 있도록 구성했습니다.",
        methodsLead: "시각화는 이미지를 재사용하지 않고 파이프라인 데이터의 filtered series를 직접 재구성합니다.",
        accessLead: "원본 리포트, Markdown 기록, 파이프라인 데이터를 같은 자리에서 연결합니다.",
        reportPage: "상세 시험 페이지",
        sourceInput: "입력 파일"
      },
      home: {
        eyebrow: "POSTECH PSI",
        title: "공개용 과학 결과 사이트",
        lead: "POSTECH PSI 연소 시험 결과를 단순 보관이 아닌 검토 가능한 공개 자료로 재구성했습니다. 요약, 비교, 해석, 원자료 접근을 하나의 정제된 흐름으로 제공합니다.",
        executiveTitle: "Executive Overview",
        executiveLead: "최근 시험과 직전 시험의 변화량을 한 화면에서 읽을 수 있도록 정리했습니다.",
        comparisonTitle: "Comparison Workspace",
        comparisonLead: "이미지 비교가 아니라 파이프라인 데이터를 다시 그려서 추력, 압력, 지표를 직접 비교합니다.",
        findingsLead: "수치 변화와 시험 노트를 결합해 공개용 해석 문장을 제공합니다.",
        methodsTitle: "Methodology Summary",
        accessTitle: "Data Access",
        archiveTitle: "Test Archive",
        archiveSubtitle: "공개된 모든 시험 결과를 일관된 형식으로 정리했습니다."
      },
      detail: {
        chartsTitle: "Replotted Test Signals",
        chartsLead: "단일 시험 페이지에서도 이미지가 아니라 파이프라인 데이터를 직접 렌더링합니다.",
        methodsTitle: "시험 조건 및 처리",
        methodsLead: "필터링, 기준선 보정, 임계값, 보정식을 함께 제시합니다.",
        artifactsLead: "내보낸 그림 파일은 참고용 아티팩트로만 남겨둡니다."
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
        alignedTimeSeconds: "정렬 시간 (s, ignition = 0)",
        thrustUnit: "추력 (N)",
        pressureUnit: "압력 (bar)"
      }
    },
    en: {
      nav: {
        overview: "Overview",
        comparison: "Comparison",
        findings: "Findings",
        archive: "Archive",
        methods: "Methods",
        access: "Access"
      },
      common: {
        latestRun: "Latest Run",
        publishedRuns: "Published Runs",
        comparisonScope: "Comparison Scope",
        directView: "Absolute Time",
        alignedView: "Aligned View",
        noIssues: "No issues",
        reviewRequired: "Review required",
        pipelineDerived: "Derived from pipeline data",
        filteredSource: "filtered force / filtered gauge pressure",
        noPublicVideo: "No public video available",
        backToSite: "Back to results portal",
        methodology: "Methodology Summary",
        calibration: "Calibration",
        issues: "Test Issues",
        media: "Test Video",
        files: "Result Files",
        exportedFigures: "Exported Figures",
        chartMethodNote: "Comparison charts are replotted directly from pipeline data.",
        alignmentNote: "Aligned mode shifts time so ignition delay becomes ignition = 0 s.",
        absoluteNote: "Absolute mode preserves the original experimental timeline.",
        sourceArtifactsNote: "PNG figures remain as reference artifacts only; analytical comparison is done with native site charts.",
        signalProcessing: "Signal Processing",
        metrics: "Key Metrics",
        thrust: "Thrust",
        pressure: "Pressure",
        performance: "Performance",
        latestReport: "Latest Report",
        markdownRecord: "Markdown Record",
        pipelineData: "Pipeline Data",
        executiveReport: "Executive Report",
        detailPage: "Detail Page",
        sortingNewest: "Newest first",
        sortingThrust: "Peak thrust",
        sortingImpulse: "Total impulse",
        sortingPressure: "Peak pressure",
        findingsTitle: "Findings",
        loading: "Loading data.",
        loadError: "Unable to load data.",
        noData: "No data available.",
        date: "Date",
        test: "Test",
        status: "Status",
        peakThrust: "Peak Thrust",
        totalImpulse: "Total Impulse",
        burnDuration: "Burn Duration",
        peakPressure: "Peak Pressure",
        issueFlag: "Issue Flag",
        actions: "Links",
        compareLatestTwo: "Latest two runs",
        compareAllRuns: "All published runs",
        keyMetricsTabNote: "Compare performance metrics on a shared visual baseline.",
        archiveLead: "All published tests are organized for quick scanning by date, performance, and issue state.",
        methodsLead: "Visualizations are rendered from filtered series in the pipeline data, not reused plot images.",
        accessLead: "Executive reports, markdown records, and pipeline data stay connected in one place.",
        reportPage: "Test detail page",
        sourceInput: "Input File"
      },
      home: {
        eyebrow: "POSTECH PSI",
        title: "A Scientific Results Site Built for Public Review",
        lead: "POSTECH PSI static fire results are presented as a publication-grade public record rather than a raw archive. Summary, comparison, interpretation, and source access are organized into one coherent experience.",
        executiveTitle: "Executive Overview",
        executiveLead: "Recent performance and run-to-run deltas are surfaced immediately for public review.",
        comparisonTitle: "Comparison Workspace",
        comparisonLead: "Instead of comparing exported images, the site replots thrust, pressure, and metrics directly from pipeline data.",
        findingsLead: "Narrative findings combine measured deltas with observed test notes.",
        methodsTitle: "Methodology Summary",
        accessTitle: "Data Access",
        archiveTitle: "Test Archive",
        archiveSubtitle: "All published runs organized in a consistent review format."
      },
      detail: {
        chartsTitle: "Replotted Test Signals",
        chartsLead: "Even on detail pages, charts are rendered directly from pipeline data rather than reused images.",
        methodsTitle: "Test Conditions and Processing",
        methodsLead: "Filtering, baseline correction, thresholds, and calibration values are shown alongside the results.",
        artifactsLead: "Exported figure files are retained only as secondary reference artifacts."
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
        alignedTimeSeconds: "Aligned Time (s, ignition = 0)",
        thrustUnit: "Thrust (N)",
        pressureUnit: "Pressure (bar)"
      }
    }
  };

  const state = {
    lang: null,
    theme: null,
    comparisonTab: "thrust",
    comparisonMode: "absolute",
    archiveSort: "date"
  };

  let catalog = null;
  const dataCache = new Map();

  function getRootBase() {
    return new URL(`${PAGE.rootPath || "."}/`, document.baseURI);
  }

  function resolvePath(path) {
    if (!path) {
      return null;
    }
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    const normalized = path
      .replace(/\\/g, "/")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return new URL(normalized, getRootBase()).toString();
  }

  function copy(path) {
    return path.split(".").reduce((value, key) => value && value[key], COPY[state.lang || "ko"]);
  }

  function localize(field) {
    if (field == null) {
      return "";
    }
    if (typeof field === "string" || Array.isArray(field)) {
      return field;
    }
    return field[state.lang || "ko"] || field.ko || field.en || "";
  }

  function themeToggleLabel() {
    if (state.lang === "ko") {
      return state.theme === "dark" ? "라이트 모드" : "다크 모드";
    }
    return state.theme === "dark" ? "Light Mode" : "Dark Mode";
  }

  function setDocumentMeta(meta) {
    document.documentElement.lang = state.lang || "ko";
    if (meta && meta.title) {
      document.title = localize(meta.title);
    }
    const description = meta && meta.description ? localize(meta.description) : "";
    let node = document.querySelector('meta[name="description"]');
    if (!node) {
      node = document.createElement("meta");
      node.name = "description";
      document.head.appendChild(node);
    }
    node.content = description;
  }

  function formatNumber(value, digits) {
    return new Intl.NumberFormat(state.lang === "ko" ? "ko-KR" : "en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(value);
  }

  function formatDelta(value, unit, digits) {
    if (value == null || Number.isNaN(value)) {
      return copy("common.noData");
    }
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${formatNumber(value, digits)} ${unit}`;
  }

  function setTheme(theme) {
    state.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }

  function getThemePalette() {
    return state.theme === "dark"
      ? ["#8ed8c8", "#ef9b76", "#dccc7a", "#8fb3ff"]
      : ["#1f6b5d", "#b85f3d", "#9a7a18", "#496bb6"];
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    return response.json();
  }

  async function fetchText(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    return response.text();
  }

  function parseTSV(text) {
    const lines = text.trim().split(/\r?\n/);
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
    if (rows.length <= maxPoints) {
      return rows;
    }
    const stride = Math.ceil(rows.length / maxPoints);
    const sampled = [];
    for (let index = 0; index < rows.length; index += stride) {
      sampled.push(rows[index]);
    }
    if (sampled[sampled.length - 1] !== rows[rows.length - 1]) {
      sampled.push(rows[rows.length - 1]);
    }
    return sampled;
  }

  function getPeakForField(rows, field) {
    return rows.reduce((peak, row) => (row[field] > peak[field] ? row : peak), rows[0]);
  }

  async function ensureSeries(test) {
    if (dataCache.has(test.id)) {
      return dataCache.get(test.id);
    }
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
    const candidates = [1, 2, 2.5, 5, 10];
    return candidates.map((value) => value * base).find((value) => value >= rough) || base;
  }

  function buildTicks(min, max, targetTicks) {
    if (min === max) {
      return [min];
    }
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
    const margin = { top: 28, right: 30, bottom: 52, left: 72 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const allPoints = config.series.flatMap((series) => series.points);
    const xMin = Math.min(...allPoints.map((point) => point.x));
    const xMax = Math.max(...allPoints.map((point) => point.x));
    const rawYMin = Math.min(...allPoints.map((point) => point.y), 0);
    const rawYMax = Math.max(...allPoints.map((point) => point.y), 0);
    const yPadding = Math.max((rawYMax - rawYMin) * 0.08, 1);
    const yMin = rawYMin - yPadding;
    const yMax = rawYMax + yPadding;
    const xTicks = buildTicks(xMin, xMax, 6);
    const yTicks = buildTicks(yMin, yMax, 5);
    const xScale = (value) => margin.left + ((value - xMin) / (xMax - xMin || 1)) * plotWidth;
    const yScale = (value) => margin.top + plotHeight - ((value - yMin) / (yMax - yMin || 1)) * plotHeight;

    const grid = yTicks.map((tick) => `
      <g>
        <line x1="${margin.left}" y1="${yScale(tick)}" x2="${width - margin.right}" y2="${yScale(tick)}" stroke="var(--line)" stroke-width="1" opacity="0.7"></line>
        <text x="${margin.left - 12}" y="${yScale(tick) + 5}" fill="var(--ink-soft)" font-size="12" text-anchor="end">${formatNumber(tick, Math.abs(tick) < 10 ? 1 : 0)}</text>
      </g>
    `).join("");

    const xAxis = xTicks.map((tick) => `
      <g>
        <line x1="${xScale(tick)}" y1="${margin.top}" x2="${xScale(tick)}" y2="${height - margin.bottom}" stroke="var(--line)" stroke-width="1" opacity="0.35"></line>
        <text x="${xScale(tick)}" y="${height - margin.bottom + 20}" fill="var(--ink-soft)" font-size="12" text-anchor="middle">${formatNumber(tick, Math.abs(tick) < 10 ? 1 : 0)}</text>
      </g>
    `).join("");

    const seriesPaths = config.series.map((series) => `
      <path d="${linePath(series.points, xScale, yScale)}" fill="none" stroke="${series.color}" stroke-width="${series.strokeWidth || 2.4}" stroke-linecap="round" stroke-linejoin="round"></path>
    `).join("");

    const eventLines = (config.events || []).map((event) => `
      <g>
        <line x1="${xScale(event.x)}" y1="${margin.top}" x2="${xScale(event.x)}" y2="${height - margin.bottom}" stroke="${event.color}" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.85"></line>
        <text x="${xScale(event.x) + 4}" y="${margin.top + 14}" fill="${event.color}" font-size="11">${event.label}</text>
      </g>
    `).join("");

    const peaks = (config.peaks || []).map((peak) => `
      <g>
        <circle cx="${xScale(peak.x)}" cy="${yScale(peak.y)}" r="4" fill="${peak.color}"></circle>
        <text x="${xScale(peak.x) + 8}" y="${yScale(peak.y) - 8}" fill="${peak.color}" font-size="11">${peak.label}</text>
      </g>
    `).join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${config.ariaLabel}">
        ${grid}
        ${xAxis}
        <line x1="${margin.left}" y1="${yScale(0)}" x2="${width - margin.right}" y2="${yScale(0)}" stroke="var(--ink-soft)" stroke-width="1.4" opacity="0.7"></line>
        ${eventLines}
        ${seriesPaths}
        ${peaks}
        <text x="${width / 2}" y="${height - 12}" text-anchor="middle" fill="var(--ink-soft)" font-size="13">${config.xLabel}</text>
        <text x="18" y="${height / 2}" transform="rotate(-90 18 ${height / 2})" text-anchor="middle" fill="var(--ink-soft)" font-size="13">${config.yLabel}</text>
      </svg>
    `;
  }

  function renderMetricBars(tests) {
    const metrics = [
      ["maxThrustN", copy("common.peakThrust")],
      ["totalImpulseNs", copy("common.totalImpulse")],
      ["burnTimeMs", copy("common.burnDuration")],
      ["maxPressureBar", copy("common.peakPressure")]
    ];
    const palette = getThemePalette();
    return `
      <div class="detail-stack">
        ${metrics.map(([key, label]) => {
          const max = Math.max(...tests.map((test) => test.metrics[key].value));
          return `
            <div class="mini-panel">
              <h3>${label}</h3>
              <div class="detail-stack">
                ${tests.map((test, index) => `
                  <div>
                    <div style="display:flex;justify-content:space-between;gap:12px;">
                      <strong>${localize(test.title)}</strong>
                      <span class="muted">${test.metrics[key].display}</span>
                    </div>
                    <div style="margin-top:8px;height:10px;border-radius:999px;background:var(--surface-strong);overflow:hidden;">
                      <div style="width:${((test.metrics[key].value / max) * 100).toFixed(2)}%;height:100%;background:${palette[index % palette.length]};"></div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function metricDelta(current, previous) {
    return previous ? current.value - previous.value : null;
  }

  function buildOverviewCards(tests) {
    const latest = tests[0];
    const previous = tests[1];
    const metrics = [
      ["maxThrustN", copy("common.peakThrust"), 2],
      ["totalImpulseNs", copy("common.totalImpulse"), 2],
      ["burnTimeMs", copy("common.burnDuration"), 1],
      ["maxPressureBar", copy("common.peakPressure"), 3]
    ];

    return metrics.map(([key, label, digits]) => {
      const delta = previous ? metricDelta(latest.metrics[key], previous.metrics[key]) : null;
      const directionClass = delta == null ? "" : (delta >= 0 ? "positive" : "negative");
      return `
        <article class="metric-card">
          <div class="metric-card__label">${label}</div>
          <div class="metric-card__value">${latest.metrics[key].display}</div>
          <div class="metric-card__delta ${directionClass}">
            ${previous ? `${formatDelta(delta, latest.metrics[key].unit, digits)} vs ${previous.date}` : copy("common.noData")}
          </div>
        </article>
      `;
    }).join("");
  }

  function buildComparisonChart(tests, activeTab, activeMode) {
    const palette = getThemePalette();
    if (activeTab === "metrics") {
      return renderMetricBars(tests);
    }

    const field = activeTab === "pressure" ? "filtered_gauge_pressure" : "filtered_force_N";
    const yLabel = activeTab === "pressure" ? copy("labels.pressureUnit") : copy("labels.thrustUnit");
    const xLabel = activeMode === "aligned" ? copy("labels.alignedTimeSeconds") : copy("labels.timeSeconds");
    const isPressure = activeTab === "pressure";

    const series = tests.map((test, index) => {
      const derived = dataCache.get(test.id);
      return {
        name: `${test.date} - ${localize(test.title)}`,
        color: palette[index % palette.length],
        points: downsample(derived.rows, 420).map((row) => ({
          x: activeMode === "aligned" ? row.time_s - test.events.ignitionTimeS : row.time_s,
          y: row[field]
        }))
      };
    });

    const events = tests.flatMap((test, index) => {
      const color = palette[index % palette.length];
      return [
        {
          x: activeMode === "aligned" ? 0 : test.events.ignitionTimeS,
          color,
          label: `${test.date} ${copy("labels.ignition")}`
        },
        {
          x: activeMode === "aligned" ? test.events.burnDurationS : test.events.burnEndTimeS,
          color,
          label: `${test.date} ${copy("labels.burnEnd")}`
        }
      ];
    });

    const peaks = tests.map((test, index) => {
      const derived = dataCache.get(test.id);
      const row = isPressure ? derived.peakPressure : derived.peakThrust;
      return {
        x: activeMode === "aligned" ? row.time_s - test.events.ignitionTimeS : row.time_s,
        y: isPressure ? row.filtered_gauge_pressure : row.filtered_force_N,
        color: palette[index % palette.length],
        label: `${test.date} ${copy("labels.peak")}`
      };
    });

    return `
      <div class="chart-shell">
        ${renderLineChart({
          ariaLabel: `${copy(`common.${activeTab}`)} comparison chart`,
          xLabel,
          yLabel,
          series,
          events,
          peaks
        })}
      </div>
      <div class="legend">
        ${series.map((item) => `
          <div class="legend__item">
            <span class="legend__swatch" style="background:${item.color};"></span>
            <span>${item.name}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  function buildComparisonPanel(tests) {
    return `
      <section class="section" id="comparison">
        <div class="section-heading">
          <h2>${copy("home.comparisonTitle")}</h2>
          <p>${copy("home.comparisonLead")}</p>
        </div>
        <div class="panel">
          <div class="toolbar">
            <div class="tablist" role="tablist" aria-label="${state.lang === "ko" ? "비교 차트 탭" : "Comparison chart tabs"}">
              ${["thrust", "pressure", "metrics"].map((tab) => `
                <button
                  type="button"
                  id="comparison-tab-${tab}"
                  role="tab"
                  data-comparison-tab="${tab}"
                  aria-selected="${state.comparisonTab === tab}"
                  aria-controls="comparison-panel-${tab}"
                  tabindex="${state.comparisonTab === tab ? "0" : "-1"}"
                >
                  ${copy(`common.${tab}`)}
                </button>
              `).join("")}
            </div>
            <div class="pill-toggle" role="group" aria-label="${state.lang === "ko" ? "비교 시간 기준" : "Comparison time mode"}">
              <button type="button" data-comparison-mode="absolute" aria-pressed="${state.comparisonMode === "absolute"}">${copy("common.directView")}</button>
              <button type="button" data-comparison-mode="aligned" aria-pressed="${state.comparisonMode === "aligned"}">${copy("common.alignedView")}</button>
            </div>
          </div>
          <div class="panel-note">${state.comparisonMode === "aligned" ? copy("common.alignmentNote") : copy("common.absoluteNote")}</div>
          ${["thrust", "pressure", "metrics"].map((tab) => {
            const title = tab === "pressure" ? copy("common.pressure") : (tab === "metrics" ? copy("common.metrics") : copy("common.thrust"));
            const note = tab === "metrics" ? copy("common.keyMetricsTabNote") : copy("common.chartMethodNote");
            return `
              <div
                class="tabpanel"
                id="comparison-panel-${tab}"
                role="tabpanel"
                aria-labelledby="comparison-tab-${tab}"
                ${state.comparisonTab === tab ? "" : "hidden"}
              >
                <div class="chart-header">
                  <div class="chart-header__title">${title}</div>
                  <div class="chart-header__note">${note}</div>
                </div>
                ${buildComparisonChart(tests, tab, state.comparisonMode)}
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function buildFindings(tests) {
    const latest = tests[0];
    const previous = tests[1];
    const deltaLines = previous ? [
      `${copy("common.peakThrust")}: ${formatDelta(metricDelta(latest.metrics.maxThrustN, previous.metrics.maxThrustN), "N", 2)}`,
      `${copy("common.totalImpulse")}: ${formatDelta(metricDelta(latest.metrics.totalImpulseNs, previous.metrics.totalImpulseNs), "N s", 2)}`,
      `${copy("common.burnDuration")}: ${formatDelta(metricDelta(latest.metrics.burnTimeMs, previous.metrics.burnTimeMs), "ms", 1)}`
    ] : [];

    return `
      <section class="section" id="findings">
        <div class="section-heading">
          <h2>${copy("common.findingsTitle")}</h2>
          <p>${copy("home.findingsLead")}</p>
        </div>
        <div class="finding-grid">
          <article class="mini-panel">
            <h3>${localize(latest.title)}</h3>
            <ul>
              ${localize(latest.highlights).map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="mini-panel">
            <h3>${previous ? localize(previous.title) : copy("common.comparisonScope")}</h3>
            <ul>
              ${deltaLines.map((item) => `<li>${item}</li>`).join("")}
              ${previous && localize(previous.issues).length ? `<li>${localize(previous.issues)[0]}</li>` : `<li>${copy("common.noIssues")}</li>`}
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function sortedTests(tests) {
    const items = [...tests];
    if (state.archiveSort === "thrust") {
      return items.sort((a, b) => b.metrics.maxThrustN.value - a.metrics.maxThrustN.value);
    }
    if (state.archiveSort === "impulse") {
      return items.sort((a, b) => b.metrics.totalImpulseNs.value - a.metrics.totalImpulseNs.value);
    }
    if (state.archiveSort === "pressure") {
      return items.sort((a, b) => b.metrics.maxPressureBar.value - a.metrics.maxPressureBar.value);
    }
    return items.sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderStatusBadge(test) {
    const levelClass = test.issueSummary.level === "none" ? "none" : "attention";
    return `<span class="status-badge ${levelClass}">${localize(test.issueSummary.label)}</span>`;
  }

  function renderPublicationBadge(test) {
    return `<span class="status-badge published">${localize(test.statusLabel || { ko: test.status, en: test.status })}</span>`;
  }

  function buildArchive(tests) {
    return `
      <section class="section" id="archive">
        <div class="section-heading">
          <h2>${copy("home.archiveTitle")}</h2>
          <p>${copy("common.archiveLead")}</p>
        </div>
        <div class="archive-tools">
          <div class="muted">${copy("home.archiveSubtitle")}</div>
          <select class="select-input" id="archive-sort">
            <option value="date"${state.archiveSort === "date" ? " selected" : ""}>${copy("common.sortingNewest")}</option>
            <option value="thrust"${state.archiveSort === "thrust" ? " selected" : ""}>${copy("common.sortingThrust")}</option>
            <option value="impulse"${state.archiveSort === "impulse" ? " selected" : ""}>${copy("common.sortingImpulse")}</option>
            <option value="pressure"${state.archiveSort === "pressure" ? " selected" : ""}>${copy("common.sortingPressure")}</option>
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
          <p>${copy("common.methodsLead")}</p>
        </div>
        <div class="finding-grid">
          <article class="mini-panel">
            <h3>${copy("common.methodology")}</h3>
            <ul>
              ${latest.processing.slice(0, 4).map((item) => `<li><strong>${localize(item.label)}:</strong> ${localize(item.value)}</li>`).join("")}
            </ul>
          </article>
          <article class="mini-panel">
            <h3>${copy("common.pipelineDerived")}</h3>
            <ul>
              <li>${localize(catalog.site.methodologySummary)}</li>
              <li>${copy("common.filteredSource")}</li>
              <li>${copy("common.sourceArtifactsNote")}</li>
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
          <p>${copy("common.accessLead")}</p>
        </div>
        <div class="data-links">
          <a class="data-link" href="${resolvePath(latest.links.page)}">
            <div class="data-link__title">${copy("common.reportPage")}</div>
            <div class="data-link__meta">${localize(latest.title)}</div>
          </a>
          <a class="data-link" href="${resolvePath(latest.links.executiveReport)}">
            <div class="data-link__title">${copy("common.executiveReport")}</div>
            <div class="data-link__meta">${latest.date}</div>
          </a>
          <a class="data-link" href="${resolvePath(latest.links.markdown)}">
            <div class="data-link__title">${copy("common.markdownRecord")}</div>
            <div class="data-link__meta">${latest.date}</div>
          </a>
          <a class="data-link" href="${resolvePath(latest.links.pipelineData)}">
            <div class="data-link__title">${copy("common.pipelineData")}</div>
            <div class="data-link__meta">${copy("common.filteredSource")}</div>
          </a>
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
    setDocumentMeta(catalog.site.pageMeta && catalog.site.pageMeta.home ? catalog.site.pageMeta.home : { title: catalog.site.name, description: catalog.site.mission });

    document.body.innerHTML = `
      ${renderHeader()}
      <main class="site-shell">
        <section class="hero" id="overview">
          <div class="site-nav">
            <a href="#overview">${copy("nav.overview")}</a>
            <a href="#comparison">${copy("nav.comparison")}</a>
            <a href="#findings">${copy("nav.findings")}</a>
            <a href="#archive">${copy("nav.archive")}</a>
            <a href="#methods">${copy("nav.methods")}</a>
            <a href="#access">${copy("nav.access")}</a>
          </div>
          <div class="hero__grid">
            <div>
              <h1 class="hero__title">${copy("home.title")}</h1>
              <p class="hero__lead">${copy("home.lead")}</p>
            </div>
            <aside class="hero__panel">
              <h2>${copy("home.executiveTitle")}</h2>
              <p>${localize(latest.context)}</p>
              <div class="hero__summary">
                <div class="hero-stat"><div class="hero-stat__label">${copy("common.latestRun")}</div><div class="hero-stat__value">${latest.date}</div></div>
                <div class="hero-stat"><div class="hero-stat__label">${copy("common.publishedRuns")}</div><div class="hero-stat__value">${tests.length}</div></div>
                <div class="hero-stat"><div class="hero-stat__label">${copy("common.comparisonScope")}</div><div class="hero-stat__value">${copy("common.compareAllRuns")}</div></div>
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
      <footer class="footer site-shell">${localize(catalog.site.mission)}</footer>
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
    if (activeTab === "metrics") {
      return renderMetricBars([test]);
    }

    const events = [
      { x: test.events.ignitionTimeS, color: palette[0], label: labels.ignition },
      { x: test.events.burnEndTimeS, color: palette[1], label: labels.burnEnd }
    ];

    const config = activeTab === "pressure"
      ? {
          ariaLabel: `${localize(test.title)} pressure chart`,
          xLabel: labels.timeSeconds,
          yLabel: labels.pressureUnit,
          series: [
            { name: labels.rawPressure, color: palette[1], strokeWidth: 1.7, points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.raw_gauge_pressure })) },
            { name: labels.filteredPressure, color: palette[0], points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.filtered_gauge_pressure })) }
          ],
          events,
          peaks: [{ x: derived.peakPressure.time_s, y: derived.peakPressure.filtered_gauge_pressure, color: palette[0], label: labels.peak }]
        }
      : {
          ariaLabel: `${localize(test.title)} thrust chart`,
          xLabel: labels.timeSeconds,
          yLabel: labels.thrustUnit,
          series: [
            { name: labels.rawForce, color: palette[1], strokeWidth: 1.5, points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.raw_force_N })) },
            { name: labels.correctedForce, color: palette[2], strokeWidth: 1.9, points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.corrected_force_N })) },
            { name: labels.filteredForce, color: palette[0], points: downsample(derived.rows, 420).map((row) => ({ x: row.time_s, y: row.filtered_force_N })) }
          ],
          events,
          peaks: [{ x: derived.peakThrust.time_s, y: derived.peakThrust.filtered_force_N, color: palette[0], label: labels.peak }]
        };

    return `
      <div class="chart-shell">${renderLineChart(config)}</div>
      <div class="legend">
        ${config.series.map((item) => `
          <div class="legend__item">
            <span class="legend__swatch" style="background:${item.color};"></span>
            <span>${item.name}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderDetail(test) {
    setDocumentMeta(test.meta || { title: { ko: `${localize(test.title)} | ${localize(catalog.site.name)}`, en: `${localize(test.title)} | ${localize(catalog.site.name)}` }, description: test.summary });
    const issues = localize(test.issues);
    document.body.innerHTML = `
      ${renderHeader()}
      <main class="site-shell">
        <section class="detail-hero">
          <a class="detail-hero__back" href="${resolvePath("index.html")}">${copy("common.backToSite")}</a>
          <h1 class="detail-hero__title">${localize(test.title)}</h1>
          <p class="detail-hero__lead">${localize(test.summary)}</p>
          <div class="detail-summary">
            <article class="metric-card"><div class="metric-card__label">${copy("common.date")}</div><div class="metric-card__value">${test.date}</div><div class="metric-card__delta">${renderPublicationBadge(test)} ${renderStatusBadge(test)}</div></article>
            <article class="metric-card"><div class="metric-card__label">${copy("common.peakThrust")}</div><div class="metric-card__value">${test.metrics.maxThrustN.display}</div><div class="metric-card__delta">${test.metrics.averageThrustN.display}</div></article>
            <article class="metric-card"><div class="metric-card__label">${copy("common.totalImpulse")}</div><div class="metric-card__value">${test.metrics.totalImpulseNs.display}</div><div class="metric-card__delta">${test.metrics.burnTimeMs.display}</div></article>
            <article class="metric-card"><div class="metric-card__label">${copy("common.peakPressure")}</div><div class="metric-card__value">${test.metrics.maxPressureBar.display}</div><div class="metric-card__delta">${test.metrics.maxPressureTimeS.display}</div></article>
          </div>
        </section>
        <section class="section">
          <div class="section-heading">
            <h2>${copy("detail.chartsTitle")}</h2>
            <p>${copy("detail.chartsLead")}</p>
          </div>
          <div class="panel">
            <div class="toolbar">
              <div class="tablist" role="tablist" aria-label="${state.lang === "ko" ? "시험 차트 탭" : "Test chart tabs"}">
                ${["thrust", "pressure", "metrics"].map((tab) => `
                  <button
                    type="button"
                    id="detail-tab-${tab}"
                    role="tab"
                    data-comparison-tab="${tab}"
                    aria-selected="${state.comparisonTab === tab}"
                    aria-controls="detail-panel-${tab}"
                    tabindex="${state.comparisonTab === tab ? "0" : "-1"}"
                  >
                    ${copy(`common.${tab}`)}
                  </button>
                `).join("")}
              </div>
            </div>
            ${["thrust", "pressure", "metrics"].map((tab) => `
              <div
                class="tabpanel"
                id="detail-panel-${tab}"
                role="tabpanel"
                aria-labelledby="detail-tab-${tab}"
                ${state.comparisonTab === tab ? "" : "hidden"}
              >
                <div class="chart-header">
                  <div class="chart-header__title">${copy(`common.${tab}`)}</div>
                  <div class="chart-header__note">${tab === "metrics" ? copy("common.keyMetricsTabNote") : copy("common.chartMethodNote")}</div>
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
                <div class="subsection-title">${copy("common.files")}</div>
                <div class="data-links">
                  <a class="data-link" href="${resolvePath(test.links.executiveReport)}"><div class="data-link__title">${copy("common.executiveReport")}</div><div class="data-link__meta">${test.date}</div></a>
                  <a class="data-link" href="${resolvePath(test.links.pipelineData)}"><div class="data-link__title">${copy("common.pipelineData")}</div><div class="data-link__meta">${copy("common.filteredSource")}</div></a>
                  <a class="data-link" href="${resolvePath(test.links.markdown)}"><div class="data-link__title">${copy("common.markdownRecord")}</div><div class="data-link__meta">${copy("common.reportPage")}</div></a>
                </div>
              </article>
              <article class="panel"><div class="subsection-title">${copy("common.media")}</div><p class="detail-meta-note">${test.media.videoUrl ? `<a href="${test.media.videoUrl}">${localize(test.media.videoLabel)}</a>` : localize(test.media.videoLabel)}</p></article>
              <article class="panel"><div class="subsection-title">${copy("common.sourceInput")}</div><p class="detail-meta-note">${test.source.inputFile}</p></article>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="section-heading"><h2>${copy("common.issues")}</h2><p>${localize(test.context)}</p></div>
          <div class="panel">${issues.length ? `<ul class="detail-list">${issues.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<div class="empty-state">${copy("common.noIssues")}</div>`}</div>
        </section>
        <section class="section">
          <div class="section-heading"><h2>${copy("common.exportedFigures")}</h2><p>${copy("detail.artifactsLead")}</p></div>
          <div class="artifact-grid">
            ${test.artifacts.figures.map((figure) => `
              <article class="artifact-card">
                <a href="${resolvePath(figure.path)}">
                  <div class="artifact-card__media"><img src="${resolvePath(figure.path)}" alt="${localize(figure.label)}"></div>
                </a>
                <div class="artifact-card__title">${localize(figure.label)}</div>
              </article>
            `).join("")}
          </div>
        </section>
      </main>
      <footer class="footer site-shell">${localize(catalog.site.mission)}</footer>
    `;

    bindCommonControls();
    bindDetailControls();
  }

  function bindCommonControls() {
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lang = button.dataset.language;
        localStorage.setItem(STORAGE_KEYS.lang, state.lang);
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
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % tabs.length;
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + tabs.length) % tabs.length;
          } else if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
          }
          if (nextIndex == null) {
            return;
          }
          event.preventDefault();
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        });
      });
    });
  }

  function bindHomeControls() {
    document.querySelectorAll("[data-comparison-tab]").forEach((button) => button.addEventListener("click", () => {
      state.comparisonTab = button.dataset.comparisonTab;
      rerender();
    }));
    document.querySelectorAll("[data-comparison-mode]").forEach((button) => button.addEventListener("click", () => {
      state.comparisonMode = button.dataset.comparisonMode;
      rerender();
    }));
    const sortInput = document.getElementById("archive-sort");
    if (sortInput) {
      sortInput.addEventListener("change", (event) => {
        state.archiveSort = event.target.value;
        rerender();
      });
    }
  }

  function bindDetailControls() {
    document.querySelectorAll("[data-comparison-tab]").forEach((button) => button.addEventListener("click", () => {
      state.comparisonTab = button.dataset.comparisonTab;
      rerender();
    }));
  }

  function renderError() {
    document.documentElement.lang = state.lang || "ko";
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
      if (test) {
        await ensureSeries(test);
      }
      return;
    }
    await Promise.all(catalog.tests.map((test) => ensureSeries(test)));
  }

  async function init() {
    state.lang = localStorage.getItem(STORAGE_KEYS.lang) || "ko";
    state.theme = localStorage.getItem(STORAGE_KEYS.theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
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
