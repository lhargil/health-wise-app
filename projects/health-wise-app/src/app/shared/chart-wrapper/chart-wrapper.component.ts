import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexChart,
  ApexLegend,
  ChartComponent,
} from 'ng-apexcharts';
import { BloodPressureReading } from '../../core/models';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; // ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; // ApexGrid;
  colors: any;
  toolbar: any;
  legend: ApexLegend;
  noData: any;
};

@Component({
  selector: 'hwa-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartWrapperComponent implements OnInit, AfterViewInit {
  @ViewChild('chartInstance', { static: true }) chartInstance: ChartComponent;

  private _bloodPressureReadings: BloodPressureReading[];
  @Input()
  set bloodPressureReadings(value: BloodPressureReading[]) {
    this._bloodPressureReadings = value;
  }
  @Input()
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Systole',
        data: [],
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
  @Input()
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
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.chartInstance.updateSeries([
        {
          data: this.generateSeries(this._bloodPressureReadings, (readings) => {
            const series: any[] = [];
            readings.forEach((reading) => {
              const x = new Date(reading.dateAdded).getTime();
              series.push([x, reading.systole]);
            });
            return series;
          }),
        },
      ]);
    });
  }

  public generateSeries(
    readings: BloodPressureReading[],
    extractFunc: (list: BloodPressureReading[]) => any[]
  ) {
    return extractFunc(readings);
  }
}
