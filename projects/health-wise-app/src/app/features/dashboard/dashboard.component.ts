import { Component, OnInit, ViewChild } from '@angular/core';
import { BloodPressureReading } from '../../core/models';
import {
  ChartOptions,
  ChartWrapperComponent,
} from '../../shared/chart-wrapper/chart-wrapper.component';
import { HealthService } from '../../core/services/health.service';
import { tap, filter, map } from 'rxjs/operators';
import { HealthStore } from '../../core/state';

@Component({
  selector: 'hwa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('systoleChart', { static: true })
  systoleChart: ChartWrapperComponent;
  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    toolbar: {
      tools: {
        selection: false,
      },
    },
    markers: {
      size: 6,
      hover: {
        size: 10,
      },
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'dd-MMM',
      },
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount: 6,
      decimalsInFloat: 0,
    },
    noData: {
      text: 'Loading...',
    },
  };

  public bloodPressureReadings: BloodPressureReading[] = [];

  bloodPressureReadings$ = this.healthService.stateChanged.pipe(
    filter((state: any) => !!state),
    map((state: HealthStore) => state.bloodPressureReadings),
    // tap(readings => this.bloodPressureReadings = readings),
    // tap(_ => this.initCharts()),
  );

  constructor(private healthService: HealthService) {
  }

  ngOnInit(): void {
    this.healthService.getBloodPressureReadings()
      .pipe(
        tap(readings => this.bloodPressureReadings = readings),
        tap(_ => this.initCharts())
      )
      .subscribe();
    // this.bloodPressureReadings$
    //   .pipe(
    //     tap(readings => this.bloodPressureReadings = readings),
    //     tap(_ => this.initCharts())
    //   ).subscribe();

  }

  public initCharts(): void {
    this.chart1options = {
      series: [
        {
          name: 'Systole',
          data: this.generateSeries(this.bloodPressureReadings, (readings) => {
            const series: any[] = [];

            readings.forEach((reading) => {
              const x = new Date(reading.dateAdded).getTime();
              series.push([x, reading.systole]);
            });

            return series;
          }),
        },
      ],
      title: {
        text: 'Systole',
      },
      chart: {
        id: 'systole',
        group: 'blood-pressure',
        type: 'area',
        height: 160,
      },
      colors: ['#008FFB'],
      yaxis: {
        labels: {
          minWidth: 40,
        },
      },
    };

    this.chart2options = {
      series: [
        {
          name: 'Diastole',
          data: this.generateSeries(this.bloodPressureReadings, (readings) => {
            const series: any[] = [];

            readings.forEach((reading) => {
              const x = new Date(reading.dateAdded).getTime();
              series.push([x, reading.diastole]);
            });

            return series;
          }),
        },
      ],
      title: {
        text: 'Diastole',
      },
      chart: {
        id: 'diastole',
        group: 'blood-pressure',
        type: 'area',
        height: 160,
      },
      colors: ['#546E7A'],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40,
        },
      },
    };

    this.chart3options = {
      series: [
        {
          name: 'Heart rate',
          data: this.generateSeries(this.bloodPressureReadings, (readings) => {
            const series: any[] = [];

            readings.forEach((reading) => {
              const x = new Date(reading.dateAdded).getTime();
              series.push([x, reading.heartRate]);
            });

            return series;
          }),
        },
      ],
      title: {
        text: 'Heart rate',
      },
      chart: {
        id: 'heart-rate',
        group: 'blood-pressure',
        type: 'area',
        height: 160,
      },
      colors: ['#00E396'],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40,
        },
      },
    };
  }

  public generateSeries(
    readings: BloodPressureReading[],
    extractFunc: (list: BloodPressureReading[]) => any[]
  ) {
    return extractFunc(readings);
  }

  public generateDayWiseTimeSeries(startDate: Date, readings: number[]): any[] {
    const series: any[] = [];
    let start = startDate.getTime();
    readings.forEach((reading) => {
      const x = start;
      series.push([x, reading]);

      start += 86400000;
    });
    return series;
  }

}
