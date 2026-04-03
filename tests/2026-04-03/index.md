# 2026/4/3 정적 연소 시험

## Graphs

### Combined Plot

![Combined Plot](./files/26.04.03 data_combined_plot.png)

### Loadcell Plot

![Loadcell Plot](./files/26.04.03 data_loadcell_plot.png)

### Barometer Plot

![Barometer Plot](./files/26.04.03 data_barometer_plot.png)

## Metrics

| Item | Value |
|---|---|
| Input file | TMS\Data\2026\4_2\26.04.03 data.TXT |
| Sampling rate | 320 sps |
| Ignition delay | 6993.8 ms |
| Burn duration | 3287.5 ms |
| Peak thrust | 174.42 N |
| Average thrust | 112.16 N |
| Total impulse | 368.74 N s |
| Peak pressure | 39.241 at 8.088 s |

## Test Setup and Data Processing

| Item | Value |
|---|---|
| Drift correction | Constant baseline offset |
| Loadcell threshold (3%) | 5.23 N |
| Loadcell filter | Butterworth low-pass 20.0 Hz, order 2 |
| Pressure filter | Butterworth low-pass 5.0 Hz, order 4 |
| Pressure baseline offset | -0.124905 |
| Loadcell baseline offset | 0.890267 N |
| Loadcell baseline window end | 3.496875 s (1119 samples) |
| Ignition start time | 6.993750 s |

## Calibration And Conversion

| Item | Value |
|---|---|
| Loadcell calibration slope | -0.039100 kg/ADC |
| Loadcell calibration intercept | -193.0049 kg |
| Loadcell calibration R^2 | 0.999948 |
| Pressure conversion | y = 0.0027x -0.11 |

## Result Files

- [Executive Report](./files/26.04.03 data_executive_report.txt)
- [Pipeline Data](./files/26.04.03 data_pipeline_data.txt)
