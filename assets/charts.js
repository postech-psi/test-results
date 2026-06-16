/* ==========================================================================
   PSICharts — ECharts option builders for the PSI results site.
   Pure: data in -> ECharts option out. Requires global `echarts`.
   ========================================================================== */
(function () {
  "use strict";

  var FONT_MONO = '"Pretendard", sans-serif';
  var FONT_DISPLAY = '"Pretendard", sans-serif';

  var TOKENS = {
    dark: {
      ink: "#f8fbff", inkSoft: "#d8e2ed", inkMuted: "#a7b4c2",
      line: "#253241", lineStrong: "#56687b",
      surface: "#0b111a", surfaceAlt: "#111a26", accent: "#c23a72",
      tooltipBg: "rgba(11, 17, 26, 0.98)", tooltipBorder: "#56687b",
      zoomFill: "rgba(194, 58, 114, 0.13)", zoomHandle: "#c23a72"
    },
    light: {
      ink: "#071827", inkSoft: "#26394b", inkMuted: "#536273",
      line: "#c6d2df", lineStrong: "#7b8fa4",
      surface: "#ffffff", surfaceAlt: "#f3f6fa", accent: "#a61955",
      tooltipBg: "rgba(255, 255, 255, 0.99)", tooltipBorder: "#7b8fa4",
      zoomFill: "rgba(166, 25, 85, 0.10)", zoomHandle: "#a61955"
    }
  };

  var PALETTE = {
    dark:  ["#5f9fd6", "#c23a72", "#64b887", "#cda14a", "#9aa8b7", "#b07ada", "#e08060"],
    light: ["#124f85", "#a61955", "#2f7d52", "#9a6a16", "#566b7f", "#7b42b8", "#c45a28"]
  };

  function tokens(theme) { return TOKENS[theme] || TOKENS.dark; }
  function palette(theme) { return PALETTE[theme] || PALETTE.dark; }

  function hexToRgba(hex, alpha) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  function fmt(value, digits) {
    if (value == null || isNaN(value)) return "—";
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
  }

  function areaGradient(color) {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: hexToRgba(color, 0.08) },
      { offset: 1, color: hexToRgba(color, 0.0) }
    ]);
  }

  function niceExtent(points) {
    var ys = [];
    (points || []).forEach(function (point) {
      var y = point && point.length ? point[1] : null;
      if (typeof y === "number" && isFinite(y)) ys.push(y);
    });
    if (!ys.length) return null;
    var min = Math.min.apply(null, ys);
    var max = Math.max.apply(null, ys);
    var span = max - min;
    var pad = Math.max(span * 0.1, Math.abs(max || min) * 0.02, 1);
    return {
      min: Math.floor((min - pad) * 1000) / 1000,
      max: Math.ceil((max + pad) * 1000) / 1000
    };
  }

  function visibleRuns(params, hasHighlight) {
    var selected = params.legendSelected || null;
    var visible = params.runs.filter(function (run) {
      return !selected || selected[run.name] !== false;
    });
    if (hasHighlight) {
      var highlighted = visible.filter(function (run) { return run.id === params.highlightId; });
      if (highlighted.length) return highlighted;
    }
    return visible.length ? visible : params.runs;
  }

  /* Shared base: grid, axes, tooltip, dataZoom */
  function baseOption(params) {
    var t = tokens(params.theme);
    var axisCommon = {
      nameTextStyle: { color: t.inkMuted, fontFamily: FONT_MONO, fontSize: 11 },
      axisLine: { lineStyle: { color: t.lineStrong } },
      axisTick: { lineStyle: { color: t.lineStrong } },
      axisLabel: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 11 },
      splitLine: { lineStyle: { color: t.line, type: "dashed" } }
    };

    return {
      backgroundColor: "transparent",
      color: palette(params.theme),
      animationDuration: 620,
      animationEasing: "cubicOut",
      textStyle: { fontFamily: FONT_MONO, color: t.ink },
      grid: { left: 14, right: 22, top: 46, bottom: 78, containLabel: true },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: { backgroundColor: t.surfaceAlt, color: t.ink, fontFamily: FONT_MONO },
          crossStyle: { color: t.lineStrong },
          lineStyle: { color: t.lineStrong }
        },
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        borderWidth: 1,
        padding: [10, 12],
        textStyle: { color: t.ink, fontFamily: FONT_MONO, fontSize: 12 },
        extraCssText: "border-radius: 6px;"
      },
      xAxis: Object.assign({
        type: "value",
        name: params.xLabel,
        nameLocation: "middle",
        nameGap: 30,
        scale: true
      }, axisCommon),
      yAxis: Object.assign({
        type: "value",
        name: params.yLabel,
        nameLocation: "middle",
        nameGap: 52,
        scale: true
      }, axisCommon),
      dataZoom: [
        { type: "inside", xAxisIndex: 0, filterMode: "none" },
        {
          type: "slider", xAxisIndex: 0, filterMode: "none",
          height: 20, bottom: 16,
          backgroundColor: "transparent",
          fillerColor: t.zoomFill,
          borderColor: t.line,
          dataBackground: { lineStyle: { color: t.lineStrong }, areaStyle: { color: t.line } },
          selectedDataBackground: { lineStyle: { color: t.accent }, areaStyle: { color: t.zoomFill } },
          handleStyle: { color: t.zoomHandle, borderColor: t.zoomHandle },
          moveHandleStyle: { color: t.lineStrong },
          textStyle: { color: t.inkMuted, fontFamily: FONT_MONO, fontSize: 10 }
        }
      ]
    };
  }

  function tooltipFormatter(xUnit, yUnit, yDigits) {
    return function (items) {
      if (!items || !items.length) return "";
      var x = items[0].axisValue;
      var head = '<div style="font-weight:600;margin-bottom:6px;opacity:.85">' +
        fmt(x, 3) + " " + xUnit + "</div>";
      var rows = items.map(function (it) {
        var v = it.value && it.value.length ? it.value[1] : it.value;
        return '<div style="display:flex;gap:10px;align-items:center;justify-content:space-between">' +
          '<span>' + it.marker + it.seriesName + '</span>' +
          '<strong style="font-variant-numeric:tabular-nums">' + fmt(v, yDigits) + " " + yUnit + "</strong>" +
          "</div>";
      }).join("");
      return head + rows;
    };
  }

  /* Comparison tooltip: per-run value at x, plus that run's ignition/burn-end
     times and peak (value @ time). params has runs[] with event metadata. */
  function comparisonTooltipFormatter(params, includeEvents) {
    var runMap = {};
    (params.runs || []).forEach(function (r) { runMap[r.name] = r; });
    var L = params.labels || {};
    var xU = params.xUnit, yU = params.yUnit, yD = params.yDigits;
    return function (items) {
      if (!items || !items.length) return "";
      var x = items[0].axisValue;
      var head = '<div style="font-weight:600;margin-bottom:6px;opacity:.85">' +
        fmt(x, 3) + " " + xU + "</div>";
      var rows = items.map(function (it) {
        var v = it.value && it.value.length ? it.value[1] : it.value;
        var main = '<div style="display:flex;gap:12px;align-items:center;justify-content:space-between">' +
          '<span>' + it.marker + it.seriesName + '</span>' +
          '<strong style="font-variant-numeric:tabular-nums">' + fmt(v, yD) + " " + yU + "</strong></div>";
        if (!includeEvents) return main;
        var run = runMap[it.seriesName];
        if (!run) return main;
        var parts = [];
        if (run.ignitionX != null) parts.push(L.ignition + " " + fmt(run.ignitionX, 2) + " " + xU);
        if (run.burnEndX != null) parts.push(L.burnEnd + " " + fmt(run.burnEndX, 2) + " " + xU);
        var peakStr = "";
        if (run.peak && run.peak.x != null) {
          peakStr = L.peak + " " + fmt(run.peak.y, yD) + " " + yU + " @ " + fmt(run.peak.x, 2) + " " + xU;
        }
        var detailLines = [];
        if (parts.length) detailLines.push(parts.join(" · "));
        if (peakStr) detailLines.push(peakStr);
        if (!detailLines.length) return main;
        return main +
          '<div style="font-size:11px;opacity:.65;margin:1px 0 6px 16px;font-variant-numeric:tabular-nums">' +
          detailLines.join("<br>") + "</div>";
      }).join("");
      return head + rows;
    };
  }

  function markLineData(run, labels, showLabel, color, t, opacity, units) {
    var op = opacity == null ? 0.75 : opacity;
    units = units || {};
    var xU = units.xUnit ? " " + units.xUnit : "";
    var labelBase = {
      show: showLabel, color: color, fontFamily: FONT_MONO, fontSize: 10,
      backgroundColor: t.surface, padding: [2, 4], borderRadius: 3
    };
    var data = [];
    if (run.ignitionX != null) {
      data.push({
        xAxis: run.ignitionX,
        label: Object.assign({}, labelBase, { formatter: labels.ignition + " " + fmt(run.ignitionX, 2) + xU, position: "insideEndTop" })
      });
    }
    if (run.burnEndX != null) {
      data.push({
        xAxis: run.burnEndX,
        label: Object.assign({}, labelBase, { formatter: labels.burnEnd + " " + fmt(run.burnEndX, 2) + xU, position: "insideEndBottom" })
      });
    }
    return {
      symbol: "none",
      lineStyle: { color: color, type: "dashed", width: 1, opacity: op },
      emphasis: { disabled: true },
      blur: { lineStyle: { opacity: 0.06 }, label: { opacity: 0.06 } },
      data: data
    };
  }

  function markPointData(run, labels, showLabel, color, t, opacity, units) {
    if (!run.peak || run.peak.x == null) return undefined;
    var op = opacity == null ? 1 : opacity;
    units = units || {};
    var xU = units.xUnit ? " " + units.xUnit : "";
    var yU = units.yUnit ? " " + units.yUnit : "";
    var yD = units.yDigits == null ? 1 : units.yDigits;
    var peakLabel = labels.peak + " " + fmt(run.peak.y, yD) + yU + "\n@ " + fmt(run.peak.x, 2) + xU;
    return {
      symbol: "circle",
      symbolSize: 9,
      itemStyle: { color: color, borderColor: t.surface, borderWidth: 2, opacity: op },
      label: {
        show: showLabel,
        formatter: peakLabel,
        color: color,
        fontFamily: FONT_MONO,
        fontSize: 10,
        lineHeight: 13,
        align: "center",
        position: "top",
        distance: 8,
        backgroundColor: t.surface,
        padding: [3, 5],
        borderRadius: 4
      },
      emphasis: { disabled: true },
      blur: { itemStyle: { opacity: 0.06 }, label: { opacity: 0.06 } },
      data: [{ coord: [run.peak.x, run.peak.y] }]
    };
  }

  /* Comparison chart: multiple runs, one measurement (thrust|pressure).
     params.viewMode: "overview" | "focus" | "single"
     params.selectedIds: string[] (focus mode — which runs to show)
     params.highlightId: string | "all" (single mode) */
  function comparisonOption(params) {
    var t = tokens(params.theme);
    var opt = baseOption(params);
    var viewMode = params.viewMode || "single";
    var units = { xUnit: params.xUnit, yUnit: params.yUnit, yDigits: params.yDigits };
    // On-chart labels carry the event details for focus/single; in overview
    // (labels off) the tooltip carries them instead.
    opt.tooltip.formatter = comparisonTooltipFormatter(params, viewMode === "overview");

    /* ---- Overview: all runs, hover-reveal, no permanent labels ---- */
    if (viewMode === "overview") {
      var allData = params.runs.reduce(function (acc, r) { return acc.concat(r.data || []); }, []);
      var ext = niceExtent(allData);
      if (ext) { opt.yAxis.min = ext.min; opt.yAxis.max = ext.max; }
      opt.legend = { show: false };
      opt.series = params.runs.map(function (run) {
        return {
          name: run.name,
          type: "line",
          showSymbol: false,
          smooth: 0.12,
          sampling: "lttb",
          lineStyle: { color: run.color, width: 1.4 },
          itemStyle: { color: run.color },
          emphasis: { focus: "series", blurScope: "global", lineStyle: { width: 3, opacity: 1 } },
          blur: { lineStyle: { opacity: 0.18 } },
          markLine: markLineData(run, params.labels, false, run.color, t, null, units),
          markPoint: markPointData(run, params.labels, false, run.color, t, null, units),
          data: run.data
        };
      });
      return opt;
    }

    /* ---- Focus: selected runs only, per-count label strategy ---- */
    if (viewMode === "focus") {
      var sel = params.selectedIds || [];
      var focused = params.runs.filter(function (r) { return sel.indexOf(r.id) !== -1; });
      var n = focused.length;
      var showML = n <= 2;
      var showMP = n <= 4;
      var focusData = focused.reduce(function (acc, r) { return acc.concat(r.data || []); }, []);
      var ext2 = niceExtent(focusData);
      if (ext2) { opt.yAxis.min = ext2.min; opt.yAxis.max = ext2.max; }
      opt.legend = {
        type: "scroll", top: 8, left: "center", icon: "roundRect",
        itemWidth: 18, itemHeight: 4,
        textStyle: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 11 },
        inactiveColor: t.inkMuted,
        data: focused.map(function (r) { return r.name; })
      };
      opt.series = focused.map(function (run) {
        return {
          name: run.name, type: "line", showSymbol: false, smooth: 0.12, sampling: "lttb",
          lineStyle: { color: run.color, width: 2.2 },
          itemStyle: { color: run.color },
          emphasis: { focus: "series", lineStyle: { width: 3 } },
          areaStyle: n === 1 ? { color: areaGradient(run.color) } : undefined,
          markLine: markLineData(run, params.labels, showML, run.color, t, null, units),
          markPoint: markPointData(run, params.labels, showMP, run.color, t, null, units),
          data: run.data
        };
      });
      return opt;
    }

    /* ---- Single: one run highlighted, rest faded ---- */
    var hasHighlight = params.highlightId && params.highlightId !== "all";
    var axisRuns = visibleRuns(params, hasHighlight);
    var ext3 = niceExtent(axisRuns.reduce(function (acc, r) { return acc.concat(r.data || []); }, []));
    if (ext3) { opt.yAxis.min = ext3.min; opt.yAxis.max = ext3.max; }
    opt.legend = {
      type: "scroll", top: 8, left: "center", icon: "roundRect",
      itemWidth: 18, itemHeight: 4,
      textStyle: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 11 },
      inactiveColor: t.inkMuted,
      data: params.runs.map(function (r) { return r.name; })
    };
    opt.series = params.runs.map(function (run) {
      var active = !hasHighlight || run.id === params.highlightId;
      var showLabel = hasHighlight && run.id === params.highlightId;
      var mlOpacity = active ? 0.75 : 0.08;
      var mpOpacity = active ? 1 : 0.08;
      return {
        name: run.name, type: "line", showSymbol: false, smooth: 0.12, sampling: "lttb",
        z: active ? 5 : 2,
        lineStyle: { color: run.color, width: active ? 2.6 : 1.4, opacity: active ? 1 : 0.42 },
        itemStyle: { color: run.color },
        emphasis: { focus: "series", lineStyle: { width: 3 } },
        areaStyle: (showLabel || (!hasHighlight && params.runs.length === 1))
          ? { color: areaGradient(run.color) } : undefined,
        markLine: markLineData(run, params.labels, showLabel, run.color, t, mlOpacity, units),
        markPoint: markPointData(run, params.labels, showLabel, run.color, t, mpOpacity, units),
        data: run.data
      };
    });
    return opt;
  }

  /* Detail chart: single run, multiple signals (raw/corrected/filtered).
     params: { theme, xLabel, yLabel, xUnit, yUnit, yDigits, labels, series:[{name,color,data,dashed,primary}], ignitionX, burnEndX, peak } */
  function detailOption(params) {
    var t = tokens(params.theme);
    var opt = baseOption(params);
    opt.tooltip.formatter = tooltipFormatter(params.xUnit, params.yUnit, params.yDigits);
    opt.legend = {
      top: 8,
      left: "center",
      icon: "roundRect",
      itemWidth: 18,
      itemHeight: 4,
      textStyle: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 11 },
      inactiveColor: t.inkMuted,
      data: params.series.map(function (s) { return s.name; })
    };

    opt.series = params.series.map(function (s, i) {
      var isPrimary = !!s.primary;
      var series = {
        name: s.name,
        type: "line",
        showSymbol: false,
        smooth: 0.1,
        sampling: "lttb",
        z: isPrimary ? 5 : 3,
        lineStyle: {
          color: s.color,
          width: isPrimary ? 2.8 : 1.5,
          type: s.dashed ? "dashed" : "solid",
          opacity: isPrimary ? 1 : 0.72
        },
        itemStyle: { color: s.color },
        emphasis: { focus: "series" },
        areaStyle: isPrimary ? { color: areaGradient(s.color) } : undefined,
        data: s.data
      };
      if (isPrimary) {
        var dUnits = { xUnit: params.xUnit, yUnit: params.yUnit, yDigits: params.yDigits };
        series.markLine = markLineData(
          { ignitionX: params.ignitionX, burnEndX: params.burnEndX },
          params.labels, true, t.inkSoft, t, null, dUnits
        );
        series.markLine.lineStyle.color = t.lineStrong;
        if (params.peak) {
          series.markPoint = markPointData({ peak: params.peak }, params.labels, true, s.color, t, null, dUnits);
        }
      }
      return series;
    });
    return opt;
  }

  /* Single-metric bar chart with real values + own scale.
     params: { theme, title, unit, yDigits, names:[date], colors:[hex], values:[num], displays:[str], dim:[bool] } */
  function metricBarOption(params) {
    var t = tokens(params.theme);
    var vals = (params.values || []).filter(function (v) { return v != null && isFinite(v); });
    var yMin, yMax;
    if (vals.length) {
      var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
      var span = (hi - lo) || Math.abs(hi) || 1;
      yMin = Math.max(0, lo - span * 0.35);
      yMax = hi + span * 0.18;
    }
    var rotate = (params.names || []).length > 5 ? 30 : 0;
    return {
      backgroundColor: "transparent",
      animationDuration: 480,
      animationEasing: "cubicOut",
      textStyle: { fontFamily: FONT_MONO, color: t.ink },
      grid: { left: 6, right: 14, top: 14, bottom: rotate ? 14 : 6, containLabel: true },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        borderWidth: 1,
        textStyle: { color: t.ink, fontFamily: FONT_MONO, fontSize: 12 },
        extraCssText: "border-radius: 8px;",
        formatter: function (items) {
          if (!items || !items.length) return "";
          var it = items[0];
          var color = (params.colors && params.colors[it.dataIndex]) || t.accent;
          var disp = (params.displays && params.displays[it.dataIndex] != null) ? params.displays[it.dataIndex] : it.value;
          var marker = '<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + color + ';margin-right:6px;vertical-align:middle"></span>';
          return '<div style="font-weight:600;margin-bottom:4px">' + it.name + "</div>" +
            '<div style="display:flex;gap:12px;justify-content:space-between">' +
            "<span>" + marker + params.title + "</span>" +
            '<strong style="font-variant-numeric:tabular-nums">' + disp + "</strong></div>";
        }
      },
      xAxis: {
        type: "category",
        data: params.names,
        axisLine: { lineStyle: { color: t.lineStrong } },
        axisTick: { show: false },
        axisLabel: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 10, interval: 0, rotate: rotate }
      },
      yAxis: {
        type: "value",
        name: params.unit,
        nameTextStyle: { color: t.inkMuted, fontFamily: FONT_MONO, fontSize: 10, align: "left" },
        min: yMin,
        max: yMax,
        scale: true,
        axisLine: { show: false },
        axisLabel: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 10 },
        splitLine: { lineStyle: { color: t.line, type: "dashed" } }
      },
      series: [{
        type: "bar",
        barMaxWidth: 48,
        emphasis: { focus: "self" },
        data: (params.values || []).map(function (v, i) {
          var dim = params.dim && params.dim[i];
          return {
            value: v,
            itemStyle: {
              color: (params.colors && params.colors[i]) || t.accent,
              borderRadius: [4, 4, 0, 0],
              opacity: dim ? 0.26 : 1
            }
          };
        })
      }]
    };
  }

  /* Minimal hero sparkline: single series, no axes/tooltip. */
  function sparkOption(params) {
    var color = params.color || palette(params.theme)[0];
    return {
      backgroundColor: "transparent",
      animation: true,
      animationDuration: 900,
      grid: { left: 2, right: 2, top: 8, bottom: 2 },
      xAxis: { type: "value", show: false, scale: true },
      yAxis: { type: "value", show: false, scale: true },
      tooltip: { show: false },
      series: [{
        type: "line",
        showSymbol: false,
        smooth: 0.18,
        sampling: "lttb",
        lineStyle: { color: color, width: 2.2 },
        areaStyle: { color: areaGradient(color) },
        data: params.data
      }]
    };
  }

  window.PSICharts = {
    palette: palette,
    tokens: tokens,
    comparisonOption: comparisonOption,
    detailOption: detailOption,
    metricBarOption: metricBarOption,
    sparkOption: sparkOption,
    fmt: fmt
  };
})();
