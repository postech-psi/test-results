# Loadcell+Barometer Plot

## Graphs

### Loadcell+Barometer Plot

![Combined Plot](./assets/2026-04-04/26.04.03%20data_combined_plot.png)

### Loadcell Plot

![Loadcell Plot](./assets/2026-04-04/26.04.03%20data_loadcell_plot.png)

### Barometer Plot

![Barometer Plot](./assets/2026-04-04/26.04.03%20data_barometer_plot.png)

## Metrics

| 항목 | 값 |
|---|---:|
| 입력 파일 | `26.04.03 data.TXT` |
| 샘플링 속도 | 320 sps |
| 점화 지연 | 6993.8 ms |
| 연소 시간 | 3287.5 ms |
| 최대 추력 | 174.42 N |
| 평균 추력 | 112.16 N |
| 총 임펄스 | 368.74 N s |
| 최대 압력 | 39.241 |
| 최대 압력 시점 | 8.088 s |

## Test And Plot Conditions

| 항목 | 값 |
|---|---|
| 데이터 취득 시스템 | TMS (Arduino Nano 기반) |
| 센서 | Loadcell, Barometer |
| 추력 필터 | Butterworth low-pass 20.0 Hz, order 2 |
| 압력 필터 | Butterworth low-pass 5.0 Hz, order 4 |
| 드리프트 보정 | 기준선 오프셋 보정 (Constant baseline offset) |
| 로드셀 기준 오프셋 | 0.890267 N |
| 로드셀 기준 구간 종료 | 3.496875 s (1119 samples) |
| 압력 보정 | Gauge baseline 제거 |
| 압력 기준 오프셋 | -0.124905 |

## Notes

- 점화 시작 시점 `6.993750 s`.
- 기준선 오프셋 보정 적용. 로드셀 기준 오프셋 `0.890267 N`.

## Action Items

- 연소 중간에 시험 기기 밀림 발생. 반드시 해결 필요.
- 연소가 어느 정도 마무리된 이후 불이 발생함. 연소실이나 노즐 점검 필요.
- 녹물 나옴. 장치 또는 배관 부식 여부 점검 필요.

## Test Video

- [시험 영상 보기](https://www.instagram.com/postech_psi/reel/DWqwlBcE8Gz/)

## Result Files

- [Executive Report 다운로드](./assets/2026-04-04/26.04.03%20data_executive_report.txt)
- [Pipeline Data 다운로드](./assets/2026-04-04/26.04.03%20data_pipeline_data.txt)
