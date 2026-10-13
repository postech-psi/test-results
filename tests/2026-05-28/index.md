# 2026년 5월 28일 연소 시험

## Reference Figures

### Combined Plot

![Combined Plot](./files/2026-05-28_tms-9_combined_plot.png)

### Loadcell Plot

![Loadcell Plot](./files/2026-05-28_tms-9_loadcell_plot.png)

### Barometer Plot

![Barometer Plot](./files/2026-05-28_tms-9_barometer_plot.png)

## Metrics

| 항목 | 값 |
|---|---|
| 입력 파일 | TMS/Data/2026/5_28/2026.05.28 data.TXT |
| 샘플링 속도 | 320 sps |
| 점화 지연 | 3246.9 ms |
| 연소 시간 | 2818.7 ms |
| 최대 추력 | 174.19 N |
| 평균 추력 | 129.96 N |
| 총 임펄스 | 366.33 N s |
| 최대 압력 | 42.496 bar at 4.228 s |

## 시험 조건 및 데이터 처리

| 항목 | 값 |
|---|---|
| 드리프트 보정 | Constant baseline offset |
| 로드셀 임계값 (3%) | 5.23 N |
| 추력 필터 | Butterworth low-pass 20.0 Hz, order 2 |
| 압력 필터 | Butterworth low-pass 5.0 Hz, order 4 |
| 압력 기준 오프셋 | -0.017733 bar |
| 로드셀 기준 오프셋 | -2.972460 N |
| 로드셀 기준 구간 | 0.000000 to 1.625000 s (520 samples, pre-ignition raw force) |
| 압력 기준 구간 | first 0.500 s (160 samples, filtered pressure) |

## Calibration

| 항목 | 값 |
|---|---|
| 로드셀 보정 기울기 | -0.039100 kg/ADC |
| 로드셀 보정 절편 | -193.0049 kg |
| 로드셀 보정 R^2 | 0.999948 |
| 압력 변환식 | y = 0.0027x -0.11 |

## Issues

- 특이사항 기록 없음.

## Test Video

- 공개된 영상 링크 없음.

## Result Files

- [Executive Report](./files/2026-05-28_tms-9_executive_report.txt)
- [Pipeline Data](./files/2026-05-28_tms-9_pipeline_data.txt)

## Processing provenance

Historical published numeric outputs are retained. The legacy loader omitted the first sensor pair after the two-line header (3.125 ms at nominal 320 Hz). New October data uses the corrected loader; no historical raw data was reconstructed.

## Raw recording

[Original ADC log](./files/2026-05-28_tms-9_raw.txt), recovered from TMS main commit `abb02a0`. Its legacy filtered thrust and pressure series reproduce the published outputs.
