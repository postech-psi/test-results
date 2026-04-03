# 2026/4/4 Static Fire Test

## Graphs

### Combined Plot

![Combined Plot](./assets/2026-04-04/26.04.03%20data_combined_plot.png)

### Loadcell Plot

![Loadcell Plot](./assets/2026-04-04/26.04.03%20data_loadcell_plot.png)

### Barometer Plot

![Barometer Plot](./assets/2026-04-04/26.04.03%20data_barometer_plot.png)

## Metrics

| Item | Value |
|---|---:|
| Input file | `26.04.03 data.TXT` |
| Sampling rate | 320 sps |
| Ignition delay | 6993.8 ms |
| Burn duration | 3287.5 ms |
| Peak thrust | 174.42 N |
| Average thrust | 112.16 N |
| Total impulse | 368.74 N s |
| Peak pressure | 39.241 |
| Peak pressure time | 8.088 s |

## Test And Plot Conditions

| Item | Value |
|---|---|
| Data acquisition system | TMS (Arduino Nano based) |
| Sensors | Loadcell, Barometer |
| Thrust filter | Butterworth low-pass 20.0 Hz, order 2 |
| Pressure filter | Butterworth low-pass 5.0 Hz, order 4 |
| Drift correction | Constant baseline offset |
| Loadcell baseline offset | 0.890267 N |
| Loadcell baseline window end | 3.496875 s (1119 samples) |
| Pressure correction | Gauge baseline removal |
| Pressure baseline offset | -0.124905 |

## Notes

- Ignition start time `6.993750 s`.
- Constant baseline offset applied. Loadcell baseline offset `0.890267 N`.

## Action Items

- Test fixture slipped during burn. Must be fixed before the next test.
- Fire occurred after the burn was mostly finished. Inspect chamber and nozzle.
- Rust-colored water observed. Check equipment and piping for corrosion.

## Test Video

- [Watch Video](https://www.instagram.com/postech_psi/reel/DWqwlBcE8Gz/)

## Result Files

- [Download Executive Report](./assets/2026-04-04/26.04.03%20data_executive_report.txt)
- [Download Pipeline Data](./assets/2026-04-04/26.04.03%20data_pipeline_data.txt)
